import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Quiz from '../views/Quiz.vue'
import StartQuiz from '../views/StartQuiz.vue'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/contact',
        component: Contact
    },
    {
        path: '/:categoryId/start-quiz',
        component: StartQuiz
    }
    ,
    {
        path: '/:categoryId/quiz/:questionsLimit',
        component: Quiz,
        name: 'quiz'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router