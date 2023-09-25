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
      return {
        editedName: '',
        editedBio: '',
      };
    },
    computed: {
      name: {
        get() {
          return this.$store.state.name;
        },
        set(value) {
          this.$store.commit('setName', value)
        }
      },
      bio: {
        get() {
          return this.$store.state.bio;
        },
        set(value) {
          this.$store.commit('setBio', value)
        }
      },
    },
    methods: {
      saveProfile() {
        const updatedData = {
          name: this.editedName,
          bio: this.editedBio,
        };
        axios.put('http://localhost:1234/auth/profile/update', updatedData)
        .then((response) => {
          this.$router.push({name: 'BlogProfile'});
          console.log(response)
        })
        .catch((error) => {
          console.error('data error', error)
        })
      }
    },
  };
  </script>
  
  <style scoped>
  .custom-card {
    margin-top: 90px;
  }
  </style>
  