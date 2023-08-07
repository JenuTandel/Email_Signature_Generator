<template>
  <section class="row align-items-center flex-grow-1 w-100 h-100">
    <div class="col-12 col-md-6 p-md-4 p-0 mb-md-0 mb-4">
      <user-form-container></user-form-container>
    </div>
    <div
      class="col-12 col-md-6 p-md-4 p-0 h-100 d-flex flex-column justify-content-center"
    >
      <signature-preview-container></signature-preview-container>
    </div>
  </section>
</template>
<script setup lang="ts">
import userFormContainer from "../user-form/components/user-form-container/user-form-container.vue";
import signaturePreviewContainer from "../signature-preview/components/signature-preview-container/signature-preview-container.vue";
</script>
