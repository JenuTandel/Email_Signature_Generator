<template>
  <div class="card rounded-4 mx-0 mx-lg-5">
    <!-- start: card title -->
    <div class="card-title rounded-top-4 mb-0 text-white p-3 bg-primary">
      <h5 class="fw-normal">Signature Preview</h5>
    </div>
    <!-- end: card-title -->
    <!-- start: card-body -->
    <div class="card-body">
      <div ref="signaturediv">
        <!-- start: table (For represent formdata) -->
        <table class="border-none border-collapse">
          <tbody>
            <tr>
              <td
                rowSpan="6"
                ref="logoimagewrapper"
                style="
                  border-right: 1px solid #d9d9d9;
                  border-left: none;
                  border-top: none;
                  border-bottom: none;
                  margin-right: 5px;
                "
              ></td>
              <td
                style="
                  font-size: 13pt;
                  font-weight: 500;
                  border: none;
                  margin-left: 10px;
                  padding: 5px 0px;
                "
              >
                <p
                  v-if="!user?.firstname"
                  class="name-skeleton bg-secondary ms-2"
                ></p>
                <span v-else class="ms-2">
                  {{ user.firstname }} {{ user.lastname }}
                </span>
              </td>
            </tr>
            <tr>
              <td style="font-size: 11pt; border: none; margin-left: 10px">
                <p
                  v-if="!user?.designation"
                  class="designation-skeleton bg-secondary ms-2"
                ></p>
                <span class="ms-2" v-else
                  >{{ user.designation }} | {{ user.department }}
                </span>
              </td>
            </tr>
            <tr>
              <td
                style="
                  font-size: 10pt;
                  border: none;
                  margin-left: 10px;
                  padding: 5px 0px;
                "
              >
                <p
                  v-if="!user?.emailid"
                  class="email-contact-skeleton bg-secondary ms-2"
                ></p>
                <span class="ms-2" v-else>
                  <span style="color: red">e. </span>
                  {{ user.emailid }}
                </span>
              </td>
            </tr>
            <tr>
              <td
                style="font-size: 10pt; border: none; margin-left: 10px"
                class="pb-1"
              >
                <p
                  v-if="!user?.contactNumber"
                  class="email-contact-skeleton bg-secondary ms-2"
                ></p>
                <span class="ms-2" v-if="user?.contactNumber">
                  <span style="color: red">tel.</span>
                  {{ user.contactNumber }}</span
                >
              </td>
            </tr>
            <tr>
              <td
                style="
                  font-size: 10pt;
                  border: none;
                  margin-left: 10px;
                  height: 20px;
                  text-decoration: none;
                "
              >
                <span style="color: red" class="ms-2">web. </span>
                <a
                  href="https://www.1rivet.com"
                  style="text-decoration: none"
                  ref="githublink"
                >
                  <span>www.1rivet.com</span>
                </a>
              </td>
            </tr>
            <tr>
              <td style="border: none; margin-left: 10px">
                <a
                  :href="user?.githubLink"
                  style="text-decoration: none"
                  ref="githublink"
                >
                </a>
                <a
                  :href="user?.linkedinLink"
                  style="text-decoration: none"
                  ref="linkedinlink"
                >
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- end: table (For represent formdata) -->
      </div>
      <div class="mt-3 text-center">
        <button
          class="btn btn-primary px-4"
          :disabled="errors"
          @click="onCopySignature()"
        >
          <span class="text-white">Copy Signature</span>
        </button>
      </div>
    </div>
    <!-- end: card-body -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import emitter from "@/emitter/emitter.mitt";
import copyToClipboard from "@/hooks/copy-to-clipboard";
const signaturediv = ref(null);
const logoimagewrapper = ref();
const linkedinlink = ref();
const githublink = ref();
const user = ref();
const errors = ref(true);
const githubIconVisibility = ref();
const linkedinIconVisibility = ref();

const linkedinIcon = new Image();
linkedinIcon.src = require("../../../../assets/images/linkedin.png");

const githubIcon = new Image();
githubIcon.src = require("../../../../assets/images/github.png");

const removeTableBorders = (table: any) => {
  table.style.border = "none";
  table.style.boxShadow = "none";
};

onMounted(() => {
  emitter.on("getUser", (e: any) => {
    user.value = { ...e };
  });

  emitter.on("errors", (e: any) => {
    errors.value = e;
  });
  emitter.on("github", (e: any) => {
    githubIconVisibility.value = e;
  });
  emitter.on("linkedin", (e: any) => {
    linkedinIconVisibility.value = e;
  });

  const imageLogo = new Image();
  imageLogo.src = require("../../../../assets/images/rivetlogo.png");

  imageLogo.onload = function () {
    // Create a canvas to manipulate the imageLogo
    const canvaslogo = document.createElement("canvas");
    const canvasWidth = 70;
    const canvasHeight = 70;

    const scaleX = canvasWidth / imageLogo.width;
    const scaleY = canvasHeight / imageLogo.height;
    const scale = Math.min(scaleX, scaleY);

    // Calculate the new image dimensions
    const newWidth = imageLogo.width * scale;
    const newHeight = imageLogo.height * scale;

    canvaslogo.width = canvasWidth;
    canvaslogo.height = canvasHeight;
    canvaslogo.style.overflow = "hidden";

    // Get the canvas context
    const ctxlogo = canvaslogo.getContext("2d");
    ctxlogo?.drawImage(
      imageLogo,
      (canvasWidth - newWidth) / 2,
      (canvasHeight - newHeight) / 2,
      newWidth,
      newHeight
    );

    // Convert the canvas data to a data URL (base64)
    const imageLogoDataURL = canvaslogo.toDataURL();

    // Create a new image element with the circular image
    const logo = document.createElement("img");
    logo.classList.add("me-1");
    logo.src = imageLogoDataURL;
    // Add the circular image to the page
    logoimagewrapper.value.appendChild(logo);
  };
});

watch(linkedinIconVisibility, () => {
  // Create a canvas to manipulate the image
  const iconcanvas = document.createElement("canvas");
  const canvasWidth = 25;
  const canvasHeight = 25;

  const scaleX = canvasWidth / linkedinIcon.width;
  const scaleY = canvasHeight / linkedinIcon.height;
  const scale = Math.min(scaleX, scaleY);

  // Calculate the new image dimensions
  const newWidth = linkedinIcon.width * scale;
  const newHeight = linkedinIcon.height * scale;

  iconcanvas.width = canvasWidth;
  iconcanvas.height = canvasHeight;
  iconcanvas.style.overflow = "hidden";
  const ctx1 = iconcanvas.getContext("2d");
  ctx1?.drawImage(
    linkedinIcon,
    (canvasWidth - newWidth) / 2,
    (canvasHeight - newHeight) / 2,
    newWidth,
    newHeight
  );

  // Get the Base64 data URL of the image from the canvas
  const base64URL = iconcanvas.toDataURL();

  const linkedinIcon1 = document.createElement("img");
  linkedinIcon1.classList.add("ms-2");
  linkedinIcon1.src = base64URL;

  // Remove any existing circular image
  const existingLinkedinIcon = linkedinlink.value.querySelector("img");
  if (existingLinkedinIcon) {
    linkedinlink.value.removeChild(existingLinkedinIcon);
  }

  // linkedin.appendChild(linkedinIcon1);
  if (linkedinIconVisibility.value == true) {
    linkedinlink.value.appendChild(linkedinIcon1);
  }
});

watch(githubIconVisibility, (value) => {
  // debugger;
  const iconcanvas = document.createElement("canvas");
  const canvasWidth = 25;
  const canvasHeight = 25;

  const scaleX = canvasWidth / githubIcon.width;
  const scaleY = canvasHeight / githubIcon.height;
  const scale = Math.min(scaleX, scaleY);

  // Calculate the new image dimensions
  const newWidth = githubIcon.width * scale;
  const newHeight = githubIcon.height * scale;

  iconcanvas.width = canvasWidth;
  iconcanvas.height = canvasHeight;
  iconcanvas.style.overflow = "hidden";
  const ctx2 = iconcanvas.getContext("2d");
  ctx2?.drawImage(
    githubIcon,
    (canvasWidth - newWidth) / 2,
    (canvasHeight - newHeight) / 2,
    newWidth,
    newHeight
  );

  // Get the Base64 data URL of the image from the canvas
  const base64URL = iconcanvas.toDataURL();
  const githubIcon1 = document.createElement("img");
  githubIcon1.classList.add("ms-2");
  githubIcon1.src = base64URL;

  // Remove any existing circular image
  const existinggithubIcon = githublink.value.querySelector("img");
  if (existinggithubIcon) {
    githublink.value.removeChild(existinggithubIcon);
  }

  // debugger;
  if (githubIconVisibility.value == true) {
    githublink.value.appendChild(githubIcon1);
  }
});

//Copy signature button
const onCopySignature = () => {
  const signatureContainer = signaturediv.value;
  removeTableBorders(signatureContainer);

  //call hook copyToClipboard
  copyToClipboard(signatureContainer);
};
</script>
