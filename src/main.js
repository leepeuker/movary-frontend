import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios';
import router from './routes';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.scss';

const axiosInstance = axios.create({
    headers: {
        common: {
            'X-Movary-Client': 'Movary Web',
            'Accept': 'application/json'
        }
    }
});

const app = createApp(App);
const pinia = createPinia();

app.use(router, pinia);
router.app = app;
app.provide('httpClient', axiosInstance);
app.mount('#app');