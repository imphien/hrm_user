import User from '../pages/User/UserProfile.vue'
import Admin from '../layouts/AdminLayout.vue'
import Recruitment from '../pages/Recruitment/ListRecruitment.vue'

export default [
    {
        path: '/',
        component: Admin,
        children: [
            {
                path: 'users',
                name: 'users',
                component: User
            },
            {
                path: 'recruitments',
                name: 'recruitments',
                component: Recruitment
            },
        ]
    }
]