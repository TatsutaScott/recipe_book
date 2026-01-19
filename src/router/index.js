import { createRouter, createWebHistory } from 'vue-router'

import recipe_view from '@/views/recipe_view.vue'
import TOC_view from '@/views/TOC.vue'
const routes = [
  { path: '/recipe/:slug', component: recipe_view },
  { path: '/TOC', component: TOC_view },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
