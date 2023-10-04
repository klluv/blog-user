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
              @change="onFileSelected"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Avatar"
            ></v-file-input>
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
      selectedFile: false,
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
    onFileSelected(event) {
      if (event instanceof File) {
        this.selectedFile = event;
        console.log(event);
      } else {
        console.error(
          "Event tidak mengandung objek file yang diharapkan:",
          event
        );
      }
    },
    savePhotoProfile() {
      const token = this.$cookies.get("userToken");
      const fd = new FormData();
      fd.append(
        "image",
        this.selectedFile,
        this.selectedFile,
        this.selectedFile.name
      );
      axios
        .put(`http://localhost:1234/auth/upload-picture`, fd, {
          onUploadProgress: (uploadEvent) => {
            console.log(
              "Upload Progress:" +
                Math.round((uploadEvent.loaded / uploadEvent.total) * 100) +
                "%"
            );
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
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
