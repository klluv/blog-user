  <template>
      <v-app>
        <v-main>
          <div class="grid-container">
            <Highlight />
            <ListNew />
            <ListBlog />
            <Kategori />
          </div>
        </v-main>
      </v-app>
    </template>
    
    <script>
    import Vue from 'vue';
    import Highlight from './Highlight.vue';
    import ListNew from './ListNew.vue';
    import ListBlog from './ListBlog.vue';
    import Kategori from './Kategori.vue';

    export default {
      components: {
        Highlight,
        ListNew,
        ListBlog,
        Kategori
      },
      beforeRouteEnter(to, from, next) {
        const token = Vue.$cookies.get("userToken");
        if(!token) {
          next({ name: 'Login'});
        } else {
          next();
        }
      }
    };
    </script>

  <style scoped>
  .grid-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
  </style>