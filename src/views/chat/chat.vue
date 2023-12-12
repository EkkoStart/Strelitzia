<template>
    <div class="home">
        <div class="wrapper">
            <chatSidebar :isLogin="isLogin" :avatar="avatar" @change="(value)=>nowValue = value"/>
            <chatMessage v-show="nowValue == 'contact'" @changeActive="changeActive"/>
            <friend v-show="nowValue == 'friend'"/>
            <chatBox :isLogin="isLogin" :activeId = "activeId" :type = "type"/>
            <chatList/>
        </div>
        
    </div>
</template>

<script setup>
import chatSidebar from '../../components/chat/chatSiderbar/chatSidebar.vue'
import chatMessage from '../../components/chat/chatMessage/chatMessage.vue'
import chatBox from '../../components/chat/chatBox/chatBox.vue'
import chatList from '../../components/chat/chatList/chatList.vue'
import friend from '../../components/chat/friend.vue'
import { useStore } from 'vuex'
import { computed, onBeforeMount, onMounted, ref, watchEffect } from 'vue'
import {getGroupMsg} from '@/api/group.js'
import socket from '@/websocket.js'
    var isLogin = ref(false)
    const store = useStore()
    const nowValue = ref('contact');
    const activeId= ref(0)
    const type = ref('group')
    const token = computed(()=>store.state.token)
    const avatar = computed(()=>store.state.avatar)
    onMounted(async ()=>{
        const preloader=document.querySelector(".preloader")
        if(preloader)
            preloader.style.display = "none"
        // if(avatar.value != null && avatar.value != '' && avatar.value != undefined){
        //     isLogin.value = true
        // }
    })
    socket.addEventListener('open',(e)=>{
        console.log("连接已打开")
        
    })
    socket.addEventListener('message',(e)=>{
        console.log("接收到服务端消息："+e.data);
        const data = JSON.parse(e.data)

    })
    socket.addEventListener('error',(e)=>{
        console.log("连接发生错误："+e)
    })
    socket.addEventListener('close',(e)=>{
        console.log("连接关闭");
    })
    function changeActive(activeInfo){
        activeId.value = activeInfo.id
        type.value = activeInfo.type
    }
</script>

<style lang="scss" scoped>
    @import url('./chat.scss');
</style>