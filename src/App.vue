<template>
  <section class="d-flex flex-column p-4 h-100 w-100 container-xxl">
    <h2 class="text-center mb-3">
      <span class="fw-bold"><span class="text-danger">1</span>R </span>Email
      Signature Generator
    </h2>
    <div class="d-flex align-items-center w-100 flex-grow-1">
      <signature-generator></signature-generator>
    </div>
  </section>
</template>

<script setup lang="ts">
import signatureGenerator from "./views/signature-generator.vue";
</script>

<style lang="scss">
@import "~@/styles.scss";

#app {
  height: 100%;
}
</style>
