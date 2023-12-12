<template>
    <div>
        <div class="swap" v-if="isUpload">
            <div class="loading la-square-jelly-box">
                <div></div>
                <div></div>
            </div>
        </div>
        <div class="show" v-show="!isUpload">
            <div class="type" >
                <div style="text-align: center;">请选择图片上传类型</div>
                <div class="se-button">
                    <button @click="isActive=true"  :class="{active:isActive}" class="FButton">表情包</button>
                    <button @click="isActive=false" :class="{active: !isActive}" class="PButton">图片</button>
                </div>
            </div>
            <div class="file">
                <div class="border">
                    <i class="ri-upload-cloud-line"></i>
                    <p>点击选择上传文件</p>
                    <p style="text-align: center;" v-if="fileName != ''">当前文件：{{ fileName }}</p>
                </div>
                <input type="file" ref="fileInput" @change="filelist">
                <button @click.prevent="uploadFile">上传
                </button>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import {ref, onBeforeMount, computed} from 'vue'
import { useStore } from 'vuex';
    const store=useStore()
    const pCount=computed(()=>store.state.pictures)
    const fCount=computed(()=>store.state.funs)
    const pType='picture'
    const fType='fun'
    let fileName=ref('')
    
    let active=ref(false)
    let isActive=ref(true)
    let isUpload = ref(false)
    let fileInput=ref(null)
    onBeforeMount(()=>{
        store.dispatch('GetCount')
    })
    function filelist(e) {
        fileName.value = e.target.files[0].name;
        let file = fileInput.value.files.item(0);
        console.log(file)
    }
    function uploadFile() {
            console.log(fileInput)
            let file = fileInput.value.files.item(0);
            if (file == null) {
                alert("请先选择文件")
                return;
            }
            console.log(fileInput.value)
            isUpload.value=true;
            // let formData = new FormData()
            // formData.append('file', file);
            // if (!isActive.value)
            // {
            //     formData.append('pic',pCount.value);
            // } 
            // else {
            //     formData.append('fun',fCount.value);
            // }
            // const type=isActive.value?fType:pType
            //  store.dispatch('UpFile',{data:formData,type:type}).then(res=>{
            //     console.log(res)
            //     isUpload.value=false
            //     fileName.value=''
            //     alert('上传成功！')
            //  })
        }
</script>

<style lang="scss" scoped>
@import url('@/styles/upload.scss');
@import url('@/styles/loading.scss');
</style>