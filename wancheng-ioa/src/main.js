import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { ElMessage } from 'element-plus'

const app = createApp(App)

// Element Plus 全局配置
app.use(ElementPlus, {
  locale: zhCn,
  zIndex: 3000
})

// 全局挂载 ElMessage
app.config.globalProperties.$message = ElMessage

// 配置 ElMessage 默认选项
ElMessage.defaults = {
  duration: 3000,
  showClose: true,
  offset: 80,
  customClass: '',
  grouping: true,
  appendTo: document.body
}

app.use(router)
app.mount('#app') 