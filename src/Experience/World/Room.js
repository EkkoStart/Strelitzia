import Experience from "../Experence";
import * as THREE from 'three'
import GSAP from 'gsap'

//相机
export default class Room{
    constructor(){
        this.experience=new Experience()
        this.scene=this.experience.scene
        this.resources=this.experience.resources
        this.room=this.resources.items.room
        this.actualRoom=this.room.scene
        this.roomChildren={}
        this.lerp={
            current:0,
            target:0,
            ease:0.1
        }
        this.onMouseMove()
        this.setModel()
    }
    setModel(){
        this.actualRoom.castShadow=true
     
        this.actualRoom.children.forEach(child => {
            
                {
                    child.castShadow=true
                    if(child instanceof THREE.Group){
                        child.children.forEach(groupChild =>{
                            groupChild.castShadow=true
                            if(child.name==='墙')
                                groupChild.receiveShadow=true
                        })
                     }
                }
                if(child.name==='地灯')
                {

                    child.castShadow=true
                    child.receiveShadow=true
                }
                if(child.name==='延展地板')
                {
                    child.position.set(-3.17187,-2.53216,7.38105)
                    child.receiveShadow=true
                }
                if( child.name==='立方体')
                  
                 {
                   
                    child.scale.set(0.1,0.1,0.1)
                    child.position.set(0,-1.5,0)
                 }
                 else
                 child.scale.set(0,0,0)
                 this.roomChildren[child.name]=child
        });
       
        const width = 1;
        const height = 1;
        const intensity = 2;
        this.rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        this.rectLight.position.set(6.6, 5.5, -6.5);
        this.rectLight.rotation.x=-2.1865484868985
        this.rectLight.rotation.z=-0.948760981384118
        this.rectLight.rotation.y=0.0502654824574367
        this.rectLight.lookAt( 0, 0, 0 );
        this.actualRoom.add( this.rectLight )
      
        this.roomChildren['rectLight']=this.rectLight
        
        this.actualRoom.scale.set(0.21,0.21,0.21)
        this.scene.add(this.actualRoom)
    }
    onMouseMove(){
        window.addEventListener('mousemove',(e)=>{
            this.rotation=(e.clientX-window.innerWidth/2 )*2/window.innerWidth
            this.lerp.target=this.rotation*0.05
        })
    }
  

    update(){
        this.lerp.current=GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        )
        this.actualRoom.rotation.y=this.lerp.current
        
    }
}