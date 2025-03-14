import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/auth/login'
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('../views/auth/LoginView.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('../views/auth/RegisterView.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/auth/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/auth/ForgotPasswordView.vue'),
    meta: {
      title: '忘记密码'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/HomeView.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/workspace',
    name: 'Workspace',
    component: () => import('../views/workspace/WorkspaceView.vue'),
    meta: {
      title: '工作台'
    }
  },
  {
    path: '/notice/list',
    name: 'NoticeList',
    component: () => import('../views/notice/NoticeList.vue'),
    meta: {
      title: '公告列表'
    }
  },
  {
    path: '/notice/:id',
    name: 'NoticeDetail',
    component: () => import('../views/notice/NoticeDetail.vue'),
    meta: {
      title: '公告详情'
    }
  },
  {
    path: '/todo',
    name: 'Todo',
    component: () => import('../views/todo/TodoView.vue'),
    meta: {
      title: '待办事项'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/profile/ProfileView.vue'),
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/onboarding',
    name: 'Onboarding',
    component: () => import('../views/onboarding/OnboardingView.vue'),
    meta: {
      title: '入职办理'
    }
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: () => import('../views/schedule/ScheduleView.vue'),
    meta: {
      title: '日程'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  console.log('路由跳转:', {
    to: to.path,
    from: from.path,
    matched: to.matched.length
  })
  
  // 检查路由是否存在
  if (!to.matched.length) {
    console.warn('路由未匹配，重定向到首页')
    next('/home')
    return
  }
  
  document.title = to.meta.title || '万程IOA'
  next()
})

export default router 