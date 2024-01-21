<template>
    <div class="bi-content-wrapper">
        <Ques @upload = "upload" :succeed="succeed"/>
        <div class="res-wrapper" v-show="!flag">
            <div class="res-chart">
                <h3>结果图表:</h3>
                <div class="chart-wrapper">
                    <div class="chart" ref="chart"></div>
                </div>
            </div>
            <div class="res-analyze">
                <h3>分析结果:</h3>
                <n-p style="font-size:1.2rem">{{result}}</n-p>
            </div>
        </div>
        <div class="example-wrapper" v-show = "flag">
            <div class="charts">
                <div class="line-chart">
                    <n-p class="anno">折线图</n-p>
                    <div class="chart1" ref="lineChartRef"></div>
                </div>
                <div class="bar-chart">
                    <n-p class="anno">柱状图</n-p>
                    <div class="chart1" ref="barChartRef"></div>
                </div>
                <div class="radar-chart">
                    <n-p class="anno">雷达图</n-p>
                    <div class="chart1" ref="radarChartRef"></div>
                </div>
                <div class="pie-chart">
                    <n-p class="anno">饼图</n-p>
                    <div class="chart1" ref="pieChartRef"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {NP,useMessage} from 'naive-ui'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watchEffect} from 'vue';
import Ques from '../ques/ques.vue'
import * as echarts from "echarts";
import {BiSubmit} from '@/api/chart.js'
import { useStore } from 'vuex';
import throttle from '@/utils/throttle.js'
import {lineOption,barOption,radarOption,pieOption} from '@/assets/chartData.js'
    
    const message = useMessage();
    const emit = defineEmits(['changeShow'])
    const show = ref(false)
    const succeed = ref(false)
    const chart = ref(null)
    const lineChartRef = ref(null)
    const barChartRef = ref(null)
    const radarChartRef = ref(null)
    const pieChartRef = ref(null)
    const flag = ref(true)
    const chartInit = ref()
    const store = useStore();
    const token = computed(()=> store.state.token)
    const option = ref({});
    const result = ref()
    watchEffect(()=>{
        emit('changeShow',show.value)
    })
    onMounted(()=>{
        echarts.init(lineChartRef.value).setOption(lineOption)
        echarts.init(barChartRef.value).setOption(barOption)
        echarts.init(radarChartRef.value).setOption(radarOption)
        echarts.init(pieChartRef.value).setOption(pieOption)
    })
    function upload(data){
        data[0].token = token.value;

        succeed.value = false 

        show.value = true

        if(flag.value){
            flag.value = false
            nextTick(()=>{
                chartInit.value = echarts.init(chart.value)
                window.addEventListener('resize',throttle(chartInit.value.resize,1000))
            })
        }else chartInit.value.clear()

        BiSubmit(data[1],data[0]).then(res => {

            console.log(res.data.data)

            if(res.data.code != 1){
                message.error(res.data.msg)
                show.value = false
                return 
            }
        
            var regex = /\{([\s\S]*)\}/; // 匹配 { } 中的任意字符（包括换行符）
     
            result.value = res.data.data.analyzeResult

            option.value = JSON.parse(res.data.data.chartCode.match(regex)[0])
           
            console.log(option.value)

            chartInit.value.setOption(option.value)
         
            show.value = false
            
            succeed.value = true 

            message.success("生成成功");
        }).catch(e => {
            console.log(e)
            message.error("发送失败："+e);
            show.value = false
        })
    }
    function handleChange(options){
        fileList.value = options.fileList.length
    }
  
</script>

<style lang="scss" scoped>
@import url('./bi.scss');
</style>