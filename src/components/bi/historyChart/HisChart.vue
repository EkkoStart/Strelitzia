<template>
    <div class="hisChart-wrapper">
        <div class="cards">
            <div class="card" v-for="item in chartList" :key="item.id">
                <n-card
                    style="box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"
                >
                    <template #header >
                        <!-- <n-skeleton v-if="item.status != 'succeed'" text width="60%" /> -->
                            <n-avatar
                            round
                            size="large"
                            :src=avatar
                            />                 
                    </template>

                    
                    <template #header-extra >
                        <!-- <n-skeleton v-if="item.status != 'succeed'" text width="60%" /> -->
                        <div class="header-extra">
                            <p class="chartName">{{item.chartName}}</p>
                            <p>{{changeISOToformatDate(item.createTime)}}</p>
                        </div> 
                    </template>
                    <!-- <n-skeleton v-if="item.status != 'succeed'" text width="60%" /> -->
             
                        分析目标：{{item.goal}}
                        <div class="genChart"></div>
                        <div class="genResult">{{item.genResult}}</div>
            
               
                </n-card>
            </div>
        </div>
        <n-pagination v-model:page="page" :page-count="pageCount" 
            style="justify-content: center; margin-top:30px"
            @click="getPageChart"
        />
    </div>
</template>

<script setup>
import {NAvatar, NCard,NSkeleton,NPagination} from 'naive-ui'
import { computed, nextTick, onMounted, ref, watchEffect } from 'vue'
import {getHisChart} from '@/api/chart.js'
import { useStore }  from 'vuex'
import * as echarts from 'echarts'
import {changeISOToformatDate} from '@/utils/validate'
    const store = useStore();
    const avatar = computed(()=>store.state.avatar);
    const page = ref(1)
    const pageSize = 3
    const pageCount = ref(3)
    const chartList = ref([])
    const genChartRefs = ref()
    onMounted(async () => {
        await getPageChart()
    })
    function renderChart(){
        const regex = /\{([\s\S]*)\}/; // 匹配 { } 中的任意字符（包括换行符）

        for(let i = 0 ;i< chartList.value.length ; i++){
            const initialChartData = chartList.value[i].genChart.match(regex)[0]
            const chartData = JSON.parse(initialChartData)
            const chartInit = echarts.init(genChartRefs.value[i])
            chartInit.clear()
            chartInit.setOption(chartData);
        }
    }
    async function getPageChart(){
       await getHisChart(page.value,pageSize).then(res =>{
            if(res.data.code == 1){
                chartList.value = res.data.data
            }else{
                message.error("获取历史图表失败")
                console.log(res.data.msg)
            }
       }).catch(e =>{
            console.log(e)
       })
       nextTick(()=>{

            genChartRefs.value = document.querySelectorAll('.genChart')
            renderChart();
        }) 
    }

</script>

<style lang="scss" scoped>
@import url('./hisChart.scss');
</style>