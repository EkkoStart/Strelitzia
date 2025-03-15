<template>
    <div class="user-lists" >
        <n-card class="card search-wrapper" shadow="never">
            <n-form ref="formRef"  :model="queryParams" :inline="true" 
                label-placement="left"
            >
                <n-form-item label="用户名">
                    <n-input
                        v-model:value="queryParams.username"
                        clearable
                        placeholder="用户名"
                        @keyup.enter="resetPage"
                    />
                </n-form-item>
                <n-form-item label="用户ID">
                    <n-input
                        v-model:value="queryParams.id"
                        clearable
                        placeholder="用户ID"
                        @keyup.enter="resetPage"
                    />
                </n-form-item>
                <n-form-item>
                    <n-button type="primary" @click="resetPage" style="marginRight:15px">查询</n-button>
                    <n-button @click="resetParams">重置</n-button>
                </n-form-item>
            </n-form>
        </n-card>
        <n-card class="card lists" shadow="never">
            <n-data-table
            :columns="createColumns()"
            :data="userData"
            :pagination="pagination"
            :bordered="false"
            />
        </n-card>
    </div>
</template>

<script setup>
import {NCard,NInput,NForm,NFormItem,NFormItemGi,NButton,NGrid,NSelect,NDataTable, NAvatar} from 'naive-ui'
import {defineAsyncComponent, reactive, ref, h, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {getUser,selectUser} from '@/api/manage/user'
    const router = useRouter()
    const baseURL = "/manage/user/detail"
    const queryParams = ref({
        username: '',
        id: ''
    })
    const userData = ref()
    onMounted(()=>{
        getUser().then(res =>{
            if(res.data.code == 1){
                console.log(res.data.data)
                userData.value = res.data.data
            }
        })
    })
    const createColumns = (row) => {
    return [
        {
        title: "用户ID",
        key: "id",
        ellipsis: true
        },
        {
        title: "头像",
        key: "avatar",
        render(row) {
            return h(
            NAvatar,
            {
                src:row.avatar,
                size:'medium',
                round:true,
                style:{
                    height:"50px",
                    width:"50px"
                }
            },
            )
        }
        },
        {
        title: "昵称",
        key: "username"
        },
        {
        title: "手机号",
        key: "phone",
        ellipsis: true,
        },
        {
        title: "邮箱",
        key: "email",
        ellipsis: true
        },
        {
        title: "注册时间",
        key: "createTime"
        },
        {
        title: "操作",
        key: "actions",
        render(row) {
            return h(
            NButton,
            {
                strong: true,
                tertiary: true,
                size: "small",
                onClick: () => getDetail(row)
            },
            { default: () => "详情" }
            )
        }
        },
    ];
    };

    const pagination={
        pageSize: 8
      }
    function  resetPage(){
        console.log(queryParams.value)
        if(queryParams.value.id == '' && queryParams.value.username == ''){
                getUser().then(res =>{
                if(res.data.code == 1){
                    userData.value = res.data.data
                }
            })
        }else {
            selectUser(queryParams.value).then(res =>{
                if(res.data.code == 1){
                    userData.value = res.data.data
                }
            })
        }
        resetParams()
    }
    function resetParams(){
        queryParams.value.username =''
        queryParams.value.id = ''
    }
    function getDetail(row){
        router.push( baseURL + '?uid=' +row.id)
    }
</script>

<style lang="scss" scoped>
    @import url("./index.scss");
</style>