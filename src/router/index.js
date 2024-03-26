import { createRouter, createWebHistory } from "vue-router";
import SignUp from './login';
import UserProfile from './user';

const routes = [...SignUp, ...UserProfile];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;