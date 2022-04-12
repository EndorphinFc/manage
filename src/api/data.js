import axios from "./axios"



export const getData=()=>{
  return axios.request({
    url:'/home/getData',//请求后台数据
    method:'get'
  })
}
export const getMenu = (params) => {
  return axios.request({
    url: '/permission/getMenu',
    method: 'post',
    data: params
  })
}
export const getUser = (params) => {
  return axios.request({
    url: '/user/getUser',
    method: 'get',
    params
  })
}
