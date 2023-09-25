<template>
  <v-main>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
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