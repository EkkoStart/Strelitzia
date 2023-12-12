<template>
    <div id="container-wrapper">
        <div class="topbar-wrapper" ref="topbar">
                <Topbar @changeComponents="changeComponents"></Topbar>
        </div>
        <div class="main-container">
                <KeepAlive exclude="Word,Upload">
                    <component :is="option"/>
                </KeepAlive>
        </div>
    </div>
</template>
<script >
import {defineAsyncComponent,ref} from 'vue'
export default{
    components:{
        Topbar:'@/components/topbar.vue',
        Picture:defineAsyncComponent(()=>import('@/components/picture/pictures.vue')),
        Article:defineAsyncComponent(()=>import('@/components/article/article.vue')),
        First:defineAsyncComponent(()=>import('@/components/index/first.vue')),
        Word:defineAsyncComponent(()=>import('@/components//word/words.vue')),
        Upload:defineAsyncComponent(()=>import('@/components/upload.vue')),
        Usercenter:defineAsyncComponent(()=>import('@/components/usercenter.vue')),
        Many:defineAsyncComponent(()=>import('@/components/many/many.vue')),
    },
    setup(){
        const option=ref('First')
        const changeComponents = (newValue)=>{
            option.value = newValue
        }
        return {
            option,
            changeComponents,
        }
    }
}    
</script>
<style lang="scss" scoped>
    #container-wrapper{
        height: 100%;
        width: 100%;
    }
    .topbar-wrapper{
        opacity: 1;
    }
</style>