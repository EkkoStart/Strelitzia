<template>
    <div class="word-container">
        <div class="word-center">
            <div class="card">
                <h2>留言板</h2>
                <div class="input">
                    <textarea cols="30" rows="10" v-model="content" placeholder="请输入留言内容"></textarea>
                </div>
                <button @click="uploadComment">留言</button>
            </div>
            <div class="word-list">
                <h2 > 留言列表[{{ Wlist.length }}]</h2>
                <div class="word-content" v-for="(item,index) in Wlist" :key="item.id">
                    <div class="comment-head">
                        <n-avatar
                        round
                        size="large"
                        :src="item.avatar"
                        />
                        <span class="comment-name">{{item.username}}</span>
                        <span class="comment-createTime">{{changeISOToformatDate(item.createTime)}}</span>
                    </div>
                    <div class="comment-content">
                        <div>{{item.content}}</div>
                        <div class="thumb">
                            <i class="ri-heart-line " v-show="!isThumb[index]" @click="doThumb(index)"></i>
                            <i class="ri-heart-fill " v-show="isThumb[index]" @click="cancelThumb(index)"></i>
                            <span>{{item.thumbNum}}</span>
                            <i class="ri-delete-bin-line" v-if = "item.uid == id" @click="delComment(index)"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import {NAvatar,NP, useMessage,useDialog } from 'naive-ui'
import { computed, ref} from 'vue';
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import {addComment,getComment,addOrDeleteThumb,getThumbStatus,deleteComment} from '@/api/word' 
import {changeISOToformatDate,formatDate} from '@/utils/validate'
import Comment from '@/type/Comment'
    const store=useStore()
    const router=useRouter()
    const message = useMessage()
    const dialog = useDialog()
    const id = computed(()=>store.state.id)
    const username =computed(()=>store.state.username)
    const avatar = computed(()=>store.state.avatar)
    const content=ref('')
    const isThumb = ref([])
    const Wlist=ref([])
    onBeforeMount(async ()=>{

        await getComment().then(res =>{
            Wlist.value = res.data.data
        })
        if(id.value){
            getThumbStatus().then(res =>{
                console.log(res.data.data)
                for(let i =0 ;i<Wlist.value.length;i++){
                    console.log("Wlist.value[i].id:", Wlist.value[i].id);
                    if(res.data.data.indexOf(Wlist.value[i].id)!=-1){
                        isThumb.value[i]=true
                    }
                    else isThumb.value[i]=false
                }
            })
        }   
    })
    function uploadComment() {
        if (content.value === '') {
                alert("请输入留言内容");
                return;
        }
        if(!isLogin()) return
        addComment(content.value).then(res =>{
            if(res.data.code == 1){
                message.success("评论成功！");
           
                const comment = new Comment(res.data.data,id.value,username.value,avatar.value,content.value,0,formatDate(new Date()))
                Wlist.value.unshift(comment);
                isThumb.value.unshift(false)
            }else {
                message.error("评论失败！请联系管理员");
            }
            content.value = ''
        })
    }
    function getComments() {
        getComment().then(res => {
            Wlist.value = res.data.data;
        })
    }
    
    function doThumb(index){
        if(!isLogin()) return
        addOrDeleteThumb(Wlist.value[index].id).then(res =>{
            if(res.data.code == 1){
                isThumb.value[index] = true
                Wlist.value[index].thumbNum += 1
            }else {
                message.info("请勿点击过快")
            }
        }).catch(e =>{
            message.info("请勿点击过快")
        })
    }
    function cancelThumb(index){
        addOrDeleteThumb(Wlist.value[index].id).then(res =>{
            console.log(res.data)
            if(res.data.code ==1){
                isThumb.value[index] = false
                Wlist.value[index].thumbNum -= 1
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
            deleteComment(Wlist.value[index].id).then(res =>{
                if(res.data.code == 1){
                    Wlist.value.splice(index, 1);
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
@import url('./words.scss');
</style>