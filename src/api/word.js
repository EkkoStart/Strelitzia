import request from '@/utils/request'

export function addComment(content){
    return request({
        url:'comment/add',
        method:'post',
        params:{
            content:content
        }
    })
}

export function getComment(){
    return request({
        url:'/comment',
        method:'get',
    })
}

export function addOrDeleteThumb(commentId){
    return request({
        url:'/comment_thumb',
        method:'post',
        params:{
            commentId:commentId
        }
    })
}

export function getThumbStatus(){
    return request({
        url:'/comment_thumb',
        method:'get',
    })
}

export function deleteComment(commentId){
    return request({
        url:'/comment/delete',
        method:'post',
        params:{
            commentId:commentId
        }
    })
}


