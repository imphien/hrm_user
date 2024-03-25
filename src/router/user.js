import User from '../pages/User/UserProfile.vue'

export default [
    {
        path: '/users',
        name: 'users',
        component: User,
        meta: {
            auth: true,
        }
    }
]