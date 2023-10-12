<template>
  <v-container>
    <v-card class="custom-card">
      <v-card-title>
        <v-avatar color="primary" size="150" @click="photoProfileDialog = true">
            <img :src="pictureUrl" />
          </v-avatar>
        <h2 style="margin-left: 25px">Hi! my name is {{ nama }}</h2>
      </v-card-title>
      <v-card-text>
        <p><strong>Bio:</strong> {{ myBio }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="#02A28F" text-color="white" @click="editProfile"  
          >Edit Profile</v-btn
        >
        <v-btn color="#02A28F" text-color="white" @click="editPassword"
          >Edit Password</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nama: "",
      myBio: "",
      pictureUrl: "",
    };
  },
  mounted() {
    this.fetchDataUser();
  },
  methods: {
    fetchDataUser() {
      const token = this.$cookies.get("userToken");
      axios
        .get(`http://localhost:1234/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response)
          this.nama = response.data.name;
          this.myBio = response.data.bio;
          this.pictureUrl = response.data.picture_url;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editProfile() {
      this.$router.push({
        name: "ProfileEdit",
        params: { id: this.profileId },
      });
    },
    editPassword() {
      this.$router.push({ name: "ChangePassword" });
    },
  },
};
</script>

<style scoped>
.custom-card {
  margin-top: 90px;
}
</style>
