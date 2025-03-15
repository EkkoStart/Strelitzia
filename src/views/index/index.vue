<template>
    <div class="preloader" ref="preloader">
        <div class="preloader-wrapper">
            <div class="loading">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>
        </div>
    </div>
    <div id="container-wrapper">
        <div class="topbar-wrapper" ref="topbar">
            <Topbar/>
        </div>
        <div class="main-container">
            <router-view  v-slot="{ Component, route }">
                <keep-alive >
                    <component :is="Component" :key="route.fullPath" />
                </keep-alive>
            </router-view>
        </div>
    </div>
</template>
<script setup>
import {defineAsyncComponent,markRaw,onMounted,ref, watch, watchEffect} from 'vue'
import { useRoute } from 'vue-router'
    const Topbar = defineAsyncComponent(()=>import('@/components/topbar.vue'))
    const route = useRoute()
    const preloader = ref(null)
    const topbar = ref(null)
    let flag = false
    watchEffect(()=>{
        if(!flag && preloader.value && topbar.value && route.fullPath == '/index'){
            flag = true
            topbar.value.style.opacity = 0
            preloader.value.style.display = 'inline'
        }
    })
</script>
<style lang="scss" scoped>
    #container-wrapper{
        height: 100%;
        width: 100%;
    }
    .topbar-wrapper{
        opacity: 1;
    }
    .preloader{
        display: none;
        position: fixed;
        background-color: #FFFFEC;
        width: 100%;
        height: 100vh;
        z-index: 99999999999;
    }

    .preloader-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .loading{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .circle{
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin: 7px;
        background-color: #7BD3EA;
        animation: load 1s ease-in-out infinite;
    }

    .circle:nth-child(2){
    animation-delay: .1s;
    }
    .circle:nth-child(3){
    animation-delay: .2s;
    }

    @keyframes load {
    0%{
        transform: translateY(0);
    }
    20%{
        transform: translateY(-12px);
    }
    40%{
        transform: translateY(0);
    }
    }


</style>