import { createRouter, createWebHistory} from 'vue-router'

const routes=[
  
    {
        path:'/',
        name:'首页',
        component: () => import(/* webpackChunkName: "views" */ '@/views/index/index.vue'),
        meta:{
          KeepAlive:true
        }
      },
      {
        path:'/login',
        name:'登录',
        component: () => import(/* webpackChunkName: "login" */ '@/views/login/login.vue'),
        meta:{
          KeepAlive:false
        }
      },
      {
        path:'/chat',
        name:'聊天室',
        component:()=>import(/* webpackChunkName: "chat" */ '@/views/chat/chat.vue'),
        meta:{
          KeepAlive:false
        } 
      },
      {
        path:'/bi',
        name:'BI平台',
        component:()=>import(/* webpackChunkName: "bi" */ '@/views/bi/bi.vue'),
        meta:{
          KeepAlive:false
        } 
      },
      {
        path: "/:path(.*)",
        name:'404',
        component:()=>import(/* webpackChunkName: "404" */ '@/components/exception/404.vue'),
        meta:{
          KeepAlive:true
        }
      }
]

const router=createRouter({
    mode:'history',
    history: createWebHistory(),
    routes
})

// router.onError((error) => {
//   const pattern = /Loading chunk (\d)+ failed/g
//   const isChunkLoadFailed = error.message.match(pattern)
//   const targetPath = router.history.pending.fullPath
//   if (isChunkLoadFailed) {
//     router.replace(targetPath)
//   }
// })

export default router