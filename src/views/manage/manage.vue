<template>
    <div class="manage-wrapper">
        <div class="siderbar-wrapper">
        <n-scrollbar trigger="hover" style="max-height: 100vh">
            <nav class="sidebar locked" ref="siderbarRef">
                <div class="logo_items flex">
                    <span class="nav_image">
                        <img :src=logo
                        alt="logo_img">
                    </span>
                    <span class="logo_name">Strelitzia</span>
                </div>
                <div class="menu_container">
                    <div class="menu_items">
                        <ul class="menu_item">
                            <div class="menu_title flex">
                                <span class="title">Dashboard</span>
                                <span class="line"></span>
                            </div>
                            <li class="item" properties="analyze">
                                <div href="#" class="link flex">
                                    <i class="ri-bar-chart-fill"></i>
                                    <span class="name">分析页</span>
                                </div>
                            </li>
                            <li class="item" properties="monitor">
                                <div href="#" class="link flex">
                                    <i class="ri-speed-up-line"></i>
                                    <span class="name">监控页</span>
                                </div>
                            </li>
                        </ul>

                        <ul class="menu_item">
                            <div class="menu_title flex">
                                <span class="title">Editor</span>
                                <span class="line"></span>
                            </div>
                            <li class="item" properties="user">
                                <div href="#" class="link flex">
                                    <i class="ri-user-settings-line"></i>
                                    <span class="name">用户管理</span>
                                </div>
                            </li>
                            <li class="item" properties="articleManage">
                                <div href="#" class="link flex">
                                    <i class="ri-article-line"></i>
                                    <span class="name">文章管理</span>
                                </div>
                            </li>
                            <li class="item" properties="picture">
                                <div href="#" class="link flex">
                                    <i class="ri-image-edit-line"></i>
                                    <span class="name">图片管理</span>
                                </div>
                            </li>
                        </ul>

                        <ul class="menu_item">
                            <div class="menu_title flex">
                                <span class="title">Setting</span>
                                <span class="line"></span>
                            </div>
                            
                            <li class="item" properties="internal">
                                <div href="#" class="link flex">
                                    <i class="ri-fingerprint-line"></i>
                                    <span class="name">接口管理</span>
                                </div>
                            </li>
                            <li class="item" properties="data">
                                <div href="#" class="link flex">
                                    <i class="ri-database-2-line"></i>
                                    <span class="name">数据库管理</span>
                                </div>
                            </li>
                            <li class="item" properties="system">
                                <div href="#" class="link flex">
                                    <i class="ri-shield-line"></i>
                                    <span class="name">系统管理</span>
                                </div>
                            </li>
                        </ul>
                </div>
                <div class="sidebar_profile flex">
                    <span class="nav_image">
                    <img src="https://wuzhenlang.oss-cn-beijing.aliyuncs.com/ABAA8002075F5FABF2EB84B531FF309E.jpg" alt="profile_img">
                    </span>
                    <div class="data_text">
                    <p class="name">wzl</p>
                    <span class="email">1668643648@qq.com</span>
                    </div>
                </div>
                </div>
            </nav>
        </n-scrollbar>
        </div>
        <div class="container-wrapper">
            <div class="navbar-wrapper">
                <NavBarVue @changeSiderbar ="change"/>
            </div>
                <n-scrollbar trigger="hover" style="max-height: 90vh">
                <div class="content-wrapper">
                    <router-view  v-slot="{ Component, route }">
                        <keep-alive >
                            <component :is="Component" :key="route.fullPath" />
                        </keep-alive>
                    </router-view>
                </div>
            </n-scrollbar>
        </div>

    </div>
</template>

<script setup>
import {NScrollbar} from 'naive-ui'
import {defineAsyncComponent, ref,markRaw, onMounted, watchEffect, computed} from 'vue'
import NavBarVue from '@/components/manage/navbar/index.vue' 
import { useRoute, useRouter } from 'vue-router'
    const router = useRouter()
    const route = useRoute()
    const siderbarRef = ref(null)
    const flag = ref(true)
    const itemList = ref()
    const logo = "https://wuzhenlang.oss-cn-beijing.aliyuncs.com/ABAA8002075F5FABF2EB84B531FF309E.jpg" 
    onMounted(()=>{
        itemList.value = document.querySelectorAll('.item')
        addEvent()
    })
    function change(){
        flag.value = !flag.value
        if(!flag.value){
            siderbarRef.value.classList.add('close')
        }
        else {
            siderbarRef.value.classList.remove('close')
        }
    }
    function addEvent(){
        itemList.value.forEach(item => item.addEventListener('click',()=>{
            console.log(item.getAttribute("properties"))
            router.push(`/manage/${item.getAttribute("properties")}`)
        }))
    }

</script>

<style lang="scss" scoped>
    @import url('./manage.scss');
</style>