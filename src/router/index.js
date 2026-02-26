import { createRouter, createWebHistory } from 'vue-router'

import recipe_view from '@/views/recipe_view.vue'
import TOC_view from '@/views/TOC_view.vue'
import home_view from '@/views/home_view.vue'
import help_view from '@/views/help_view.vue'
import tools_view from '@/views/tools_view.vue'

const routes = [
  { path: '/', name:'home', component: home_view },
  { path: '/recipe/:slug', name:'recipe', component: recipe_view },
  { path: '/TOC', name: 'TOC', component: TOC_view },
  { path: '/help', name:'help', component: help_view },
  { path: '/tools', name:'tools', component: tools_view }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
