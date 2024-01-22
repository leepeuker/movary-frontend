import { createApp } from 'vue';
import router from './routes';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.scss';

const app = createApp(App);
app.use(router);
app.mount('#app');
