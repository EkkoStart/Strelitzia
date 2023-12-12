import {EventEmitter} from "events"
import Experience from "../Experence"
import GSAP from 'gsap'
export default class Preloader extends EventEmitter{
    constructor(){
        super()
        this.experience=new Experience()
        this.sizes=this.experience.sizes
        this.scene=this.experience.scene
        this.resources=this.experience.resources
        this.camera=this.experience.camera
        this.world=this.experience.world
        this.device=this.sizes.device
      
        this.sizes.on('switchDevice',(device)=>{
            this.device=device
        })
        this.world.on('worldready',()=>{
            this.setAssets()
            this.playIntro()
            this.plane=this.scene.getObjectByName('xxxxxx')
        })
    }

    setAssets(){
  
        this.room=this.experience.world.room.actualRoom
        this.roomChildern=this.experience.world.room.roomChildren
    }

    firstIntro(){
        return new Promise((resolve)=>{
           
            this.tl=new GSAP.timeline()
            this.tl.to('.preloader',{
                opacity:0,
                onComplete:(()=>{
                    document.querySelector('.preloader').classList.add('hidden')
                })
            })
            if(this.device==='desktop')
            {
                this.tl.to(this.roomChildern['立方体'].scale,{
                    x:0.14,
                    y:0.14,
                    z:0.14,
                    ease:"back.out(2.5)",
                    duration:0.7,
                }).to(this.roomChildern['立方体'].position,{
                    x:-9,
                    ease:"power1.out",
                    duration:0.7,
                })
            }else {
                this.tl.to(this.roomChildern['立方体'].scale,{
                    x:0.14,
                    y:0.14,
                    z:0.14,
                    ease:"back.out(2.5)",
                    duration:0.7,
                }).to(this.roomChildern['立方体'].position,{
                    z:-11,
                    x:0.15,
                    ease:"power1.out",
                    duration:0.7,      
                })
            }
            this.tl.to('.intro-text .animatedis',{
                yPercent:-100,
                stagger:0.05,
                ease:'back.out(1.7)',
            }).to('.arrow-svg-wrapper',{
                opacity:1
            }).to('.toggle-bar',{
                opacity:1,
                onComplete:resolve,
            })
        })
    }

    onScroll(e){
        if(e.deltaY>0)
        {
            window.removeEventListener('wheel',this.scrollOnceEvent)
            this.playSecondIntro()
        }
    }

    onTouch(e){
        this.initalY = e.touches[0].clientY;
    }

    onTouchMove(e){
        let currentY=e.touches[0].clientY
        let difference=this.initalY-currentY
        if(difference>0)
        {

            this.playSecondIntro()
            this.removeEventListeners()
        }
        this.initalY=null
    }

    removeEventListeners(){
        window.removeEventListener('wheel',this.scrollOnceEvent)
        window.removeEventListener('tuchstart',this.touchStart)
        window.removeEventListener('touchmove',this.touchMove)
    }

    async playIntro()
    {
    
        this.scaleFlag=true
        await this.firstIntro()
        this.moveFlag=true
        this.scrollOnceEvent=this.onScroll.bind(this)
        this.touchStart=this.onTouch.bind(this)
        this.touchMove=this.onTouchMove.bind(this)
        window.addEventListener('wheel',this.scrollOnceEvent)
        window.addEventListener('touchstart',this.touchStart)
        window.addEventListener('touchmove',this.touchMove)
    }

     async playSecondIntro(){
        this.moveFlag=false
        await this.SecondIntro()
        this.scaleFlag=false
        this.emit('enableControls')
    }

    SecondIntro()
    {
        return new Promise((resolve)=>{
            this.Secondtl=new GSAP.timeline()
         
            this.Secondtl.to('.intro-text .animatedis',{
                yPercent:100,
                stagger:0.05,
                ease:'back.in(1.7)',
            }).to(this.room.position,{
                x:0.15,
                y:0,
                z:0
            },'same').to(this.roomChildern['立方体'].position,{
                x:0.644467 ,
                y:-2,
                z:-17.9698 ,
                ease:"power1.out",
            
            },'same').to(this.camera.orthographicCamera.position,{
                y:3.5
            },'same').to(this.plane.position,{
                y:-1.2
            },'same').to(this.roomChildern['立方体'].scale,{
                x:1,
                y:1,
                z:1
            },'same').to(this.roomChildern['立方体'].rotation,{
                y:2*Math.PI+Math.PI/4
            },'same').set(this.roomChildern['墙'].scale,{
                x:1,
                y:1,
                z:1
            },'same2').set(this.roomChildern['延展地板'].scale,{
                x:1,
                y:1,
                z:1
            },'same2').to(this.roomChildern['立方体'].scale,{
                x:0,
                y:0,
                z:0,
                duration:0.4
            }).to(this.roomChildern['002'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(1.6)",
            },'hua').to(this.roomChildern['003'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'hua').to(this.roomChildern['六花'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'hua').to(this.roomChildern['插头'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'same3').to(this.roomChildern['插头2'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'same3').to(this.roomChildern['床头柜'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'same4').to(this.roomChildern['书桌'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'same4').to(this.roomChildern['面码'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'same5').to(this.roomChildern['抽纸'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'same5').to(this.roomChildern['魔方'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'same5').to(this.roomChildern['笔筒'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'same5').to(this.roomChildern['书本'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'same5').to(this.roomChildern['台灯'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'same5').to(this.roomChildern['抽纸'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'same5').to(this.roomChildern['水杯'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'same5').to(this.roomChildern['书桌盒子'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'same5').to(this.roomChildern['床'].scale,{
                x:1,
                y:1,
                z:1,

            }).to(this.roomChildern['枕头'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'same6').to(this.roomChildern['椅子'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'same6').to(this.roomChildern['坐垫'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'same6').to(this.roomChildern['茶桌椅'].scale,{
                x:1,
                y:1,
                z:1,
               
            },'same6').to(this.roomChildern['茶桌3'].scale,{
                x:1,
                y:1,
                z:1,
                
            },'same6').to(this.roomChildern['茶桌2'].scale,{
                x:1,
                y:1,
                z:1,
               
            },'same6').to(this.roomChildern['茶桌'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'same6').to(this.roomChildern['颜料盒'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'same8').to(this.roomChildern['画板'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'same8').to(this.roomChildern['调色板'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(2.2)",
            },'same8').to(this.roomChildern['画笔'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(1.2)",
            },'same9').to(this.roomChildern['画'].scale,{
                x:1,
                y:1,
                z:1,
                ease:"back.out(1.2)",
                onComplete:resolve,
            },'same9').to('.hero-main-title .animatedis',{
                yPercent:-100,
                stagger:0.07,
                ease:'back.out(1.2)',
               
            },'same6').to('.hero-main-description .animatedis',{
                yPercent:-100,
                stagger:0.07,
                ease:'back.out(1.2)',
            },'same6').to('.hero-second-subtitle .animatedis',{
                yPercent:-100,
                stagger:0.07,
                ease:'back.out(1.2)',
            },'same6').to('.hero-second-subdescription .animatedis',{
                yPercent:-100,
                stagger:0.07,
                ease:'back.out(1.2)',
               
            },'same6').to('.arrow-svg-wrapper',{
                opacity:0
            }).to('.topbar-wrapper',{
                opacity:1
            },'same6')
        })
    }
    move()
    {
        if(this.device==='desktop')
        {  
            this.roomChildern['立方体'].position.x=-9
        }
        else {
            this.roomChildern['立方体'].position.z=-11
            this.roomChildern['立方体'].position.x=0.15
        }
    }
    scale()
    {
        this.roomChildern.rectLight.width=0
        this.roomChildern.rectLight.height=0
        if(this.device==='desktop')
        {
            this.room.scale.set(0.21,0.21,0.21)
        }
        else  this.room.scale.set(0.13,0.13,0.13)
    }
    update()
    {
        if(this.moveFlag)
        {
            this.move()
        }
        if(this.scaleFlag)
        {
            this.scale()
        }
        
    }
}