import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './router/routes';
import axios from "axios";

const app = createApp(App);

const router = createRouter({
    history: createWebHistory(),
    routes,
});

axios.defaults.withCredentials = true;

app.use(router);
app.mount('#app');