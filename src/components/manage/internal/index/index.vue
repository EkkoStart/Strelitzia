<template>
    <div class="article-lists" >
        <n-card class="card search-wrapper" shadow="never">
            <n-form ref="formRef" :model="queryParams" :inline="true" 
                label-placement="left"
                class="search-content"
            >
            <n-grid :cols="2" :x-gap="24">
  
                <n-grid-item >
                    <n-form-item label="接口ID">
                    <n-input v-model:value="queryParams.title" clearable placeholder="接口ID" @keyup.enter="resetPage" />
                    </n-form-item>
                </n-grid-item>
                <n-grid-item >
                    <n-form-item label="接口名称">
                    <n-input v-model:value="queryParams.author" clearable placeholder="接口名称" @keyup.enter="resetPage" />
                    </n-form-item>
                </n-grid-item>
      
                <n-grid-item >
                    <n-form-item label="接口状态">
                    <n-select v-model:value="queryParams.status" placeholder="Select" :options="generalOptions" />
                    </n-form-item>
                </n-grid-item>
                <n-grid-item >
                    <n-form-item>
                    <n-button type="primary" @click="resetPage" style="marginRight:15px">查询</n-button>
                    <n-button @click="resetParams">重置</n-button>
                    </n-form-item>
                </n-grid-item>
            </n-grid>
            </n-form>
        </n-card>
        <n-card class="card lists">
            <div>
                <router-link :to="{ path: baseURL }" class="no-underline">
                <n-button type="primary" style="margin:10px">
                    <template #icon>
                        <i class="ri-add-fill"></i>
                    </template>
                    添加接口
                </n-button>
                </router-link> 
            </div>
            <n-data-table
            :columns="createColumns()"
            :data="internalData"
            :pagination="pagination"
            :bordered="false"
            />
        </n-card>
    </div>
</template>

<script setup>
import {NCard,NInput,NForm,NFormItem,NFormItemGi,NButton,NGrid,NGridItem,NSelect,NDataTable,useDialog,useMessage, NAvatar} from 'naive-ui'
import {defineAsyncComponent, reactive, ref, h, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {getInternal,deleteInternal} from '@/api/manage/internal.js'
import { changeISOToformatDate} from '@/utils/validate'
    const router = useRouter()
    const message = useMessage();
    const dialog = useDialog();
    const baseURL = "/manage/internal/edit"
    const queryParams = ref({
        id: '',
        name:'',
        status: ''
    })
    const generalOptions = ["上线", "下线"].map(
        (v) => ({
          label: v,
          value: v=="上线"? 1:0
        })
      )
      const pagination={
        pageSize: 8
      }
    const internalData = ref()
    onMounted(()=>{
        getInternal(queryParams).then(res =>{
            if(res.data.code == 1){
                internalData.value = res.data.data
                internalData.value.map((item) => item.createTime =  changeISOToformatDate(item.createTime));
            }
        })
    })

    const createColumns = (row) => {
    return [
        {
        title: "ID",
        key: "id"
        },
        {
        title: "名称",
        key: "name"
        },
        {
        title: "接口地址",
        key: "url",
        },
        {
        title: "接口状态",
        key: "status"
        },
        {
        title: "创建时间",
        key: "createTime"
        },
        {
        title: "调用次数",
        key: "count"
        },
        {
        title: "操作",
        key: "actions",
        render(row) {
            return [h(
            NButton,
            {
                strong: true,
                tertiary: true,
                size: "small",
                onClick: () => edit(row)
            },
            { default: () => "编辑" }
            ),
            h(
            NButton,
            {
                strong: true,
                tertiary: true,
                size: "small",
                style:{
                    marginLeft: "10px",
             
                },
                onClick: () => deleteA(row)
            },
            { default: () => "删除" }
            )
        ]
        }
        },
    ];
    };  
    function  resetPage(){
        getInternal(queryParams.value).then(res =>{
            if(res.data.code == 1){
                console.log(res.data)
                internalData.value = res.data.data
            }

        })
    }
    function resetParams(){
        queryParams.value.title = ''
        queryParams.value.status = ''
    }
    function edit(row){
        router.push(baseURL+'?internalId='+row.id)
    }
    function deleteA(row){
        dialog.warning({
          title: "提示",
          content: "确定删除该接口？删除后不可恢复",
          positiveText: "确定",
          negativeText: "取消",
          onPositiveClick: () => {
            deleteInternal(row.id).then(res =>{
                if(res.data.code == 1){
                    message.success("删除成功！")
                    getInternal().then(res =>{
                        console.log(res.data)
                        internalData.value = res.data.data
                    })
                }else {
                    message.error("删除失败!请重新尝试")
                }
            })
          },
        });
    }
</script>

<style lang="scss" scoped>
    @import url("./index.scss");
</style>