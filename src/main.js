import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import http from 'axios'
import './api/mock'

import {Container,Aside,Main,Header,Menu,Submenu,MenuItem,MenuItemGroup,Button,Dropdown,DropdownMenu,DropdownItem,Row,Col,Card,Table,TableColumn,Breadcrumb,BreadcrumbItem,Tag,Form,FormItem,Input,Select,Option,Switch,DatePicker,Dialog,
Pagination,MessageBox,Message

} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/less/index.less'

Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Col)
Vue.use(Row)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Pagination)

Vue.config.productionTip = false
// ElementUi按需引用
Vue.prototype.$http = http;
Vue.prototype.$confirm=MessageBox.confirm
Vue.prototype.$Message=Message

router.beforeEach((to,from,next)=>{
  store.commit('getToken')


  const token =store.state.user.token
  // token不存在同时不是login页
  if (!token && to.name!=='login') {
    next({name:'login'})
  }

  else if(token &&to.name ==='login'){
    next({name:'home'})
  }
  else{
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
  store.commit('addMenu',router)
  }
}).$mount('#app')
