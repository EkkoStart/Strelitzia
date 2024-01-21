import { createRouter, createWebHistory} from 'vue-router'
import store from '../store'
const routes=[
  
    {
        path:'/',
        name:'首页',
        component: () => import(/* webpackChunkName: "views" */ '@/views/index/index.vue'),
        meta:{
          KeepAlive:true,
          title:'Strelitzia'
        }
      },
      {
        path:'/manage',
        name:"管理后台",
        component: () => import(/* webpackChunkName: "manager" */ '@/views/manage/manage.vue'),
        meta:{
          KeepAlive:false,
          title:'管理后台'
        }
      },
      {
        path:'/login',
        name:'登录',
        component: () => import(/* webpackChunkName: "login" */ '@/views/login/login.vue'),
        meta:{
          KeepAlive:false,
          title:'登录'
        },
        beforeEnter: (to, from, next) => {
          const redirect = to.query.redirect;
          let path = '/'
          if (redirect) {
            path = redirect
          }
          store.dispatch('recordRouter',{
            path: path
          })
          next()
        }
      },
      {
        path:'/chat',
        name:'聊天室',
        component:()=>import(/* webpackChunkName: "chat" */ '@/views/chat/chat.vue'),
        meta:{
          KeepAlive:false,
          title:'聊天室'
        } 
      },
      {
        path:'/bi',
        name:'BI平台',
        component:()=>import(/* webpackChunkName: "bi" */ '@/views/bi/bi.vue'),
        meta:{
          KeepAlive:false,
          title:'智能分析'
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