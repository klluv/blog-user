<template>
  <v-app>
    <router-link max-auto v-if="content" :to="{name: 'MainDetail', params: {id: content.id} }">
      <v-card class="card">
      <v-img class="align-end" :src="content.cover_image_url" height="396px" >
        <div class="font">
          <strong><v-card-title>{{ content.title }}</v-card-title></strong>
          <v-card-subtitle>{{ content.created_by }}</v-card-subtitle>
        </div>
      </v-img>
    </v-card>
    </router-link>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      content: null,
    }
  },
  created() {
    this.fetchContentById(47);
  },
  methods: {
    fetchContentById(id) {
      axios.get(`http://localhost:1234/content/${id}`)
        .then((response) => {
          this.content = response.data;
          console.log(response)
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
  border: 1px solid #000
}
.font {
  color: black
  
}
.align-end {
  border-radius: 10px;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.10);
}
</style>
