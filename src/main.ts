import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia} from "pinia"
import { createVuetify } from 'vuetify';
import Toast from 'vue-toastification';
import { POSITION } from 'vue-toastification';
import "vue-toastification/dist/index.css";
import 'vuetify/styles'; // Global Vuetify styles
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const options = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
};

const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();
createApp(App).use(vuetify).use(pinia).use(Toast, options).use(router).mount('#app')
