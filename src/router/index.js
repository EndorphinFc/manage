import Vue from 'vue'
import VueRouter from 'vue-router'





// 1.安装插件
Vue.use(VueRouter)
// 2.创建router
const routes = [
  { 
    path: '/',
    component:()=>import('views/Main.vue'),
    name:'Main',
    redirect:'/home',
  
    children:[
      // {
      //   path:'/home',
      //   component:Home,
      //   name:'home'
      // },
      // {
      //   path:'/user',
      //   component:User,
      //   name:'user'
      // },
      // {
      //   path:'/mall',
      //   component:()=>import('@/views/mall/Mall.vue'),
      //   name:'mall'
      // },
      // {
      //   path:'/page1',
      //   component:()=>import('@/views/other/pageOne.vue'),
      //   name:'page1'
      // },
      // {
      //   path:'/page2',
      //   component:()=>import('@/views/other/pageTwo.vue'),
      //   name:'page2'
      // }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('views/login/Login.vue')
  }
 
]

const router=new VueRouter({
  routes,
  mode:'history'
})

export default router