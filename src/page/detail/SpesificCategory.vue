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
            <v-img :src="item.image" class="custom-image-rekomendasi"></v-img>
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
import axios from "axios";

export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    fetchData() {
      const categoryId = this.$route.params.id;

      axios.get(`http://localhost:1234/category-content/${categoryId}`)
        .then((response) => {
          this.items = response.data;
          console.log(response.data)
        })
        .catch((error) => {
          console.error("Gagal mengambil data:", error);
        });
    },
    goToDetail(id) {
      this.$router.push({ name: "DetailPage", params: { id } });
    },
  },
  created() {
    this.fetchData();
  },
};
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
  width: 336px;
  color: teal;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 10px
}
</style>

