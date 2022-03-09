import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vSelect from "vue-select";
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2';
import Toast from "vue-toastification";
import API from './api';
import "vue-toastification/dist/index.css";



Vue.prototype.$api = API;

const options = {
  position: "bottom-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
};


Vue.use(Toast, options);

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
