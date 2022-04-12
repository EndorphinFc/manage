import Cookie from 'js-cookie'
export default {
  state:{
    // 定义一个管理是否展开的变量
    isCollapse:false,
    //记录存储点击菜单的数据
    tabsList:[
      {
        path:'/home',
        name:'home',
        label:'首页',
        icon:'home'
      }
    ],
    currentMenu:null,
    // 定义一个空数组，用于动态传入路由
    menu:[]
  },
  mutations:{
    
    CollapseMenu(state){
      state.isCollapse=!state.isCollapse
    },
    // 用于改变tablist数据
    selectMenu(state , val){
      if (val.name !=='home') {
        state.currentMenu=val
        const result=state.tabsList.findIndex(item=>item.name ===val.name)
        if (result ===-1) {
          state.tabsList.push(val)
        }else{
          state.currentMenu =null
        }
      }
    },
    closeTag(state,val){
      const result=state.tabsList.findIndex(item=>item.name===val.name)
      state.tabsList.splice(result,1)
    },
    setMenu(state,val){
      state.menu=val

      // 缓存到cookie中，避免浏览器刷新时丢失menu数据
      Cookie.set('menu',JSON.stringify(val))//cookie存入的名称，存入的数据)
    },
    clearMenu(state){
      state.menu=[]
      Cookie.remove('menu')
    },
    addMenu(state,router){
      // 动态添加
      // console.log(Cookie.get('menu'));
      if (!Cookie.get('menu')) {//没有返回
        return 
      }
      
      const menu =JSON.parse(Cookie.get('menu'))
      state.menu=menu
      //动态添加路由
      const menuArray=[]
      menu.forEach(item => {
        if (item.children) {
          item.children =item.children.map(item=>{
            item.component=()=>import(`views/${item.url}`)
            return item
          })
          menuArray.push(...item.children)
        }else{
          item.component=()=>import(`views/${item.url}`)
          menuArray.push(item)
        }
      });
      // 路由的动态添加
      menuArray.forEach(item=>{
        router.addRoute('Main',item)
      
      })
    }
    
    

  }
}