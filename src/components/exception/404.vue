<template>
    <div class="404-wrapper">
        <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬" size="large">
            <template #footer>
                <n-button @click="router.push('/')" type ="info">找点乐子吧</n-button>
            </template>
        </n-result>
    </div>
</template>

<script setup>
import {NResult} from 'naive-ui'
import {useRouter} from 'vue-router'

    const router=useRouter()
</script>

<style lang = 'scss'>
  
</style>
