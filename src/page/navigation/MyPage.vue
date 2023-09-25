<template>
  <v-container>    
      <v-card-title>
        <h2>My Page</h2>
      </v-card-title>
      <v-card-actions>
        <v-btn color="#02A28F" text-color="white" @click="addArticle">Add</v-btn>
      </v-card-actions>
    <v-card v-for="(blog, index) in blog" :key="index" style="margin-top: 10px">
      <v-card-title>
        <h3>{{ blog.title }}</h3>
      </v-card-title>
      <v-card-text>
        <p>{{ blog.category }}</p>
      </v-card-text>
      <v-card-action>
          <v-btn color="primary" text @click="editButton(index)">Edit</v-btn>
          <v-btn color="error" text @click="deleteButton(index)">Delete</v-btn>
      </v-card-action>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      blog: {
        id: '',
        title: '',
        category: ''
      }
    };
  },
  methods: {
      load() {
        axios.get('http://localhost:1234/author/content/mycontent')
          .then(res => {
            this.blog = res.data;
          })
          .catch(error => {
            console.log(error)
          });
      },
      delete(blog) {
        axios.delete(''+blog.id)
          .then.load();
          let index = this.blog.indexOf(blog.id);
          this.blog.splice(index, 1);
      },
      addArticle() {
          this.$router.push({name: 'BlogAdd'});
          console.log('add clicked')
      },
      editButton(index) {
          this.$router.push({name: 'BlogEdit'})
          console.log('Edit Article clicked for index:', index);
      },
      deleteArticle(index) {
          console.log('Delete Article clicked for index:', index);
      },
  },
};
</script>