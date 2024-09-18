
import CreatePage from '@/views/CreatePage.vue'
import EditPage from '@/views/EditPage.vue'
import HomePage from '@/views/HomePage.vue'
import ViewPage from '@/views/ViewPage.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'homePage',
    component: HomePage
  },
  {
    path: '/create',
    name: 'CreatePage',
    component: CreatePage
  },
  {
    path: '/view/:id',
    name: 'ViewPage',
    component: ViewPage
  },
  {
    path: '/edit/:id',
    name: 'EditPage',
    component: EditPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
