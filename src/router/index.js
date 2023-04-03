import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AppLayout from '../layouts/AppLayout.vue'
import GuestLayout from '../layouts/GuestLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
          layout: AppLayout,
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/Dashboard.vue'),
      meta: {
          forAuth: true,
          layout: AdminLayout,
      }
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: () => import('../views/admin/Room.vue'),
      meta: {
          forAuth: true,
          layout: AdminLayout,
      }
    },
    {
      path: '/rooms/create',
      name: 'rooms.create',
      component: () => import('../views/admin/CreateRoom.vue'),
      meta: {
          forAuth: true,
          layout: AdminLayout,
      }
    },
    {
      path: '/rooms/:id/edit',
      name: 'rooms.edit',
      component: () => import('../views/admin/EditRoom.vue'),
      meta: {
          forAuth: true,
          layout: AdminLayout,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue'),
      meta: {
          forGuest: true,
          layout: GuestLayout,
      }
    }
  ]
})

router.beforeEach(
  (to, from, next) => {
      document.title = to.meta.title ? to.meta.title + ' :: ' + app_name : app_name;
      if (to.matched.some(record => record.meta.forGuest)) {
          if (localStorage.getItem('token')) {
              next({ name: 'home' })
          } else next()
      } else if (to.matched.some(record => record.meta.forAuth)) {
          if (!localStorage.getItem('token')) {
              next({ name: 'login' })
          } else next()
      } else next()
  }
)

export default router
