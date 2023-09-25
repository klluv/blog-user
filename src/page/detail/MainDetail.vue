<template>
    <v-app>
        <v-main>
            <div class="grid-container">
                <div class="main-content">
                <Detail />
                </div>
                <div class="kategori">
                    <ListNew />
                    <Kategori />
                </div>
            </div>
        </v-main>
    </v-app>
</template>

<script>
import Detail from './Detail.vue';
import ListNew from '../home/ListNew.vue';
import Kategori from '../home/Kategori.vue';

export default {
    components: {
        Detail,
        ListNew,
        Kategori
    }
}
</script>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
}
.main-content {
    display: flex;
    flex-direction: column;
}
.kategori {
    margin-top: 50px;
}
</style>