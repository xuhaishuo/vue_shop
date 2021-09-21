import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入登录组件
import Login from '../components/Login'
// 导入主页组件
import Home from '../components/Home'
// 导入欢迎组件
import Welcome from '../components/Welcom'
// 导入用户组件
import Users from '../components/user/Users'
// 导入权限组件
import Rights from '../components/power/Rights'
// 导入角色组件
import Roles from '../components/power/Roles'
// 导入商品分类组件
import Cate from '../components/goods/Cate'
// 导入分类参数组件
import Params from '../components/goods/Params'
// 导入商品列表组件
import List from '../components/goods/List'
// 导入添加商品组件
import Add from '../components/goods/Add'
// 导入订单管理组件
import Order from '../components/order/Order'
// 导入数据报表组件
import Report from '../components/report/Report'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    redirect: '/welcome',
    component: Home,
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Cate },
      { path: '/params', component: Params },
      { path: '/goods', component: List },
      { path: '/goods/add', component: Add },
      { path: '/orders', component: Order },
      { path: '/reports', component: Report }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫：初始化时执行、每次路由切换前执行
// 根据用户访问时是否携带token来进行页面访问控制
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = sessionStorage.getItem('token')
  if (token) return next()
  else {
    alert('未登录不允许访问该页面')
    next('/login')
  }
})

export default router
