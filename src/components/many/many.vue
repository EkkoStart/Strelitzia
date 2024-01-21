<template>
  <div class="many-wrapper">
      <div class="carousel-wrapper">
        <n-carousel show-arrow
          autoplay
          trigger='hover'
        >
            <router-link to="/bi">
              <img
                class="carousel-img"
                src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
              >
            </router-link>
            <router-link to="/chat">
              <img
                class="carousel-img"
                src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
              >
              </router-link>
            <router-link to="/">
                <img
                  class="carousel-img"
                  src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
                >
            </router-link>
            <router-link to="/">
                <img
                  class="carousel-img"
                  src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
                >
            </router-link>
        </n-carousel>
      </div>
  </div>
 
</template>

<script setup>
import {NCarousel} from 'naive-ui'
</script>

<style lang="scss" scoped>
  @import url('./many.scss');
</style>