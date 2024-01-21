<template>
    <div class="article-lists">
        <n-card class="!border-none" shadow="never">
            <n-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
                <n-form-item label="文章标题">
                    <n-input
                        class="w-[280px]"
                        v-model="queryParams.title"
                        clearable
                        @keyup.enter="resetPage"
                    />
                </n-form-item>
                <n-form-item>
                    <n-grid :cols="24" :x-gap="24">
                    <n-form-item-gi :span="12" label="文章状态">
                        <n-select
                        v-model:value="queryParams.isShow"
                        placeholder="Select"
                        :options="generalOptions"
                        />
                    </n-form-item-gi>
                    </n-grid>
                </n-form-item>
                <n-form-item>
                    <n-button type="primary" @click="resetPage">查询</n-button>
                    <n-button @click="resetParams">重置</n-button>
                </n-form-item>
            </n-form>
        </n-card>
        <n-card class="!border-none mt-4" shadow="never">
            <div>
                <n-button type="primary" class="mb-4">
                    <template #icon>
                        <i class="ri-add-fill"></i>
                    </template>
                    发布文章
                </n-button>
            </div>
            <n-data-table
            :columns="createColumns()"
            :data="data"
            :pagination="pagination"
            :bordered="false"
            />
        </n-card>
    </div>
</template>

<script setup>
import {NCard,NInput,NForm,NFormItem,NFormItemGi,NButton,NGrid,NSelect,NDataTable} from 'naive-ui'
import {reactive } from 'vue'
    const queryParams = reactive({
        title: '',
        isShow: ''
    })
    const generalOptions = ["折线图", "柱状图", "饼图", "雷达图"].map(
        (v) => ({
          label: v,
          value: v
        })
      )
      
    const createColumns = () => {
    return [
        {
        title: "No",
        key: "no"
        },
        {
        title: "Title",
        key: "title"
        },
        {
        title: "Length",
        key: "length"
        },
        {
        title: "Action",
        key: "actions",
        }
    ];
    };

    const data = [
    { no: 3, title: "Wonderwall", length: "4:18" },
    { no: 4, title: "Don't Look Back in Anger", length: "4:48" },
    { no: 12, title: "Champagne Supernova", length: "7:27" }
    ];
    const pagination = false
    function  resetPage(){

    }
    function resetParams(){

    }
</script>

<style lang="scss" scoped>

</style>