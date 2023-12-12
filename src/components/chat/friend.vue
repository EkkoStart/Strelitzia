<template>
    <ul class="friend-message">
        <li class="friend-message-item" v-for="item in friendList" :key="item.id" @click="active">
            <div class="item-wrapper">
                <div class="el-badge item">
                    <span class="el-avatar" >
                        <img :src="item.avatar">
                    </span>
                </div>
                <div class="message-info">
                    <div>
                        <span class="person">{{item.name}}</span>     
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup>
import { onMounted, ref } from "vue";
    const friendList = ref('')
    onMounted(()=>{
        
    })
</script>

<style lang="scss" scoped>

</style>