<template>
    <div>
        <router-view  v-slot="{ Component, route }">
            <keep-alive >
                <component :is="Component" :key="route.fullPath" />
            </keep-alive>
        </router-view>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>