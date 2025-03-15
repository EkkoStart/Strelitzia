<template>
    <n-config-provider :theme="darkTheme">
        <n-menu
        ref="contactMenuRef"
        v-model:value="activeKey"
        :options="menuOptions"
        key-field="whateverKey"
        label-field="whateverLabel"
        children-field="whateverChildren"
        class="contact-menu"
    />
  </n-config-provider>
  <contactInfo  :activeId = "activeKey" :isRequest = "isRequest" @sendMsg="sendMsg"/>
</template>

<script setup>
import {NAvatar,NMenu,NP,darkTheme,NConfigProvider, commonDark, c} from 'naive-ui'
import { onMounted, ref ,h, nextTick, watchEffect} from "vue";
import {getContact} from '@/api/chat.js';
import {getContactRequest} from '@/api/contact'
import contactInfo from './contactInfo.vue'
    const emit = defineEmits(['changeActive'])
    const friendList = ref([])
    const addList = ref([])
    const activeKey =ref('')
    const isRequest = ref(false)
    watchEffect(()=>{
        if(activeKey.value){
            handleClick()
        }
    })
    const menuOptions = ref([
        {
            whateverLabel: "好友请求",
            whateverKey: "hear-the-wind-singwww",
            icon: renderIcon("ri-user-add-line"),
            whateverChildren:[

            ]
        },
        {
            whateverLabel: "联系人",
            whateverKey: "hear-the-wind-sing",
            icon: renderIcon("ri-contacts-line"),
            whateverChildren:[
            
            ]
        },
    ])
    onMounted(async ()=>{
        getContact().then(res=>{
            friendList.value= res.data.data
            updateContactOptions();
        })  
        getContactRequest().then(res =>{
            if(res.data.code == 1){
                addList.value = res.data.data
                updateRequestOptions();
            }
        })
    })

    function renderIcon(className) {
        return () => h('i',{class:className});
    }
    function renderContent(url,username) {
        return () =>h('div',  {
            class:"contact-item",
            style:{
            width:'100%',
            height:'100%',
            alignItems:'center',
            display:'flex',
            },
            },
        [
        h(NAvatar, 
        {
        style:{
            width:'40px',
            height:'40px'
        },
        class:"contact-avatar",
        src:url,
        },),
        h('span',{
            style:{
                marginLeft:'10px',
                display:'flex',
    
            }
        },username),
        ])
    } 
    function updateContactOptions() {
        if(!friendList.value) return

        for(let i=0;i<friendList.value.length;i++)
        {
            menuOptions.value[1].whateverChildren.push({
                whateverLabel: renderContent(friendList.value[i].avatar,friendList.value[i].username) ,// 假设名称字段为 name
                whateverKey: friendList.value[i].id, // 假设 ID 字段为 id
            })
        }
    }
    function updateRequestOptions() {
        if(!addList.value) return

        for(let i=0;i<addList.value.length;i++)
        {
            menuOptions.value[0].whateverChildren.push({
                whateverLabel: renderContent(addList.value[i].avatar,addList.value[i].username) ,// 假设名称字段为 name
                whateverKey: addList.value[i].id, // 假设 ID 字段为 id
            })
        }
    }
    function handleClick(){
        const flag = addList.value.some(item => item.id === activeKey.value);
        if(flag){
            isRequest.value = true
        }else {
            isRequest.value = false
        }
    }
    function sendMsg(contactInfo){
        emit('changeActive',contactInfo);
    }
</script>

<style lang="scss" scoped>
@import url('./friend.scss');
</style>