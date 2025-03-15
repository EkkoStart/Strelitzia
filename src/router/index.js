import { createRouter, createWebHistory} from 'vue-router'
import store from '../store'
const routes=[
  
    {
        path:'/',
        name:'首页',
        component: () => import(/* webpackChunkName: "views" */ '@/views/index/index.vue'),
      redirect:'/index',
        meta:{
          KeepAlive:true,
          title:'Strelitzia'
        },
        children:[
          {
            path: 'index',
            name: '首页',
            component: () => import(/* webpackChunkName: "views" */ '@/components/index/first.vue'),
          },
          {
            path: 'picture',
            name: '图片',
            component: () => import(/* webpackChunkName: "others" */ '@/components/picture/pictures.vue'),
          },
          {
            path: 'article',
            name: '文章',
            redirect: '/article/index',
            children: [
              {
                path: 'index',
                name: '文章列表',
                component: () => import(/* webpackChunkName: "others" */ '@/components/article/index.vue'),
              },
              {
                path: 'read',
                name: '文章详情',
                component: () => import(/* webpackChunkName: "others" */ '@/components/article/detail.vue'),
              },
            ]
          },
          
          {
            path: 'word',
            name: '留言',
            component: () => import(/* webpackChunkName: "others" */ '@/components/word/index.vue'),
          },
          {
            path: 'many',
            name: '更多',
            component: () => import(/* webpackChunkName: "others" */ '@/components/many/index.vue'),
          },
          {
            path: 'person',
            name: '个人信息',
            component: () => import(/* webpackChunkName: "others" */ '@/components/usercenter.vue'),
          },
          // {
          //   path: '',
          //   name: '图片',
          //   component: () => import(/* webpackChunkName: "others" */ '@/components/picture/pictures.vue'),
          // },
        ]
      },
      {
        path:'/manage',
        name:"管理后台",
        component: () => import(/* webpackChunkName: "manager" */ '@/views/manage/manage.vue'),
        meta:{
          KeepAlive:false,
          title:'管理后台'
        },
        children:[
          {
            path: 'analyze',
            name: '分析页',
            component: () => import(/* webpackChunkName: "manager" */ '@/components/manage/analyze/index.vue'),
          },
          {
            path: 'monitor',
            name: '监控页',
            component: () => import(/* webpackChunkName: "manager" */ '@/components/manage/monitor/index.vue'),
          },
          {
            path: 'user',
            name: '用户管理',
            redirect: '/manage/user/index',
            children:[
              {
                path: 'index',
                name: '用户',
                component: () => import(/* webpackChunkName: "manager" */ '@/components/manage/user/index/index.vue'),
              },
              {
                path: 'detail',
                name: '用户详情',
                component: () => import(/* webpackChunkName: "manager" */ '@/components/manage/user/detail/index.vue'),
              },
            ]
          },
          {
            path: 'articleManage',
            name: '文章管理',
            redirect: '/manage/articleManage/index',
            children:[
              {
                path: 'index',
                name: '文章展示',
                component: () => import(/* webpackChunkName: "manager" */ '@/components/manage/article/index/index.vue'),
              },
              {
                path: 'edit',
                name: '编辑文章',
                component: () => import(/* webpackChunkName: "manager" */ '@/components/manage/article/edit/index.vue'),
              },
            ]
          },
          {
            path: 'picture',
            name: '图片管理',
            component: () => import(/* webpackChunkName: "manager" */ '@/components/manage/picture/index.vue'),
          },
          {
            path: 'internal',
            name: '接口管理',
            redirect: '/manage/internal/index',
            children:[
              {
                path: 'index',
                name: '接口',
                component: () => import(/* webpackChunkName: "manager" */ '@/components/manage/internal/index/index.vue'),
              },
              {
                path: 'edit',
                name: '编辑接口',
                component: () => import(/* webpackChunkName: "manager" */ '@/components/manage/internal/edit/index.vue'),
              },
            ]
          },
          {
            path: 'data',
            name: '数据库管理',
            component: () => import(/* webpackChunkName: "manager" */ '@/components/manage/data/index.vue'),
          },
          {
            path: 'system',
            name: '系统管理',
            component: () => import(/* webpackChunkName: "manager" */ '@/components/manage/system/index.vue'),
          },
        ]
      },
      {
        path:'/login',
        name:'登录',
        component: () => import(/* webpackChunkName: "login" */ '@/views/login/login.vue'),
        meta:{
          KeepAlive:false,
          title:'登录'
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
      // {
      //   path: "/:path(.*)",
      //   name:'404',
      //   component:()=>import(/* webpackChunkName: "404" */ '@/components/exception/404.vue'),
      //   meta:{
      //     KeepAlive:true
      //   }
      // }
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