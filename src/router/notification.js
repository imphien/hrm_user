import Notification from '../pages/Notification/ListNotification.vue'

export default [
    {
        path: '/notifications',
        name: 'notifications',
        component: Notification,
        meta: {
            auth: true,
        }
    }
]