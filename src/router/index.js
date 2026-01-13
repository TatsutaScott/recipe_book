import { createRouter, createWebHistory } from 'vue-router'

import recipe_view from '@/views/recipe_view.vue'

const routes = [
  {
    path: '/recipe/:slug',
    component: recipe_view,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
