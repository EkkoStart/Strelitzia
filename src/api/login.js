import request from '@/utils/request'

export function login(username,password){
    const data ={
        username,
        password
    }
    return  request({
        url: '/user/login',
        method: "post",
        data: data,
      })
}

export function getInfo(){
    return  request({
        url: 'user/getInfo',
        method: "get",
      })
}

export function register(registerInfo){
    return request({
        url: '/user/register',
        method: "post",
        data : registerInfo
    })
  
}