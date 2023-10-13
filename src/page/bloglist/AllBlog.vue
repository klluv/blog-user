<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col
          v-for="(item, index) in items"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="custom-card-rekomendasi" @click="goToDetail(item.id)">
            <v-img :src="item.cover_image_url" class="custom-image-rekomendasi"></v-img>
            <v-card-title class="custom-card-title-list-rekomendasi">
              {{ item.title }}
            </v-card-title>
            <div class="custom-card-subtitle-list-rekomendasi">
              {{ item.created_by }}
            </div>
            <v-card-text class="custom-card-text-list-rekomendasi">
              {{ item.content }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            items: [],
        }
    },
    methods: {
        goToDetail(id) {
            this.$router.push(`/blog/view${id}`)
        },
        fetchData() {
            const urlApi = 'http://localhost:1234/contents'

            axios.get(urlApi)
            .then((response) => {
                this.items = response.data;
                console.log(response)
            })
            .catch((error) => {
                console.error('data error', error)
            })
        }
    },
    mounted() {
        this.fetchData();
    }
}
</script>

<style scoped>
.custom-card-rekomendasi {
    width: 360px;
    height: 396px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #FFF;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.10);
    margin-left: 50px;
    margin-top: 80px;
}
.custom-image-rekomendasi {
    width: 360px;
    height: 191px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #D9D9D9;
}
.custom-card-title-list-rekomendasi {
    height: 21px;
    flex-shrink: 0;
    color: #000;
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
.custom-card-subtitle-list-rekomendasi {
    margin-top: 15px;
    height: 15px;
    flex-shrink: 0;
    color: #02A28F;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 15px;
}
.custom-card-text-list-rekomendasi {
    white-space: nowrap;
    overflow: hidden; 
    text-overflow: ellipsis; 
    width: 100%; 
    max-width: 50ch; 
}
</style>
