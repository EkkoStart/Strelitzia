<template>
    <div id="topbar-container">
        <a href="#" class="logo">wuzhenlang</a>
        <ul class="links">
            <li class="link">
                <router-link :to="{ path: '/index' }" class="no-underline">
                    <i class="topbar-icon ri-home-4-line"></i>
                    <span class="topbar-text">首页</span>
                </router-link>
            </li>
            <li class="link">
                <router-link :to="{ path: '/picture' }" class="no-underline">
                    <i class="topbar-icon ri-image-line"></i>
                    <span class="topbar-text">图片</span>
                </router-link>
            </li>
            <li class="link">
                <router-link :to="{ path: '/article' }" class="no-underline">
                    <i class="topbar-icon ri-book-open-line"></i>
                    <span class="topbar-text">文章</span>
                </router-link>
            </li>
            <li class="link">
                <router-link :to="{ path: '/word' }" class="no-underline">
                    <i class="topbar-icon ri-chat-3-line"></i>
                    <span class="topbar-text">留言</span>
                </router-link>
            </li>
            <li class="link">
                <router-link :to="{ path: '/many' }" class="no-underline">
                    <i class="topbar-icon ri-more-line"></i>
                    <span class="topbar-text">更多</span>
                </router-link>
            </li>
        </ul>
        <div class="sign-in" v-if=" avatar ===''">
            <i class="topbar-icon ri-user-line"></i>
            <router-link :to="{ path: '/login' }" class="no-underline">
                <span class="sign">登录/注册</span>
            </router-link>
        </div>
        <div class="logined" v-else>
            <img :src="avatar" alt="" class="head">
            <div class="menu" style="z-index: 55;">
                <ul class="infomation">
                    <router-link :to="{ path: '/picture' }" class="no-underline">
                        <li>账号信息</li>
                    </router-link>
                    <li>我的收藏</li>
                    <router-link :to="{ path: '/picture' }" class="no-underline">
                        <li >图片上传</li>
                    </router-link>
                    <li @click="logOut">退出登录</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref} from "vue"
import {useStore} from 'vuex'
    const store = useStore()
    let allLink = ref('')
    let avatar = computed(()=>store.state.avatar)
    onMounted(()=>{
        allLink=document.querySelectorAll('.link')
        allLink.forEach(link => link.addEventListener('click', () => {
            allLink.forEach(link => link.classList.remove('active'))
            link.classList.add('active');
        }))
    })
    function logOut() {
        store.dispatch('LogOut').then(()=>{
            location.reload()
        })
    }
</script>

<style lang="scss" scoped>
@import url('@/styles/topbar.scss');
</style>