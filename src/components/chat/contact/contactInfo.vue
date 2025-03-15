<template>
    <div class="contact-info">
        <div class="search-wrapper">
            <n-input round placeholder="用户名" v-model:value="searchContent"/>
            <button class="search-btn" @click="search">搜 索</button>
        </div>
        <div class="showInfo" v-if="contactInfo">
            <div class="showInfo-avatar">
                <n-avatar
                round
                :size="160"
                :src="contactInfo.avatar"
                />
            </div>
            <div class="showInfo-uid">
                uid: {{contactInfo.id}}
            </div> 
            <div class="showInfo-username">
                用户名：{{contactInfo.username}}
            </div>
            <div class="showInfo-btn">
                <div v-if="!isRequest">              
                    <div v-if="flag === false">
                        <button class="add-btn" @click="addContactReq" >添加好友</button>
                    </div>
                    <div v-else>
                        <button class="del-btn" @click="delContactReq">删除好友</button>
                        <button class="send-btn" @click="sendMsg">发送消息</button>
                    </div>
                </div>
                <div v-else>
                    <button class="accept-btn" @click="handleContactReq(true)" >同意</button>
                    <button class="reject-btn" @click="handleContactReq(false)" >拒绝</button>
                </div>
            </div>
   
        </div>
        </div>
</template>

<script setup>
import {NAvatar,NInput, useDialog, useMessage} from 'naive-ui'
import { computed, onMounted,reactive,ref, watchEffect} from "vue"
import { getContactInfoById,getContactInfo } from '@/api/chat'
import {addContact,delContact,handleContactRequest} from '@/api/contact'
    const props = defineProps(['activeId','isRequest'])
    const emit = defineEmits(['sendMsg'])
    const message = useMessage()
    const dialog = useDialog()
    const activeId = computed(()=>props.activeId)
    const isRequest = computed(()=>props.isRequest)
    const searchContent=ref()
    const contactInfo = ref()
    const flag = ref(false)
    watchEffect(()=>{
        updateContactInfo();
    })
    async function updateContactInfo(){
        if(activeId.value){

            await getContactInfoById(activeId.value).then(res => {
                contactInfo.value = res.data.data[0];
                flag.value = true
            })
        }
    }
    function search(){
         getContactInfo(searchContent.value).then(res => {
                if(res.data.code == 1){
                    if(res.data.data[0] == null){
                        message.error("用户不存在！请重新查询")
                    }
                    else{
                        message.success("查询成功")
                        contactInfo.value = res.data.data[0]
                        flag.value = false
                    }
                }else {
                    message.error("查询失败")
                }
               
            })
            searchContent.value = ""
    }
    function addContactReq(){
        addContact(contactInfo.value.id).then(res =>{
            if(res.data.code == 1){
                message.success("发送请求成功，等待对方认证");
            }else {
                message.error("发送请求失败");
            }
        })
    }
    function delContactReq(){
        dialog.warning({
          title: "提示",
          content: "确定删除好友？删除后不可恢复",
          positiveText: "确定",
          negativeText: "取消",
          onPositiveClick: () => {
            delContact(contactInfo.value.id).then(res =>{
            if(res.data.code == 1){
                message.success("删除好友成功");
                contactInfo.value = ''
            }else {
                message.error("删除失败");
            }
        })
          },
        });
    }
    function handleContactReq(status){
        handleContactRequest(activeId.value,status).then(res =>{
            if(res.data.code == 1){
                contactInfo.value  = ''
            }
        })
    }
    function sendMsg(){
        emit('sendMsg',{ id:contactInfo.value.id ,name: contactInfo.value.username , type:'chat'});
    }
</script>

<style lang="scss" scoped>
@import url('./contactInfo.scss');
</style>