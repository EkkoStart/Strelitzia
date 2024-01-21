<template>
    <div class="async-wrapper">
        <ques @upload = "upload"/>
    </div>
</template>

<script setup>
import ques from '../ques/ques.vue'

function upload(Data){
    
}
</script>

<style lang="scss" scoped>
.async-wrapper{
    height: 650px;
    max-height: 100%;
    display: grid;
    overflow: hidden;
    grid-template-columns: 40% 60%;
}
</style>