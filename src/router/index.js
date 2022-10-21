import { createWebHistory, createRouter } from "vue-router";
import SampleView from '@/views/Sample'
import RoomView from "@/views/Room";
import HomeView from "@/views/Home";
import Question1View from "@/views/Question1";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
    },
    {
        path: '/room/:code',
        name: 'Room',
        component: RoomView
    },
    {
        path: '/room/:code/1',
        name: 'Question1',
        component: Question1View,
    },
    {
        path: '/room/:code/2',
        name: 'Question2',
    },
    {
        path: '/room/:code/3',
        name: 'Question3',
    },
    {
        path: '/room/:code/4',
        name: 'Question4',
    },
    {
        path: '/room/:code/5',
        name: 'Question5',
    },
    {
        path: '/room/:code/6',
        name: 'Question6',
    },
    {
        path: '/room/:code/7',
        name: 'Question7',
    },
    {
        path: '/sample',
        name: 'Sample',
        component: SampleView,
        props: { msg: Math.random().toString(36).slice(9)}
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;