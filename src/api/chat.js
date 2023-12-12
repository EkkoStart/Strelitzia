import request from '@/utils/request'



export function getOffline(id){
    return request({
        url:'chat/offline',
        method:'get',
        params:{
            uid:id
        }
    })
}

export function getOnline(){
    return request({
        url:'/chat/online',
        method:'get'
    })
}