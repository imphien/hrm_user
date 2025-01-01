import { createRouter, createWebHistory } from "vue-router";
import SignUp from './login';
import Admin from './admin';

const routes = [...SignUp, ...Admin];

const router = createRouter({
    history: createWebHistory(),
    routes
})

// router.beforeEach((to, from, next) => {
//     const currentUser = localStorage.getItem('currentUser');
//
//     if (!currentUser) {
//         return next({ path: '/login' });
//     }
//
//     const userObject = JSON.parse(currentUser);
//     const userRoles = userObject.roles.map(role => role.name);
//
//     if (to.meta.roles) {
//         const hasPermission = to.meta.roles.some(role => userRoles.includes(role));
//         if (!hasPermission) {
//             return next({ name: 'forbidden' });
//         }
//     }
//
//     next();
// });

export default router;