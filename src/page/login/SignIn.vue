<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card>
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
                    required
                  ></v-text-field>
                  <v-btn type="submit" color="#02A28F">Login</v-btn>
                  <div class="text-center mt-2">
                    Belum punya akun?
                    <v-btn text color="#02A28F" @click="register">Register</v-btn>
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
      axios.post("http://localhost:1234/login", loginData)
        .then((response) => {
          if (response.status === 200) {
            const token = response.data.token;  
            this.$cookies.set("userToken", token, "1d");
            // this.$store.dispatch("setToken", token);
            const self = this;
            Swal.fire({
              icon: "success",
              title: "Success",
              text: response.data.message,
            }).then(function () {
              self.$router.push({ name: "MainHome"});
            });
          } else {
            alert("Login gagal. Status: " + response.status);
          } 
        })
        .catch((error) => {
          console.error("Kesalahan saat login:", error);
          alert("Login gagal. Terjadi kesalahan.");
        });
    },
    register() {
      this.$router.push({ name: "Register" });
    },
  },
};
</script>
