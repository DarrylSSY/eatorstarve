import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from '@/components/HelloWorld'
import CreateRoom from '@/components/CreateRoom'
import JoinRoom from '@/components/JoinRoom'


const routes = [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/create-room',
            name: 'CreateRoom',
            component: CreateRoom
        },
        {
            path: '/join-room/:id',
            name: 'JoinRoom',
            component: JoinRoom
        },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;