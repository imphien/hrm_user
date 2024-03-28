import { createRouter, createWebHistory } from "vue-router";
import SignUp from './login';
import Admin from './admin';

const routes = [...SignUp, ...Admin];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;