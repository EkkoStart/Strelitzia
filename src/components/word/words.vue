<template>
    <div class="word-container">
        <div class="word-center">
            <div class="card">
                <h2>留言板</h2>
                <div class="input">
                    <textarea cols="30" rows="10" v-model="content" placeholder="请输入留言内容"></textarea>
                </div>
                <button @click="upNewWord">留言</button>
            </div>
            <div class="word-list">
                <h2 > 留言列表[{{ Wlist.length }}]</h2>
                <div class="word-content" v-for="item in Wlist" :key="item.id">
                    <Comment>
                        <template #actions>
                        <span key="comment-basic-like">
                            <Tooltip title="Like">
                            <template v-if="action === 'liked'">
                                <LikeFilled @click="like" />
                            </template>
                            <template v-else>
                                <LikeOutlined @click="like" />
                            </template>
                            </Tooltip>
                            <span style="padding-left: 8px; cursor: auto">
                            {{ likes }}
                            </span>
                        </span>
                        <span key="comment-basic-dislike">
                            <Tooltip title="Dislike">
                            <template v-if="action === 'disliked'">
                                <DislikeFilled @click="dislike" />
                            </template>
                            <template v-else>
                                <DislikeOutlined @click="dislike" />
                            </template>
                            </Tooltip>
                            <span style="padding-left: 8px; cursor: auto">
                            {{ dislikes }}
                            </span>
                        </span>
                        <span key="comment-basic-reply-to">回复</span>
                        </template>
                        <template #author><a>{{ item.name }}</a></template>
                        <template #avatar>
                        <img :src="item.head" alt="names" />
                        </template>
                        <template #content>
                        <p>
                          {{ item.content }}
                        </p>
                        </template>
                        <template #datetime>
                        <Tooltip title="aa">
                            <span>{{item.times }}</span>
                        </Tooltip>
                        </template>
                    </Comment>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { computed, ref} from 'vue';
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import {formatDate} from '@/utils/validate'
import {upWord,getWord} from '@/api/word' 
import {Comment,Tooltip} from 'ant-design-vue'
import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined } from '@ant-design/icons-vue';
const likes = ref(0);
const dislikes = ref(0);
const action = ref();

    const like = () => {
    likes.value = 1;
    dislikes.value = 0;
    action.value = 'liked';
    };

    const dislike = () => {
    likes.value = 0;
    dislikes.value = 1;
    action.value = 'disliked';
    };
    const store=useStore()
    const router=useRouter()
    const head = computed(()=> store.state.avatar)
    const username = computed(()=> store.state.username)
    let content=ref('')
    let upTime=ref('')
    let Wlist=ref([])
    onBeforeMount(()=>{
        getNewWord();
    })
    function upNewWord() {
    
        if (content.value === '') {
                alert("请输入留言内容");
                return;
        }
        if(username.value==''||username.value==undefined){
            alert("请先登录")
            router.push('/login')
            return;
        }
        upTime.value = formatDate(new Date())
        const msg = {
            head:head.value,
            name:username.value,
            times:upTime.value,
            content:content.value,
        }
        upWord(msg).then(res =>{
            if(res.data == 'success')
            {
                alert('留言成功')
                Wlist.value.unshift(msg)
                content.value=''
            }
        })
    }
    function getNewWord() {
        getWord().then(res => {
            Wlist.value = res.data;
            })
    }

</script>

<style lang="scss" scoped>
@import url('./words.scss');
</style>