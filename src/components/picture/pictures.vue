<template>
    <div class="pictures-container" >
        <div class="pictures" ref="waterfall">
            <n-image-group>
                <n-space>
                    <n-image
                        v-for="(src, index) in imgUrls"
                        :key="index"
                        width="250"
                        height="250"
                        lazy
                        :src="src"
                        :intersection-observer-options="{
                            root: '#image-scroll-container'
                        }"
                        class="picture-item"
                        >
                        <template #placeholder>
                            <div
                            style="
                                width: 500px;
                                height: 500px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                background-color: #0001;
                            "
                            >
                            加载中
                            </div>
                        </template>
                    </n-image>
                </n-space>
            </n-image-group>
        </div>
    </div>
</template>
<script setup>
import {NImage,NImageGroup,NSpace} from 'naive-ui'
import {ref,onMounted, defineAsyncComponent} from 'vue';
import {getPic} from '@/api/getItem'
    const imgUrls=ref([])
    onMounted(async ()=>{
        getPic().then(res=>{
            imgUrls.value=res.data.data
         })
    })
</script>

<style lang="scss" scoped>
 @import url('./pictures.scss');
</style>