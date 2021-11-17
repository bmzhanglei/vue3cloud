import { AppRouteRecordRaw } from "@/typings/route";
import { Module } from "vuex";
import type { State } from "..";
import router from '@/router'
import { getMenu } from '../../apis/menu';
import { useI18n } from "vue-i18n";
import util from '@/utils/util';
import layOut from "@/layout/index.vue";
import RouterView from "@/layout/RouterView.vue";
import { Menu } from "@/typings/login";
import { markRaw } from "vue";

// const moduless = import.meta.glob('/src/views/**/*.vue') 
export default {
  namespaced: true,
  state:  { 
     menus:[]
  },
  mutations: {    
     setMenus(state:State,data:any[]){
          // const menuComs = JSON.parse(JSON.stringify(data))
          // util.changeComponent(menuComs);
          state.menus = data

          // const menuComs = JSON.parse(JSON.stringify(state.menus))
          // util.changeComponent(menuComs);
          // console.log('menuComs--->',menuComs)
          //  menuComs.forEach(item=>{
          //    router.addRoute(item)
          //  })
          // debugger
        //  console.log(state.menus)
          // menuComs.forEach(item=>{
          //   router.addRoute(item)
          // })

        //  let doData = []
        // //  debugger
 
        //  data.forEach(item=>{
        //    let {id,pid,name,component,redirect,path,titleCn,titleEn,icon,breadcrumb,sort,hidden,onlyChild,level} = item
        //    if(level == 1&& !component){
        //      component = markRaw(layOut)
        //    }else if(level > 1 && !component){
        //       component =markRaw(RouterView) 
        //    }else if(typeof component==="string"){  
        //       component = moduless[component.replace(/@/,'/src')] 
        //    }
        //    let obj = {name,path,component,id,pid}
        //    if(redirect){
        //       Object.assign(obj,{redirect})
        //     }
        //    obj.meta = {sort}
        //       if(titleCn){
        //         Object.assign(obj.meta,{title:titleCn})
        //       }
        //       if(icon){
        //         Object.assign(obj.meta,{icon})
        //       }           
        //       Object.assign(obj.meta,{breadcrumb:!!breadcrumb})
        //         Object.assign(obj.meta,{hidden:!!hidden})
        //         Object.assign(obj.meta,{onlyChild:!!onlyChild})               
        //    doData.push(obj)
        //  })  
         
        // //  console.log(doData)

        //  const result = util.toTreeMenu(doData)          
     
     }
  },
  actions: {
    setMenus:async ({state,commit},payload:{roleId:number})=>{
      const result = await getMenu(payload)   
      // debugger 
      if(result.status==200){    
        
        let doData = []
        //  debugger
        result.result.forEach(item=>{
           let {id,pid,name,component,redirect,path,titleCn,titleEn,icon,breadcrumb,sort,hidden,onlyChild,level} = item
           if(level == 1&& !component){
             component = markRaw(layOut)
           }else if(level > 1 && !component){
            //  console.log("menu-name-level--->",name,level)
              component = markRaw(RouterView) 
           }else if(typeof component==="string"){  
              // component = moduless[component.replace(/@/,'/src')] 
              component = component
             
           }
           let obj = {name,path,component,id,pid}
           if(redirect){
              Object.assign(obj,{redirect})
            }
           obj.meta = {sort}
              if(titleCn){
                Object.assign(obj.meta,{title:titleCn})
              }
              if(icon){
                Object.assign(obj.meta,{icon})
              }           
              Object.assign(obj.meta,{breadcrumb:!!breadcrumb})
                Object.assign(obj.meta,{hidden:!!hidden})
                Object.assign(obj.meta,{onlyChild:!!onlyChild})               
               doData.push(obj)
         })  
         
         const res = util.toTreeMenu(doData)      
             
           commit('setMenus',res)               
      }
      return result
   }
  },
} 