<template>
    <div class="article-wrapper">
        <div class="article-list">
            <div class="articles" v-for="item in articleList" :key="item.id" @click="openNewWindow(item.id)">
                <n-card style="height:100%" hoverable>
                    <div class="content">  
                        <div class="description">
                            <div class="title">
                                {{item.title}}
                            </div>
                            <div class="intro">
                                <n-ellipsis style="max-width: 240px">
                                    住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
                                    {{item.intro}}
                                </n-ellipsis>  
                            </div>
                            <div class="author-info">
                                <span>{{item.author}}</span>
                                <span class="createTime">{{getDay(item.createTime)}}</span>
                                <span class="views"> <i class="ri-eye-line">{{item.views}}</i></span>
                            </div>
                        </div>
                        <div class="avatar" v-if="item.avatar">
                            <n-avatar
                            size='108px'
                            :src=item.avatar
                            />
                        </div>
                    </div>
                </n-card>
            </div>
        </div>
    </div>
</template>

<script setup>
import {NCard,NAvatar,NEllipsis} from 'naive-ui'
import { getArticle} from '@/api/manage/article'
import { onMounted, ref } from 'vue'
import {getDay} from '@/utils/validate'
    const articleList = ref('')
    const queryParams = ref({
        title: '',
        author:'',
        status: ''
    })

    onMounted(()=>{
        getArticle(queryParams).then(res =>{
            console.log(res.data)
            articleList.value = res.data.data
        })
    })
    function openNewWindow(id) {
        const baseURL =  import.meta.env.VITE_APP_BASEURL
        const url =  '/article/read?articleId='+id;
        const windowName = "文章详情";

        window.open(url, windowName);
    }
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>