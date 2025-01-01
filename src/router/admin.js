import User from '../pages/User/UserProfile.vue'
import Admin from '../layouts/AdminLayout.vue'
import Recruitment from '../pages/Recruitment/ListRecruitment.vue'
import Notification from '../pages/Notification/ListNotification.vue'
import Approval from '../pages/Approval/ListApproval.vue'
import Timekeeping from '../pages/Timekeeping/ListTimekeeping.vue'
import Salary from '../pages/Salary/ListSalary.vue'

export default [
    {
        path: '/',
        component: Admin,
        children: [
            {
                path: 'users',
                name: 'users',
                component: User,
                meta: { requiresAuth: true, roles: ['admin'] },
            },
            {
                path: 'recruitments',
                name: 'recruitments',
                component: Recruitment,
                meta: { requiresAuth: true, roles: ['admin'] },
            },
            {
                path: 'notifications',
                name: 'notifications',
                component: Notification,
                meta: { requiresAuth: true },
            },
            {
                path: 'approvals',
                name: 'approvals',
                component: Approval,
                meta: { requiresAuth: true },
            },
            {
                path: 'timekeeping',
                name: 'timekeeping',
                component: Timekeeping,
                meta: { requiresAuth: true },
            },
            {
                path: 'salaries',
                name: 'salaries',
                component: Salary,
                meta: { requiresAuth: true, roles: ['admin'] },
            },
        ]
    }
]