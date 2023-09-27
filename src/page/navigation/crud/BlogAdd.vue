<template>
    <v-app class="container mt-4">
        <v-form @submit.prevent="add">
            <div class="form">
                <v-action>
                    <v-btn type="submit" color="#02A28F" style="margin-bottom: 20px">Add</v-btn>
                </v-action>
                <v-file-input
                    :rules="rules"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pilih foto"
                    prepend-icon="mdi-camera"
                    label="pilih foto"
                ></v-file-input>
                <v-text-field type="text" label="Title" v-model="blog.title" placeholder="Title" outlined required />
                <v-spacer></v-spacer>
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
                <v-spacer></v-spacer>
                <v-textarea type="text" label="Text" v-model="blog.content" placeholder="Text" counter="3000" auto-grow outlined required />
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
            blog: {
                title: '',
                content: '',
            },
            selectedCategoryId: null,
            categories: []
        };
    },
    mounted() {
        this.fetchCategories();
    },
    methods: {
        add() {
            const token = this.$cookies.get('userToken');
            const data = {
                title: this.blog.title,
                content: this.blog.content,
                category_id: this.selectedCategoryId,
            }
            axios.post(`http://localhost:1234/author/content/create`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(response => {
                console.log(response.data)
                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "Blog berhasil ditambahkan",
                });
                this.$router.push({name: 'MyPage'})
            })
            .catch(error => {
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    text: "Terjadi error saat menambahkan data",
                });
            })
        },
        fetchCategories() {
            axios.get('http://localhost:1234/categories')
            .then(response => {
                this.categories = response.data
            })
            .catch(error => {
                console.error(error)
            })
        }
    }
}
</script>

<style scoped>
.form {
    margin-top: 50px;
}
</style>