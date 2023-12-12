import Experience from "../Experence";
import * as THREE from 'three'
import Room from "./Room";
import Resource from "../utils/Resource";
import Environment from "./Environment";
import Controls from "./Controls";
import Floor from "./Floor";
import EventEmitter from "events";
//相机
export default class World extends EventEmitter{
    constructor(){
        super()
        this.experience=new Experience()
        this.sizes=this.experience.sizes
        this.scene=this.experience.scene
        this.canvas=this.experience.canvas
        this.camera=this.experience.camera
        this.resources =this.experience.resources
        this.theme=this.experience.theme

        this.resources.on('ready',()=>{
            this.room=new Room()
            this.floor=new Floor()
            this.environment=new Environment()
            this.emit('worldready')
            console.log('create room')
        })

        this.theme.on('switch',(theme)=>{
            this.switchTheme(theme)
        })
    }

    switchTheme(theme){
        if(this.environment){
            this.environment.switchTheme(theme)
        }
    }
    resize(){
     
    }

    update(){
        if(this.room){
            this.room.update()
        }
        if(this.controls)
        {
            this.controls.update()
        }
    }
}