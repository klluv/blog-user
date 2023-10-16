<template>
  <v-app>
    <v-main>
      <div class="grid-container">
        <Highlight />
        <ListNew />
        <ListBlog />
        <Kategori />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue';
// import axios from 'axios';
import Highlight from './Highlight.vue';
import ListNew from './ListNew.vue';
import ListBlog from './ListBlog.vue';
import Kategori from './Kategori.vue';

export default {
  // data() {
  //   return {
  //     id: "",
  //     role_id: "",
  //   }
  // },
  components: {
    Highlight,
    ListNew,
    ListBlog,
    Kategori
  },
  methods: {
  //   fetchUserProfile() {
  //     const token = this.$cookies.get(`userToken`);
  //     axios.get(`http://localhost:1234/auth/profile`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       this.id = response.data.id; 
  //       console.log("id:", this.id);
  //       this.fetchRoleUser(this.id);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //   },
  //   fetchRoleUser(id) {
  //     const token = this.$cookies.get('userToken');
  //     axios.get(`http://localhost:1234/auth/user/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       this.role_id = response.data.role_id; 
  //       console.log("role_id:", this.role_id);
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  //   },
  // },
  beforeRouteEnter(to, from, next) {
    const token = Vue.$cookies.get("userToken");
    if (!token) {
      next({ name: 'Login' });
    } else {
      next();
    }
  },
  // created() {
  //   this.fetchUserProfile(); 
  // }
 }
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
</style>
