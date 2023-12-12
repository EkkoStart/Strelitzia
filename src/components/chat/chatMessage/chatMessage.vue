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
import { computed, onMounted, ref } from "vue"
import {NBadge,NAvatar} from 'naive-ui'
import {getOffline} from '@/api/chat.js'
import { useStore } from "vuex"
    let liList = ref('')
    const emit = defineEmits(['changeActive'])
    const store = useStore()
    const id = computed(()=>store.state.id)
    const currentActive = ref(0)
    const messageList =ref([
        {
            id:'0',
            username:"群聊",
            type: "group",
            avatar:"https://wuzhenlang.oss-cn-beijing.aliyuncs.com/static/group.jpg",
            lastMsg:"wwww",
            earlyTime:'',
            lastTime:"11.24",
            count: 0 ,
            tag:"官方"
        },
    ])
    onMounted(async ()=>{
      
        if(id.value != undefined){
      
            await getOffline(id.value).then((res)=>{
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
            currentActive.value = Array.prototype.indexOf.call(liList, li)
            const id = messageList.value[currentActive.value].id
            const type = messageList.value[currentActive.value].type
            messageList.value[currentActive.value].count = 0
            emit('changeActive', { id:id ,type:type})
        }))
    })
</script>

<style lang="scss" scoped>
    @import url('./chatMessage.scss');
</style>