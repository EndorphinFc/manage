<template>
  <header>
  
    <div class="l-content">
      <el-button plain class="el-icon-menu" size="mini" @click="handleMenu"> </el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right" >
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }" >{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger='click' size='mini'>
        <span class="el-dropdown-link">
          <img :src="userimg" class="user">
        </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item >个人中心</el-dropdown-item>
        <el-dropdown-item @click.native="logOut">退出
        </el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>

</template>
<script>
import {mapState} from 'vuex'//mapState辅助函数更好的生成计算属性
export default {  
  name:'CommonHeader',
  data(){
    return{
      userimg:require('assets/img/user.png')
    }
  },
  methods:{
    handleMenu(){
      this.$store.commit('CollapseMenu')
    },
    logOut(){
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push('/login')
    }
  },
  computed:{
    ...mapState({
      tags:state=>state.tab.tabsList
    })
  }
}
</script>
<style lang="less" scoped>
header{
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items:center;
}
.l-content{  
  display: flex;
  align-items:center;
  .el-button{
    margin-right:20px;
  }
}
.r-content{
    .user{
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
}
</style>