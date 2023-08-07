<template>
  <section class="d-flex flex-column h-100 w-100">
    <header>
      <h2 class="text-center p-4">
        <span class="fw-bold"><span class="text-danger">1</span>R </span>Email
        Signature Generator
      </h2>
    </header>
    <main
      class="d-flex flex-column justify-content-center flex-grow-1 gx-0 container-xxl overflow-auto"
    >
      <signature-generator></signature-generator>
    </main>
    <footer>
      <div class="bg-secondary text-center w-100 p-2">
        <p>
          Copyright © 2023, 1Rivet |
          <a
            href="https://www.1rivet.com/1rivet-privacy-policy"
            class="text-decoration-none"
            >Privacy Policy</a
          >
        </p>
      </div>
    </footer>
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
