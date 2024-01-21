<template>
    <n-breadcrumb v-for="item in list" :key="item.id">
        <n-breadcrumb-item>
            <n-icon :component="item.name" /> 北京总行
        </n-breadcrumb-item>
  
    </n-breadcrumb>
</template>

<script setup>
import { NBreadcrumb,NBreadcrumbItem,NIcon} from 'naive-ui'
import { computed, ref, watchEffect } from 'vue'
    const props = defineProps(['componentInfo'])
    const componentInfo = computed(()=>props.componentInfo)
    const list = ref([])
    watchEffect(()=>{
        updateList();
    })
    function updateList(){
        if(componentInfo.value){
            list.value.push(componentInfo.value)
            console.log(7777)
        }
    }
</script>

<style lang="scss" scoped>

</style>