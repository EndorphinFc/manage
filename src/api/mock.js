import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'


Mock.mock('/home/getData',homeApi.getStatisticalData)

Mock.mock(/user\/add/,'post',userApi.createUser)
Mock.mock(/user\/edit/,'post',userApi.updateUser)

// 用户页面
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/del/,'post',userApi.deleteUser)

// 登录页面
Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)


//        模拟后台数据地址，后台数据

//mock是拦截ajax请求 而产生的框架

/*
1.安装mockjs/
2.api中创建mock.js文件
import Mock from 'mock.js'
通过组件化思想再把请求单独作为不同的文件夹
3.创建homeapi，再里面写入mock请求需要的数据，在通过Mock.mock（url，data）进行数据拦截
*/