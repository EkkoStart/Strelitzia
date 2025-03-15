<template>
    <div class="wrapper">
        <div class="experience">
            <canvas class="experience-canvas" ref="canvas"></canvas>
        </div>
        <div class="page"  asscroll-container>
        <div class="toggle-bar">
            <div class="sun-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z"/></svg>
            </div>
            <div class="toggle-button">
                <div class="toggle-circle"></div>
            </div>
            <div class="moon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M560-80q-82 0-155-31.5t-127.5-86Q223-252 191.5-325T160-480q0-83 31.5-155.5t86-127Q332-817 405-848.5T560-880q54 0 105 14t95 40q-91 53-145.5 143.5T560-480q0 112 54.5 202.5T760-134q-44 26-95 40T560-80Zm0-80h21q10 0 19-2-57-66-88.5-147.5T480-480q0-89 31.5-170.5T600-798q-9-2-19-2h-21q-133 0-226.5 93.5T240-480q0 133 93.5 226.5T560-160Zm-80-320Z"/></svg>
            </div>
        </div>
    
        <div class="page-wrapper " asscroll>
            <section class="hero">
                <div class="hero-wrapper">
    
                    <div class="intro-text" ref="IntroText">热爱抵得过时间长流</div>
                    <div class="arrow-svg-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                    </div>
                    <div class="hero-main">
                        <h1 class="hero-main-title" ref="mainTitle">我本将心向明月</h1>
                        <p class="hero-main-description" ref="mainDesc">奈何明月照沟渠OvO</p>
                    </div>
                    <div class="hero-second">
                        <h1 class="hero-second-subtitle" ref="secondTitle">Strelitzia</h1>
                        <p class="hero-second-subdescription" ref="secondDesc">0216</p>
                    </div>
                </div>
            </section>
            <div class="first-move section-margin"></div>
    
            <section class="first-section section left">
                <div class="progress-wrapper progress-bar-wrapper-left">
                    <div class="progress-bar "></div>
                </div>
                <div class="section-intro-wrapper pink-text">
                    <h1 class="section-title pink-text pink-border">
                        <div class="section-title-text pink-text">About</div>
                        <div class="section-title-decoration styleOne pink-border" ></div>
                        <div class="section-title-decoration styleTwo pink-border" ></div>
                        <div class="section-title-decoration styleThree pink-border pink-background" ></div>
                    </h1>
                    <span class="section-number">01</span>
                </div>
    
                <div class="section-detail-wrapper">
                    <h3 class="section-heading">哈喽 ^ω^</h3>
                    <p class="section-text">做这个网站的目的很简单，看到好玩的就想自己实现一下，毕竟真做出来的话心里那是相当有成就感(๑❛ᴗ❛๑)</p>
                    <h3 class="section-heading">个人</h3>
                    <p class="section-text">本人本科在读，死宅一只，平常就喜欢看动漫打游戏。欢迎各位来一起来聊天 (๑¯ω¯๑)</p>
                    <h3 class="section-heading">春风若有怜花意，可否许我再少年。</h3>
                    <p class="section-text"></p>
                </div>
            </section>
    
            <div class="second-move section-margin"></div>
    
            <section class="second-section section right">
                <div class="progress-wrapper progress-bar-wrapper-right">
                    <div class="progress-bar blue-background"></div>
                </div>
                <div class="section-intro-wrapper blue-text">
                    <h1 class="section-title blue-text blue-border">
                        <div class="section-title-text blue-text">Contact</div>
                        <div class="section-title-decoration styleOne blue-border" ></div>
                        <div class="section-title-decoration styleTwo blue-border" ></div>
                        <div class="section-title-decoration styleThree blue-border blue-background" ></div>
                    </h1>
                    <span class="section-number blue-text">02</span>
                </div>
    
                <div class="section-detail-wrapper">
                    <h3 class="section-heading">联系方式</h3>
                    <p class="section-text">QQ:1668643648 <br> 微信:wzl18250060295 <br> 电话:18250060295</p>
                    <img src="@/assets/liu.gif" class="contact-gif">
                </div>
            </section>
    
            <div class="third-move section-margin"></div>
    
            <section class="third-section section left">
                <div class="progress-wrapper progress-bar-wrapper-left">
                    <div class="progress-bar green-background"></div>
                </div>
    
                <div class="section-intro-wrapper green-text ">
                    <h1 class="section-title green-text green-border">
                        <div class="section-title-text green-text" >Finally</div>
                        <div class="section-title-decoration styleOne green-border"></div>
                        <div class="section-title-decoration styleTwo green-border" ></div>
                        <div class="section-title-decoration styleThree green-border green-background"></div>
                    </h1>
                    <span class="section-number green-text">03</span>
                </div>
    
                <div class="section-detail-wrapper">
                    <h3 class="section-heading">最后</h3> 
                    <p class="section-text">个人水平有限，bug还是很多并且还未解决，希望大家能够分享一些经验或者建议，谢谢大火。以后如果学到好玩的还是会分享到这个网站 ಥ_ಥ</p>
                    <h3 class="section-heading">感谢</h3>
                    <p class="section-text">感谢遇见过的每一个人即使只是同行过那么一小段路也好 愿大家以后在各自的路上勇敢前行散发光亮。祝大家天天开心啊OvO</p>
                </div>
                <a style="bottom:0;position:absolute">湘ICP备2023025198号-1</a>
            </section>
       
            
        </div>
        </div>
    </div>    
  </template>
  
  <script setup>
  import { getCurrentInstance, onMounted } from 'vue';
  import Experience from '@/Experience/Experence'
  import convert from'@/Experience/utils/covertDivsTospans.js'
      onMounted(()=>{
        const proxy=getCurrentInstance()
        const experience = new Experience(proxy.refs.canvas );
        convert(proxy.refs.IntroText)
        convert(proxy.refs.mainTitle)
        convert(proxy.refs.mainDesc)
        convert(proxy.refs.secondTitle)
        convert(proxy.refs.secondDesc)
      })
  
  </script>
  
  <style lang="scss" scoped>
      @import url('./first.scss');
    
  </style>