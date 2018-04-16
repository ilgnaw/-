import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import UserList from '@/components/user-list/user-list.vue'
import RoleList from '@/components/roule-list/role-list.vue'
import {getUserInfo} from '@/assets/js/auth'
import RightList from '@/components/rights-list/right-list.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      // 我们可以通过配置子路由的方式，渲染到父路由
      // 1.在父路由中添加router-view标签
      // 2在父路由通过childeren来声明子路由
      children: [
        {
          name: 'user-list',
          path: '/users',
          component: UserList
        },
        {
          name: 'user-list',
          path: '/roles',
          component: RoleList
        },
        {
          name: 'rights-list',
          path: '/rights',
          component: RightList
        }
      ]
    }
  ]
})
// 1添加导航拦截器
router.beforeEach((to, from, next) => {
  // 拿到当前请求的路径，如果是登入，就放行，不是就让其去登入
  if (to.name === 'login') {
    next()
  } else {
    if (!getUserInfo()) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  }
})
export default router
