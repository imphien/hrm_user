import Salary from '../pages/Salary/ListSalary.vue'

export default [
    {
        path: '/salaries',
        name: 'salaries',
        component: Salary,
        meta: {
            auth: true,
        }
    }
]