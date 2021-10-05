
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export type AppRouteRecordRaw = RouteRecordRaw & {hidden?:boolean}

import Home from '@/views/Home.vue'

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path: '/login',
            name: 'Login',
     
            component: () => import(/* webpackChunkName: "userManager" */'@/views/login/index.vue')
          },
          {
            path: '/index',
            name: 'Index',
            component: () => import(/* webpackChunkName: "userManager" */'@/views/layout/index.vue')
          }
        // {
        //     path:'/home',   
        //     hidden:false,
        //     component:Home,
        //     meta:{
        //         title:"代办列表",
        //         icon:""
        //     }
        // },
        // {
        //     path:'/add',
        //     component:()=>import("@/views/AddTodo.vue")
        // },
    ] as AppRouteRecordRaw[]
})

export default router