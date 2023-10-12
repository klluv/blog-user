<template>
  <div>
    <v-col>
      <v-card class="custom-card">
        <v-card-title class="custom-card-title">
          Kategori
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item
              v-for="category in categories"
              :key="category.id"
              @click="goToDetailCategory(category.id)"
            >
              {{ category.category }}
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: []
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    goToDetailCategory(category_id) {
      this.$router.push(`/blog/category/view${category_id}`);
      console.log(category_id);
    },
    fetchCategories() {
      axios.get('http://localhost:1234/categories')
        .then(response => {
          console.log(response)
          this.categories = response.data;
        })
        .catch(error => {
          console.error('Gagal memuat kategori:', error);
        });
    },
  }
}
</script>

<style scoped>
.custom-card {
  width: 360px;
  border-radius: 10px;
  background: #02A28F;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.10);
}
.custom-card-title {
  color: #FFF;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
</style>