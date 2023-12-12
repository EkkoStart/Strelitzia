<template>
    <div class="chat-box">
        <div class="chat-wrapper">
            <div class="chat">
                <div class="chat-msg-list">
                    <div class="room-name">
                        <span class="name">群聊</span>
                        <span class="setting">设置</span>
                    </div>
                    <n-scrollbar trigger="hover"  ref="scrollbar">
                        <div  class="virtual-list" ref="virtualList">
                            <div class="chat-item" v-for="item in chatMsgList" :key="item.msgId">
                                <div class="avatar">
                                    <img :src="item.avatar" class="avatar-img">
                                </div>
                                <div class="chat-item-box">
                                    <div class="chat-item-user-info">
                                        <span class="user-name">
                                            {{item.username}}
                                        </span>
                                        <span class="user-ip">
                                            fffffffff
                                        </span>
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
import sendToAll from '@/message/sendToAll.js'
import { useRoute, useRouter } from "vue-router";
import {NScrollbar} from 'naive-ui'
import socket from '@/websocket.js'
import {getGroupMsg} from '@/api/group.js'
    const props = defineProps(['activeId','type'])
    const store = useStore()
    const router = useRouter()
    const id = computed(()=>store.state.id)
    const username = computed(()=> store.state.username)
    const avatar = computed(()=>store.state.avatar)
    const activeId = computed(()=> props.activeId)
    const type = computed(()=> props.type)
    const token = computed(()=>store.state.token)
    const proxy = getCurrentInstance()
    const content = ref('')
    let itemList = ref('')
    const MsgHeight = ref(0)
    const chatMsgList = ref()
   
    watchEffect(async ()=>{
        if(type.value == 'group'){
            await getGroupMsg(activeId.value).then(res=>{
                chatMsgList.value = res.data.data;
            })

        }else {
            
        }
    })
    onMounted(async ()=>{
        const timestamp = new Date().getTime();
     
        await getGroupMsg(timestamp).then(res=>{
            chatMsgList.value = res.data.data;
        })
        itemList = document.querySelectorAll('.chat-item')
     
        check()
        MsgHeight.value = proxy.refs.virtualList.scrollHeight
        scrollToBottom()
    })

    function sendMsg(){
       
        // const sendToAllRequest = new sendToAll(id.value,1,content.value,props.chatMsgList.length+1,username.value,avatar.value);
        // socket.send(JSON.stringify(sendToAllRequest));
        // content.value = ''
      
    }
 
    function scrollToBottom(){
        proxy.refs.scrollbar.scrollTo({
            top: MsgHeight.value,
            behavior:'smooth'
        })
    }
    function check(){
        let cnt = 0
        console.log(chatMsgList.value[0].username)
        itemList.forEach(item =>{
            if(username.value != undefined && username.value != ''){
                if(username.value == chatMsgList.value[cnt].username){
                    item.classList.add('is-me')
                    item.classList.add('right')
                }
            }
            cnt+=1
        })
    }
    function toLogin(){
        router.push('/login')
    }
    
</script>

<style lang="scss" scoped>
    @import url('./chatBox.scss');
</style>