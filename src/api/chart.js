import request from '@/utils/request'

export function BiSubmit(file,analyzeData){
    return request({
        url:'/chart/analyze',
        method:'post',
        headers:{
            'Content-Type': 'multipart/form-data'
        },
        params:{
            token:analyzeData.token,
            chartName:analyzeData.chartName,
            goal:analyzeData.goal,
            chartType:analyzeData.chartType
        },
        data:file
    })
}