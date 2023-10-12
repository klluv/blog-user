<template>
  <v-app>
    <v-col>
      <v-card class="custom-card" @click="goToBlogList">
        <v-card-title class="custom-card-title" @click="goToBlogList">
          Blog List
        </v-card-title>
      </v-card>
      <div class="rekomendasi-container">
        <v-card
          v-for="content in contents.slice(0, 2)"
          :key="content.id"
          class="custom-card-rekomendasi"
          @click="goToDetail(content.id)"
        >
          <v-img
            :src="content.cover_image_url"
            class="custom-image-rekomendasi"
          ></v-img>
          <v-card-title class="custom-card-title-list-rekomendasi">
            {{ content.title }}
          </v-card-title>
          <div class="custom-card-subtitle-list-rekomendasi">
            {{ content.created_by }}
          </div>
          <v-card-text class="custom-card-text-list-rekomendasi">
            {{ content.content }}
          </v-card-text>
        </v-card>
      </div>
    </v-col>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      contents: [],
    };
  },
  mounted() {
    this.fetchContents();
  },
  methods: {
    fetchContents() {
      axios
        .get("http://localhost:1234/contents")
        .then((response) => {
          this.contents = response.data;
          this.sortContentsByDate();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    sortContentsByDate() {
      this.contents.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA - dateB;
      });
    },
    goToBlogList() {
      this.$router.push({ name: "BlogList" });
    },
    goToDetail(id) {
      this.$router.push({ name: "MainDetail", params: { id } });
    },
  },
};
</script>

<style scoped>
.custom-card {
  width: 766px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #02a28f;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  margin-left: 45px;
}
.custom-card-title {
  width: 203px;
  color: #fff;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.rekomendasi-container {
  display: flex;
  flex-wrap: wrap;
}
.custom-card-rekomendasi {
  width: 360px;
  height: 396px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
  margin-left: 45px;
  margin-bottom: 20px;
  margin-top: 20px;
}
.custom-card-rekomendasi-2 {
  width: 360px;
  height: 396px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
  margin-left: 25px;
  margin-top: 20px;
}
.custom-image-rekomendasi {
  width: 360px;
  height: 191px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #d9d9d9;
}
.custom-card-title-list-rekomendasi {
  height: 21px;
  flex-shrink: 0;
  color: #000;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.custom-card-subtitle-list-rekomendasi {
  margin-top: 15px;
  height: 15px;
  flex-shrink: 0;
  color: #02a28f;
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
  margin-top: 10px;
}
</style>
