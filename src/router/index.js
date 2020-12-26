import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/views/login/login.vue') },
  { path: '/search', component: () => import('@/views/search') },
  { path: '/userinfo', component: () => import('@/views/profile') },
  { path: '/article/:articleId', component: () => import('@/views/article'), props: true },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      { path: '/', component: () => import('@/views/home') },
      { path: '/qa', component: () => import('@/views/qa') },
      { path: '/video', component: () => import('@/views/video') },
      { path: '/my', component: () => import('@/views/my') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
