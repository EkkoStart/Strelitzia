<template>
    <div class="container" ref="container">
        <div class="forms-container">
            <div class="signin-signup">
                <form class="sign-in-form" >
                    <h2 class="title">登 录</h2>
                    <div class="input-field" >
                        <i class="ri-user-heart-line"></i>
                        <input type="text" placeholder="Username" v-model="userInfo.username" />
                    </div>
                    <div class="input-field" >
                        <i class="ri-lock-2-line"></i>
                        <input type="password" placeholder="Password" v-model="userInfo.password" />
                    </div>
                    <button class="btn solid" @click.prevent="handleLogin"
                        ref="loginBtn" 
                    >
                        登 录</button>
                    <p class="social-text">其他登录方式</p>
                    <div class="social-media">
                        <a class="social-icon" @click="loginBy('qq')">
                            <i class="ri-qq-line"></i>
                        </a>
                        <a href="#" class="social-icon"  @click="loginBy('wechat')">
                            <i class="ri-wechat-2-line"></i>
                        </a>
                        <a href="#" class="social-icon"  @click="loginBy('GITEE')">
                            <i class="ri-github-line"></i>
                        </a>
                        <a href="#" class="social-icon"  @click="loginBy('sms')">
                            <i class="ri-chat-3-line"></i>
                        </a>
                    </div>
                </form>
                <form class="sign-up-form" >
                    <h2 class="title">注 册</h2>
                    <div class="input-field">
                        <i class="ri-user-heart-line"></i>
                        <input type="text" placeholder="Username" v-model="registerInfo.username" />
                    </div>
                    <div class="input-field" prop="password">
                        <i class="ri-lock-2-line"></i>
                        <input type="password" placeholder="Password" v-model="registerInfo.password" />
                    </div>
                    <div class="input-field" prop="repeat-password">
                        <i class="ri-lock-password-line"></i>
                        <input type="password" placeholder="repeat Password" v-model="registerInfo.secondPassword" />
                    </div>
                    <div class="input-field" prop="phone">
                        <i class="ri-phone-line"></i>
                        <input type="text" placeholder="Phone" v-model="registerInfo.phone" />
                    </div>
                    <button class="btn solid" @click.prevent="register"
                        ref="registerBtn"
                    >
                    注 册</button>
                    <!-- <p class="social-text">Or Sign up with social platforms</p> -->
                    <!-- <div class="social-media">
                        <a href="#" class="social-icon">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="social-icon">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="social-icon">
                            <i class="fab fa-google"></i>
                        </a>
                        <a href="#" class="social-icon">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                    </div> -->
                </form>
            </div>
        </div>
        <div class="panels-container">
            <div class="panel left-panel">
                <div class="content">
                    <h3>New Here?</h3>
                    <p>从今若许闲乘月，拄杖无时夜叩门</p>
                    <button class="btn transparent" id="sign-up-btn" @click.prevent="signIn">注 册</button>
                </div>
                <img src="@/assets/sign-up.svg" class="image">

            </div>
            <div class="panel right-panel">
                <div class="content">
                    <h3>One of us?</h3>
                    <p>奢侈的需求变多，平淡也会使人惊讶</p>
                    <button class="btn transparent" id="sign-in-btn" @click="signUp">登录</button>
                </div>
                <img src="@/assets/sign-in.svg" class="image">
            </div>
        </div>
     
    </div>
</template>

<script setup>

import {ref, computed, onMounted} from 'vue'; 
import {useStore} from 'vuex'
import { useMessage} from "naive-ui";
import {useRoute, useRouter} from 'vue-router';
import {loginVerify , registerVerify} from '@/utils/validate.js'
import {loginByOther} from '@/api/login'
import axios from 'axios'
    const container=ref(null)
    const loginBtn = ref(null)
    const registerBtn = ref(null)
    const store=useStore()
    const route = useRoute()
    const router=useRouter()
    const message = useMessage();
    const code = computed(()=> store.state.code)
    const userInfo=ref({
        username:"",
        password:"",
    })
    const registerInfo=ref({
        username:"",
        password:"",
        secondPassword:"",
        phone:""
    })

    onMounted(()=>{
        const preloader=document.querySelector(".preloader")
        if(preloader)
            preloader.style.display = "none"
    })

    function handleLogin() {
        const redirectPath = route.query.redirect ? route.query.redirect: '/'
        const res = loginVerify(userInfo.value)
        if(res != "success"){
            message.error(res);
        }
        else {
            loginBtn.value.disabled = "true"
            store.dispatch("Login", userInfo.value).then(() => {
                message.success("登录成功！");
                router.push(redirectPath)
        }).catch(e =>{
            message.error(e);
            reSet(userInfo)
        }).finally(()=>{
            loginBtn.value.disabled = "false"
        })
        }

    }   

    function loginBy(type){

        if(type == "qq"){
    
        }

        window.location.href = import.meta.env.VITE_APP_SSO_REQ+type;
    }

    function register() {
        const res = registerVerify(registerInfo.value)
        if(res != "success"){
            message.error(res)
        }
        else {
            registerBtn.value.disabled="true"
            store.dispatch("Register", registerInfo.value).then((res) => {
                    message.success("注册成功！")
                    signUp()
            }).catch(e => {
                message.error(e)
            }).finally(()=>{
                registerBtn.value.disabled="false"
            })
        }
        }  
    function reSet(data)
    {
        data.value={};
    }
    function signIn() {
        container.value.classList.add("sign-up-mode");
    }
    function signUp() {
        container.value.classList.remove("sign-up-mode");
    }

</script>

<style lang="scss" scoped>
@import url('./login.scss');
</style>