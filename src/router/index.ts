
import { createRouter,RouteMeta, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { emitter } from '@/utils/bus';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue';
import store from '@/store'
import type {AppRouteRecordRaw}  from '@/types/route'

import layOut from "@/layout/index.vue";
import RouterView from "@/layout/RouterView.vue";

const routes :AppRouteRecordRaw[]= [{
      key:"0.1",
      path: '/',
      hidden:true,
      name: 'Login',   
      meta: {      },
      component: () => import(/* webpackChunkName: "userManager" */'@/views/login/index.vue')
    },{
      key:"3",         
      path: '/desktop',
      name: 'desktop',
      // hidden:true,
      component:layOut,            
      meta: {         
        title: "desktop",
        locale: 'desktop',
        icon: "UserOutlined",
        breadcrumb: false
      },     
      redirect: "/desktop/index",      
      children:[
        {
          key:"3.1",   
          // hidden:true,           
          path: "/desktop/index",
          name: "desktopIndex",
          component: () => import("@/views/desktop/index.vue"),
          meta: {
            title: "desktop",
            locale: 'desktop',        
            icon: "UserOutlined",
            breadcrumb: true
          }        
        }
      ]
    },
    {
      key:"1",
      path: '/index',
      name: 'index',
      component:layOut,
      redirect: "/index/dashboard",
      meta: {
        title: "index",
        locale: 'index',
        icon: "UserOutlined",
        breadcrumb: true
      },           
      children:[
        {
          key:"1.1",
          path: "/index/dashboard",
          name: "dashboard",
          component: () => import("@/views/dashboard/index.vue"),
          meta: {
            title: "index",
            locale: 'index',        
            icon: "UserOutlined",
            breadcrumb: true
          }
        },{
          key:"1.2",
          path: "/index/role",
          name: "roles",
          hidden:false,
          component: RouterView,
          meta: {
            title: "role",
            locale: 'role',        
            icon: "UserOutlined",
            breadcrumb: true
          },
          children:[{
              key:"1.2.1",
              path: "/index/role",
              name: "role1",
              component: RouterView,
              meta: {
                title: "role",
                locale: 'role',        
                icon: "UserOutlined",
                breadcrumb: true
              },
              children:[{
                key:"1.2.1.1",
                path: "/index/role",
                name: "role11",
                component: () => import("@/views/role/index.vue"),
                meta: {
                  title: "role",
                  locale: 'role',        
                  icon: "",
                  breadcrumb: true
                },
              }]
            }
          ]
        },{
          key:"1.3",
          path: "/index/user",
          name: "user",
          hidden:false,
          component: () => import("@/views/user/index.vue"),
          meta: {
            title: "user",
            locale: 'user',        
            icon: "UserOutlined",
            breadcrumb: true
          }        
        }
      ]           
    },{   
        key:"2",         
        path: '/menu',
        name: 'menu',
        // hidden:true,
        component:layOut,            
        meta: {         
          title: "menu",
          locale: 'index',
          icon: "UserOutlined",
          breadcrumb: false
        },     
        redirect: "/menu/childmenu1",      
        children:[
          {
            key:"2.1",   
            // hidden:true,           
            path: "/menu/childmenu1",
            name: "menu2",
            component: () => import("@/views/menu/index.vue"),
            meta: {
              title: "menu",
              locale: 'index',        
              icon: "",
              breadcrumb: true
            }
          
          }
        ]
    },{
      key:"0.2",
      path:"/:pathMatch(.*)",
      hidden:true,
      name: '404',
      meta: {
        title: "404",
        locale: '404',        
        icon: "UserOutlined",
        breadcrumb: true
      },
      component: () => import("@/views/404.vue")
    }
] 

// debugger
const router = createRouter({
    history:createWebHashHistory(),
    routes:routes as unknown as RouteRecordRaw[]
})

router.beforeEach((to,from,next)=>{
  //  console.log('from',from)
  //  console.log('to',to.matched)
  if(to.fullPath!="/"){
      const bread = to.matched.filter(res=>res.meta.breadcrumb).map(res=>({name:res.meta.title,path:res.path}))
      if(bread[0].name!=='desktop'){
        bread.unshift({name:'desktop',path:'/desktop/index'})
      }
      store.commit('setBreadcrumb',bread)
  }
   next()
})

export default router