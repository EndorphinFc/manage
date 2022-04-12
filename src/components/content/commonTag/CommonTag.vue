<template>
  <div class="tabs">
    <el-tag
    v-for="(tag,index) in tags"
    :key="tag.name"
    :closable="tag.name!=='home'"
    :effect='$route.name===tag.name? "dark":"plain"'
    @click="changeMenu(tag)"
    @close="handleClose(tag,index)"
    size='small'
    >
      {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export  default {
  name:'CommonTag',
  data(){
    return{}
  },
  computed:{
    ...mapState({
      tags:state=>state.tab.tabsList
    }
    )
  },
  methods:{
    ...mapMutations({
      close:'closeTag'
    }),
    changeMenu(tag){
      // 点击切换路由
      this.$router.push({name:tag.name})
    },
    handleClose(tag,index){
      //面包屑中也会进行删除，所以应该是vuex中tablist进行删除
      const length=this.tags.length-1;
      this.close(tag)
      if (tag.name!==this.$route.name) {
        return;
      }
      if(index===length)
      {
        this.$router.push({
          name:this.tags[index-1].name 
        })
      }else{
        this.$router.push({
          name:this.tags[index].name 
        })
      }

    },
   
  }
}
</script>

<style lang="less" scoped>
  .tabs{
    padding: 20px;
    .el-tag{
      margin-right: 15px;
      cursor:pointer;
    }
  }
</style>