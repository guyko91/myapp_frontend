import Login from '../views/Login.vue';
import Callback from '../views/Callback.vue';
import Main from '../views/Main.vue';

const routes = [
    { path: '/', component: Login, name: 'Login' },
    { path: '/login-success', component: Callback, name: 'Callback' },
    { path: '/main', component: Main, name: 'Main' },
];

export default routes;