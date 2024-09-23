import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia} from "pinia"
import { createVuetify } from 'vuetify';
import Toast from 'vue-toastification';
import "vue-toastification/dist/index.css";
import 'vuetify/styles'; // Global Vuetify styles
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();
createApp(App).use(vuetify).use(pinia).use(router).use(Toast).mount('#app')
