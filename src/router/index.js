import { createWebHistory, createRouter } from "vue-router";
import SampleView from '@/views/Sample'
import RoomView from "@/views/Room";
import HomeView from "@/views/Home";
import SetupView from "@/views/Setup";
import Question1View from "@/views/Question1";
import Question2View from "@/views/Question2";
import HoldingView from "@/views/Holding";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
    },
    {
        path: '/setup',
        name: 'Setup',
        component: SetupView,
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
        component: Question2View,
    },
    {
        path: '/room/:code/holding',
        name: 'Holding',
        component: HoldingView,
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