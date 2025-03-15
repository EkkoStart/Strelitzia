<template>
    <div class="user-edit">
        <n-card class="card return-card" shadow="never">
            <div style="display: flex;">
                <div class="back" @click="$router.back()">
                    <i class="ri-arrow-left-line"></i>
                    <span style="padding:10px">返回</span>
                    </div>
                <span style="">用户详情</span>
            </div>
   
        </n-card>
        <n-card  class="card add-card">
            <n-form
                ref="formRef"
                :model="detailData"
                label-placement="left"
                inline
                label-width="85px"
            >
                <div class="item-wrapper">
                    <div class="ls-form-item">
                        <n-form-item label="用户ID">
                            <div class="user-input">
                                {{detailData.id}}
                            </div>
                        </n-form-item>
                        <n-form-item label="用户头像" >
                            <div class="user-avatar">
                                <n-avatar
                                :size="48"
                                :src="detailData.avatar"
                                />
                            </div>
                        </n-form-item>
                        <n-form-item label="用户名">
                            <div class="user-input" style="width:320px">
                                {{detailData.username}}
                            </div>
                        </n-form-item>
                        <n-form-item label="手机号">
                            <div>
                                {{detailData.phone}}
                            </div>
                        </n-form-item>
                        <n-form-item label="邮箱" path="author">
                            <div class="user-input">
                                {{detailData.email}}
                            </div>
                        </n-form-item>
                        <n-form-item label="账号状态" path="author">
                            <div class="user-input">
                                {{detailData.status}}
                            </div>
                        </n-form-item>
                    </div>
                </div>
            </n-form>
        </n-card>
        <footer-btns>
            <n-button type="primary" @click="handleSave">保存</n-button>
        </footer-btns>
    </div>
</template>

<script setup>
import {NButton,NForm,NFormItem,NCard,NAvatar} from 'naive-ui'
import {onMounted, reactive, ref} from 'vue'
import footerBtns from '@/components/footer-btns.vue'
import { useRoute, useRouter } from 'vue-router'
import {getDetail} from '@/api/manage/user'
    const router = useRouter()
    const route = useRoute()
    const formRef = ref(null)
    const detailData = ref({
        id: '',
        avatar: '',
        uesrname: '',
        phone: '',
        email: '',
        qq: '',
        github: '',
        gitee: '',
        status:1,
        createTime: ''
    })
    onMounted(()=>{
        const uid = route.query.uid
        if(uid){
            console.log(uid)
            getDetail(uid).then(res =>{
                if(res.data.code == 1){
                    console.log(res.data.data)
                    detailData.value = res.data.data[0]
                }
            })
        }else {
            router.back()
        }
    })
    function handleSave(){
        formRef.value?.validate((errors) => {
          if (!errors) {
            console.log(formData.value.content)
          } else {
            console.log(errors);
            
          }
        });
    }

</script>

<style lang="scss" scoped>
    @import url('./index.scss');
</style>