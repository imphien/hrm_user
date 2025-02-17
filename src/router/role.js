import Role from '../pages/Role/ListRole.vue'

export default [
    {
        path: '/roles',
        name: 'roles',
        component: Role,
        meta: {
            auth: true,
        }
    }
]