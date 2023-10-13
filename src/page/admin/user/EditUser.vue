<template>
  <v-container>
    <v-card class="pa-5" style="margin-top: 20px; border: #02a28f solid 1px ;">
      <v-card-title class="text-h5"> <strong>Ganti Role User</strong></v-card-title>
      <v-card-text><strong>Ganti peran pengguna di sini</strong></v-card-text>
      <div class="mb-3">
        <p class="mb-2"><strong>ID User:</strong> {{ data.user_id }}</p>
        <p v-if="data.role_id === 1" class="mb-2"><strong>Role:</strong> Admin</p>
        <p v-if="data.role_id === 2" class="mb-2"><strong>Role:</strong> Author</p>
      </div>
      <v-select
        :items="role"
        item-text="role"
        item-value="role_id"
        :menu-props="{ maxHeight: '200' }"
        label="Role"
        v-model="selectedRoleId"
        outlined
        required
      />
      <v-card-actions>
        <v-btn @click="saveRole" text outlined color="#02a28f">Simpan</v-btn>
        <v-btn @click="cancelSaveRole" text outlined color="error">Batal</v-btn>
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
      data: [],
      role: [],
      selectedRoleId: null,
    };
  },
  created() {
    const id = this.$route.params.id;
    this.fetchUser(id);
    this.fetchUserRole();
  },
  methods: {
    fetchUser(id) {
      const token = this.$cookies.get("userToken");
      axios
        .get(`http://localhost:1234/admin/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchUserRole() {
      const token = this.$cookies.get("userToken");
      axios
        .get(`http://localhost:1234/admin/roles`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.role = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    saveRole() {
      const id = this.$route.params.id;
      const token = this.$cookies.get("userToken");
      const postData = {
        role_id: this.selectedRoleId,
      };
      axios
        .put(`http://localhost:1234/admin/user/update-role/${id}`, postData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'Role User berhasil diubah'
          })
          this.$router.push({name: 'ControlUser'})
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Role User gagal diubah'
          })
        });
    },
  },
};
</script>
