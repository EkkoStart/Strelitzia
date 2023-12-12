<template>
    <div id="topbar-container" ref="topbar" >
        <a href="#" class="logo">wuzhenlang</a>
        <ul class="links">
            <li class="link">
                <i class="ri-home-4-line"></i>
                <span @click="options('First')">首页</span>
            </li>
            <li class="link">
                <i class="ri-image-line"></i>
                <span @click="options('Picture')">图片</span>
            </li>
            <li class="link">
                <i class="ri-book-open-line"></i>
                <span @click="options('Artcile')">文章</span>
            </li>
            <li class="link">
                <i class="ri-chat-3-line"></i>
                <span @click="options('Word')">留言</span>
            </li>
            <li class="link">
                <i class="ri-more-line"></i>
                <span @click="options('Many')">更多</span>
            </li>
        </ul>
        <div class="sign-in" v-if=" avatar ===''">
            <i class="ri-user-line"></i>
            <span class="sign" @click="$router.push('/login')">登录/注册</span>
        </div>
        <div class="logined" v-else>
            <img :src="avatar" alt="" class="head">
            <div class="menu" style="z-index: 55;">
                <ul class="infomation">
                    <li @click="options('usercenter')">账号信息</li>
                    <li>我的收藏</li>
                    <li @click="options('upload')">图片上传</li>
                    <li @click="logOut">退出登录</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref} from "vue"
import {useStore} from 'vuex'
    const emit = defineEmits(['changeComponents'])
    const store = useStore()
    const topbar = ref(null)
    let allLink = ref('')
    let avatar = computed(()=>store.state.avatar)

    onMounted(()=>{
        allLink=document.querySelectorAll('.link')
        allLink.forEach(link => link.addEventListener('click', () => {
            allLink.forEach(link => link.classList.remove('active'))
            link.classList.add('active');
        }))
    })
    function options(option) {
        emit('changeComponents',option)
        // if (option === 'First') {
        //     topbar.value.style.removeProperty('background-color');
        // }
        // else {
        //     topbar.value.style.backgroundColor='#c5dddb'
        // }
    }
    function logOut() {
        store.dispatch('LogOut').then(()=>{
            location.reload()
        })
    }
</script>

<style lang="scss" scoped>
@import url('@/styles/topbar.scss');
</style>