<template>
    <div class="internal-edit">
        <n-card class="card return-card">
            <div style="display: flex;">
                <div class="back" @click="$router.back()">
                    <i class="ri-arrow-left-line"></i>
                    <span style="padding:10px">返回</span>
                    </div>
                <span style="">接口编辑</span>
            </div>
   
        </n-card>
        <n-card  class="card add-card">
            <n-form
                ref="formRef"
                :model="formData"
                label-placement="left"
                inline
                label-width="85px"
                :rules="rules"
            >
                <div class="add-wrapper">
                    <div class="ls-form-item">
                        <n-form-item label="接口名称" path="name">
                            <div class="internal-input">
                                <n-input v-model:value="formData.internal.name" placeholder="请输入接口名称" />
                            </div>
                        </n-form-item>
                        <n-form-item label="接口描述" path="description">
                            <div class="internal-input">
                                <n-input v-model:value="formData.internal.description" placeholder="请输入接口描述" />
                            </div>
                        </n-form-item>
                        <n-form-item label="接口地址" path="author">
                            <div class="internal-input">
                                <n-input v-model:value="formData.internal.url" placeholder="请输入接口地址" />
                            </div>
                        </n-form-item>
                        
                        <n-form-item label="接口方法">
                            <div class="internal-input">
                            <n-select v-model:value="formData.internal.method" placeholder="Select" :options="methodOptions" />
                            </div> 
                        </n-form-item>
                        <n-form-item label="请求参数"  label-placement = "top">
                            <n-dynamic-input v-model:value="formData.request" :on-create="onCreateRequest">
                                <template #default="{ value }">
                                <div style="display: flex; align-items: center; width: 100%;">
                                    <n-input v-model:value="value.name" placeholder="参数名称"
                                        style="marginRight: 10px;"
                                    />
                                    <n-input v-model:value="value.type" placeholder="参数类型" 
                                        style="marginRight: 10px;"
                                    />
                                    <n-select v-model:value="value.isMust" placeholder="Select" 
                                        :options="paramOptions" 
                                        style="marginRight: 10px;"
                                    />
                                    <n-input v-model:value="value.description" placeholder="参数描述" 
                                        style="marginRight: 10px;"
                                    />
                                </div>
                                </template>
                            </n-dynamic-input>
                        </n-form-item>
                        <n-form-item label="响应参数"  label-placement = "top">
                            <n-dynamic-input v-model:value="formData.response" :on-create="onCreateResponse">
                                <template #default="{ value }">
                                <div style="display: flex; align-items: center; width: 100%;">
                                    <n-input v-model:value="value.name" placeholder="参数名称"
                                        style="marginRight: 10px;"
                                    />
                                    <n-input v-model:value="value.type" placeholder="参数类型" 
                                        style="marginRight: 10px;"
                                    />
        
                                    <n-input v-model:value="value.description" placeholder="参数描述" 
                                        style="marginRight: 10px;"
                                    />
                                </div>
                                </template>
                            </n-dynamic-input>
                        </n-form-item>
                        <n-form-item label="接口状态"  path="isShow">
                            <n-radio-group v-model:value="formData.internal.status" name="radiogroup">
                                <n-radio v-for="status in status" :key="status.value" :value="status.value">
                                    {{ status.label }}
                                </n-radio>
                            </n-radio-group>
                        </n-form-item>
                        <n-form-item label="接口示例" path="author" >
                        <div class="internal-input">
                            <n-input v-model:value="formData.internal.example"  />
                        </div>
                        </n-form-item>
                    </div>
                </div>
            </n-form>
        </n-card>
        <footer-btns>
            <n-button type="primary" @click="handleSave">保存</n-button>
        </footer-btns>
    </div>
</template>

<script setup>
import {NButton,NForm,NFormItem,NInput,NCard,NRadio,NRadioGroup,NText,NP,NInputNumber,NSelect,NDynamicInput, useMessage} from 'naive-ui'
import {onMounted, reactive, ref} from 'vue'
import footerBtns from '@/components/footer-btns.vue'
import { useRoute, useRouter } from 'vue-router'
 import {addInternal,getInternalDataById,editInternal} from '@/api/manage/internal.js' 
    const router = useRouter()  
    const route = useRoute()
    const message = useMessage()
    const isEdit = ref(false)
    const formRef = ref(null)
    const fileData = new FormData()
    const methodOptions = ["GET", "POST"].map(
        (v) => ({
          label: v,
          value: v
        })
      )
    const paramOptions = ["必填", "可选"].map(
        (v) => ({
          label: v,
          value: v=="必填"? 1:0
        })
      )
    const formData = ref({
        internal:{
            name:"",
            description:"",
            method:"",
            url:"",
            status:0,
            example:""
        },
        request:[

        ],
        response:[

        ]
    })
    onMounted(()=>{
        const id = route.query.internalId
        if(id){
            isEdit.value = true
            getInternalDataById(id).then(res =>{
                console.log(res.data)
                formData.value = res.data.data;
            })
        }
    })
    const rules = reactive({
        
    })  
    const status = [
        {
          value: 1,
          label: "上线"
        },
        {
          value: 0,
          label: "下线"
        }
      ].map((s) => {
        return s;
      })
    function handleSave(){
        //console.log(formData.value.request)
        formRef.value?.validate((errors) => {
          if (!errors) {
            if(!isEdit.value){
                addInternal(formData.value).then(res =>{
                    if(res.data.code == 1){
                        console.log(res.data)
                        message.success("发布成功！")
                    }
            })}
            else {
                editInternal(formData.value).then(res =>{
                    if(res.data.code == 1){
                        console.log(res.data)
                        message.success("修改成功！")
                    }
                })
            }
          } else {
            console.log(errors);
            
          }
        });
    }

    function onCreateRequest(){
        return {
          name: "",
          type: "",
          isMust: 1,
          description: ""
        };
    }
    function onCreateResponse(){
        return {
          name: "",
          type: "",
          description: ""
        };
    }

</script>

<style lang="scss" scoped>
    @import url('./index.scss');
</style>