import request from '@/utils/request'



export function getChat(id,timestamp){
    return request({
        url:'chat/'+id,
        method:'get',
        params:{
            timestamp:timestamp
        }
    })
}

export function getChatList(){
    return request({
        url:'chat/list',
        method:'get'
    })
}

export function getContact(){
    return request({
        url:'contact',
        method:'get'
    })
}

export function getContactInfo(username){
    return request({
        url:'/user/'+username,
        method:'get'
    })
}

