import request from '@/utils/request'

export function addArticle(articleData){
    return request({
        url:'/article',
        method:'post',
        data:articleData
    })
}

export function getArticle(queryParams){
    return request({
        url:'/article',
        method:'post',
        data:queryParams
    })
}

export function getArticleDataById(id){
    return request({
        url:'/article/'+id,
        method:'get'
    })
}

export function editArticle(articleData){
    return request({
        url:'/article/update',
        method:'post',
        data:articleData
    })
}

export function deleteArticle(id){
    return request({
        url:'/article/delete',
        method:'get',
        params:{
            articleId:id
        }
    })
}
