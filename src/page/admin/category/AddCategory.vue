<template>
  <v-app class="container mt-4">
    <v-form @submit.prevent="addCategory">
      <div class="form">
        <v-title>
            <h2>Tambah Kategori</h2>
        </v-title>
        <v-text-field
          type="text"
          style="margin-top: 20px"
          label="category"
          v-model="data.category"
          placeholder="category"
          outlined
          required
        />
        <v-btn type="submit" color="#02A28F" style="margin-bottom: 20px">Add</v-btn>
      </div>
    </v-form>
  </v-app>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            data: {
                category: []
            }
        }
    },
    methods: {
        addCategory() {
            const token = this.$cookies.get('userToken');
            const data = {
                category: this.data.category,
            };
            axios.post(`http://localhost:1234/admin/category/create`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response);
                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "Kategori berhasil ditambahkan",
                });
                this.$router.push({name: 'ControlCategory'})
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: "gagal",
                    text: "Kategori gagal ditambahkan",
                });
            })
        }
    }
}
</script>
