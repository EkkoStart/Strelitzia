<template>
    <div class="home">
        <div class="wrapper">
            <!-- 聊天侧边框 -->
            <chatSidebar :isLogin="isLogin" :avatar="avatar" @change="(value)=>nowValue = value"/>
                
            <!--聊天列表  -->
            <chatMessage v-show="nowValue == 'contact'" @changeActive="changeActive" :newMessage="message"/>

            <!-- 聊天框主体 -->
            <chatBox v-show="nowValue == 'contact'" :activeId = "activeId" :type = "type" :activeName = "activeName" :newMessage="message"/>
            <!-- 在线人数 -->
            <chatList v-show="nowValue == 'contact'" :onlineMessage = "onlineMessage"/>
            <div class="contact-wrapper"  v-show="nowValue == 'friend'">
                <!-- 联系人列表 -->
                <friend  @showUserInfo = "showUserInfo"/>                
                <contactInfo  :activeName = "activeKey"/>
            </div>

        </div>
        
    </div>
</template>

<script setup>
import chatSidebar from '../../components/chat/chatSiderbar/chatSidebar.vue'
import chatMessage from '../../components/chat/chatMessage/chatMessage.vue'
import chatBox from '../../components/chat/chatBox/chatBox.vue'
import chatList from '../../components/chat/chatList/chatList.vue'
import friend from '../../components/chat/contact/friend.vue'
import contactInfo from '../../components/chat/contact/contactInfo.vue'
import { useStore } from 'vuex'
import { computed, onBeforeMount, onMounted, ref, watchEffect } from 'vue'
import AuthReq from '@/message/AuthReq.js'
import {getGroupMsg} from '@/api/group.js'
import Message from '@/message/Message.js'
import OnlineMessage from '@/message/OnlineMessage'
import AddCountReq from '@/message/AddCountReq.js'
import HeartReq  from '@/message/HeartReq'
import socket from '@/websocket.js'
    var isLogin = ref(false)
    const store = useStore()
    const nowValue = ref('contact');
    const activeId= ref(1)
    const activeName = ref("群聊")
    const type = ref('group')
    const token = computed(()=>store.state.token)
    const id = computed(()=>store.state.id)
    const avatar = computed(()=>store.state.avatar)
    const activeKey = ref()
    const message = ref()
    const onlineMessage = ref()
    onMounted(async ()=>{
        const preloader=document.querySelector(".preloader")
        if(preloader)
            preloader.style.display = "none"
    })
    socket.addEventListener('open',(e)=>{
        console.log("连接已打开")
        const authReq = new AuthReq(token.value)
        socket.send(JSON.stringify(authReq))
        heartRequest()
    })
    socket.addEventListener('message',(e)=>{
        console.log("接收到服务端消息："+e.data);
        const data = JSON.parse(e.data)
    //    console.log(data)
        if(data.type){
            if(data.type == 'group_redirect_req'){
                const messageData = JSON.parse(data.message)
                message.value = new Message(data.type,messageData.fromId,messageData.username,messageData.avatar,messageData.content,'text')
            }
            if(data.type == 'chat_redirect_req'){
                const messageData = JSON.parse(data.message)
                if(messageData.fromId != activeId.value){
                    const addCountReq = new AddCountReq(messageData.fromId,id.value);
                    socket.send(JSON.stringify(addCountReq))
                }
                message.value = new Message(data.type,messageData.fromId,messageData.username,messageData.avatar,messageData.content,'text')
            }
            if(data.type == 'auth_res'){
                const messageData = JSON.parse(data.message)
                if(messageData.code == 1){
                    onlineMessage.value = new OnlineMessage(messageData.uid,messageData.username,messageData.avatar)
                }
            }
            if(data.type == 'heart_res'){
              
            }
        }
    })
    socket.addEventListener('error',(e)=>{
        console.log("连接发生错误："+e)
    })
    socket.addEventListener('close',(e)=>{
        console.log("连接关闭");
    })
    function changeActive(activeInfo){
        activeId.value = activeInfo.id
        activeName.value = activeInfo.name;
        type.value = activeInfo.type
    }
    function showUserInfo(values){
        activeKey.value = values
    }
    function heartRequest(){
        setInterval(() => {
            const heartReq = new HeartReq('heart_req')
            socket.send(JSON.stringify(heartReq))
        }, 10000); 
    }
</script>

<style lang="scss" scoped>
    @import url('./chat.scss');
</style>