<template>
  <v-container>
    <v-card class="custom-card">
      <v-card-title>
        <h2>Edit Blog</h2>
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="editedTitle" label="Title"></v-text-field>
        <v-textarea v-model="editedContent" label="Content"></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn color="#02A28F" text-color="white" @click="saveBlog">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      editedTitle: '',
      editedContent: '',
    };
  },
  methods: {
    saveBlog() {
      const token = this.$cookies.get('userToken');
      const data = {
        title: this.editedTitle,
        content: this.editedContent,
      };
      axios.put(`http://localhost:1234/blog/edit/${blogId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        this.$router.push({ name: 'MyPage' });
      })
      .catch((error) => {
        console.error(error);
      });
    },
  },
};
</script>

<style scoped>
.custom-card {
  margin-top: 90px;
}
</style>
