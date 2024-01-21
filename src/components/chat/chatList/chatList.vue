<template>
 
    <div class="user-list-box">
        <div class="user-list-wrapper">
            <div class="user-list-header">
                在线人数：{{onlineCount}}
            </div>
            <ul class="user-list">
                <li class="user-list-item" v-for="item in onlineList" :key="item.uid">
                    <n-avatar round :src=item.avatar></n-avatar>
                    <p style="margin-left:10px;font-size:1rem">{{item.username}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import {NScrollbar,NAvatar} from 'naive-ui'
import {onMounted, ref, watchEffect, computed} from 'vue'
import {getOnline} from '@/api/group.js'
    const props = defineProps(['onlineMessage'])
    const onlineList = ref([])
    const onlineCount = ref(0)
    const onlineMessage = computed(()=>props.onlineMessage)
    watchEffect(()=>{
        updateOnlineList();
    })
    onMounted(async ()=>{
        getOnline().then(res =>{
            onlineList.value = res.data.data
        })
    })
    function updateOnlineList() {
    if (onlineMessage.value) {
        onlineList.value.push(onlineMessage.value);
        onlineCount.value += 1;
    }
}
</script>

<style lang="scss" scoped>
    @import url('./chatList.scss');
</style>