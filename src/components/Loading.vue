<template>
  <div class="loading" :class="showHide">
    <div class="container">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    showHide() {
      return this.$store.state.reservations.showHide;
    },
  },
};
</script>

<style></style>
