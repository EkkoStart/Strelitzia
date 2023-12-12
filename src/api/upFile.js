import request from '@/utils/request'

export function getCount(){
    return request({
        url:'/compute',
        method:'get'
    })
}
export function upFile(data,type){
    return request({
        url:'/up'+type,
        method:'post',
        headers:{
            'Content-Type': 'multipart/form-data'
        },
        data:data,
    })
}


