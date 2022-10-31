import { createWebHistory, createRouter } from "vue-router";
import SampleView from '@/views/Sample'
import RoomView from "@/views/Room";
import HomeView from "@/views/Home";
import SetupView from "@/views/Setup";
import Question1View from "@/views/Question1";
import Question2View from "@/views/Question2";
import Question3View from "@/views/Question3";
import Question4View from "@/views/Question4";
import Question5View from "@/views/Question5";
import Question6View from "@/views/Question6";
import Question7View from "@/views/Question7";
import HoldingView from "@/views/Holding";
import HoldingView2 from "@/views/Holding2";

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
        path: '/room/:code/3',
        name: 'Question3',
        component: Question3View,
    },
    {
        path: '/room/:code/4',
        name: 'Question4',
        component: Question4View,
    },
    {
        path: '/room/:code/5',
        name: 'Question5',
        component: Question5View,
    },
    {
        path: '/room/:code/6',
        name: 'Question6',
        component: Question6View,
    },
    {
        path: '/room/:code/7',
        name: 'Question7',
        component: Question7View,
    },
    {
        path: '/room/:code/holding',
        name: 'Holding',
        component: HoldingView,
    },

    {
        path: '/room/:code/holding2',
        name: 'Holding2',
        component: HoldingView2,
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