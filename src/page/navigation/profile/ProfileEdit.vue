<template>
  <v-container>
    <v-card class="custom-card">
      <v-card-title>
        <h2>Edit Profile</h2>
      </v-card-title>
      <v-btn
        color="#02A28F"
        style="margin-left: 15px"
        @click="photoProfileDialog = true"
        >Upload Photo Profile</v-btn
      >
      <v-card-text>
        <v-dialog v-model="photoProfileDialog" max-width="500">
          <v-card>
            <v-card-title> Ganti Photo Profile </v-card-title>
            <v-card-text> Upload foto anda dibawah ini </v-card-text>
            <v-file-input
              v-model="selectedImage"
              ref="image"
              @change="uploadPhoto"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Avatar"
            />
            <v-card-action>
              <v-btn color="#02A28F" @click="savePhotoProfile">Simpan</v-btn>
              <v-btn color="danger" @click="photoProfileDialog = false"
                >Cancel</v-btn
              >
            </v-card-action>
          </v-card>
        </v-dialog>
        <v-text-field v-model="editedName" label="Name"></v-text-field>
        <v-textarea v-model="editedBio" label="Bio"></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#02A28F" text-color="white" @click="saveProfile"
          >Save</v-btn
        >
        <router-link :to="{ name: 'BlogProfile' }">
          <v-btn class="button-cancel" color="error" text-color="white"
            >Cancel</v-btn
          >
        </router-link>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      editedName: "",
      editedBio: "",
      photoProfileDialog: false,
      selectedImage: null,
    };
  },
  created() {
    this.fetchProfileData();
  },
  methods: {
    fetchProfileData() {
      const token = this.$cookies.get("userToken");
      axios
        .get(`http://localhost:1234/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.editedName = response.data.name;
          this.editedBio = response.data.bio;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onFileSelected() {
      this.selectedFile = this.$refs.image.files[0];
    },

    savePhotoProfile() {
      if (!this.selectedImage) {
        return alert("Pilih foto terlebih dahulu!");
      }
      const token = this.$cookies.get("userToken");
      const form_data = new FormData();
      form_data.append("image", this.selectedImage);

      axios
        .put(`http://localhost:1234/auth/upload-picture`, form_data, {
          onUploadProgress: (uploadEvent) => {
            console.log(
              "Upload Progress:" +
                Math.round((uploadEvent.loaded / uploadEvent.total) * 100) +
                "%"
            );
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "foto profil berhasil diupload",
          });
          this.photoProfileDialog = false;
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "terjadi kesalahan",
          });
        });
    },
    saveProfile() {
      const editedData = {
        name: this.editedName,
        bio: this.editedBio,
      };
      const token = this.$cookies.get("userToken");
      axios
        .put(`http://localhost:1234/auth/profile/update`, editedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Profil berhasil diganti",
          });
          this.$router.push({ name: "BlogProfile" });
        })
        .catch(this.handleSaveProfileError);
    },
    handleSaveProfileError(error) {
      console.error(error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: data.message,
          });
        } else if (status === 401) {
          Swal.fire({
            icon: "error",
            title: "Token Invalid",
            text: data.message,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: data.message,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.message,
        });
      }
    },
  },
};
</script>

<style scoped>
.custom-card {
  margin-top: 90px;
}
.button-cancel {
  margin-left: 10px;
}
</style>
