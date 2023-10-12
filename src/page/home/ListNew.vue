<template>
  <v-app class="all-card-list-new">
    <v-card class="custom-card" max-auto>
      <v-card-title class="custom-card-title"> Terbaru </v-card-title>
    </v-card>
    <v-col>
      <v-card
        v-for="content in contents"
        :key="content.id"
        class="custom-card-list"
        @click="goToDetail(content.id)"
      >
        <v-row no-gutters>
          <v-col cols="2">
            <v-img
              :src="content.cover_image_url"
              class="custom-card-list-image"
            ></v-img>
          </v-col>
          <v-col cols="10">
            <v-card-title>
              <div class="custom-card-list-text">
                <v-card-title class="title-list-terbaru">
                  {{ content.title }}
                </v-card-title>
                <v-card-subtitle class="subtitle-list-terbaru">
                  {{ content.created_at }}
                </v-card-subtitle>
              </div>
            </v-card-title>
          </v-col>
        </v-row>
      </v-card>
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
  methods: {
    goToDetail(contentId) {
      this.$router.push({ name: "MainDetail", params: { id: contentId } });
    },
    fetchContent() {
      axios
        .get("http://localhost:1234/contents")
        .then((response) => {
          this.contents = response.data
            .sort((a, b) => {
              return new Date(b.created_at) - new Date(a.created_at);
            })
            .slice(0, 3);
        })
        .catch((error) => {
          console.error("Gagal mengambil data:", error);
        });
    },
  },
  created() {
    this.fetchContent();
  },
};
</script>

<style scoped>
.all-card-list-new {
  margin-top: 50px;
  max-width: 800px;
}
.custom-card {
  border-radius: 10px;
  background-color: #02a28f;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  width: 22.5rem;
  height: 3rem;
  flex-shrink: 0;
  margin-left: 12px;
}
.custom-card-title {
  color: #fff;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.custom-card-list {
  width: 360px;
  height: 96px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  margin-top: 17px;
}

.custom-card-list-image {
  width: 132px;
  height: 70px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #d9d9d9;
  margin-left: 14px;
  margin-top: 14px;
}
.custom-card-list-text {
  margin-left: 30px;
}
.title-list-terbaru {
  width: 500px;
  height: 15px;
  flex-shrink: 0;
  color: #000;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.subtitle-list-terbaru {
  color: #616161;
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 10px;
}
</style>
