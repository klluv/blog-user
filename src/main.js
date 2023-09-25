import Vue from 'vue'
import App from './App.vue'
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store';
import VueSweetalert2 from 'vue-sweetalert2';
import VueCookies from 'vue-cookies';

Vue.config.productionTip = false
Vue.use(VueSweetalert2);
Vue.use(VueCookies);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');