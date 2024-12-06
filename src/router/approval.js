import Approval from '../pages/Approval/ListApproval.vue'

export default [
    {
        path: '/approvals',
        name: 'approvals',
        component: Approval,
        meta: {
            auth: true,
        }
    }
]