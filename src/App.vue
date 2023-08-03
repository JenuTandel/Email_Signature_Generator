<template>
  <section class="d-flex flex-column p-4 h-100 w-100 container-xxl">
    <h2 class="text-center mb-3">
      <span class="fw-bold"><span class="text-danger">1</span>R </span>Email
      Signature Generator
    </h2>
    <div class="h-100 d-flex align-items-center">
      <signature-generator></signature-generator>
    </div>
  </section>
  <footer>
    <div class="copyright bg-secondary text-center">
      @Designed By:
      <span class="text-primary fw-semibold fs-5"> Jinal Tandel</span>
    </div>
  </footer>
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
