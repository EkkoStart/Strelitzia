<template>
    <div class="chat-box">
        <div class="chat-wrapper">
            <div class="chat">
                <div class="chat-msg-list">
                    <div class="room-name">
                        <span class="name"> {{activeName}}</span>
                        <span class="setting">设置</span>
                    </div>
                    <n-scrollbar trigger="hover"  ref="scrollbar">
                        <div  class="virtual-list" ref="virtualList">
                            <div class="chat-item" v-for="item in chatMsgList" 
                            :key="item.msgId" :class="{ 'is-me': item.fromId == id, 'right': item.fromId == id}"
                            >
                                <div class="avatar">
                                    <img :src="item.avatar" class="avatar-img" >
                                </div>
                                <div class="chat-item-box">
                                    <div class="chat-item-user-info">
                                        <span class="user-name">
                                            {{item.username}}
                                        </span>
                                        <!-- <span class="user-ip">
                                            fffffffff
                                        </span> -->
                                        <span class="send-time">
                                            {{item.createTime}}
                                        </span>
                                    </div>
                                    <div class="chat-item-content">
                                        <div class="text">
                                            {{item.content}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </n-scrollbar>
                </div>
                <div class="chat-edit">
                    <div class="msg-input">
                        <div class="input-wrapper m-input">
                            <input class="input" placeholder="输入" v-model="content">
                        </div>
                        <button class="send" @click="sendMsg">发送</button>
                    </div>
                    <span class="tips" v-show="token == undefined">
                        <span class="tips-text" @click="toLogin">登录</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, getCurrentInstance, nextTick, onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import SendToAllReq from '@/message/SendToAllReq.js'
import { useRoute, useRouter } from "vue-router";
import {NScrollbar} from 'naive-ui'
import socket from '@/websocket.js'
import {getGroupMsg} from '@/api/group.js'
import {getChat} from '@/api/chat.js'
import ChatMessage from '@/message/ChatMessage.js'
import SendToOneReq from '@/message/SendToOneReq.js'
import {formatDate} from '@/utils/validate.js'
    const props = defineProps(['activeId','activeName','type','newMessage'])
    const store = useStore()
    const router = useRouter()
    const id = computed(()=>store.state.id)
    const username = computed(()=> store.state.username)
    const avatar = computed(()=>store.state.avatar)
    const activeId = computed(()=> props.activeId)
    const newMessage = computed(()=>props.newMessage)
    let nowId = 1
    const activeName = computed(()=>props.activeName)
    const type = computed(()=> props.type)
    const token = computed(()=>store.state.token)
    const proxy = getCurrentInstance()
    const content = ref('')
    let itemList = ref('')
    const MsgHeight = ref(0)
    const chatMsgList = ref()
   
    watchEffect(async ()=>{
      //  console.log(activeId.value)
        if(activeId.value){
            await get()
            nowId = activeId.value
        }
    })
    watchEffect(()=>{
        if(newMessage.value){
            console.log("update chatBox")
            if(newMessage.value.type == 'group_redirect_req'){
                if(nowId == 1){
                    chatMsgList.value.push(newMessage.value)
                    scrollToBottom()
                }
            }
            if(newMessage.value.type == 'chat_redirect_req'){
               if(nowId == newMessage.value.fromId){
                    chatMsgList.value.push(newMessage.value)
                    scrollToBottom()
               }
            }
        }
    })
    onMounted(async ()=>{
        await get()
       
    })

    function sendMsg(){
        if(!content.value) return ;
        console.log(nowId)
        if(nowId == 1){
            const senToAllReq = new SendToAllReq(id.value,1,content.value,chatMsgList.length+1)
            socket.send(JSON.stringify(senToAllReq))
        }else {
            const sendToOneReq = new SendToOneReq(id.value,nowId,content.value,chatMsgList.length+1)
            socket.send(JSON.stringify(sendToOneReq))
            const chatMessage = new ChatMessage(id.value,username.value,avatar.value,content.value,'text',formatDate(new Date()))
            chatMsgList.value.push(chatMessage)
            scrollToBottom()
        }
        content.value = ''
    }
 
    function scrollToBottom(){
            nextTick(()=>{
                MsgHeight.value = proxy.refs.virtualList.scrollHeight
                proxy.refs.scrollbar.scrollTo({
                top: MsgHeight.value,
                behavior:'smooth'
            })
        })
  
    }
    async function get(){

        const timestamp = new Date().getTime();
        if(activeId.value == 1){
            await getGroupMsg(timestamp).then(res=>{
            chatMsgList.value = res.data.data;
            })
        }else {
            await getChat(activeId.value,timestamp).then(res =>{
                chatMsgList.value = res.data.data
            })
        }
        scrollToBottom()
    }
    function toLogin(){
        router.push('/login')
    }
    
</script>

<style lang="scss" scoped>
    @import url('./chatBox.scss');
</style>