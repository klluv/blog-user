<template>
  <div>
    <v-col>
      <v-card class="custom-card">
        <v-card-title class="custom-card-title">
          Kategori
        </v-card-title>
      </v-card>
      <v-treeview
        v-model="selectedCategories"
        :items="categories"
        item-key="id"
        item-text="category"
        selectable
        activatable
        @update:active="updateActive"
      ></v-treeview>
    </v-col>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedCategories: [],
      categories: [],
      error: null
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      axios.get('http://localhost:1234/categories')
        .then(response => {
          this.categories = response.data;
        })
        .catch(error => {
          console.error('Gagal memuat kategori:', error);
        });
    },
    updateActive(activeItems) {
      this.selectedCategories = activeItems;
    }
  }
}
</script>

<style scoped>
.custom-card {
  width: 360px;
  height: 48px;
  flex-shrink: 0;
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
