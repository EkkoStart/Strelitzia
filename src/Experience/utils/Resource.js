import {EventEmitter} from "events"
import Experience from "../Experence"
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
//尺寸
export default class Resource extends EventEmitter{
    constructor(assets){
        super()
        this.experience =new Experience()
        this.renderer=this.experience.renderer
        this.assets=assets
        this.items={}
        this.queue=this.assets.length
        this.loaded=0
        this.setLoaders()
        this.startLoading()
    }

    setLoaders(){
        this.loaders={}
        this.loaders.gltfLoader=new GLTFLoader()
        this.loaders.dracoLoader=new DRACOLoader()
        this.loaders.dracoLoader.setDecoderPath('/draco/')
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
    }

    startLoading(){
       for (const asset of this.assets) {
        this.loaders.gltfLoader.load(asset.path, (file) => {
            this.singleAssetLoaded(asset, file);
        });
    }
    }
    singleAssetLoaded(asset,file){
        this.items[asset.name]=file
        this.loaded++
        if(this.loaded===this.queue){
            this.emit('ready')
            console.log('all are done')
        }
    }
}