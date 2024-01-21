import request from '@/utils/request'


export function getGroupMsg(timestamp){
    return request({
        url:'/group',
        method:'get',
        params:{
            timestamp:timestamp
        }
    })
}

export function getOnline(){
    return request({
        url:'/group/online',
        method:'get'
    })
}