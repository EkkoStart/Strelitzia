<template>
 
    <div class="user-list-box">
        <div class="user-list-wrapper">
            <div class="user-list-header">
                在线人数：{{onlineCount}}
            </div>
            <ul class="user-list">
                <li class="user-list-item"></li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import {NScrollbar} from 'naive-ui'
import {onMounted, ref} from 'vue'

    const onlineCount = ref(0)
    onMounted(()=>{
        
    })
</script>

<style lang="scss" scoped>
    @import url('./chatList.scss');
</style>