<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add'? '新增用户':'更新用户'"
      :visible.sync='isShow'
    >
      <common-form 
        :formLabel='operateFormLabel'
        :form='operateForm'
        :inline='true'
        ref="form"
      >
      </common-form>
      <div slot='footer' class="dialog-footer">
        <el-button @click='isShow=false'>取消</el-button>
        <el-button type='primary' @click="confirm">确定</el-button>
      </div>
    </el-dialog>

    <div class="manage-header">
      <el-button type='primary' @click="addUser">新增</el-button>
      <common-form 
        :formLabel='formLabel'
        :form='searchForm'
        :inline='true'
        ref="form"
      >
        <el-button type='primary' @click="getList(searchForm.undefined)">搜索</el-button>
      </common-form> 
    </div>
    <common-table
      :tableData='tableData'
      :tableLabel='tableLabel'
      :config='config'
      @changePage='getList()'
      @edit='editUser'
      @del='delUser'
    >

    </common-table>
  </div>
  
</template>

<script>

import CommonForm from 'components/content/commonform/CommonForm.vue'
import CommonTable from 'components/content/commontable/CommonTable.vue'
import {getUser} from '@/api/data.js'
export default {
  name:'User',
  components:{
    CommonForm,
    CommonTable,
  },
  data(){
    return {
      operateType:'add',
      isShow:false,
      operateFormLabel: [
                    {
                        model: 'name',
                        label: '姓名',
                        type: 'input'
                    },
                    {
                        model: 'age',
                        label: '年龄',
                        type: 'input'
                    },
                    {
                        model: 'sex',
                        label: '性别',
                        type: 'select',
                        opts: [
                            {
                                label: '男',
                                value: 1
                            },
                            {
                                label: '女',
                                value: 0
                            }
                        ]
                    },
                    {
                        model: 'birth',
                        label: '出生日期',
                        type: 'date'
                    },
                    {
                        model: 'addr',
                        label: '地址',
                        type: 'input'
                    }
                ],
      //修改表单元素通过双向绑定，修改传入进去的数据
      operateForm:{
        addr:'',
        age:'',
        birth:'',
        sex:'',
        name:''
      },
      formLabel:[
        {
          mode:'keyword',
          label:'',
          type:'input'
      }
      ],
      searchForm:{
      },
      tableData:[],
      tableLabel:[
        {
          prop:'name',
          label:'姓名'
        },
        {
          prop:'age',
          label:'年龄'
        },
        {
          prop:'sexLabel',
          label:'性别'
        },
        {
          prop:'birth',
          label:'出生日期',
          width:200
        },
        {
          prop:'addr',
          label:'地址',
          width:320
        }

      ],
      config:{
        page:1,total:30
      }
    }

  },
  methods:{
    confirm(){
      //判断是新增add还是编辑页面edit
      if (this.operateType==='edit') {
        this.$http.post('/user/edit',this.operateForm).then(res=>{
          this.isShow =false
          console.log(res);
          this.getList()

        })        

      }else{
        // 1.关闭弹窗，2.更新数据
        this.$http.post('/user/add',this.operateForm).then(res=>{
          console.log(res);
          this.isShow =false
          this.getList()
        }) 
      }
    },
    
    addUser(){
      // 打开dialog
      this.isShow=true;
      this.operateType='add'
      this.operateForm={
        addr:'',
        age:'',
        birth:'',
        sex:'',
        name:''
      }
    },
    editUser(row){
      this.operateType='edit'
      this.isShow=true
      this.operateForm=JSON.parse(JSON.stringify(row))
      },
    delUser(row){
      this.$confirm('此操作将永久删除该组件，是否继续？','提示',{
        confirmButtonText:'确认',
        canceButtonText:'取消',
        type:'warning'
      }).then(()=>{
        const id =row.id
        this.$http.post("/user/del",{
          params:{id}
        }).then(()=>{
          this.$message({
              type:'success',
              message:'删除成功'
            
          })
          this.getList()
        })
      })
    },
    getList(name=''){
      this.config.loading=true;
      name ? (this.config.page=1):''
      getUser({
        page:this.config.page,
        name
      }).then((res)=>{
        console.log(res,'res');
        this.tableData=res.list.map(item=>{
          item.sexLabel=item.sex===0? "女":'男'
          return item
        })
        this.config.total=res.count
        this.config.loading=false
      })
    },
  },
  created(){
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.manage-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>