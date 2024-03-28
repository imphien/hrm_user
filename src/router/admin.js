import User from '../pages/User/UserProfile.vue'
import Admin from '../layouts/AdminLayout.vue'

export default [
    {
        path: '/',
        component: Admin,
        children: [
            {
                path: 'users',
                name: 'users',
                component: User
            }
        ]
    }
]