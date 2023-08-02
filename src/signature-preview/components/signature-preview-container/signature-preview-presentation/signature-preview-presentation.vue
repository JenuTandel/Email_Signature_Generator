<template>
  <div class="card rounded-4 mx-5">
    <!-- start: card title -->
    <div class="card-title rounded-top-4 mb-0 text-white p-3 bg-primary">
      <h4 class="fw-normal fst-italic">Signature Preview</h4>
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
                rowSpan="2"
                ref="profilecolumnRef"
                id="profile"
                style="
                  border-right: 1px solid #d9d9d9;
                  border-left: none;
                  border-top: none;
                  border-bottom: none;
                  margin-right: 5px;
                "
              >
                <div class="profile-skeleton-wrapper mx-2" v-if="!formData">
                  <img src="../../../../assets/images/profile-skeleton.png" />
                </div>
              </td>
              <td
                style="
                  font-size: 14pt;
                  font-weight: 500;
                  border: none;
                  margin-left: 10px;
                "
              >
                <p v-if="!formData" class="name-skeleton bg-secondary ms-2"></p>
                <span v-else class="ms-2">
                  {{ formData?.name }}
                </span>
              </td>
            </tr>
            <tr>
              <td style="font-size: 11pt; border: none; margin-left: 10px">
                <p
                  v-if="!formData"
                  class="designation-skeleton bg-secondary ms-2"
                ></p>
                <span class="ms-2" v-else
                  >{{ formData?.designation }} |
                  <span style="color: red">{{
                    formData?.department
                  }}</span></span
                >
              </td>
            </tr>
            <tr>
              <td
                rowSpan="3"
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
                  font-size: 10pt;
                  border: none;
                  margin-left: 10px;
                  padding: 5px 0px;
                "
              >
                <p
                  v-if="!formData"
                  class="email-contact-skeleton bg-secondary ms-2"
                ></p>
                <span class="ms-2" v-else>
                  <span style="color: red">e. </span>
                  {{ formData?.emailid }}
                </span>
              </td>
            </tr>
            <tr>
              <td
                style="
                  font-size: 10pt;
                  border: none;
                  margin-left: 10px;
                  height: 20px;
                "
              >
                <p
                  v-if="!formData"
                  class="email-contact-skeleton bg-secondary ms-2"
                ></p>
                <span class="ms-2" v-if="formData?.contactNumber">
                  <span style="color: red">tel.</span>
                  {{ formData?.contactNumber }}</span
                >
              </td>
            </tr>
            <tr>
              <td style="border: none; margin-left: 10px">
                <a
                  :href="githubLinkRef"
                  style="text-decoration: none"
                  ref="githublink"
                  ><span
                    v-if="!githubLinkRef"
                    class="icon-github text-secondary fs-3 me-2 ms-2"
                  ></span
                ></a>
                <a
                  :href="linkedinLinkRef"
                  style="text-decoration: none"
                  ref="linkedinlink"
                >
                  <span
                    class="icon-linkedin text-secondary fs-3"
                    v-if="!linkedinLinkRef"
                  ></span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- end: table (For represent formdata) -->
      </div>
      <div class="mt-3 text-center">
        <button class="btn btn-primary px-4" @click="onCopySignature()">
          <span class="text-white fst-italic">Copy Signature</span>
        </button>
      </div>
    </div>
    <!-- end: card-body -->
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import emitter from "@/emitter/emitter.mitt";
import copyToClipboard from "@/hooks/copy-to-clipboard";
const formData = ref();
const signaturediv = ref(null);
const profilecolumnRef = ref();
const logoimagewrapper = ref();
const linkedinlink = ref();
const githublink = ref();

const profileRef = computed(() => {
  return formData.value?.profileImage;
});
const githubLinkRef = computed(() => {
  return formData.value?.githubLink;
});
const linkedinLinkRef = computed(() => {
  return formData.value?.linkedinLink;
});
// const profileRef = ref();
// const githubLinkRef = ref();
// const linkedinLinkRef = ref();

const linkedinIcon = new Image();
linkedinIcon.src = require("../../../../assets/images/linkedin.png");

const githubIcon = new Image();
githubIcon.src = require("../../../../assets/images/github.png");

const removeTableBorders = (table: any) => {
  table.style.border = "none";
  table.style.boxShadow = "none";
};
onMounted(() => {
  emitter.on("formdata", (e) => {
    formData.value = e;
  });

  const imageLogo = new Image();
  imageLogo.src = require("../../../../assets/images/rivetlogo.png");

  imageLogo.onload = function () {
    // Create a canvas to manipulate the imageLogo
    const canvaslogo = document.createElement("canvas");
    const canvasWidth = 60;
    const canvasHeight = 60;

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
    logo.src = imageLogoDataURL;
    // Add the circular image to the page
    logoimagewrapper.value.appendChild(logo);
  };
});

watch(profileRef, () => {
  if (formData.value?.profileImage) {
    const image = new Image();
    image.height = 50;
    image.width = 60;
    image.src = formData.value?.profileImage;

    image.onload = function () {
      // Create a canvas to manipulate the image
      const canvas = document.createElement("canvas");
      const canvasWidth = 60;
      const canvasHeight = 50;

      const scaleX = canvasWidth / image.width;
      const scaleY = canvasHeight / image.height;
      const scale = Math.min(scaleX, scaleY);

      // Calculate the new image dimensions
      const newWidth = image.width * scale;
      const newHeight = image.height * scale;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Get the canvas context
      const ctx = canvas.getContext("2d");

      const radius = Math.min(image.width, image.height) / 2;
      const centerX = newWidth / 2;
      const centerY = newHeight / 2;
      ctx?.beginPath();
      ctx?.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx?.closePath();
      ctx?.clip();
      ctx?.drawImage(
        image,
        centerX - radius,
        centerY - radius,
        radius * 2,
        radius * 2
      );

      // Convert the canvas data to a data URL (base64)
      const imageDataURL = canvas.toDataURL();

      // Create a new image element with the circular image
      const circularImage = document.createElement("img");
      circularImage.src = imageDataURL;
      circularImage.classList.add("me-1");

      // Remove any existing circular image
      const existingCircularImage = profilecolumnRef.value.querySelector("img");
      if (existingCircularImage) {
        profilecolumnRef.value.removeChild(existingCircularImage);
      }
      // Add the circular image to the page
      profilecolumnRef.value.appendChild(circularImage);
    };
  }
});

watch(linkedinLinkRef, () => {
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
  console.log(base64URL);

  const linkedinIcon1 = document.createElement("img");
  linkedinIcon1.classList.add("ms-2");
  linkedinIcon1.src = base64URL;

  // Remove any existing circular image
  const existingLinkedinIcon = linkedinlink.value.querySelector("img");
  if (existingLinkedinIcon) {
    linkedinlink.value.removeChild(existingLinkedinIcon);
  }

  // linkedin.appendChild(linkedinIcon1);
  linkedinlink.value.appendChild(linkedinIcon1);
});

watch(githubLinkRef, () => {
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
  // github.appendChild(githubIcon1);
  githublink.value.appendChild(githubIcon1);
});

//Copy signature button
const onCopySignature = () => {
  const signatureContainer = signaturediv.value;
  removeTableBorders(signatureContainer);

  //call hook copyToClipboard
  copyToClipboard(signatureContainer);
};
</script>
