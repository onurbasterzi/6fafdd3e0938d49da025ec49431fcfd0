import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vSelect from "vue-select";
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);
Vue.use(Vuelidate)
Vue.use(require('vue-moment'));

Vue.component("v-select", vSelect);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
