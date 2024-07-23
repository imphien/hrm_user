import Recruitment from '../pages/Recruitment/ListRecruitment.vue'

export default [
    {
        path: '/recruitments',
        name: 'users',
        component: Recruitment,
        meta: {
            auth: true,
        }
    }
]