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
                <v-select :items="items" :menu-props="{ maxHeight: '200' }" label="category" v-model="blog.category" placeholder="Category" outlined required />
                <v-spacer></v-spacer>
                <v-textarea type="text" label="Text" v-model="blog.subtitle" placeholder="Text" counter="3000" auto-grow outlined required />
            </div>
        </v-form>
    </v-app>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            blog: {
                title: '',
                category: '',
                subtitle: ''
            },
            items: ['Social', 'Adventure', 'Romance', 'Action']
        }
    },
    methods: {
        add() {
            axios.post('http://localhost:1234/author/content/create', this.blog)
            .then(() => {
                this.$route.push('/blog/mypage')
            })
            .catch((error) => {
                console.error(error);
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