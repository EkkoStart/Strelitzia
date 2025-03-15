<template>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange"
      />
    </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted, watchEffect,  computed } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {upFile} from '@/api/upFile.js'

    const emit = defineEmits(['changeContent'])
    const props = defineProps(['content'])
    const mode = 'default'
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    const content = computed(()=>props.content)

    // 内容 HTML
    const valueHtml = ref('')

    // 模拟 ajax 异步获取内容
    watchEffect(()=>{
        if(content.value){
          valueHtml.value = content.value
        }
    })
    function handleChange(){
        if(valueHtml && valueHtml.value){
            emit('changeContent',valueHtml.value)
        }
    }
    const toolbarConfig = {}
    const editorConfig = { 
      MENU_CONF: {},
      placeholder: '请输入内容...'
     }

    editorConfig.MENU_CONF['uploadImage'] = {
    // 自定义上传
    async customUpload(file, insertFn) { 
        const formData = new FormData();
        formData.append('file',file);
        upFile(formData,'article').then(res=>{
            if(res.data.code == 1){
              const alt =''
              const href = ''
              const url = res.data.data
              insertFn(url, alt, href)
            }
        }).catch(e =>{
          console.log(e)
        })
        // file 即选中的文件
        // 自己实现上传，并得到图片 url alt href
        // 最后插入图片
  //      insertFn(url, alt, href)
    }
}
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

</script>    
<style lang="scss" scoped>

</style>