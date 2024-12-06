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
                component: User
            },
            {
                path: 'recruitments',
                name: 'recruitments',
                component: Recruitment
            },
            {
                path: 'notifications',
                name: 'notifications',
                component: Notification
            },
            {
                path: 'approvals',
                name: 'approvals',
                component: Approval
            },
            {
                path: 'timekeeping',
                name: 'timekeeping',
                component: Timekeeping
            },
            {
                path: 'salaries',
                name: 'salaries',
                component: Salary
            },
        ]
    }
]