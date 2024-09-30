
import EditPage from '@/views/EditPage.vue'
import ViewPage from '@/views/ViewPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DashboardPage from '@/views/DashboardPage.vue'
import CreatePage from '@/views/CreatePage.vue'
import SignupPage from '@/views/SignupPage.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/signup',
    name: 'SignupPage',
    component: SignupPage
  },
  {
    path: '/dashboard',
    name: 'DashboardPage',
    component: DashboardPage,
    // meta: { requiresAuth: true}
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
  },
  {
    path: '/create',
    name: 'CreatePage',
    component: CreatePage,
    meta: { requiresAuth: true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if(to.meta.requiresAuth && !token){
    next({name: 'LoginPage'})
  } else {
    next();
  }
})

export default router;
