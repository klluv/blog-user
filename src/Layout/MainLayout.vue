<template>
  <v-main>
    <Header></Header>
    <router-view></router-view>
    <Footer class="footer"></Footer>
  </v-main>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
.footer {
  margin-top: 50px ;
}
</style>
