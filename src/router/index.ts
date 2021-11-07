
import { createRouter,RouteMeta, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { emitter } from '@/utils/bus';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue';
import store from '@/store'
import type {AppRouteRecordRaw}  from '@/typings/route'

import layOut from "@/layout/index.vue";
import RouterView from "@/layout/RouterView.vue";

const routes :AppRouteRecordRaw[]= [{
     
      path: '/',
      hidden:true,
      name: 'Login',   
      meta: {    key:"0.1"   },
      component: () => import(/* webpackChunkName: "userManager" */'@/views/login/index.vue')
    },{            
      path: '/desktop',
      name: 'desktop',
      // hidden:true,
      component:layOut,            
      meta: {   
        key:"3",         
        title: "desktop",
        locale: 'desktop',
        icon: "UserOutlined",
        breadcrumb: false
      },     
      redirect: "/desktop/index",      
      children:[
        {         
          // hidden:true,           
          path: "/desktop/index",
          name: "desktopIndex",
          component: () => import("@/views/desktop/index.vue"),
          meta: {
            key:"3.1",   
            title: "desktop",
            locale: 'desktop',        
            icon: "UserOutlined",
            breadcrumb: true
          }        
        }
      ]
    },
    {
      
      path: '/index',
      name: 'index',
      component:layOut,
      redirect: "/index/dashboard",
      meta: {
        key:"1",
        title: "index",
        locale: 'index',
        icon: "UserOutlined",
        breadcrumb: true
      },           
      children:[
        {         
          path: "/index/dashboard",
          name: "dashboard",
          component: () => import("@/views/dashboard/index.vue"),
          meta: {
            key:"1.1",
            title: "index",
            locale: 'index',        
            icon: "",
            breadcrumb: true
          }
        },{          
          path: "/index/role",
          name: "roles",
          hidden:false,
          component: RouterView,
          meta: {
            key:"1.2",
            title: "role",
            locale: 'role',        
            icon: "",
            breadcrumb: true
          },
          children:[{              
              path: "/index/role",
              name: "role1",
              component: RouterView,
              meta: {
                key:"1.2.1",
                title: "role",
                locale: 'role',        
                icon: "",
                breadcrumb: true
              },
              children:[{               
                path: "/index/role",
                name: "role11",
                component: () => import("@/views/role/index.vue"),
                meta: {
                  key:"1.2.1.1",
                  title: "role",
                  locale: 'role',        
                  icon: "",
                  breadcrumb: true
                },
              },{               
                path: "/index/role2",
                name: "role22",
                component: () => import("@/views/role/index2.vue"),
                meta: {
                  key:"1.2.1.2",
                  title: "role",
                  locale: 'role',        
                  icon: "",
                  breadcrumb: true
                },
              }]
            }
          ]
        },{          
          path: "/index/user",
          name: "user",
          hidden:false,
          component: () => import("@/views/user/index.vue"),
          meta: {
            key:"1.3",
            title: "user",
            locale: 'user',        
            icon: "",
            breadcrumb: true
          }        
        }
      ]           
    },{             
        path: '/menu',
        name: 'menu',
        // hidden:true,
        component:layOut,            
        meta: {  
          key:"2",              
          title: "menu",
          locale: 'index',
          icon: "UserOutlined",
          breadcrumb: false
        },     
        redirect: "/menu/childmenu1",      
        children:[
          {           
            // hidden:true,           
            path: "/menu/childmenu1",
            name: "menu2",
            component: () => import("@/views/menu/index.vue"),
            meta: {
              key:"2.1",   
              title: "menu",
              locale: 'index',        
              icon: "",
              breadcrumb: true
            }
          
          }
        ]
    },{      
      path:"/:pathMatch(.*)",
      hidden:true,
      name: '404',
      meta: {
        key:"0.2",
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
      // debugger
      const bread = to.matched.filter(res=>res.meta.breadcrumb).map(res=>({name:res.meta.title,path:res.path,key:res.meta.key}))
      if(bread[0].name!=='desktop'){
        bread.unshift({name:'desktop',path:'/desktop/index',key:'3.1'})
      }
      store.commit('addTagview',bread[0])      
      store.commit('setBreadcrumb',bread)

      const currentTag = bread[bread.length-1]

      store.commit('addTagview',currentTag)      
      store.commit('activeTagview',currentTag.key)

  }
   next()
})

export default router