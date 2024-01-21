<template>
    <div class="preloader">
      <div class="preloader-wrapper">
          <div class="loading">
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
          </div>
      </div>
    </div>
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
        opacity: 0;
    }
    .preloader{
        position: fixed;
        background-color: #FFFFEC;
        width: 100%;
        height: 100vh;
        z-index: 99999999999;
    }

    .preloader-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .loading{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .circle{
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin: 7px;
        background-color: #7BD3EA;
        animation: load 1s ease-in-out infinite;
    }

    .circle:nth-child(2){
    animation-delay: .1s;
    }
    .circle:nth-child(3){
    animation-delay: .2s;
    }

    @keyframes load {
    0%{
        transform: translateY(0);
    }
    20%{
        transform: translateY(-12px);
    }
    40%{
        transform: translateY(0);
    }
    }


</style>