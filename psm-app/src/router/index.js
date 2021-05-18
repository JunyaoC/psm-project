import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('../components/User.vue')
      },
      {
        path: 'program',
        name: 'Program',
        component: () => import('../components/Program.vue')
      },
      {
        path: 'student',
        name: 'Student',
        component: () => import('../components/Student.vue')
      },
      {
        path: 'proposal',
        name: 'ProposalList',
        component: () => import('../views/Proposal.vue'),
      },
      {
        path:'detail',
        name:"Proposal",
        component: () => import('../components/Proposal.vue'),
        props: route => ({proposal_uid: route.query.proposal_uid})
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path:'/:pathMatch(.*)*',
    redirect:'/'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  console.log(to)

  if (store.state.user) {
    if (to.name === 'Login') {
      next({ name: 'Home' })
    } else {
      next()
    }
  } else {
    if (to.name === 'Login') {
      next()
    } else {
      next({ name: 'Login' })
    }
  }

  // if (to.name !== 'Login' && !store.state.user) next({ name: 'Login' })
  // else if (to.name === 'Login' && store.state.user) next({ name: 'Home' })
  // else next()
})

export default router
