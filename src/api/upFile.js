import request from '@/utils/request'

export function getCount(){
    return request({
        url:'/compute',
        method:'get'
    })
}
export function upFile(data,type){
    return request({
        url:'pic/upload?type='+type,
        method:'post',
        headers:{
            'Content-Type': 'multipart/form-data'
        },
        data:data,
    })
}


