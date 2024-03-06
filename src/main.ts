import { createApp } from 'vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia';
import router from '@/routes';
import App from '@/App.vue';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.scss';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
