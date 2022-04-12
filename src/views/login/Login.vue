<template>
  <el-form :model="form" status-icon :rules='rules' ref='form' label-width='100px' class='login-container'>

    <h3 class="login-title">系统登录</h3>
    <!-- 账号 -->
    <el-form-item 
      label='用户名'
      label-width='80px'
      prop='username'
      class="username"
    >
      <el-input
        type='input'
        v-model="form.username"
        autocomplete='off'
        placeholder='请输入账号'
      ></el-input>
      
    </el-form-item>
    <!-- 密码 -->
    <el-form-item 
      label='密码'
      label-width='80px'
      prop='password'
    >
      <el-input
        type='password'
        v-model="form.password"
        autocomplete='off'
        placeholder='请输入账号'
      ></el-input>
      
    </el-form-item>
    <!-- 按钮 -->
    <el-form-item class="login-submit">
      <el-button type='primary' @click="login" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
import Mock from 'mockjs'
import {getMenu} from '@/api/data'
export default {
  name:'Login',
  data(){
    return{
      form:{},
      //表单校验定义
      rules:{
        username:[
          {required:true,message:"请输入用户名",trigger:'blur'},
          {
            min:3,
            message:'用户名长度不能小于3位',
            trigger:'blur'
          },
        ],
        password:[
          {required:true,message:"请输入密码",trigger:'blur'},
        ]
      }
    }
  },
  methods:{
    login(){
      // 得到账号密码
      getMenu(this.form).then(res=>{3
        console.log(res,'getMenures');
        //如果code正确进入判断        
        if(res.code===20000){
          // 清楚代理和meau
          this.$store.commit('clearMenu')
          console.log(this.$store.state.tab.menu,'clearmenu');
          //设置菜单
          this.$store.commit('setMenu',res.data.menu)//menu写成了meun

          // 通过mock设置代理cook

          this.$store.commit('setToken',res.data.token)
          
          // 添加侧边栏菜单
          this.$store.commit('addMenu',this.$router)

          console.log(this.$store.state.tab,'addmenu');
          
          this.$router.push('/home')
          
        }
        else{
          this.$message.warning(res.data.message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width:350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow:0 0 25px #cac6c6
}
.login-title{
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;

}
.login-submit{
  margin: 10px auto 0px auto  ;
}
</style>