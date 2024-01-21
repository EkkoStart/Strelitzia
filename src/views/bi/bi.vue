<template>
    <div class="bi-wrapper">
        <n-space vertical>
            <n-spin :show="show">
                <template #description>
                    加载中
                </template>
                <n-layout has-sider>
                    <n-layout-sider
                        bordered
                        collapse-mode="width"
                        :collapsed-width="64"
                        :width="150"
                        :collapsed="collapsed"
                        show-trigger
                        @collapse="collapsed = true"
                        @expand="collapsed = false"
                        style="margin-right:20px;height:650px" 
                     >
                        <n-menu
                        v-model:value="activeKey"
                        :collapsed="collapsed"
                        :collapsed-width="64"
                        :collapsed-icon-size="15"
                        :options="menuOptions"
                        />
                    </n-layout-sider >
                    <n-layout style="overflow: hidden;">
                        <keep-alive exclude="HisChart">
                            <component :is="activeComponent" @changeShow = "(value) => show = value"/>
                        </keep-alive>
                    </n-layout>
                </n-layout>
              
            </n-spin>
        </n-space>
    </div>
</template>

<script setup>
import {NSpin,NSpace,NLayout,NLayoutSider,NMenu} from 'naive-ui'
import { ref,h,defineAsyncComponent,watchEffect,markRaw} from 'vue'
const BiAnalyzeVue = defineAsyncComponent(()=>import('@/components/bi/biAnalyze/BiAnalyze.vue'))
const AsyncBiVue = defineAsyncComponent(()=>import('@/components/bi/biAsyncAnalyze/AsyncBi.vue'))
const HisChartVue = defineAsyncComponent(()=>import('@/components/bi/historyChart/HisChart.vue'))
const show = ref(false)
const collapsed = ref(true)
const activeKey = ref(1)
const activeComponent = ref(markRaw(BiAnalyzeVue))
watchEffect(()=>{
    if(activeKey.value == 1 ) activeComponent.value = markRaw(BiAnalyzeVue)
    if(activeKey.value ==2) activeComponent.value =markRaw(AsyncBiVue)
    if(activeKey.value==3) activeComponent.value = markRaw(HisChartVue)
})
const menuOptions = [
  {
    label: "智能分析",
    key: 1,
    icon: renderIcon('ri-magic-line')
  },
  {
    label: "异步分析",
    key: 2,
    icon: renderIcon('ri-vip-crown-2-line')
  },
  {
    label: "历史图表",
    key: 3,
    icon: renderIcon('ri-history-fill')
  },
]
     function renderIcon(className) {
        return () => h('i',{class:className});
    }
</script>

<style lang="scss" scoped>
.bi-wrapper{
    width: 100%;
    height: 100vh;
    padding-right: 30px;
    padding-top: 60px;
}
</style>