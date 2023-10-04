<template>
  <div>
    <v-app-bar
      app
      color="#02A28F"
      style="width: 1440px; height: 70px; flex-shrink: 0"
    >
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        color="#FFF"
      ></v-app-bar-nav-icon>
      <router-link :to="{ name: 'MainHome' }">
        <v-toolbar-title class="font-style" style="margin-left: 30px">
          Author Blog
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn v-if="loggedIn" color="white" @click="showLogout" outlined
        >Logout</v-btn
      >
      <v-dialog v-model="logoutDialog" max-width="400">
        <v-card>
          <v-card-title
            class="headline text-center"
            style="background-color: #02a28f; color: #fff"
          >
            Konfirmasi Logout
          </v-card-title>
          <v-card-text class="text-center">
            Apakah anda yakin ingin logout?
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="confirmLogout">Ya</v-btn>
            <v-btn color="red" @click="cancelLogout">Tidak</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
    <v-navigation-drawer
      app
      v-model="drawer"
      color="#02A28F"
      @click="drawer = false"
    >
      <v-list>
        <v-list-item
          v-for="(item, index) in drawerItems"
          :key="index"
          @click="navigate(item.route)"
        >
          <v-list-item-icon>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              item.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      drawer: false,
      logoutDialog: false,
      loggedIn: false,
      drawerItems: [
        { text: "Home", icon: "mdi-home", route: "/blog" },
        { text: "Profile", icon: "mdi-account", route: "/blog/profile" },
        { text: "My Page", icon: "mdi-pencil", route: "/blog/mypage" },
      ],
    };
  },
  created() {
    this.loggedIn = !!this.$cookies.get("userToken");
  },
  methods: {
    navigate(route) {
      this.$router.push(route);
      this.drawer = false;
    },
    showLogout() {
      this.logoutDialog = true;
    },
    confirmLogout() {
      let token = this.$cookies.get("userToken");
      axios
        .post(
          "http://localhost:1234/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.$cookies.remove("userToken");
          Swal.fire({
            icon: "success",
            title: "Logout Success",
            text: "Logout Berhasil",
          });
          this.$router.push({ name: "Login" });
          this.logoutDialog = false;
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.data) {
            const { code, message } = error.response.data;
            if (code === 401) {
              Swal.fire({
                icon: "error",
                title: "Logout Failed",
                text: message,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Logout Failed",
                text: "Logout gagal, coba lagi",
              });
            }
          }
        });
    },
    cancelLogout() {
      this.logoutDialog = false;
    },
  },
};
</script>

<style scoped>
.font-style {
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: 36px;
  font-weight: 700;
  line-height: normal;
}
</style>
