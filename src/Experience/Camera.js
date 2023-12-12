import Experience from "./Experence";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
//相机
export default class Camera{
    constructor(){
        this.experience=new Experience()
        this.sizes=this.experience.sizes
        this.scene=this.experience.scene
        this.canvas=this.experience.canvas
        this.camera=this.experience.camera
        this.createPerspectiveCamera()
        this.createOrthographicCamera()
        this.setOribitControls()

        this.perspectiveCamera.position.z=5
    } 
    setOribitControls(){
        this.controls =new OrbitControls(this.perspectiveCamera,this.canvas)
        this.controls.enableDamping=true
        this.controls.enableZoom=true
    }
    createPerspectiveCamera(){
        this.perspectiveCamera=new THREE.PerspectiveCamera(
            35,
            this.sizes?.aspect,
            0.1,
            1000
        )
        this.perspectiveCamera.position.z=12
        this.perspectiveCamera.position.x=29
        this.perspectiveCamera.position.y=14
        this.scene.add(this.perspectiveCamera)
 
    }
    createOrthographicCamera(){
        
        this.orthographicCamera=new THREE.OrthographicCamera(
            (-this.sizes?.aspect *this.sizes.frustrum)/2,
            (this.sizes?.aspect *this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -50,
            50
        )
        //3.5 2.05
        this.orthographicCamera.position.y=2.05
        this.orthographicCamera.position.z=4
        this.orthographicCamera.rotation.x=-Math.PI/6
        this.scene.add(this.orthographicCamera)

    }

    resize(){
        this.perspectiveCamera.aspect=this.sizes.aspect
        this.perspectiveCamera.updateProjectionMatrix()
        this.orthographicCamera.left=(-this.sizes?.aspect *this.sizes.frustrum)/2
        this.orthographicCamera.right=(this.sizes?.aspect *this.sizes.frustrum)/2
        this.orthographicCamera.top= this.sizes.frustrum/2
        this.orthographicCamera.bottom=-this.sizes.frustrum/2
        this.orthographicCamera.updateProjectionMatrix()
    }
    update(){
        this.controls.update()
    }
}