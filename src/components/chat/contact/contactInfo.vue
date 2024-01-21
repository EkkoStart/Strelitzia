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
                <button class="add-btn" @click="addContact">添加好友</button>
                <button class="del-btn" @click="delContact">删除好友</button>
            </div>
   
        </div>
        </div>
</template>

<script setup>
import {NAvatar,NInput} from 'naive-ui'
import { computed, onMounted,reactive,ref, watchEffect} from "vue"
import { getContactInfo } from '@/api/chat'
    const props = defineProps(['activeName'])
    const activeName = computed(()=>props.activeName)
    const searchContent=ref()
    const contactInfo = ref()
    watchEffect(()=>{
        updateContactInfo();
    })
    async function updateContactInfo(){
        if(activeName.value){
            await getContactInfo(activeName.value).then(res => {
                contactInfo.value = res.data.data
            })
        }
    }
    function search(){
        getContactInfo(searchContent.value).then(res => {
                contactInfo.value = res.data.data
            })
    }
    function addContact(){

    }
    function delContact(){

    }
</script>

<style lang="scss" scoped>
@import url('./contactInfo.scss');
</style>