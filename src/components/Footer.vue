<template>
  <div>
    <v-footer class="absolute-footer" color="#02A28F" :style="footerStyle">
      <v-spacer></v-spacer>
      <div class="text-center">
        &copy; 2023 - Kaka
      </div>
      <v-spacer></v-spacer>
    </v-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    footerStyle() {
      return {
        position: "absolute",
        bottom: 0,
        width: this.isMobile ? "100%" : "1441px",
        height: "48px",
        flexShrink: 0,
        marginTop: "30px"
      };
    },
    isMobile() {
      return window.innerWidth <= 600;
    },
  },
};
</script>

<style scoped>

@media (max-width: 600px) {
}
</style>
