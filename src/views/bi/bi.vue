<template>
    <div class="bi-wrapper">
        <n-space vertical>
            <n-spin :show="show">
                <template #description>
                    加载中
                </template>
                <div class="bi-content-wrapper">
                    <div class="ques-wrapper">
                        <n-form ref="formRef" :model="chartData" :rules="rules">
                            <n-form-item path="goal" label="分析目标">
                                <n-input v-model:value="chartData.goal" @keydown.enter.prevent placeholder="请输入分析目标"/>
                            </n-form-item>
                            <n-form-item  label="图表名称">
                                <n-input v-model:value="chartData.chartName" @keydown.enter.prevent placeholder="请输入分析图表名称"/>
                            </n-form-item>
                            <n-grid :cols="24" :x-gap="24">
                            <n-form-item-gi :span="12" label="图表类型">
                                <n-select
                                v-model:value="chartData.chartType"
                                placeholder="Select"
                                :options="generalOptions"
                                />
                            </n-form-item-gi>
                            </n-grid>
                        </n-form>
                            <n-upload
                            ref="uploadRef"
                            multiple
                            :custom-request="customRequest"
                            directory-dnd
                            @change="handleChange"
                            :max="1"
                        >
                            <n-upload-dragger>
                            <div >
                                <i class="ri-chat-upload-line" style="font-size: 2rem"></i>
                            </div>
                            <n-text style="font-size: 16px">
                                点击或者拖动文件到该区域来上传
                            </n-text>
                            <n-p depth="3" style="margin: 8px 0 0 0">
                                请上传需要分析的数据文件OvO
                            </n-p>
                            </n-upload-dragger>
                        </n-upload>
                        <n-button type="success" size="large" @click="upload()" :disabled = " !fileList">
                            发送
                        </n-button>
                    </div>
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
            </n-spin>
        </n-space>
        <!-- <button @click="test">xxxxx</button> -->
    </div>
</template>

<script setup>
import {NUpload,NUploadDragger,NText,NP,useMessage,NForm,NFormItem,NInput,NFormItemGi,NSelect,NGrid,NButton,NSpin,NSpace} from 'naive-ui'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watchEffect} from 'vue';
import * as echarts from "echarts";
import {BiSubmit} from '@/api/chart.js'
import { useStore } from 'vuex';
import throttle from '@/utils/throttle.js'
import {lineOption,barOption,radarOption,pieOption} from '@/assets/chartData.js'
    
    const message = useMessage();
    const show = ref(false)
    const formData = new FormData();
    const uploadRef = ref(null);
    const chart = ref(null)
    const lineChartRef = ref(null)
    const barChartRef = ref(null)
    const radarChartRef = ref(null)
    const pieChartRef = ref(null)
    const fileList = ref(0)
    const flag = ref(true)
    const chartInit = ref()
    const store = useStore();
    const token = computed(()=> store.state.token)
    const chartData = ref({
        token: token.value,
        chartType:"",
        goal:"",
        chartName:""
    })
    const generalOptions = ["折线图", "柱状图", "饼图", "雷达图"].map(
        (v) => ({
          label: v,
          value: v
        })
      )
    const rules = {
        goal: {
          required: true,
          trigger: ["blur", "input"],
          message: "请输入分析目标"
        },
    }
    const option = ref({});
    const result = ref()
  
    onMounted(()=>{
        echarts.init(lineChartRef.value).setOption(lineOption)
        echarts.init(barChartRef.value).setOption(barOption)
        echarts.init(radarChartRef.value).setOption(radarOption)
        echarts.init(pieChartRef.value).setOption(pieOption)
    })
    const customRequest = ({
      file
    }) => {
      formData.append('file',file.file);
    }
    function upload(){
        show.value = true

        if(flag.value){
            flag.value = false
            nextTick(()=>{
                chartInit.value = echarts.init(chart.value)
                window.addEventListener('resize',throttle(chartInit.value.resize,1000))
            })
        }else chartInit.value.clear()

        BiSubmit(formData,chartData.value).then(res => {

            console.log(res.data.data)
            const str = JSON.parse(res.data.data)
            var regex = /\{([\s\S]*)\}/; // 匹配 { } 中的任意字符（包括换行符）
     
            result.value = str.analyzeResult

            option.value = JSON.parse(str.chartCode.match(regex)[0])
           
            console.log(option.value)

            chartInit.value.setOption(option.value)
         
            show.value = false
        
            message.success("生成成功");
        }).catch(e => {
            console.log(e)
            message.error("发送失败："+e);
            show.value = false
        })
        uploadRef.value.clear()
     
    }
    function handleChange(options){
        fileList.value = options.fileList.length
    }
    function test(){
        window.removeEventListener('resize',resize);
    }

</script>

<style lang="scss" scoped>
@import url('./bi.scss');
</style>