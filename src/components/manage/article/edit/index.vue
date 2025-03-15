<template>
    <div class="article-edit">
        <n-card class="card return-card">
            <div style="display: flex;">
                <div class="back" @click="$router.back()">
                    <i class="ri-arrow-left-line"></i>
                    <span style="padding:10px">返回</span>
                    </div>
                <span style="">文章编辑</span>
            </div>
   
        </n-card>
        <n-card  class="card add-card">
            <n-form
                ref="formRef"
                :model="formData"
                label-placement="left"
                inline
                label-width="85px"
                :rules="rules"
            >
                <div class="add-wrapper">
                    <div class="ls-form-item">
                        <n-form-item label="文章标题"  path="title" style="marginRight:50px">
                            <div class="article-input" style="width:320px">
                                <n-input
                                    v-model:value="formData.title"
                                    placeholder="请输入文章标题"
                                    type="textarea"
                                    :autosize="{ minRows: 3, maxRows: 3 }"
                                    maxlength="64"
                                    show-word-limit
                                    clearable
                                />
                            </div>
                        </n-form-item>
                        <n-form-item label="文章简介" path="intro">
                            <div class="article-input" style="width:320px">
                                <n-input
                                    v-model:value="formData.intro"
                                    placeholder="请输入文章简介"
                                    type="textarea"
                                    :autosize="{ minRows: 3, maxRows: 6 }"
                                    :maxlength="200"
                                    show-word-limit
                                    clearable
                                />
                            </div>
                        </n-form-item>
                        <n-form-item label="摘要" path="summary">
                            <div class="article-input" style="width:320px">
                                <n-input
                                    type="textarea"
                                    :autosize="{ minRows: 6, maxRows: 6 }"
                                    placeholder="请输入摘要"
                                    v-model:value="formData.summary"
                                    maxlength="200"
                                    show-word-limit
                                    clearable
                                />
                            </div>
                        </n-form-item>
                        <n-form-item label="文章封面" path="image">
                            <div>
                                <div>
                                    <n-upload
                                        multiple
                                        directory-dnd
                                        :custom-request="customRequest"
                    
                                        :max="5"
                                    >
                                        <n-upload-dragger>
                                        <div style="margin-bottom: 12px">
                                            <i class="ri-add-line"></i>
                                        </div>
                                        <n-text style="font-size: 16px">
                                            点击或者拖动图片到该区域来上传
                                        </n-text>
                                        </n-upload-dragger>
                                    </n-upload>
                                </div>
                                <div class="form-tips">建议尺寸：240*180px</div>
                            </div>
                        </n-form-item>
                        <n-form-item label="作者" path="author">
                            <div class="article-input">
                                <n-input v-model:value="formData.author" placeholder="请输入作者名称" />
                            </div>
                        </n-form-item>
                        <n-form-item label="初始浏览量" path="visit">
                            <div class="article-input">
                                <n-input-number v-model:value="formData.views" :min="0" :max="9999" placeholder="请输入初始浏览量"/>
                            </div>
                        </n-form-item>
                        <n-form-item label="文章状态" required path="isShow">
                            <n-radio-group v-model:value="formData.status" name="radiogroup">
                                <n-radio v-for="status in status" :key="status.value" :value="status.value">
                                    {{ status.label }}
                                </n-radio>
                            </n-radio-group>
                        </n-form-item>
                    </div>
                    <div  class="rs-form-item">
                        <n-form-item label="文章内容" required path="content" >
                            <editor @changeContent="getContent" :content="formData.content" :height="667" :width="375" />
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
import {NButton,NForm,NFormItem,NInput,NCard,NRadio,NRadioGroup,NUpload,NUploadDragger,NText,NP,NInputNumber, useMessage} from 'naive-ui'
import {onMounted, reactive, ref} from 'vue'
import editor from '@/components/manage/article/edit/editor.vue'
import footerBtns from '@/components/footer-btns.vue'
import { useRoute, useRouter } from 'vue-router'
import {addArticle,getArticleDataById,editArticle} from '@/api/manage/article.js' 
    const router = useRouter()  
    const route = useRoute()
    const message = useMessage()
    const isEdit = ref(false)
    const formRef = ref(null)
    const fileData = new FormData()
    const formData = ref({
        id: '',
        title: '',
        avatar: '',
        intro: '',
        author: '',
        content: '',
        views: 0,
        status: 1,
        summary: ''
    })
    onMounted(()=>{
        const id = route.query.articleId
        if(id){
            isEdit.value = true
            getArticleDataById(id).then(res =>{
                console.log(res.data)
                formData.value = res.data.data;
            })
        }
    })
    const rules = reactive({
    title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
    })  
    const status = [
        {
          value: 1,
          label: "显示"
        },
        {
          value: 0,
          label: "隐藏"
        }
      ].map((s) => {
        return s;
      })

    function getContent(values){
        formData.value.content = values
    }
    const customRequest = ({
      file
    }) => {
      fileData.append('file',file.file);
    }
    function handleSave(){
        formRef.value?.validate((errors) => {
          if (!errors) {
            if(!isEdit.value){
                addArticle(formData.value).then(res =>{
                    if(res.data.code == 1){
                        console.log(res.data)
                        message.success("发布成功！")
                    }
            })}
            else {
                editArticle(formData.value).then(res =>{
                    if(res.data.code == 1){
                        console.log(res.data)
                        message.success("修改成功！")
                    }
                })
            }
          } else {
            console.log(errors);
            
          }
        });
    }

</script>

<style lang="scss" scoped>
    @import url('./index.scss');
</style>