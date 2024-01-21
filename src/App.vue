<template>
    <n-message-provider>
      <n-dialog-provider>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </n-dialog-provider>
    </n-message-provider>
</template>

<script setup>
import {NMessageProvider,NDialogProvider} from 'naive-ui'
import { useStore } from "vuex";
</script>

<style lang='scss' scoped>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");
  @import url('./style.css');
</style>
