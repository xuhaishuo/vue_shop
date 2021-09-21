import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入tree-grid
import TreeTable from 'vue-table-with-tree-grid'

// 导入axios
import axios from 'axios'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器的样式表
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导入显示进度条的包及其样式表
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 设置axios请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 设置axios拦截器,每次请求之间携带token,显示进度条
axios.interceptors.request.use(config => {
  // 每次请求时展示进度条
  NProgress.start()
  // config.headers就是请求头对象，在请求头中添加验证的Authorization字段
  config.headers.Authorization = sessionStorage.getItem('token')
  // 必须return config
  return config
})
// 设置axios的response拦截器
axios.interceptors.response.use(config => {
  // 每次接收响应时隐藏进度条
  NProgress.done()
  return config
})

// 将axios挂载到Vue的原型对象上
Vue.prototype.$http = axios

// 全局注册TreeTable
Vue.component('tree-table', TreeTable)

// 将富文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor)

Vue.config.productionTip = false

// 注册全局过滤器，用于格式化时间显示
Vue.filter('dateFormat', function (originVal) {
  const dateTime = new Date(originVal)
  const year = dateTime.getFullYear()
  const month = (dateTime.getMonth() + 1 + '').padStart(2, '0')
  const day = (dateTime.getDate() + '').padStart(2, '0')
  const hour = (dateTime.getHours() + '').padStart(2, '0')
  const minutes = (dateTime.getMinutes() + '').padStart(2, '0')
  const senconds = (dateTime.getSeconds() + '').padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minutes}:${senconds}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
