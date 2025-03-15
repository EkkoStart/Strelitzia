<template>
    <div class="footer-btns">
        <div class="footer-btns__content" :style="fixed ? 'position: fixed' : ''">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    fixed: {
        type: Boolean,
        default: true
    }
})
</script>

<style scoped lang="scss">
.footer-btns {
    height: 60px;
    
    &__content {
        flex-wrap: wrap;
        bottom: 0;
        height: 60px;
        right: 0;
        left: 0;
        z-index: 99;
       justify-content: center;
       align-content: center;
       display: flex;
       background-color: #fff;
       box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
    }
}
</style>
