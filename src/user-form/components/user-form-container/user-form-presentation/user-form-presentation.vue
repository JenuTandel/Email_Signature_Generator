<template>
  <div class="card rounded-4 mx-0 mx-lg-5">
    <!-- start: card title -->
    <div class="card-title rounded-top-4 mb-0 text-white p-3 bg-primary">
      <h4>Create your signature</h4>
    </div>
    <!-- end: card-title -->
    <!-- start: card-body -->
    <div class="card-body">
      <!-- start: user form -->
      <form class="user-form">
        <div class="mb-3">
          <label class="mb-1 fw-semibold" for="name"
            >Name<span class="text-danger fw-bold">*</span></label
          >
          <Field type="text" class="form-control" name="name" v-model="name" />
          <span class="text-danger">{{ errors.name }}</span>
        </div>
        <div class="mb-3">
          <label class="mb-1 fw-semibold" for="emailid"
            >Email ID<span class="text-danger fw-bold">*</span></label
          >
          <Field
            type="text"
            class="form-control"
            name="emailid"
            placeholder="example@1rivet.com"
            v-model="emailid"
          />
          <span class="text-danger">{{ errors.emailid }}</span>
        </div>
        <div class="mb-3">
          <label class="mb-1 fw-semibold" for="designation"
            >Designation<span class="text-danger fw-bold">*</span></label
          >
          <Field
            type="text"
            class="form-control"
            name="designation"
            v-model="designation"
          />
          <span class="text-danger">{{ errors.designation }}</span>
        </div>
        <div class="mb-3">
          <label class="mb-1 fw-semibold" for="department"
            >Select Department<span class="text-danger fw-bold">*</span></label
          >
          <Field
            as="select"
            id="department"
            class="form-select"
            name="department"
            v-model="department"
          >
            <option value="" disabled selected>Select</option>
            <option
              v-for="option in departments"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </Field>
          <span class="text-danger">{{ errors.department }}</span>
        </div>
        <div class="mb-3">
          <label class="mb-1 fw-semibold" for="contactNumber"
            >Contact Number<span class="text-danger fw-bold">*</span></label
          >
          <Field
            type="text"
            class="form-control"
            name="contactNumber"
            v-model="contactNumber"
          />
          <span class="text-danger">{{ errors.contactNumber }}</span>
        </div>
        <div class="mb-3">
          <label class="mb-1 fw-semibold" for="name">Github Link</label>
          <Field
            type="text"
            class="form-control"
            name="githubLink"
            v-model="githubLink"
          />
          <span class="text-danger">{{ errors.githubLink }}</span>
        </div>
        <div class="mb-3">
          <label class="mb-1 fw-semibold" for="name">LinkedIn Link</label>
          <Field
            type="text"
            class="form-control"
            name="linkedinLink"
            v-model="linkedinLink"
          />
          <span class="text-danger">{{ errors.linkedinLink }}</span>
        </div>
      </form>
      <!-- end: user form -->
    </div>
    <!-- end: card body -->
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
import { onMounted, reactive, watch } from "vue";
import { useForm, Field, configure, useField } from "vee-validate";
import { ref } from "vue";
import emitter from "../../../../emitter/emitter.mitt";
// import { User } from "@/user-form/model/user.model";

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
});
const departments = [
  { label: "FrontEnd", value: "FrontEnd" },
  { label: "BackEnd", value: "BackEnd" },
  { label: "Database", value: "Database" },
  { label: "RPA", value: "RPA" },
  { label: "Mobile App", value: "Mobile App" },
];

const schema = yup.object({
  name: yup
    .string()
    .required()
    .matches(/^[a-zA-Z ]+$/, "It contains alphabets only"),
  emailid: yup
    .string()
    .required()
    .matches(/^[a-zA-Z]+.[a-zA-Z]+@1rivet.com+$/, "Enter correct mail id"),
  designation: yup
    .string()
    .required()
    .matches(
      /^[a-zA-Z0-9 .]+$/,
      "It contains alphanumeric value, space and . character"
    ),
  department: yup
    .string()
    .required("Please select your department from the dropdown"),
  contactNumber: yup
    .string()
    .required()
    .matches(/^[0-9]{10}$/, "Enter correct contact number"),
  githubLink: yup
    .string()
    .nullable()
    .test({
      test: function (value) {
        if (!value) {
          return true;
        }
        return value.match(/https:\/\/github\.com\/([^/]+)/) !== null;
      },
      message: "Enter a valid GitHub link",
    }),
  linkedinLink: yup
    .string()
    .nullable()
    .test({
      test: function (value) {
        if (!value) {
          return true;
        }
        return (
          value.match(/https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+/) !==
          null
        );
      },
      message: "Enter your valid linkedIn link",
    }),
});
const name = ref();
const emailid = ref();
const designation = ref();
const department = ref();
const contactNumber = ref();
const githubLink = ref();
const linkedinLink = ref();

const user = reactive({
  name,
  emailid,
  designation,
  department,
  contactNumber,
  githubLink,
  linkedinLink,
});
const formInit = reactive({ data: {} });
formInit.data = {
  name: "",
  emailid: "",
  designation: "",
  department: "",
  contactNumber: "",
  githubLink: "",
  linkedinLink: "",
};
const { errors, meta } = useForm({
  initialValues: formInit.data,
  validationSchema: schema,
});

const gitField = useField("githubLink");
const linkedinField = useField("linkedinLink");

watch(gitField.meta, (value) => {
  if (value.valid && (!value.touched || value.dirty)) {
    emitter.emit("github", true);
  } else {
    emitter.emit("github", false);
  }
});
watch(linkedinField.meta, (value) => {
  if (value.valid && (!value.touched || value.dirty)) {
    emitter.emit("linkedin", true);
  } else {
    emitter.emit("linkedin", false);
  }
});

watch(errors, () => {
  if (meta.value.valid == true) {
    emitter.emit("errors", false);
  } else {
    emitter.emit("errors", true);
  }
});
onMounted(() => {
  watch(user, () => {
    emitter.emit("getUser", user);
  });
});
</script>
