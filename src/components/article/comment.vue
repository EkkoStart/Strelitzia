<template>
    <div>
        <n-card  style="height:100%;borderRadius:15px">
            <span style="fontSize:1.5rem">评论  {{commentCount}}</span>
            <div class="publish-comment">
                <div class="avatar">
                    <n-avatar
                        round
                        :size="48"
                        :src=avatar
                    />
                </div>
                <div class="input-wrapper">
                    <n-input
                    v-model:value="commentContent"   
                    maxlength="50"
                    placeholder="友善交流"
                    type="textarea"
                    :autosize="{
                        minRows: 3,
                        maxRows: 5
                    }"
                    style="height:100%"
                    />
                    <n-button strong secondary type="primary" class="submit-btn" @click="uploadComment"> 
                        发送
                    </n-button>
                </div>
            </div>
            <div class="comment-list">
                <div class="comments" v-for="(item,index) in commentList" :key="item.id">
                    <div class="comment-head">
                        <div class="head">
                            <n-avatar
                            round
                            :size="50"
                            :src="item.avatar"
                            />   
                        </div>

                    </div>
                    <div class="comment-container">
                        <div>
                            <span class="comment-name">{{item.username}}</span>
                        </div>
                        <div class="comment-content">{{item.content}}</div>
                        <div class="thumb">
                            <span class="comment-createTime">{{changeISOToformatDate(item.createTime)}}</span>
                            <div style="display:flex;alignItems:center">
                                <i class="ri-thumb-up-line" v-show="!isThumb[index]" @click="doThumb(index)"></i>
                                <i class="ri-thumb-up-fill" v-show="isThumb[index]" @click="cancelThumb(index)"></i>
                                <span class="thumbCount">{{item.thumbNum}}</span>
                            </div>
                            <i class="ri-delete-bin-line" v-if = "item.uid == id" @click="delComment(index)"></i>
                        </div>
                    </div>
                </div>
            </div>
        </n-card>
      
    </div>
</template>

<script setup>
import {NCard,NAvatar,NInput,NButton, useMessage, useDialog,NDrawer,NDrawerContent} from 'naive-ui'
import { computed, onMounted, ref} from 'vue'
import { useStore } from 'vuex'
import {addComment,getComment,addOrDeleteThumb,getThumbStatus,deleteComment} from '@/api/articleComment' 
import {changeISOToformatDate,formatDate} from '@/utils/validate'
import Comment from '@/type/Comment'
    const props = defineProps(['articleId'])
    const emit = defineEmits(['emitCount'])
    const store = useStore()
    const message = useMessage()
    const dialog = useDialog()
    const articleId = computed(() => props.articleId)
    const username = computed(()=>store.state.username)
    const avatar = computed(()=> store.state.avatar)
    const id = computed(()=> store.state.id)
    const commentActive = ref(false)
    const commentCount = ref(15)
    const commentContent = ref('')
    const isThumb = ref([])
    const commentList = ref([])
    onMounted(async ()=>{
        await getComment(articleId.value).then(res =>{
            commentList.value = res.data.data
            commentCount.value = commentList.value.length
            emit('emitCount',commentCount.value)
        })
        if(id.value){
            getThumbStatus(articleId.value).then(res =>{
                console.log(res.data.data)
                for(let i =0 ;i<commentList.value.length;i++){
                    if(res.data.data.indexOf(commentList.value[i].id)!=-1){
                        isThumb.value[i]=true
                    }
                    else isThumb.value[i]=false
                }
            })
        }   
    })

    function uploadComment() {
        if (commentContent.value === '') {
                message.warning("请输入评论内容")
                return;
        }
        if(!isLogin()) return
        addComment(commentContent.value,articleId.value).then(res =>{
            if(res.data.code == 1){
                message.success("评论成功！");
           
                const comment = new Comment(res.data.data,id.value,username.value,avatar.value,commentContent.value,0,formatDate(new Date()))
                commentList.value.unshift(comment);
                isThumb.value.unshift(false)
            }else {
                message.error("评论失败！请联系管理员");
            }
            commentContent.value = ''
        })
    }

    function showComment(){
        console.log(777)
        commentActive.value = true
    }

    function doThumb(index){
        if(!isLogin()) return
        addOrDeleteThumb(commentList.value[index].id,articleId.value).then(res =>{
            if(res.data.code == 1){
                isThumb.value[index] = true
                commentList.value[index].thumbNum += 1
            }else {
                message.info("请勿点击过快")
            }
        }).catch(e =>{
            message.info("请勿点击过快")
        })
    }
    function cancelThumb(index){
        addOrDeleteThumb(commentList.value[index].id,articleId.value).then(res =>{
            console.log(res.data)
            if(res.data.code ==1){
                isThumb.value[index] = false
                commentList.value[index].thumbNum -= 1
            }else {
                message.info("请勿点击过快")
            }
        }).catch(e =>{
            message.info("请勿点击过快")
        })
    }
    function isLogin(){
        if(!id.value){
            message.info("请先登录")
            return false
        }
        return true
    }
    function delComment(index){
        dialog.warning({
          title: "删除评论",
          content: "是否删除该评论？删除后不可恢复",
          positiveText: "是",
          negativeText: "否",
          onPositiveClick: () => {
            deleteComment(commentList.value[index].id,articleId.value).then(res =>{
                if(res.data.code == 1){
                    commentList.value.splice(index, 1);
                    isThumb.value.splice(index,1)
                    message.success("删除成功！");
                }else{
                    message.error("删除失败！")
                }
            })
          },
        });
    }
</script>

<style lang="scss" scoped>
    @import url('./comment.scss');
</style>    