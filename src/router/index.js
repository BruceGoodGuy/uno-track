import { createRouter, createWebHistory } from 'vue-router'
import WelcomeScreen from '../views/WelcomeScreen.vue'
import SettingScreen from '../views/SettingScreen.vue'
import PlayScreen from '../views/PlayScreen.vue'
import FinishScreen from '../views/FinishScreen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomeScreen
    },
    {
      path: '/setup',
      name: 'setup',
      component: SettingScreen
    },
    {
      path: '/play',
      name: 'play',
      component: PlayScreen
    },
    {
      path: '/finish',
      name: 'finish',
      component: FinishScreen
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
