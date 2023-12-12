import request from '@/utils/request'

export function getPic(){
    return request({
        url:'/getpictures',
        method:'get',
    })
}

export function getFun(){
    return request({
        url:'/getfuns',
        method: 'get',
    })
}