<template>
    <n-message-provider>
      <n-dialog-provider>
        <n-loading-bar-provider>
          <router-view>
          </router-view>
        </n-loading-bar-provider>
      </n-dialog-provider>
    </n-message-provider>
</template>

<script setup>
import {NMessageProvider,NDialogProvider,NLoadingBarProvider} from 'naive-ui'
import { useStore } from "vuex";
</script>

<style lang='scss' scoped>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");
  @import url('./style.css');
</style>
