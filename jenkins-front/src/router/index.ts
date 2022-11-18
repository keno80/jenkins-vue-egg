import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: Layout,
    redirect: '/home',
    meta: { title: '首页' },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/index.vue'),
      },
    ],
  },
  {
    path: '/project',
    name: 'Project',
    component: Layout,
    redirect: '/project/list',
    meta: { title: '配置列表' },
    children: [
      {
        path: '/project/list',
        name: 'ProjectList',
        component: () => import('@/views/projectList/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router