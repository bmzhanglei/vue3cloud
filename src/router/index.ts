
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export type AppRouteRecordRaw = RouteRecordRaw & {hidden?:boolean}
import layOut from "@/views/layout/index.vue";
import Home from '@/views/Home.vue'

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path: '/',
            hidden:true,
            name: 'Login',     
            component: () => import(/* webpackChunkName: "userManager" */'@/views/login/index.vue')
          },
          {
            path: '/index',
            component:layOut,
            meta: {
              title: "首页",
              locale: 'index',
              icon: "viteshouye",
              // breadcrumb: true
            },
            name: 'Index',
            children:[
              {
                path: "",
                name: "index",
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
            path:"/:pathMatch(.*)",
            hidden:true,
            name: '404',
            component: () => import("@/views/404.vue"),
          }
    ] as AppRouteRecordRaw[]
})

export default router