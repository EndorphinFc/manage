C<template>
   <el-container style='height:100%'>
      <el-aside width="auto">
        <common-aside/>
      </el-aside>

      <el-container>
      <el-header>
        <common-header/>  
      </el-header>
      <common-tag/>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
</el-container>
</template>
<script>
import CommonAside from 'components/content/commonaside/CommonAside.vue'
import CommonHeader from '@/components/content/commonheader/CommonHeader.vue'
import CommonTag from '../components/content/commonTag/CommonTag.vue'

export default {
  
  name:'Main',
  components: { 
    CommonAside,
    CommonHeader,
    CommonTag
    },
}
</script>

<style lang="less" scoped>
  .el-header{
    background-color: #000;
  }
 
</style>