import Recruitment from '../pages/Recruitment/ListRecruitment.vue'

export default [
    {
        path: '/recruitments',
        name: 'recruitments',
        component: Recruitment,
        meta: {
            auth: true,
        }
    }
]