<template>
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
</template>

<script setup>
    import {NUpload,NUploadDragger,NText,NP,NForm,NFormItem,NInput,NFormItemGi,NSelect,NGrid,NButton} from 'naive-ui'
    import {ref, watchEffect} from 'vue'
    const emit = defineEmits(['upload'])
    const props = defineProps(['succeed'])
    const chartData = ref({
        chartType:"",
        goal:"",
        chartName:""
    })
    const formData = new FormData()
    const uploadRef = ref(null)
    const fileList = ref(0)
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
    watchEffect(()=>{
        if(props.succeed == true){
            fileList.value = 0
            uploadRef.value.clear()
            chartData.value.chartName = chartData.value.chartType = chartData.value.goal = ''
            
        }
    })
    const customRequest = ({
      file
    }) => {
      formData.append('file',file.file);
    }
    function handleChange(options){
        fileList.value = options.fileList.length
    }
    function upload(){
        emit('upload',[chartData.value,formData])
    }
</script>

<style lang="scss" scoped>
@import url('./ques.scss');
</style>