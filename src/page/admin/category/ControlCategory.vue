<template>
  <v-container>
    <v-card-title>
      <h2>Control Category</h2>
    </v-card-title>
    <v-btn :to="{ name: 'AddCategory' }" style="color: white" color="#02A28F"
      >Add Categories</v-btn
    >
    <v-card v-for="data in categories" :key="data.id" class="category-card">
      <v-card-title>
        <h4 style="color: black">{{ data.id }}. {{ data.category }}</h4>
      </v-card-title>
      <v-card-action>
        <v-btn 
          style="
            margin-left: 5px;
            margin-bottom: 5px;
            color: white;
            background-color: #02a28f;
          "
          @click="editCategory(data.id)"
          >Edit</v-btn
        >
        <v-btn
          style="margin-left: 5px; margin-bottom: 5px"
          color="error"
          @click="confirmDelete(data.id)"
          >Delete</v-btn
        >
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
      categories: [],
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      axios
        .get("http://localhost:1234/categories")
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    confirmDelete(id) {
      Swal.fire({
        title: "Konfirmasi",
        text: "Anda yakin ingin menghapus kategori ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      }).then((result) => {
        if (result.value) {
          this.deleteCategory(id);
        }
      });
    },
    deleteCategory(id) {
        const token = this.$cookies.get('userToken');
        axios.delete(`http://localhost:1234/admin/category/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log(response)
            this.fetchCategories();
            Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Kategori berhasil dihapus'
                })
        })
        .catch((error) => {
            console.error('terjadi error,', error)
        })
    },
    editCategory(id) {
      this.$router.push({name: 'EditCategory', params: {id}})
    }
  },
};
</script>

<style scoped>
.category-card {
  margin-top: 10px;
  background-color: white;
  color: white;
  border-radius: 10px;
  border: #02a28f solid 1px;
}
.category-card h4 {
  margin: 0;
}
.category-card .v-card-title {
  padding: 15px;
}
.category-card .v-card-action {
  justify-content: space-between;
  padding: 15px;
}
</style>
