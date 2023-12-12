<template>
    <aside class="side-toolbar">
        <div class="avatar">
            <i class="ri-customer-service-2-fill" v-if="token == undefined"></i>
            <img :src="props.avatar" class="avatar-img" v-else>
        </div>
        <div class="tool-icons">
            <a @click="$emit('change','contact')">
                <div class="el-badge"></div>
                <i class="ri-chat-1-line tool-icon"></i>
            </a>
            <a @click="$emit('change','friend')">
                <div class="el-badge"></div>
                <i class="ri-contacts-line tool-icon"></i>
            </a>
        </div>
        <div class="menu">
        </div>
    </aside>
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex";

    const store = useStore()
    const props = defineProps(['avatar'])
    const token = computed(()=>store.state.token);
</script>

<style lang="scss" scoped>
@import url('./sidebar.scss');
</style>