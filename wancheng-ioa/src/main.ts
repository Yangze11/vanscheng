import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { 
  Button,
  Field,
  NavBar,
  Checkbox,
  Toast,
  Icon,
  Grid,
  GridItem,
  Cell,
  CellGroup,
  Tabbar,
  TabbarItem,
  Form,
  Popup,
  Picker,
  Dialog
} from 'vant'
import 'vant/lib/index.css'
import './style.css'

const app = createApp(App)

// 注册Vant组件
app.use(Button)
app.use(Field)
app.use(NavBar)
app.use(Checkbox)
app.use(Toast)
app.use(Icon)
app.use(Grid)
app.use(GridItem)
app.use(Cell)
app.use(CellGroup)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Form)
app.use(Popup)
app.use(Picker)
app.use(Dialog)

// 使用路由
app.use(router)

app.mount('#app')
