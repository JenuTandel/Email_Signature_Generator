<template>
  <section class="row align-items-center gx-0 h-100">
    <div class="col-12 col-md-6 p-3">
      <user-form-container></user-form-container>
    </div>
    <div
      class="col-12 col-md-6 h-md-100 p-3 d-flex flex-column justify-content-center"
    >
      <signature-preview-container></signature-preview-container>
    </div>
  </section>
</template>
<script setup lang="ts">
import userFormContainer from "../user-form/components/user-form-container/user-form-container.vue";
import signaturePreviewContainer from "../signature-preview/components/signature-preview-container/signature-preview-container.vue";
</script>
