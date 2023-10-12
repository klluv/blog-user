<template>
    <v-app class="text-area">
        <h1 class="text-title" >{{ content.title }}</h1>
        <v-img :src="content.cover_image_url" class="detail-image"></v-img>  
        <p class="text-paragraph">
          {{ content.content }}
        </p>
    </v-app>
</template>

<script>
import axios from 'axios';

export default {
    data() {
    return {
      content: [],
    };
  },
  methods: {
    fetchContent(contentId) {
      axios.get(`http://localhost:1234/content/${contentId}`)
        .then(response => {
          this.content = response.data;
          console.log(response)
        })
        .catch(error => {
          console.error('Gagal mengambil data:', error);
        });
    }
  },
  created() {
    const contentId = this.$route.params.id; 
    this.fetchContent(contentId); 
  },
}
</script>

<style scoped>
.text-area {
    margin-top: 30px;
    margin-left: 50px;
    margin-right: 50px;
    text-align: justify;
}
.text-title {
    text-align: center;
}
.detail-image {
    max-width: 850px;
    max-height: 400px;
    margin-top: 10px;
}
.text-paragraph {
    margin-top: 20px;
}
</style>