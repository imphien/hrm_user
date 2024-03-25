import User from '../pages/User/UserProfile.vue'
import Admin from '../layouts/Admin.vue'

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