import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/HomePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('@/views/RegisterPage.vue'),
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { layout: 'main' },
    component: () => import('@/views/CategoriesPage.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'main' },
    component: () => import('@/views/ProfilePage.vue'),
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: 'main' },
    component: () => import('@/views/RecordPage.vue'),
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layout: 'main' },
    component: () => import('@/views/PlanningPage.vue'),
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'main' },
    component: () => import('@/views/HistoryPage.vue'),
  },
  {
    path: '/record-detail',
    name: 'record-detail',
    meta: { layout: 'main' },
    component: () => import('@/views/DetailRecordPage.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
