<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card style="border: #02A28F solid 2px">
              <v-card-title class="text-center">
                <h2>Login</h2>
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field
                    v-model="username"
                    label="Username"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    :rules="[v => !!v && v.length >= 8 || 'Password harus memiliki minimal 8 karakter']"
                    required
                  ></v-text-field>
                  <v-btn type="submit" color="#02A28F">Login</v-btn>
                  <div class="text-center mt-2">
                    Belum punya akun?
                    <v-btn text color="#02A28F" @click="register"
                      >Register</v-btn>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      const loginData = {
        username: this.username,
        password: this.password,
      };
      axios
        .post("http://localhost:1234/login", loginData)
        .then((response) => {
          if (response.status === 200) {
            const token = response.data.token;
            this.$cookies.set("userToken", token, "12h");
            const self = this;
            Swal.fire({
              icon: "success",
              title: "Success",
              text: response.data.message,
            }).then(function () {
              self.$router.push({ name: "MainHome" });
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "FAILED",
              text: "Login gagal, " + response.status,
            });
          }
        })
        .catch((error) => {
          console.error("Kesalahan saat login:", error);
          let errorMessage = "Login gagal. Terjadi kesalahan.";
          if (error.response) {
            const statusCode = error.response.status;
            if (statusCode === 401) {
              errorMessage = "Akun tidak ada atau password salah";
            } else if (statusCode === 404) {
              errorMessage = "Data login invalid";
            } else if (statusCode === 500) {
              errorMessage =
                "Terjadi kesalahan pada internal server. Coba beberapa saat lagi!";
            }
          }
          Swal.fire({
            icon: "error",
            title: "Login Gagal",
            text: errorMessage,
          });
        });
    },
    register() {
      this.$router.push({ name: "Register" });
    },
  },
};
</script>
