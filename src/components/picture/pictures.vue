<template>
    <ImageBig
      v-if="showImg"
      @viewImg="handleviewImg"
      :imgSrc="imgSrc"
      class="img-big"
    />
    <div class="pictures-container" >
        <div class="pictures" ref="waterfall">
            <div class="picture-item"  v-for="(item,index) in imgUrls" :key="item.id" @click="bigScale(index)">
                <img  v-lazy="item" class="picture">
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref,onBeforeMount, defineAsyncComponent} from 'vue';
import {getPic} from '@/api/getItem'
    
    const ImageBig=defineAsyncComponent(()=>import('@/components/imgBig.vue'))
    var imgUrls=ref([])
    var showImg=ref(false)
    var imgSrc=ref()
    onBeforeMount(()=>{
         getPic().then(res=>{
            imgUrls.value=res.data
         })
    })
    function bigScale(index){
        showImg.value=true
        imgSrc.value=imgUrls.value[index]
    }
    function handleviewImg() {
      showImg.value = false;
    }
</script>

<style lang="scss" scoped>
 @import url('./pictures.scss');
</style>