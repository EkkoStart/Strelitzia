import router from './router';
import store from './store';
import {getToken,setToken} from '@/utils/auth.js'

const token = getToken()

router.beforeEach(async (to,from,next)=>{
    if(to.path == '/login'){
        store.dispatch('recordRouter',{
            path: from.path
        })
    }
    if(to.path != '/login'){
        if(token != null && token!= '' &&token != undefined){
            store.dispatch('GetInfo').catch(e=>{
                console.log(e)
                setToken('')
            })
        }
    }
    next()
})