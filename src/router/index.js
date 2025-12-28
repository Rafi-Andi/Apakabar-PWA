import Bookmark from '@/Views/Bookmark.vue'
import Detail from '@/Views/Detail.vue'
import Discover from '@/Views/Discover.vue'
import Index from '@/Views/Index.vue'
import Setting from '@/Views/Setting.vue'
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/discover',
      name: 'Discover',
      component: Discover
    },
    {
      path: '/bookmark',
      name: 'Bookmark',
      component: Bookmark
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/news/:id',
      name: 'Detail',
      component: Detail
    }
  ],
})

export default router
