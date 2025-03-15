import request from '@/utils/request'

export function getUser(){
    return request({
        url:'/user',
        method:'get',
    })
}

export function selectUser(queryParams){
    return request({
        url:'/user/search',
        method:'get',
        params:queryParams
    })
}
export function getDetail(id){
    return request({
        url:'/user/search',
        method:'get',
        params: {
            id:id
        }
    })
}

