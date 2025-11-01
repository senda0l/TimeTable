import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/home/ui/home.vue'
import SchedulePage from '@/pages/schedule/ui/schedule.vue'
import EditingPage from '@/pages/editing/ui/editing.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/schedule', component: SchedulePage },
  { path: '/editing', component: EditingPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
