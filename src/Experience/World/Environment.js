import Experience from "../Experence";
import * as THREE from 'three'
import GSAP from 'gsap'
//相机
export default class Environment{
    constructor(){
        this.experience=new Experience()
        this.scene=this.experience.scene
        this.resources=this.experience.resources
        this.setSunlight()
    }

    setSunlight(){
        this.sunLight=new THREE.DirectionalLight('#ffffff',3)
        this.sunLight.castShadow=true
        this.sunLight.shadow.camera.far=30
        this.sunLight.shadow.mapSize.set(2048,2048)
        this.sunLight.shadow.normalBias=0.05
        this.sunLight.position.set(-2,5,2)
        this.scene.add(this.sunLight)
        this.ambientLight =new THREE.AmbientLight('#ffffff',1)
        this.scene.add(this.ambientLight)

    }

    switchTheme(theme){
        if(theme==='dark'){
            GSAP.to(this.sunLight.color,{
                r:41/255,
                g:34/255,
                b:93/255
            })
            GSAP.to(this.ambientLight.color,{
                r:41/255,
                g:34/255,
                b:93/255
            })
            GSAP.to(this.sunLight,{
                intensity:0.8
            })
        }else {
            GSAP.to(this.sunLight.color,{
                r:255/255,
                g:255/255,
                b:255/255
            })
            GSAP.to(this.ambientLight.color,{
                r:255/255,
                g:255/255,
                b:255/255
            })
            GSAP.to(this.sunLight,{
                intensity:2.5
            })
        }
    }
}