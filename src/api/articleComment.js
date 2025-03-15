import request from '@/utils/request'
const baseURL = 'article'
export function addComment(content,articleId){
    return request({
        url:baseURL+'/comment/add',
        method:'post',
        params:{
            content:content,
            articleId:articleId
        }
    })
}

export function getComment(articleId){
    return request({
        url:baseURL+'/comment/'+articleId,
        method:'get',
    })
}

export function addOrDeleteThumb(commentId,articleId){
    return request({
        url:baseURL+'/comment_thumb',
        method:'post',
        params:{
            commentId:commentId,
            articleId:articleId
        }
    })
}

export function getThumbStatus(articleId){
    return request({
        url:baseURL+'/comment_thumb',
        method:'get',
        params:{
            articleId:articleId
        }
    })
}

export function deleteComment(commentId,articleId){
    return request({
        url:baseURL+'/comment/delete',
        method:'post',
        params:{
            commentId:commentId,
            articleId:articleId
        }
    })
}


