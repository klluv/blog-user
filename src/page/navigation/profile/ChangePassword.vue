<template>
    <v-container>
      <v-card class="custom-card">
        <v-card-title>
          <h2>Ganti Password</h2>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="old_password" label="Current Password" type="password"></v-text-field>
          <v-text-field v-model="new_password" label="New Password" type="password"></v-text-field>
          <v-text-field v-model="confirmNewPassword" label="Confirm New Password" type="password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="#02A28F" text-color="white" @click="changePassword">Change Password</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        old_password: '',
        new_password: '',
        confirmNewPassword: '',
      };
    },
    methods: {
      changePassword() {
        if (this.new_password !== this.confirmNewPassword) {
          this.$vuetify.snackbar.error('Password baru tidak cocok dengan konfirmasi password.');
          return;
        }
        const dataSend = {
          old_password: this.old_password,
          new_password: this.new_password,
        };
        const token = this.$cookies.get('userToken');
        axios.put(`http://localhost:1234/auth/password/change`, dataSend, {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          })
          .then((response) => {
            console.log(response.data);
            // this.$vuetify.snackbar.success('Password berhasil diubah.');  
            this.$router.push({ name: 'BlogProfile' });
          })
          .catch((error) => {
            console.error(error);
            // this.$vuetify.snackbar.error('Terjadi kesalahan saat mengubah password.');
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
  