import { createRouter, createMemoryHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RoomView from '../views/RoomView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    props: true
  },
  {
    path: '/room/:roomId:username',
    name: 'room',
    component: RoomView,
    props: true
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
