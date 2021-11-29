
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from '@/store'
import type {AppRouteRecordRaw}  from '@/typings/route'
import LayOut from "@/layout/index.vue";
import util from '@/utils/util';

let routes:AppRouteRecordRaw[]= [
    {     
      path: '/login',     
      name: 'login',   
      meta: {hidden:true},
      component: () => import('@/views/login/index.vue')
    },   
    {            
      path: '/',
      name: 'layout',
      component:LayOut,
      meta: {
        breadcrumb: false
      },     
      redirect: "/dashboard",      
      children:[
        //桌面
        {                 
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/views/dashboard/index.vue"),
          meta: {
            locale: 'dashboard',        
            icon: "icon-shouye",
            breadcrumb: true
          }        
        },
    //     {
    //       path: '/setting',
    //       name: 'setting',
    //       component:RouterView,
    //       redirect: "/setting/user/list",
    //       meta: {
    //         title: "基础设置",  
    //         icon: "SettingOutlined",
    //         breadcrumb: true
    //       },      
    //       //用户     
    //       children:[
    //         {         
    //           path: "/setting/user",
    //           name: "user",
    //           component: RouterView,    
    //           redirect: "/setting/user/list",    
    //           meta: {
    //             title: "用户管理",   
    //             breadcrumb: true
    //           },
    //           children:[{              
    //             path: "/setting/user/add",
    //             name: "userAdd",
    //             component:()=> import("@/views/user/add.vue"),
    //             meta: {
    //               title: "用户添加",
    //               breadcrumb: true
    //             }
    //           },{
    //             path: "/setting/user/list",
    //             name: "userList",
    //             component:()=> import("@/views/user/index.vue"),
    //             meta: {
    //               title: "用户列表",
    //               breadcrumb: true
    //             }
    //           }]           
    //         },{          
    //           path: "/setting/role",
    //           name: "role",
    //           component:()=> import("@/views/role/index.vue"),
    //           meta: {
    //             title: "角色管理", 
    //             breadcrumb: true
    //           },  
    //         },{          
    //         path: "/setting/auth",
    //         name: "auth",
    //         component: () => import("@/views/auth/index.vue"),
    //         meta: {
    //           title: "权限管理",    
    //           breadcrumb: true
    //         }        
    //     }
    //   ]           
    // },
    // //菜单
    // {             
    //     path: '/menu',
    //     name: 'menu',
    //     component:()=>import("@/views/menu/index.vue"),
    //     meta: {           
    //       icon: "MenuOutlined",
    //       title: "菜单设置",   
    //       breadcrumb: true
    //     }
    //   },
      {           
          path: "404",
          name: "error404",
          component: () => import("@/views/error/404.vue"),
          meta: {
            hidden: true,  
            locale: 'error404',        
            breadcrumb: true
          }        
         },{           
          path: "401",
          name: "error401",
          component: () => import("@/views/error/401.vue"),
          meta: {
            hidden: true,  
            locale: 'error401',        
            breadcrumb: true
          }        
         }
      ]
    },
    //报错 error
    {      
      path:"/:pathMatch(.*)",
      redirect: "/404",
      name:"error",
      meta: {
        hidden: true,        
        breadcrumb: false
      } 
   }
] 
// debugger

const {state,commit} = store
const router = createRouter({
    history:createWebHashHistory(),
    routes:routes as unknown as RouteRecordRaw[]
})

//页面刷新的时候，重新赋值
const lang = state.gloabalStore?.language
if(lang){
  commit('setLanguage',lang)
}

const userInfo = state.gloabalStore?.userInfo
  if(userInfo?.id && !state?.login?.userInfo?.id){
    commit('login/setUserInfo',userInfo)
  }

const menus = store.state.gloabalStore?.menus 
if(menus?.length && !state.app?.menus?.length){
  commit('app/setMenus',menus)
}
// debugger
if(state?.app?.menus && state?.app?.menus?.length){
  const menuComs:AppRouteRecordRaw[] = JSON.parse(JSON.stringify(state.app.menus))
  util.changeComponent(menuComs);
  // console.log('menuComs--->',menuComs)
  const routes = router.getRoutes().filter(res=>res.name === "layout")[0];
  routes.children.push(...(menuComs as RouteRecordRaw[]));
  router.addRoute(routes)  
}
const tagviewsCache = state.gloabalStore?.tagviews
if(tagviewsCache?.length){
     commit('addAllTagview',tagviewsCache)
}

router.beforeEach((to,from,next)=>{ 
  //  console.log('from',from)
  //  console.log('to',to.matched)

    if(to.name!=="login"){
         //数据持久化
         if(!state.login?.userInfo?.id){
            next({path:'/login'})
         }else{
           const bread = to.matched.filter(res=>res.meta.breadcrumb)
             .map(res=>({name:res.name,path:res.path,title:res.meta?.title,locale: res.meta?.locale,titleEn:res.meta?.titleEn}))
          //  debugger
           if(bread[0]&&bread[0].name!=='dashboard'){
             bread.unshift({name:'dashboard',path:'/dashboard',locale:'dashboard',title:"",titleEn:''})
           }
           store.commit('addTagview',bread[0])      
           store.commit('setBreadcrumb',bread)
     
           const currentTag = bread[bread.length-1]
           // debugger
           store.commit('addTagview',currentTag)    
           store.commit('activeTagview',currentTag.name)
           next()
         }
    }else{
      if(state.login?.userInfo?.id){
          next({path:'/'})
      }else{
        next()
      }
    }
})

export default router