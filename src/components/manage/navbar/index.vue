<template>
    <header class="navbar-wrapper">
        <div >
            <i class="ri-skip-left-line" id="lock-icon" title="Unlock Sidebar" @click="lock()" ref="lockIconRef"></i>
            <i class="ri-skip-right-line" id="sidebar-close" @click="unLock()" ref="unLockIconRef"></i>
        </div>
        <div class="right-item">
            <div class="navbar-item">
                <i class="ri-fullscreen-exit-fill"></i>
            </div>
            <div class="navbar-item">
                    <n-avatar
                    round
                    size="medium"
                    :src="avatar"
                    />
                    <span class="username">{{username}}</span>
            </div>
        </div>
       
    </header>
</template>

<script setup>
import { NCard,NAvatar,} from 'naive-ui'
import { computed, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
    const store = useStore()
    const emit = defineEmits(['changeSiderbar'])
    const lockIconRef = ref(null)
    const unLockIconRef = ref(null)
    const avatar = computed(()=> store.state.avatar)
    const username = computed(()=>store.state.username)
    const list = ref([])
    function lock(){
        emit('changeSiderbar');
        unLockIconRef.value.style.display = "block"
        lockIconRef.value.style.display = "none"
    }
    function unLock(){
        emit('changeSiderbar');
        unLockIconRef.value.style.display = "none"
        lockIconRef.value.style.display = "block"
    }
</script>

<style lang="scss" scoped>
    @import url("./index.scss");
</style>