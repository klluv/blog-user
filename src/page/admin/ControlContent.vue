<template>
    <v-container>
        <v-card-title>
            <h2>Control Content</h2>
        </v-card-title>
        <v-card v-for="blog in blogs" :key="blog.id" style="margin-top: 10px">
      <v-card-title>
        <v-avatar color="#02A28F" size="100" tile @click="photoProfileDialog = true">
            <img :src="blog.cover_image_url" />
          </v-avatar>
        <h3 style="margin-left: 15px;">{{ blog.id }}. {{ blog.title }}</h3>
      </v-card-title>
      <v-card-text>
        <p>Creator: {{ blog.created_by}} </p>
        <p>Dibuat: {{ blog.created_at }}</p>
        <p>{{ truncateText(blog.content, 200) }}</p>
      </v-card-text>
      <v-card-action>
        <v-btn color="error" text @click="confirmDelete(blog.id)">Delete</v-btn>
      </v-card-action>
    </v-card>
    </v-container>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            blogs: [],
        }
    },
    mounted() {
        this.fetchBlogs();
    },
    methods: {
        fetchBlogs() {
            axios.get('http://localhost:1234/contents')
            .then((response) => {
                this.blogs = response.data;
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        },
        confirmDelete(id) {
    Swal.fire({
      title: 'Konfirmasi',
      text: 'Anda yakin ingin menghapus konten ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak'
    }).then((result) => {
      if (result.value) {
        this.adminDelete(id);
      }
    });
  },
        adminDelete(id) {
            const token = this.$cookies.get('userToken');
            axios.delete(`http://localhost:1234/admin/content/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then((response) => {
                console.log(response);
                this.fetchBlogs();
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Konten berhasil dihapus'
                })
            })
            .catch((error) => {
                console.error('terjadi error:', error)
            })
        },
        truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
      }
      return text;
    },
    }
}
</script>