<template>
  <v-app>
    <v-container>
      <router-link to="admin/control-user">
        <v-card class="control-card">
          <v-card-title class="control-title">
            <v-icon left>mdi-account</v-icon>
            Control User
          </v-card-title>
        </v-card>
      </router-link>

      <router-link to="admin/control-category">
        <v-card class="control-card">
          <v-card-title class="control-title">
            <v-icon left>mdi-view-list</v-icon>
            Control Category
          </v-card-title>
        </v-card>
      </router-link>

      <router-link to="admin/control-content">
        <v-card class="control-card">
          <v-card-title class="control-title">
            <v-icon left>mdi-file-document</v-icon>
            Control Content
          </v-card-title>
        </v-card>
      </router-link>
    </v-container>
  </v-app>
</template>

<style scoped>
.control-card {
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  margin-top: 10px;
  border: 1px solid #02a28f;
}

.control-title {
  background-color: #02a28f;
  color: white;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
