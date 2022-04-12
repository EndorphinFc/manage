<template>
  <el-menu default-active="1-4-1" 
  class="el-menu-vertical-demo" 
  background-color='#545c64'
  active-text-color='#ffd04b'
  text-color='#fff'
  @open="handleOpen" 
  @close="handleClose" 
  :collapse="isCollapse" 
  >
    <h3 class="aside-h3">{{isCollapse? '后台':'通用后台管理系统'}}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren"  :index = "item.path+''" :key="                   item.path">
      <i :class = "'el-icon-'+item.icon"></i>
      <span         slot  = "title">{{item.label}}</span>
    </el-menu-item>
  
    <el-submenu  v-for="item in hasChildren" :index = "item.path+''" :key='item.path'>
      <template   slot  = "title">
        <i         :class = "'el-icon-'+item.icon"></i>
        <span       slot  = "title">{{item.label}}</span>
      </template>
      <el-menu-item-group v-for="subitem in item.children" :key="subitem.path" >
        <el-menu-item :index = "subitem.path+''" @click="clickMenu(subitem)">{{subitem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>

</template>
<style scoped>
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
<script>
  export default {
    name:'CommonAside',
    data() {
      return {
        menu:[]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item){
        this.$router.push(
          item.name
        )
        this.$store.commit('selectMenu',item)


      }
    },
    computed:{
        noChildren(){
          return this.asyncMenu.filter(item=>!item.children)
        },
        hasChildren(){
          return this.asyncMenu.filter(item=>item.children)
        },
        isCollapse(){
          return this.$store.state.tab.isCollapse
        },
        asyncMenu(){
          return this.$store.state.tab.menu
        }
      },
      
  }
</script>
<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
    height: 100%;
    border: none;
    h3{
      color: #fff;
      text-align: center;
      line-height: 48px;
    }
  }
</style> scoped>

