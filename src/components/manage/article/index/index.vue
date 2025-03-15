<template>
    <div class="article-lists" >
        <n-card class="card search-wrapper" shadow="never">
            <n-form ref="formRef" :model="queryParams" :inline="true" 
                label-placement="left"
                class="search-content"
            >
            <n-grid :cols="2" :x-gap="24">
      <!-- 前两个表单项 -->
                <n-grid-item >
                    <n-form-item label="文章标题">
                    <n-input v-model:value="queryParams.title" clearable placeholder="标题" @keyup.enter="resetPage" />
                    </n-form-item>
                </n-grid-item>
                <n-grid-item >
                    <n-form-item label="作者">
                    <n-input v-model:value="queryParams.author" clearable placeholder="作者" @keyup.enter="resetPage" />
                    </n-form-item>
                </n-grid-item>
                <!-- 后两个表单项 -->
                <n-grid-item >
                    <n-form-item label="文章状态">
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
                    发布文章
                </n-button>
                </router-link> 
            </div>
            <n-data-table
            :columns="createColumns()"
            :data="articleData"
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
import {getArticle,deleteArticle} from '@/api/manage/article.js'
    const router = useRouter()
    const message = useMessage();
    const dialog = useDialog();
    const baseURL = "/manage/articleManage/edit"
    const queryParams = ref({
        title: '',
        author:'',
        status: ''
    })
    const generalOptions = ["显示", "隐藏"].map(
        (v) => ({
          label: v,
          value: v=="显示"? 1:0
        })
      )
      const pagination={
        pageSize: 8
      }
    const articleData = ref()
    onMounted(()=>{
        getArticle(queryParams).then(res =>{
            if(res.data.code == 1){
                articleData.value = res.data.data
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
        title: "封面",
        key: "avatar",
        render() {
            return h(
            NAvatar,
            {
                src:"https://wuzhenlang.oss-cn-beijing.aliyuncs.com/ABAA8002075F5FABF2EB84B531FF309E.jpg",
                size:'medium',
                style:{
                    height:"50px",
                    width:"50px"
                }
            },
            )
        }
        },
        {
        title: "标题",
        key: "title"
        },
        {
        title: "作者",
        key: "author",
        },
        {
        title: "浏览量",
        key: "views"
        },
        {
        title: "状态",
        key: "status"
        },
        {
        title: "发布时间",
        key: "createTime"
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
        getArticle(queryParams.value).then(res =>{
            if(res.data.code == 1){
                console.log(res.data)
                articleData.value = res.data.data
            }

        })
    }
    function resetParams(){
        queryParams.value.title = ''
        queryParams.value.status = ''
    }
    function edit(row){
        router.push(baseURL + '?articleId='+row.id)
    }
    function deleteA(row){
        dialog.warning({
          title: "提示",
          content: "确定删除文章？删除后不可恢复",
          positiveText: "确定",
          negativeText: "取消",
          onPositiveClick: () => {
            deleteArticle(row.id).then(res =>{
                if(res.data.code == 1){
                    message.success("删除成功！")
                    getArticle().then(res =>{
                        console.log(res.data)
                        articleData.value = res.data.data
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