import router from './router';
import store from './store';
import {getToken} from '@/utils/auth.js'
import { setToken } from './utils/auth';
import { useMessage } from 'naive-ui'

const whiteList = ['/login','/index','/chat','/']
router.beforeEach(async (to,from,next)=>{

    const hasToken = getToken() 
    if (hasToken) {
        if (to.path === '/login') { 
            next({ path: '/' }) 
        } else { 
            const hasGetUserName = store.state.username 
            const hasGetUserAvatar = store.state.avatar
            if (hasGetUserName && hasGetUserAvatar) {  
                next()  
            } else {   
                try {   
                    await store.dispatch('GetInfo')
                    next()   
                } catch (error) { 
                    console.log(error)
                    setToken('')
                    next(`/login?redirect=${to.path}`) 
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {  
            next() 
        } else {  
            next(`/login?redirect=${to.path}`) 
        }
    }
})
