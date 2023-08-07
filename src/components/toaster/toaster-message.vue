<template>
  <div class="toaster shadow">
    <span>{{ message }}</span>
  </div>
</template>

<script lang="ts">
export default {
  name: "ToasterMessage",
  props: ["message"],
};
</script>
