import request from '@/utils/request'

export function addContact(id){
    return request({
        url:'contact/'+id,
        method:'get',
    })
}

export function delContact(id){
    return request({
        url:'contact/del/'+id,
        method:'get',
    })
}

export function getContactRequest(){
    return request({
        url:'contact/request',
        method:'get'
    })
}

export function handleContactRequest(id,status){
    return request({
        url:'contact/request/del',
        method:'get',
        params:{
            id:id,
            status:status
        }
    })
}


