<template>
  <v-container>
    <v-card class="custom-card">
      <v-card-title>
          <v-avatar color="primary" size="150" @click="photoProfileDialog = true">
            <img :src="picture_url" />
          </v-avatar>
        <v-dialog v-model="photoProfileDialog" max-width="500">
          <v-card>
            <v-card-title> Ganti Photo Profile </v-card-title>
            <v-card-text> Upload foto anda dibawah ini </v-card-text>
            <v-file-input
              :rules="rules"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Avatar"
            ></v-file-input>
            <v-card-action>
              <v-btn color="#02A28F" @click="savePhotoProfile">Simpan</v-btn>
              <v-btn color="danger" @click="photoProfileDialog = false">Cancel</v-btn>
            </v-card-action>
          </v-card>
        </v-dialog>
        <h2 style="margin-left: 25px">Hi! my name is {{ name }}</h2>
      </v-card-title>
      <v-card-text>
        <p><strong>Bio:</strong> {{ bio }}</p>
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
      name: "",
      bio: "",
      picture_url: "",
      photoProfileDialog: false,
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
          this.name = response.data.name;
          this.bio = response.data.bio;
          this.picture_url = response.data.picture_url;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // savePhotoProfile() {
    //   const token = this.$cookies.get('userToken');
    //   const formData = new FormData();
    //   formData.append("image", this.selectedFile);
    //   axios.
    //     put(`http://localhost:1234/auth/upload-picture`, formData, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "multipart/form-data"
    //       },
    //     })
    //     .then((response) => {
    //       console.log(response.data);
    //     })
    //     .catch((error) => {
    //       console.error(error)
    //     })
    // },
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
