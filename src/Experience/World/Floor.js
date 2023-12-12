import Experience from "../Experence";
import * as THREE from 'three'
import GSAP from 'gsap'
//相机
export default class Floor{
    constructor(){
        this.experience=new Experience()
        this.scene=this.experience.scene
        this.sizes=this.experience.sizes
        this.setFloor()
        this.setCircle()
    }

    setFloor(){
        this.geometry=new THREE.PlaneGeometry(100,100)
        this.material=new THREE.MeshStandardMaterial({
           color:'#BEFFF7',
           fog:false,
        })
        this.plane=new THREE.Mesh(this.geometry,this.material)
        this.plane.name='xxxxxx'
        this.scene.add(this.plane)
        this.plane.rotation.x=-Math.PI/2
        this.plane.position.y=-0.6
        this.plane.receiveShadow=true
    }

    setCircle(){
        const geometry = new THREE.CircleGeometry( 8, 64 );
        const material = new THREE.MeshStandardMaterial( { color:'#FF6AC2' } );
        const material2 = new THREE.MeshStandardMaterial( { color: "#6499E9" } );
        const material3 = new THREE.MeshStandardMaterial( { color: '#016A70' } );
        this.circleFirst = new THREE.Mesh( geometry, material );
        this.circleSecond = new THREE.Mesh( geometry, material2 );
        this.circleThird = new THREE.Mesh( geometry, material3 );
        this.circleFirst.position.y=-1.19
        this.circleSecond.position.y=-1.18
        if(this.sizes.device==='desktop')
            this.circleSecond.position.x=2.5
        this.circleThird.position.y=-1.17
        this.circleFirst.rotation.x=
        this.circleSecond.rotation.x=
        this.circleThird.rotation.x=
        -Math.PI/2
        this.circleFirst.receiveShadow=
        this.circleSecond.receiveShadow=
        this.circleThird.receiveShadow=
        true
        this.circleFirst.scale.set(0,0,0)
        this.circleSecond.scale.set(0,0,0)
        this.circleThird.scale.set(0,0,0)
        this.scene.add(this.circleFirst);
        this.scene.add(this.circleSecond);
        this.scene.add(this.circleThird);
    }
}