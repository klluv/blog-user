<template>
  <v-container>
    <v-action>
          <v-btn color="#02A28F" @click="photoCoverDialog = true">Upload Cover Content</v-btn>
        </v-action>
        <v-dialog v-model="photoCoverDialog" max-width="500">
          <v-card>
            <v-card-title> Ganti Photo Profile </v-card-title>
            <v-card-text> Upload foto anda dibawah ini </v-card-text>
            <v-file-input
              v-model="selectedCover_Image"
              ref="cover_image"
              @change="onFileSelected"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick a Cover Content"
              prepend-icon="mdi-camera"
              label="Cover Content"
            />
            <v-card-action>
              <v-btn color="#02A28F" @click="savePhotoProfile">Simpan</v-btn>
              <v-btn color="danger" @click="photoCoverDialog = false">Cancel</v-btn>
            </v-card-action>
          </v-card>
        </v-dialog>
    <v-card class="custom-card">
      <v-card-title>
        <h2>Edit Blog</h2>
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="blogData.title" label="Title"></v-text-field>
        <v-textarea v-model="blogData.content" label="Content"></v-textarea>
        <v-select 
                    :items="categories"  
                    item-text="category"
                    item-value="id"
                    :menu-props="{ maxHeight: '200' }" 
                    label="category" 
                    v-model="selectedCategoryId" 
                    placeholder="Category" 
                    outlined 
                    required />
      </v-card-text>
      <v-card-actions>
        <v-btn color="#02A28F" text-color="white" @click="saveEdit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";


export default {
 data() {
  return {
    blogId: null,
    blogData: {
      title: '',
      content: '',
    },
    categories: [],
    selectedCategoryId: null,
    photoCoverDialog: false,
    selectedCover_Image: null,
  }
 },
 created() {
  this.blogId = this.$route.params.id;
  this.fetchBlogData();
  this.fetchDataCategories();
 },
 methods: {
  savePhotoProfile() {
  if (!this.selectedCover_Image) {
    return alert("Pilih gambar terlebih dahulu!");
  }

  const token = this.$cookies.get("userToken");
  const fd = new FormData();
  const idBlog = this.blogId
  fd.append("cover_image", this.selectedCover_Image);

  axios
    .put(
      `http://localhost:1234/api/upload-image/${idBlog}/cover-image`,
      fd,
      {
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
      }
    )
    .then((response) => {
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Foto profil berhasil diunggah",
      });
      this.photoCoverDialog = false;
    })
    .catch((error) => {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi error saat mengunggah foto profil",
      });
    });
},
  fetchBlogData() {
    const token = this.$cookies.get('userToken');
    axios.get(`http://localhost:1234/content/${this.blogId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      this.blogData.title = response.data.title;
      this.blogData.content = response.data.content;
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  },
  fetchDataCategories() {
    const token = this.$cookies.get('userToken');
    axios.get(`http://localhost:1234/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      this.categories = response.data;
    })
    .catch((error) => {
      console.log(error)
    })
  },
  saveEdit(){
    const token = this.$cookies.get('userToken');
    const postData = {
      title: this.blogData.title,
      content: this.blogData.content,
      category_id: this.selectedCategoryId,
    };
    axios.put(`http://localhost:1234/author/content/update/${this.blogId}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
      this.$router.push({name: 'MyPage'});
    })
    .catch((error) => {
      console.log(error.message);
    })
  }
 }
};
</script>

<style scoped>
.custom-card {
  margin-top: 90px;
}
</style>
