
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue';
export type AppRouteRecordRaw = RouteRecordRaw & {hidden?:boolean}
import layOut from "@/views/layout/index.vue";
import Home from '@/views/Home.vue'

const routes = [
  {
      path: '/',
      hidden:true,
      name: 'Login',     
      component: () => import(/* webpackChunkName: "userManager" */'@/views/login/index.vue')
    },
    {
      path: '/index',
      name: 'index',
      component:layOut,
      redirect: "/index/dashboard",
      meta: {
        title: "首页",
        locale: 'index',
        icon: "UserOutlined",
        // breadcrumb: true
      },           
      children:[
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("@/views/dashboard/index.vue"),
          meta: {
            title: "首页",
            locale: 'index',        
            icon: "viteshouye",
          },
        },{
          path: "user",
          name: "user",
          component: () => import("@/views/user/index.vue"),
          meta: {
            title: "用户",
            locale: 'user',        
            icon: "viteshouye",
          },
        }
      ]           
    },{            
        path: '/menu',
        name: 'menu',
        component:layOut,            
        meta: {
          title: "菜单",
          locale: 'index',
          icon: "VideoCameraOutlined",
          // breadcrumb: true
        },     
        redirect: "/menu/childmenu1",      
        children:[
          {
            path: "childmenu1",
            name: "menu2",
            component: () => import("@/views/menu/index.vue"),
            meta: {
              title: "菜单",
              locale: 'index',        
              icon: "viteshouye",
            },
          }
        ]
    },{
      path:"/:pathMatch(.*)",
      hidden:true,
      name: '404',
      component: () => import("@/views/404.vue"),
    }
] as AppRouteRecordRaw[]

export type routesType = typeof routes

const router = createRouter({
    history:createWebHashHistory(),
    routes:routes
})

export default router