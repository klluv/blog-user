<template>
  <v-container class="my-page-container">
    <v-card-title style="justify-content: center;">
      <h2>My Page</h2>
    </v-card-title>
    <v-card-actions>
      <v-btn color="#02A28F" style="color: white;"  @click="addArticle">Add Blog</v-btn>
    </v-card-actions>
    <v-card v-for="blog in userBlog" :key="blog.id" style="margin-top: 10px; border: #02A28F solid 2px">
      <v-card-title>
        <v-avatar color="#02A28F" size="100" tile @click="photoProfileDialog = true">
            <img style="width: 200px;" :src="blog.cover_image_url" />
          </v-avatar>
        <h3 style="margin-left: 15px;">{{ blog.title }}</h3>
      </v-card-title>
      <v-card-text>
        <p>{{ blog.created_at }}</p>
        <p>{{ truncateText(blog.content, 200) }}</p>
      </v-card-text>
      <v-card-action>
        <v-btn color="#02A28F" style="margin-left: 10px; margin-bottom: 10px;" text outlined @click="editButton(blog.id)">Edit</v-btn>
        <v-btn color="error" style="margin-left: 10px; margin-bottom: 10px;" text outlined @click="confirmDelete(blog.id)">Delete</v-btn>
      </v-card-action>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      userBlog: [],
    };
  },
  mounted() {
    this.fetchUserBlog();
  },
  methods: {
    fetchUserBlog() {
      const token = this.$cookies.get("userToken");
      axios
        .get(`http://localhost:1234/author/content/mycontent`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.userBlog = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    confirmDelete(blogId) {
      Swal.fire({
        icon: "warning",
        title: "Konfirmasi Hapus",
        text: "Apakah Anda yakin ingin menghapus konten ini?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteBlog(blogId);
        }
      });
    },
    deleteBlog(blogId) {
      const token = this.$cookies.get("userToken");
      axios
        .delete(`http://localhost:1234/author/content/delete/${blogId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
      if (response.data.status) {
        this.fetchUserBlog();
        Swal.fire({
          icon: "success",
          title: "Sukses",
          text: "Konten berhasil dihapus",
        });
      } else {
        const { code, message } = response.data;
        if (code === 401) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: message,
          });
        } else if (code === 403) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: message,
          });
        } else if (code === 404) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: message,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: message,
          });
        }
      }
    })
    .catch((error) => {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan internal server. Gagal menghapus konten",
      });
    });
},
    editButton(blogId) {
      this.$router.push({ name: "BlogEdit", params: { id: blogId } });
    },
    addArticle() {
      this.$router.push({ name: "BlogAdd" });
    },
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
      }
      return text;
    },
  },
};
</script>

<style scoped>
/* .my-page-container {
  min-height: 400vh
} */
</style>
