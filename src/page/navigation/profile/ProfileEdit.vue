<template>
    <v-container>
      <v-card class="custom-card">
        <v-card-title>
          <h2>Edit Profile</h2>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="editedName" label="Name"></v-text-field>
          <v-textarea v-model="editedBio" label="Bio"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="#02A28F" text-color="white" @click="saveProfile">Save</v-btn>
        </v-card-actions>
    </v-card>
  </v-container>
</template>
  
<script>
import axios from 'axios';  

export default {
  data() {
    return{
      editedName: '',
      editedBio: '',
    }
  },
  created() {
    this.fetchProfileData();
  },
  methods: {
    fetchProfileData() {
      const token = this.$cookies.get('userToken');
      axios.get(`http://localhost:1234/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        this.editedName = response.data.name;
        this.editedBio = response.data.bio;
      })
      .catch(error => {
        console.log(error)
      })
    },
    saveProfile() {
      const editedData = {
        name: this.editedName,
        bio: this.editedBio,
      };
      const token = this.$cookies.get('userToken');
      axios.put(`http://localhost:1234/auth/profile/update`, editedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response); 
        this.$router.push({name: 'BlogProfile'})
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
  