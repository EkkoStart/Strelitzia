<template>
  <div class="Big_image">
    <!-- 过渡动画 -->
    <transition name="fade">
      <div class="img-view" @click="bigImg">
        <!-- 遮罩层 -->
        <div class="img-layer"></div>
        <div class="img">
          <img :src="imgSrc">
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
    const props=defineProps(['imgSrc'])
    const emits=defineEmits(['viewImg'])
    const imgSrc=props.imgSrc
    function bigImg(){
      emits('viewImg')
    }
</script>
<style lang="scss" scoped>
.Big_image {
  .fade-enter-active,
  .fade-leave-active {
    transition: all 1s;
    transform: translate3d(0, 0, 0);
  }
  .fade-enter,
  .fade-leave-active {
    transform: translate3d(100%, 0, 0);
  }
 /* bigimg */
  .img-view {
    position: inherit;
    width: 100%;
    height: 100%;
  }
  .img-view .img-layer {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .img-view .img {
    img {  
      z-index: 1000;
      height: auto;
      width: auto;
      max-width: 80vw;
      max-height: 80vh;
      position: fixed;
      top: 50%;
      left: 50%;
      border: 2px solid white;
      border-radius: 5px;
      transform: translate(-50%, -50%);
      }
  }
}
</style>

