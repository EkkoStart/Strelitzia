<template>
    <ul class="chat-message" >
        <li class="chat-message-item" v-for="item in messageList" :key="item.id">
            <div class="item-wrapper">
                <n-badge :value= item.count :max="99">
                    <n-avatar :src=item.avatar />
                </n-badge>
                <div class="message-info">
                    <div>
                        <span class="person">{{item.username}}</span>
                        <span class="tag" v-if="item.tag">{{item.tag}}</span>
                    </div>
                    <div class="message-message">
                        {{item.lastMsg}}
                    </div>
                </div>
                <div class="message-time">
                    {{item.lastTime}}
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup>
import { computed, onMounted, ref, watch, watchEffect } from "vue"
import {NBadge,NAvatar} from 'naive-ui'
import {getChatList} from '@/api/chat.js'
import { useStore } from "vuex"
import ChatList from '@/message/ChatList.js'
import {formatDate} from '@/utils/validate.js'
    let liList = ref('')
    const emit = defineEmits(['changeActive'])
    const props = defineProps(['newMessage'])
    const newMessage = computed(()=>props.newMessage)
    const store = useStore()
    const token = computed(()=> store.state.token)
    let currentActive = 0
    
    const messageList =ref([
        {
            id:1,
            username:"群聊",
            type: "group",
            avatar:"https://wuzhenlang.oss-cn-beijing.aliyuncs.com/static/group.jpg",
            lastMsg:"",
            earlyTime:'',
            lastTime:"",
            count: 0 ,
            tag:"官方"
        },
    ])
    watchEffect(()=>{
       
        if(newMessage.value){
            console.log("update chatList")
            if(newMessage.value.type == 'group_redirect_req'){
                console.log(currentActive)
                if(currentActive != 0){
                    messageList.value[0].count = messageList.value[0].count+1
                }
                messageList.value[0].lastMsg = newMessage.value.content
                messageList.value[0].lastTime =  formatDate(new Date())
            }
            if(newMessage.value.type == 'chat_redirect_req'){
                for(let i = 0 ; i < messageList.value.length ;i++){
                    if(messageList.value[i].id == newMessage.value.fromId){
                        if(currentActive != i){
                            messageList.value[i].count = messageList.value[i].count+1
                        }
                        messageList.value[i].lastMsg = newMessage.value.content
                        messageList.value[i].lastTime = formatDate(new Date())
                        return
                    }
                }
                const chatList = new ChatList(newMessage.value.fromId,newMessage.value.username,newMessage.value.avatar,
                                    1,newMessage.value.content,formatDate(new Date())
                                    )
                messageList.value.push(chatList)
            }
        }
    })
    onMounted(async ()=>{
        if(token.value){
            await getChatList().then((res)=>{
                res.data.data.forEach((message)=>{
                     messageList.value.push(message)
                })
            })
        }
        liList = document.querySelectorAll('.chat-message-item')
        liList[0].classList.add('active')
        liList.forEach(li =>li.addEventListener('click',()=>{
            liList.forEach(li=>li.classList.remove('active'))
            li.classList.add('active')
            currentActive = Array.prototype.indexOf.call(liList, li)
            const id = messageList.value[currentActive].id
            const type = messageList.value[currentActive].type
            const name = messageList.value[currentActive].username
            messageList.value[currentActive].count = -1
            emit('changeActive', { id:id ,type:type,name:name})
        }))
    })
</script>

<style lang="scss" scoped>
    @import url('./chatMessage.scss');
</style>