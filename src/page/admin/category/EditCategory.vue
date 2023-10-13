<template>
  <v-container>
    <v-card style="margin-top: 20px; border: 1px #02A28F solid;">
      <v-card-title>
        <h2>Edit Kategori</h2>
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="data.category" label="Nama Kategori" outlined clearable :rules="categoryRules"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="#02A28F" dark @click="saveEditCategory">Simpan</v-btn>
        <v-btn color="error" dark @click="cancelEdit">Batal</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      data: {
        category: ''
      },
      categoryRules: [
        v => !!v || 'Nama kategori harus diisi',
        v => (v && v.length <= 50) || 'Nama kategori tidak boleh lebih dari 50 karakter',
      ],
      loading: false,
      id: null, 
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.fetchCategory();
  },
  methods: {
    fetchCategory() {
      axios.get(`http://localhost:1234/category/${this.id}`)
        .then((response) => {
          this.data.category = response.data.category;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    saveEditCategory() {
      const token = this.$cookies.get('userToken');
      const editedCategory = {
        category: this.data.category
      };

      axios.put(`http://localhost:1234/admin/category/update/${this.id}`, editedCategory, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response);
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Kategori berhasil diubah",
          });
          this.$router.push({ name: "ControlCategory" });
        })
        .catch((error) => {
          this.loading = false;
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Terjadi Kesalahan",
            text: "Gagal mengubah kategori",
          });
        });
    },
    cancelEdit() {
      this.$router.push({ name: "ControlCategory" });
    }
  }
}
</script>
