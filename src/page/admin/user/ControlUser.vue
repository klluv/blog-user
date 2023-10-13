  <template>
    <v-container>
      <v-card-title>
        <h2>Control User</h2>
      </v-card-title>
      <v-row>
        <v-col v-for="user in users" :key="user.id" cols="12" md="4">
          <v-card class="mb-4" style="border: #02a28f solid 1px">
            <v-card-title>
              <h3>{{ user.id }}. {{ user.username }}</h3>
            </v-card-title>
            <v-card-text>
              <h4>email: {{ user.email }}</h4>
              <h4>role: {{ user.role }}</h4>
            </v-card-text>
            <v-card-actions>
              <v-btn color="#02A28F" text @click="editButton(user.id)" outlined>Edit</v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="confirmDelete(user.id)" text color="error" outlined>Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>

  <script>
  import axios from "axios";
  import Swal from "sweetalert2";

  export default {
    data() {
      return {
        users: [],
      };
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      fetchUsers() {
        const token = this.$cookies.get("userToken");
        axios
          .get(`http://localhost:1234/admin/users`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            this.users = response.data;
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Gagal",
              text: "gagal mengambil data",
            });
          });
      },
      confirmDelete(id) {
        Swal.fire({
          title: "Konfirmasi",
          text: "Anda yakin ingin menghapus kategori ini?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya",
          cancelButtonText: "Tidak",
        }).then((result) => {
          if (result.value) {
            this.deleteUser(id);
          }
        });
      },
      deleteUser(id) {
        const token = this.$cookies.get("userToken");
        axios
          .delete(`http://localhost:1234/admin/user/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response);
            this.fetchUsers();
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "User berhasil dihapus",
            });
          })
          .catch((error) => {
            console.error("terjadi error:", error);
          });
      },
      editButton(id) {
      this.$router.push({ name: "EditUser", params: { id } });
    },
    },
  };
  </script>
