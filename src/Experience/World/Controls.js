import Experience from "../Experence";
import GSAP from 'gsap'
import { ScrollTrigger } from "gsap/all";


//相机
export default class Controls{
    constructor(){
        this.experience=new Experience()
        this.scene=this.experience.scene
        this.resources=this.experience.resources
        this.time=this.experience.time
        this.camera=this.experience.camera
        this.sizes=this.experience.sizes
        this.room=this.experience.world.room.actualRoom
        this.room.children.forEach((child)=>{
            if(child.type==="RectAreaLight"){
                this.rectLight=child
            }
        })
        this.circleFirst=this.experience.world.floor.circleFirst
        this.cirleSecond=this.experience.world.floor.circleSecond
        this.circleThird=this.experience.world.floor.circleThird
        GSAP.registerPlugin(ScrollTrigger)
        document.querySelector(".page").style.overflow = "visible";

        this.setAnimation()
    }

    setAnimation(){
        let mm = GSAP.matchMedia();

        mm.add("(min-width: 969px)", () => {
            console.log('desktop')
                this.rectLight.width=1
                this.rectLight.height=1
                this.room.scale.set(0.21,0.21,0.21)
                this.firstMoveTL=new GSAP.timeline({
                    scrollTrigger:{
                        trigger:'.first-move',
                        start:'top top',
                        end:'bottom bottom',
                        scrub:0.6,
                        invalidateOnRefresh:true
                    }
                })
                this.firstMoveTL.to(this.room.position,{
                    x:()=>{
                        return this.sizes.width*0.0030;
                    },
                })
                this.secondMoveTL=new GSAP.timeline({
                    scrollTrigger:{
                        trigger:'.second-move',
                        start:'top top',
                        end:'bottom bottom',
                        scrub:0.6,
                        invalidateOnRefresh:true
                    }
                })
                .to(this.room.position,{
                    x:()=>{
                        return -2.5
                    },
                    z:()=>{
                        return this.sizes.height*0.0035
                    },
                },'same')
                .to(this.room.scale,{
                    x:0.5,
                    y:0.5,
                    z:0.5
                },'same')
                .to(this.rectLight,{
                    height:3,
                    width:3
                },'same').to(this.room.position,{
                    y:1.3,
                },'same').to(this.camera.orthographicCamera.position,{
                    y:7,
                },'same')
                this.thirdMoveTL=new GSAP.timeline({
                    scrollTrigger:{
                        trigger:'.third-move',
                        start:'top top',
                        end:'bottom bottom',
                        scrub:0.6,
                        invalidateOnRefresh:true
                    }
                }).to(this.camera.orthographicCamera.position,{
                    y:-4,
                    x:-10,
                },'same').to(this.room.position,{
                    x:-0.5,
                },'same')

        });  
        mm.add("(max-width: 968px)", () => {
            console.log("mobile")
            this.room.position.set(0.15,0,0)
            this.room.scale.set(0.13,0.13,0.13)
            this.rectLight.width=0.5
            this.rectLight.height=0.5
            this.firstMoveTL=new GSAP.timeline({
                scrollTrigger:{
                    trigger:'.first-move',
                
                    start:'top top',
                    end:'bottom bottom',
                    scrub:0.6,
                    invalidateOnRefresh:true
                }
            }).to(this.room.scale,{
                x:0.16,
                y:0.16,
                z:0.16,
            })
            this.secondMoveTL=new GSAP.timeline({
                scrollTrigger:{
                    trigger:'.second-move',
               
                    start:'top top',
                    end:'bottom bottom',
                    scrub:0.6,
                    invalidateOnRefresh:true
                }
            }).to(this.room.scale,{
                x:0.35,
                y:0.35,
                z:0.35,
            },'same').to(this.rectLight,{
                width:2,
                height:2
            },'same').to(this.room.position,{
                x:2.5
            },'same')
            this.thirdMoveTL=new GSAP.timeline({
                scrollTrigger:{
                    trigger:'.third-move',
                
                    start:'top top',
                    end:'bottom bottom',
                    scrub:0.6,
                    invalidateOnRefresh:true
                }
            }).to(this.room.position,{
                z:-7,
                x:2.8,
            },'same')

        });
        mm.add("(min-width: 1px)",()=>{
            this.sectionWrapper=document.querySelectorAll('.section')
            this.toggle=document.querySelector('.toggle-bar')
            this.topbar=document.querySelector('.topbar-wrapper')
            this.heroMain=document.querySelector('.hero-main')
            this.heroSecond=document.querySelector('.hero-second')
     
            this.sectionWrapper.forEach(section=>{
                this.progressWrapper=section.querySelector('.progress-wrapper')
                this.progressBar=section.querySelector('.progress-bar')
                if(section.classList.contains('left'))
                {
                    GSAP.to(section,{
                        BorderTopRightRadius: 20,
                        scrollTrigger:{
                            trigger:section,
                            start:'top bottom',
                            end:'top top',
                            scrub:0.6
                        }
                    })
                    GSAP.to(section,{
                        BorderBottomRightRadius: 700,
                        scrollTrigger:{
                            trigger:section,
                            start:'bottom bottom',
                            end:'bottom top',
                            scrub:0.6
                        }
                    })
                }else{
                    GSAP.to(section,{
                        BorderTopLeftRadius: 20,
                        scrollTrigger:{
                            trigger:section,
                            start:'top bottom',
                            end:'top top',
                            scrub:0.6
                        }
                    })
                    GSAP.to(section,{
                        BorderBottomLeftRadius: 700,
                        scrollTrigger:{
                            trigger:section,
                            start:'bottom bottom',
                            end:'bottom top',
                            scrub:0.6
                        }
                    })
                }
                GSAP.from(this.progressBar,{
                    scaleY:0,
                    scrollTrigger:{
                        trigger:section,
                        start:'top top',
                        bottom:'bottom bottom',
                        scrub:0.4,
                        pin:this.progressWrapper,
                        pinSpacing:false
                    }
                })
            })
            this.topbarTL=new GSAP.timeline({
                scrollTrigger:{
                    trigger:'.hero-wrapper',
                    start:'top top',
                    bottom:'bottom bottom',
                    scrub:0.6,
                    invalidateOnRefresh:true
                }
            }).to(this.topbar,{
                opacity:0,
            },'same').to(this.heroMain,{
                opacity:0,
            },'same').to(this.heroSecond,{
                opacity:0,
            },'same')

            this.firstMoveTL=new GSAP.timeline({
                scrollTrigger:{
                    trigger:'.first-move',
                    start:'top top',
                    end:'bottom bottom',
                    scrub:0.6,
                    invalidateOnRefresh:true
                }
            }).to(this.circleFirst.scale,{
                x:3,
                y:3,
                z:3
            },'same').to(this.toggle,{
                top:10,
                right:20,
            },'same')
            this.secondMoveTL=new GSAP.timeline({
                    scrollTrigger:{
                        trigger:'.second-move',
                        start:'top top',
                        end:'bottom bottom',
                        scrub:0.6,
                        invalidateOnRefresh:true
                    }
                }).to(this.cirleSecond.scale,{
                        x:3,
                        y:3,
                        z:3
                    },'same')

            this.thirdMoveTL=new GSAP.timeline({
                    scrollTrigger:{
                        trigger:'.third-move',
                        start:'top top',
                        end:'bottom bottom',
                        scrub:0.6,
                        invalidateOnRefresh:true
                    }
                }).to(this.circleThird.scale,{
                        x:3,
                        y:3,
                        z:3
                    })

            this.platMoveTL=new GSAP.timeline({
                scrollTrigger:{
                    trigger:'.third-move',
                    start:'top top',
                    end:'bottom bottom',
                    scrub:0.6,
                    invalidateOnRefresh:true
                }
            })
            this.room.children.forEach(child=>{
                if(child.name==='延展地板')
                {
                    this.first=GSAP.to(child.position,{
                        x:-8.68358,
                        z:12.6671,
                        y:-2.5321569442749023,
                        delay:1.3,
                        duration:0.3,
                    })
                }
                if(child.name==='地砖一')
                {
                    console.log(child.position)
                    this.second=GSAP.to(child.scale,{
                        x:1,
                        y:1,
                        z:1,
                        ease:'back.out(2)',
                        
                    })
                }
                if(child.name==='地灯')
                {
                    this.third=GSAP.to(child.scale,{
                        x:1,
                        y:1,
                        z:1,
                        ease:'back.out(2)',
                       
                    })
                }
            
                if(child.name==='地砖二')
                {
                    this.fouth=GSAP.to(child.scale,{
                        x:1,
                        y:1,
                        z:1,
                        ease:'back.out(2)',
                       
                    })
                }
             
                if(child.name==='泥土')
                {
                    this.fifth=GSAP.to(child.scale,{
                        x:1,
                        y:1,
                        z:1,
                        ease:'back.out(2)',
                       
                    })
                }
                if(child.name==='花1')
                {
                    this.six=GSAP.to(child.scale,{
                        x:1,
                        y:1,
                        z:1,
                        ease:'back.out(2)',
                       
                    })
                }
                if(child.name==='花2')
                {
                    this.seven=GSAP.to(child.scale,{
                        x:1,
                        y:1,
                        z:1,
                        ease:'back.out(2)',
                       
                    })
                }
                if(child.name==='地砖三')
                {
                    this.eight=GSAP.to(child.scale,{
                        x:1,
                        y:1,
                        z:1,
                        ease:'back.out(2)',
                       
                    })
                }
            })
            this.platMoveTL.add(this.first)
            this.platMoveTL.add(this.second)
            this.platMoveTL.add(this.third)
            this.platMoveTL.add(this.fouth)
            this.platMoveTL.add(this.fifth)
            this.platMoveTL.add(this.six)
            this.platMoveTL.add(this.seven)
            this.platMoveTL.add(this.eight)
        })
    }
    resize(){
     
    }

    update(){
     
    } 

   
}

