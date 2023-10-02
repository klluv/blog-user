<template>
  <v-container>
    <v-card class="custom-card">
      <v-card-title>
        <h2>Edit Blog</h2>
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="blogData.title" label="Title"></v-text-field>
        <v-textarea v-model="blogData.content" label="Content"></v-textarea>
        <v-select 
                    :items="categories"  
                    item-text="category"
                    item-value="id"
                    :menu-props="{ maxHeight: '200' }" 
                    label="category" 
                    v-model="selectedCategoryId" 
                    placeholder="Category" 
                    outlined 
                    required />
      </v-card-text>
      <v-card-actions>
        <v-btn color="#02A28F" text-color="white" @click="saveEdit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
 data() {
  return {
    blogId: null,
    blogData: {
      title: '',
      content: '',
    },
    categories: [],
    selectedCategoryId: null,
  }
 },
 created() {
  this.blogId = this.$route.params.id;
  this.fetchBlogData();
  this.fetchDataCategories();
 },
 methods: {
  fetchBlogData() {
    const token = this.$cookies.get('userToken');
    axios.get(`http://localhost:1234/content/${this.blogId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      this.blogData.title = response.data.title;
      this.blogData.content = response.data.content;
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  },
  fetchDataCategories() {
    const token = this.$cookies.get('userToken');
    axios.get(`http://localhost:1234/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      this.categories = response.data;
    })
    .catch((error) => {
      console.log(error)
    })
  },
  saveEdit(){
    const token = this.$cookies.get('userToken');
    const postData = {
      title: this.blogData.title,
      content: this.blogData.content,
      category_id: this.selectedCategoryId,
    };
    axios.put(`http://localhost:1234/author/content/update/${this.blogId}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
      this.$router.push({name: 'MyPage'});
    })
    .catch((error) => {
      console.log(error.message);
    })
  }
 }
};
</script>

<style scoped>
.custom-card {
  margin-top: 90px;
}
</style>
