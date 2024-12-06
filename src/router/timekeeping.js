import Timekeeping from '../pages/Timekeeping/ListTimekeeping.vue'

export default [
    {
        path: '/timekeeping',
        name: 'timekeeping',
        component: Timekeeping,
        meta: {
            auth: true,
        }
    }
]