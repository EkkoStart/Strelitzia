<template>
    <div class="manage-wrapper">
        <div class="sidebar-wrapper">
            <nav class="sidebar locked">
                <div class="logo_items flex">
                    <span class="nav_image">
                        <img src="" alt="logo_img">
                    </span>
                    <span class="logo_name">Strelitzia</span>
                    <i class="bx bx-lock-alt" id="lock-icon" title="Unlock Sidebar"></i>
                    <i class="bx bx-x" id="sidebar-close"></i>
                </div>
                <div class="menu_container">
                    <div class="menu_items">
                        <ul class="menu_item">
                            <div class="menu_title flex">
                                <span class="title">Dashboard</span>
                                <span class="line"></span>
                            </div>
                            <li class="item" properties="AnalyzeVue">
                                <div href="#" class="link flex">
                                <i class="bx bx-home-alt"></i>
                                <span>分析页</span>
                                </div>
                            </li>
                            <li class="item" properties="ControlVue">
                                <div href="#" class="link flex">
                                <i class="bx bx-grid-alt"></i>
                                <span>监控页</span>
                                </div>
                            </li>
                        </ul>

                        <ul class="menu_item">
                            <div class="menu_title flex">
                                <span class="title">Editor</span>
                                <span class="line"></span>
                            </div>
                            <li class="item" properties="UserManageVue">
                                <div href="#" class="link flex">
                                <i class="bx bxs-magic-wand"></i>
                                <span>用户管理</span>
                                </div>
                            </li>
                            <li class="item" properties="ArticleVue">
                                <div href="#" class="link flex">
                                <i class="bx bx-folder"></i>
                                <span>文章管理</span>
                                </div>
                            </li>
                            <li class="item" properties="PictureVue">
                                <div href="#" class="link flex">
                                <i class="bx bx-cloud-upload"></i>
                                <span>图片管理</span>
                                </div>
                            </li>
                        </ul>

                        <ul class="menu_item">
                            <div class="menu_title flex">
                                <span class="title">Setting</span>
                                <span class="line"></span>
                            </div>
                            
                            <li class="item" properties="ApiVue">
                                <div href="#" class="link flex">
                                <i class="bx bx-flag"></i>
                                <span>接口管理</span>
                                </div>
                            </li>
                            <li class="item" properties="DataBaseVue">
                                <div href="#" class="link flex">
                                    <i class="bx bx-award"></i>
                                    <span>数据库管理</span>
                                </div>
                            </li>
                            <li class="item" properties="SystemVue">
                                <div href="#" class="link flex">
                                <i class="bx bx-cog"></i>
                                <span>系统管理</span>
                                </div>
                            </li>
                        </ul>
                </div>
                <div class="sidebar_profile flex">
                    <span class="nav_image">
                    <img src="" alt="profile_img">
                    </span>
                    <div class="data_text">
                    <span class="name">David Oliva</span>
                    <span class="email">david@gmail.com</span>
                    </div>
                </div>
                </div>
            </nav>
        </div>
        <div class="container-wrapper">
            <div class="navbar-wrapper">
                <NavBarVue :componentInfo= "ComponentInfo"/>
            </div>
            <div class="content-wrapper">
                <component :is="nowComponent"/>
            </div>
        </div>

    </div>
</template>

<script setup>
import {defineAsyncComponent, ref,markRaw, onMounted} from 'vue'
import NavBarVue from '@/components/manage/navbar/index.vue' 

    const ArticleVue = defineAsyncComponent(()=>import('@/components/manage/article/index.vue'))
    const PictureVue = defineAsyncComponent(()=> import('@/components/manage/picture/index.vue'))
    const ComponentMap = {
        'ArticleVue': markRaw(ArticleVue),
        'PictureVue': markRaw(PictureVue)
    }
    const ComponentInfo = ref('ArticleVue')
    const nowComponent = ref(ComponentMap['ArticleVue'])
    const itemList = ref()
    onMounted(()=>{
        itemList.value = document.querySelectorAll('.item')
        console.log(typeof(nowComponent.value))
        addEvent()
    })
    function addEvent(){
        itemList.value.forEach(item => item.addEventListener('click',()=>{
            nowComponent.value = ComponentMap[item.getAttribute('properties')]
            ComponentInfo.value = item.getAttribute('properties')
        }))
    }
</script>

<style lang="scss" scoped>
    @import url('./manage.scss');
</style>