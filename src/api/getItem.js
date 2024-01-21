import request from '@/utils/request'

export function getPic(){
    return request({
        url:'/pic',
        method:'get',
    })
}
