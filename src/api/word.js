import request from '@/utils/request'

export function upWord(msg){
    console.log(msg)
    return request({
        url:'/upword',
        method:'post',
        data:msg
    })
}

export function getWord(){
    return request({
        url:'getword',
        method:'get',
    })
}


