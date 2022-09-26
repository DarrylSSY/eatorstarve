import { createWebHistory, createRouter } from "vue-router";
import HomeView from '@/views/Home'
import RoomView from "@/views/Room";


const routes = [
        {
            path: '/',
            name: 'Home',
            component: HomeView
        },
        {
            path: '/room/:id',
            name: 'Room',
            component: RoomView
        }

]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;