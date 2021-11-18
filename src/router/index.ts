
import { createRouter,RouteMeta, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { emitter } from '@/utils/bus';
import store from '@/store'
import type {AppRouteRecordRaw}  from '@/typings/route'
import { computed, watch } from 'vue';
import layOut from "@/layout/index.vue";
import RouterView from "@/layout/RouterView.vue";
import util from '@/utils/util';


let routes :AppRouteRecordRaw[]= [{     
      path: '/',     
      name: 'login',   
      meta: {  hidden:true},
      component: () => import(/* webpackChunkName: "userManager" */'@/views/login/index.vue')
    },
    //桌面
    {            
      path: '/dashboard',
      name: 'dashboard',
      component:layOut,
      meta: {
        breadcrumb: false,
        onlyChild:true
      },     
      redirect: "/dashboard/index",      
      children:[{                 
          path: "/dashboard/index",
          name: "dashboardIndex",
          component: () => import("../views/dashboard/index.vue"),
          meta: {
            locale: 'dashboard',        
            icon: "DesktopOutlined",
            breadcrumb: true
          }        
        }
      ]
    },
    // ...dynamicRoute.value,
    //基础设置(涉及权限页面)
    // {      
    //   path: '/setting',
    //   name: 'setting',
    //   component:layOut,
    //   redirect: "/setting/user/list",
    //   meta: {
    //     title: "基础设置",  
    //     icon: "SettingOutlined",
    //     breadcrumb: true
    //   },      
    //   //用户     
    //   children:[
    //     {         
    //       path: "/setting/user",
    //       name: "user",
    //       component: RouterView,        
    //       meta: {
    //         title: "用户管理",   
    //         breadcrumb: true
    //       },
    //       children:[{              
    //         path: "/setting/user/add",
    //         name: "userAdd",
    //         component:()=> import("@/views/user/add.vue"),
    //         meta: {
    //           title: "用户添加",
    //           breadcrumb: true
    //         }
    //       },{
    //         path: "/setting/user/list",
    //         name: "userList",
    //         component:()=> import("@/views/user/index.vue"),
    //         meta: {
    //           title: "用户列表",
    //           breadcrumb: true
    //         }
    //       }]           
    //     },{          
    //       path: "/setting/role",
    //       name: "role",
    //       component:()=> import("@/views/role/index.vue"),
    //       meta: {
    //         title: "角色管理", 
    //         breadcrumb: true
    //       },  
    //     },{          
    //       path: "/setting/auth",
    //       name: "auth",
    //       component: () => import("@/views/auth/index.vue"),
    //       meta: {
    //         title: "权限管理",    
    //         breadcrumb: true
    //       }        
    //     }
    //   ]           
    // },
    // //菜单
    // {             
    //     path: '/menu',
    //     name: 'menu',
    //     component:layOut,
    //     meta: {           
    //       breadcrumb: false,
    //       onlyChild:true
    //     },     
    //     redirect: "/menu/index",      
    //     children:[
    //       {                     
    //         path: "/menu/index",
    //         name: "menuSetting",
    //         component: () => import("@/views/menu/index.vue"),
    //         meta: {
    //           icon: "MenuOutlined",
    //           title: "菜单设置",   
    //           breadcrumb: true
    //         }  
    //       }
    //     ]
    // },
    //报错 error
    {      
      path:"/:pathMatch(.*)",
      redirect: "/error/404",
      name:"errorMath",
      meta: {
        hidden: true,        
        breadcrumb: false
      } 
   },{
     path:"/error",
     name: 'error',
     meta: {
       hidden: true,        
       breadcrumb: false,
       locale:"error"
     },     
     component: layOut,        
     children:[{           
       path: "/error/404",
       name: "error404",
       component: () => import("@/views/error/404.vue"),
       meta: {
         locale: 'error404',        
         breadcrumb: true
       }        
      },
      {           
       path: "/error/401",
       name: "error401",
       component: () => import("@/views/error/401.vue"),
       meta: {
         locale: 'error401',        
         breadcrumb: true
       }        
      }
     ]
   }
] 


// let  dynamicRoute:AppRouteRecordRaw[] = computed(()=>store.state.app.menus)
// watch(dynamicRoute.value,(newVal,oldVal)=>{
//   debugger
//   if(newVal && newVal.length){
//     debugger
//     newVal.forEach(item=>{
//       routes.push(item)
//     })
//   }
// })

// debugger

const {state,commit} = store
const router = createRouter({
    history:createWebHashHistory(),
    routes:routes as unknown as RouteRecordRaw[]
})

//页面刷新的时候，重新赋值
const userInfo = state.gloabalStore?.userInfo
  if(userInfo?.id && !state.userInfo?.id){
    commit('login/doLogin',userInfo)
  }

const menus = store.state.gloabalStore?.menus 
if(menus?.length && !state?.app?.menus?.length){
  commit('app/setMenus',menus)
}
// debugger
if(state?.app?.menus && state?.app?.menus?.length){
  const menuComs:AppRouteRecordRaw[] = JSON.parse(JSON.stringify(state.app.menus))
  util.changeComponent(menuComs);
  // console.log('menuComs--->',menuComs)
   (menuComs as RouteRecordRaw[]).forEach((item)=>{
     router.addRoute(item)
   })
}

router.beforeEach((to,from,next)=>{

  //页面刷新的时候，重新赋值
// const userInfo = state.gloabalStore?.userInfo
// if(userInfo?.id && !state.userInfo?.id){
//   commit('login/doLogin',userInfo)
// }

// const menus = store.state.gloabalStore?.menus 
// if(menus?.length && !state.app.menus?.length){
// commit('app/setMenus',menus)
// }
// debugger
if(state?.app?.menus && state?.app?.menus?.length){
const menuComs:AppRouteRecordRaw[] = JSON.parse(JSON.stringify(state?.app?.menus))
util.changeComponent(menuComs);
// console.log('menuComs--->',menuComs)
 (menuComs as RouteRecordRaw[]).forEach((item)=>{
   router.addRoute(item)
 })
}

    // let isRefresh = sessionStorage.getItem('page_is_refresh')
    // console.log('page_is_refresh--->',isRefresh)
 
  //  console.log('from',from)
  //  console.log('to',to.matched)


    if(to.fullPath!=="/"){
      // const dynamicRoute:AppRouteRecordRaw[] = computed(()=>store.state.menus || [])
         //数据持久化
     
         const bread = to.matched.filter(res=>res.meta.breadcrumb).map(res=>({name:res.name,path:res.path,title:res.meta?.title,locale: res.meta?.locale}))
         // debugger
         // console.log(to.matched.filter(res=>res.meta.breadcrumb))
         if(bread[0].name!=='dashboardIndex'){
           bread.unshift({name:'dashboardIndex',path:'/dashboard/index',locale:'dashboard',title:""})
         }
         store.commit('addTagview',bread[0])      
         store.commit('setBreadcrumb',bread)
   
         const currentTag = bread[bread.length-1]
         // debugger
         store.commit('addTagview',currentTag)      
         store.commit('activeTagview',currentTag.name)
    }
    next()

})

export default router