import request from '@/utils/request'

export function addInternal(internalData){
    return request({
        url:'/internal/add',
        method:'post',
        data:internalData
    })
}

export function getInternal(queryParams){
    return request({
        url:'/internal',
        method:'post',
        data:queryParams
    })
}

export function getInternalDataById(id){
    return request({
        url:'/internal/'+id,
        method:'get'
    })
}

export function editInternal(internalData){
    return request({
        url:'/internal/update',
        method:'post',
        data:internalData
    })
}

export function deleteInternal(id){
    return request({
        url:'/internal/delete',
        method:'get',
        params:{
            internalId:id
        }
    })
}
