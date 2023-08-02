<template>
  <div class="card rounded-4 mx-5">
    <!-- start: card title -->
    <div class="card-title rounded-top-4 mb-0 text-white p-3 bg-primary">
      <h4 class="fw-normal fst-italic">User Form</h4>
    </div>
    <!-- end: card-title -->
    <!-- start: card-body -->
    <div class="card-body">
      <!-- start: user form -->
      <form class="user-form" @submit.prevent="onGenerate">
        <div class="mb-3">
          <label class="mb-1" for="name">Name:</label>
          <Field
            type="text"
            class="form-control"
            placeholder="Ex. Jinal Tandel"
            name="name"
          />
          <span class="text-danger">{{ errors.name }}</span>
        </div>
        <div class="mb-3">
          <label class="mb-1" for="emailid">Email ID:</label>
          <Field type="text" class="form-control" name="emailid" />
          <span class="text-danger">{{ errors.emailid }}</span>
        </div>
        <div class="mb-3">
          <label class="mb-1" for="designation">Designation:</label>
          <Field type="text" class="form-control" name="designation" />
          <span class="text-danger">{{ errors.designation }}</span>
        </div>
        <div class="mb-3">
          <label class="mb-1" for="department">Select Department:</label>
          <Field
            as="select"
            id="department"
            class="form-select"
            name="department"
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
          <label class="mb-1" for="contactNumber">Contact Number:</label>
          <Field type="text" class="form-control" name="contactNumber" />
          <span class="text-danger">{{ errors.contactNumber }}</span>
        </div>
        <div class="mb-3">
          <div>
            <label class="mb-1" for="profileImage">Profile Photo:</label>
          </div>
          <img
            src="~@/assets/images/profile-skeleton.png"
            alt="Preview"
            v-if="!previewImageUrl"
          />
          <img :src="previewImageUrl" v-else alt="Profile preview" />
          <input
            type="file"
            class="form-control"
            id="profileImage"
            name="profileImage"
            style="display: none"
            ref="profile"
            @change="handleImageChange"
          />
          <button class="btn btn-outline-dark ms-4" @click="profile.click()">
            <span class="fst-italic">Change</span>
          </button>
          {{ errors }}
          <span class="text-danger">{{ errors.profileImage }}</span>
        </div>
        <div class="mb-3">
          <label class="mb-1" for="name">Github Link:</label>
          <Field type="text" class="form-control" name="githubLink" />
          <span class="text-danger">{{ errors.githubLink }}</span>
        </div>
        <div class="mb-3">
          <label class="mb-1" for="name">LinkedIn Link:</label>
          <Field type="text" class="form-control" name="linkedinLink" />
          <span class="text-danger">{{ errors.linkedinLink }}</span>
        </div>
        <div class="text-center">
          <button class="btn btn-primary px-4">
            <span class="text-white fw-light fst-italic">Generate</span>
          </button>
        </div>
      </form>
      <!-- end: user form -->
    </div>
    <!-- end: card body -->
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
import { onUnmounted, reactive } from "vue";
import { useForm, Field, configure } from "vee-validate";
import { ref } from "vue";
import emitter from "../../../../emitter/emitter.mitt";
import { User } from "@/user-form/model/user.model";

const previewImageUrl = ref();
const profile = ref();

const departments = [
  { label: "FrontEnd", value: "FrontEnd" },
  { label: "BackEnd", value: "BackEnd" },
  { label: "Database", value: "Database" },
  { label: "RPA", value: "RPA" },
  { label: "Mobile App", value: "Mobile App" },
];
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
});

const schema = yup.object({
  name: yup
    .string()
    .required()
    .matches(/^[a-zA-Z]+ +[a-zA-Z]+$/, "It contains alphabets and space only"),
  emailid: yup
    .string()
    .required()
    .matches(/^[a-zA-Z]+.[a-zA-Z]+@1rivet.com+$/, "Enter correct mail id"),
  designation: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9 ]+$/, "It contains alphanumeric value"),
  department: yup
    .string()
    .required("Please select your department from the dropdown"),
  contactNumber: yup
    .string()
    .required()
    .matches(/^[0-9]{10}$/, "Enter correct contact number"),
  // profileImage: yup
  //   .mixed()
  //   .required("Required")
  //   .test(
  //     "fileType",
  //     "Invalid file type",
  //     (value: any) => value && value.type.startsWith("image/")
  //   )
  //   .test(
  //     "fileSize",
  //     "File size must be less than 1MB",
  //     (value: any) => value && value.size <= 1000000
  //   ),
  githubLink: yup
    .string()
    .required()
    .matches(/https:\/\/github\.com\/([^/]+)/, "Enter your valid github link"),
  linkedinLink: yup
    .string()
    .required()
    .matches(
      /https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+/,
      "Enter your valid linkedIn link"
    ),
});
const formInit = reactive({ data: {} });
formInit.data = {
  name: "",
  emailid: "",
  designation: "",
  department: "",
  contactNumber: "",
  profileImage: "",
  githubLink: "",
  linkedinLink: "",
};
const { errors, handleSubmit, validate, resetForm } = useForm({
  initialValues: formInit.data,
  validationSchema: schema,
});

const handleImageChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    // Create a FileReader to read the selected image file
    const reader = new FileReader();

    // Set up the reader to display the image as a preview
    reader.onload = () => {
      previewImageUrl.value = reader.result;
    };

    // Read the selected image file as a data URL
    reader.readAsDataURL(file);
  }
};
const onGenerate = handleSubmit((values: any) => {
  validate();
  emitter.emit("formdata", { ...values, profileImage: previewImageUrl.value });
  resetForm();
  previewImageUrl.value = "";
});

onUnmounted(() => {
  emitter.off("formdata");
});
</script>
