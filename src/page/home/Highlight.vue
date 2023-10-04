<template>
  <v-app>
    <router-link class="card" max-auto v-if="content" :to="{name: 'MainDetail', params: {id: content.id} }">
      <v-img class="align-end" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" height="396px" >
        <div class="font">
          <v-card-title>{{ content.title }}</v-card-title>
          <v-card-subtitle>{{ content.created_by }}</v-card-subtitle>
        </div>
      </v-img>
    </router-link>
  </v-app>
</template>

<script>
import axios from 'axios';
import store from '@/store';

export default {
  data() {
    return {
      content: null,
    }
  },
  created() {
    this.fetchContentById(6);
  },
  methods: {
    fetchContentById(id) {
      axios.get(`http://localhost:1234/content/${id}`)
        .then((response) => {
          this.content = response.data;
          store.commit('setContent', this.content);
        })
        .catch((error) => {
          console.error('Error:', error)
        });
    }
  }
}
</script>

<style scoped>
.card {
  width: 744px;
  height: 396px;
  margin-left: 50px;
  border-radius: 10px;
  background: #D9D9D9;
  margin-top: 50px;
}
.font {
  color: white
}
.align-end {
  border-radius: 10px;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.10);
}
</style>
