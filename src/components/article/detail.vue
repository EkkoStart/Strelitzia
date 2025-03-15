<template>
    <div class="container-wrapper">
        <div class="left-wrapper">
            <div class="left-content">
                <!-- <div class="thumb-icon" @click="handleThumb">
                    <i class="ri-thumb-up-line" v-if="isThumb"></i>
                    <i class="ri-thumb-up-fill" v-else></i>
                </div> -->
                
                <div class="comment-icon" @click="handleComment">
                    <n-badge :value=commentCount color="#8a919f">
                        <i class="ri-message-2-line" ></i>
                    </n-badge >
                </div>
            
            </div>
        </div>
        <div class="content-wrapper">
            <div class="content">
                <n-card  style="height:100%;borderRadius:15px">
                    <div class="article-description">
                        <div class="title">
                            {{articleData.title}}
                        </div>
                        <div class="author-info">
                            <div class="author-name">
                                {{articleData.author}}
                            </div>
                            <div class="article-createTime">
                                {{getDay(articleData.createTime)}}
                            </div>
                            <div class="views">
                                <i class="ri-eye-line"></i>
                                {{articleData.views}}
                            </div>
                        </div>
                    </div>
                    <div class="article-content" ref="contentRef">
                    </div>
                </n-card>
            </div>
            <div class="comment">
                <comment :articleId="articleId" @emitCount = "getCommentCount"/>
            </div>
          
        </div>
        <div class="right-wrapper">
            <n-card style="height:100%;borderRadius:15px">
                <div class="author-intro">
                    <div class="author-avatar">
                        <n-avatar
                        round
                        :size="48"
                        :src=articleData.avatar
                        />
                    </div>
                    <div class="author-name">
                        {{articleData.author}}
                    </div>
                </div>
            
            </n-card>
        </div>
        <n-drawer v-model:show="commentActive" :width="502">
                <comment :articleId="articleId" />
        </n-drawer>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {NCard,NAvatar,NDrawer,NDrawerContent,NBadge} from 'naive-ui'
import { useRoute } from "vue-router";
import {getArticleDataById} from '@/api/manage/article'
import {getDay} from '@/utils/validate'
import comment from './comment.vue'
    const route = useRoute() 
    const isThumb = ref(true)
    const articleData = ref('')
    const authorData = ref('')
    const commentActive = ref(false)
    const contentRef = ref(null)
    const commentCount = ref(8)
    const articleId = route.query.articleId
    onMounted(()=>{
        if(articleId){
            getArticleDataById(articleId).then(res =>{
                if(res.data.code  == 1){
                    console.log(res.data.data)
                    articleData.value = res.data.data
                    contentRef.value.innerHTML = articleData.value.content
                } 
            })
        }
    })

    function handleThumb(){

    }
    function handleComment(){
        commentActive.value = true
    }
    function getCommentCount(count){
        commentCount.value = count
    }
</script>

<style lang="scss" scoped>
    @import url('./detail.scss');
</style>