<template>
    <div class="usercenter-container">
        <div class="user-left"></div>
        <div class="userinfo">
            <div class="user-img">
                <input type="file" v-if="modify">
                <i class="ri-add-line"></i>
                <img :src="avatar" alt="">
            </div>
            <div class="messages">
                <p>用户名:  {{ username }}</p>
                <p>密码:  ******</p>
        
            </div>
        </div>
        <div class="user-right"></div>
    </div>
</template>

<script setup>
import { computed, onBeforeMount, reactive,ref} from "vue";
import { useStore } from "vuex";

    const store=useStore()
    const username=computed(()=>store.state.username)
    const avatar =computed(()=>store.state.avatar)
    let modify=ref(false)
</script>

<style lang="scss" scoped>
@import url('@/styles/usercenter.scss');
</style>