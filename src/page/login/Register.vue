<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card>
              <v-card-title class="text-center">
                <h2>Register</h2>
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="register">
                  <v-text-field
                    v-model="email"
                    label="Email"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="username"
                    label="Username"  
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    :rules="[v => !!v && v.length >= 8 || 'Password harus memiliki setidaknya 8 karakter']"
                    required
                  ></v-text-field>
                  <v-btn type="submit" color="#02A28F">Register</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";

export default {
  data() {
    return {
      email: '',
      username: '',
      password: ''
    }
  },
  methods: {
    register() {
      if (this.email && this.username && this.password) {
        axios.post('http://localhost:1234/register-author', {
          email: this.email,
          username: this.username,
          password: this.password
        })
        .then(response => {
          if(response.data.status) {
            this.$router.push({name: 'Login'}); 
            Swal.fire({
              icon: "success",
              title: "Success",
              text: response.data.message,})
        } else {
            const { code, message } = response.data;
            if(code === 422 && message === "Password harus memiliki setidaknya 8 karakter") {
              Swal.fire({
                icon: "error",
                title: "Registration Gagal",
                text: "Password harus memiliki setidaknya 8 karakter",
              });
            } else if (code === 400 && message === "Username atau email telah digunakan!") {
              Swal.fire({
                icon: "error",
                title: "Registration Gagal",
                text: "Username atau email telah digunakan!",
              });
            } else if (code === 422 && message === "Format email tidak valid") {
              Swal.fire({
                icon: "error",
                title: "Registration Gagal",
                text: "Format email tidak valid",
              });
            } else if (code === 500 && message === "Terjadi kesalahan internal pada server. Mohon coba beberapa saat lagi") {
              Swal.fire({
                icon: "error",
                title: "Registration Gagal",
                text: "Terjadi kesalahan internal pada server. Mohon coba beberapa saat lagi",
              });
            } else {
              console.error(message);
            }
          }
        })
        .catch(error => {
          console.error("Kesalahan saat registrasi:", error);
          Swal.fire({
            icon: "error",
            title: "Registration Gagal",
            text: "Terjadi kesalahan saat registrasi. Mohon coba beberapa saat lagi",
          });
        });
      }
    }
  }
}
</script>