<template>
  <section class="p-4 container-xxl">
    <h1 class="main-heading text-center">Email Signature Generator</h1>
    <signature-generator></signature-generator>
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
</style>
