<template>
  <div class="card rounded-4 mx-5">
    <!-- start: card title -->
    <div class="card-title rounded-top-4 mb-0 text-white p-3 bg-primary">
      <h4 class="fw-normal fst-italic">Signature Preview</h4>
    </div>
    <!-- end: card-title -->
    <!-- start: card-body -->
    <div class="card-body">
      <div class="row">
        <!-- start: image wrapper -->
        <div
          class="col-3 d-flex flex-column align-items-center border-end border-2 gx-0"
        >
          <div class="image-wrapper">
            <img
              src="~@/assets/images/profile-skeleton.png"
              alt="profile image"
              class="mb-2"
            />
          </div>
          <div class="image-wrapper">
            <img src="~@/assets/images/rivetlogo.png" alt="company logo" />
          </div>
        </div>
        <!-- end: image wrapper -->
        <!-- start: content wrapper -->
        <div class="col-9 d-flex flex-column">
          <h3 class="name bg-secondary mb-2 w-50" style="height: 24px"></h3>
          <p
            class="designation bg-secondary mb-2 w-75"
            style="height: 16px"
          ></p>
          <p class="email bg-secondary mb-2 w-100" style="height: 16px"></p>
          <p class="contact bg-secondary mb-2 w-100" style="height: 16px"></p>
          <div>
            <span class="icon-github text-secondary fs-2 me-2"></span>
            <span class="icon-linkedin text-secondary fs-2"></span>
          </div>
        </div>
      </div>
      <!-- end: content wrapper -->
      <div class="mt-3 text-center">
        <button class="btn btn-primary px-4">
          <span class="text-white fst-italic">Copy Signature</span>
        </button>
      </div>
    </div>
    <!-- end: card-body -->
  </div>
</template>

<script setup lang="ts"></script>
