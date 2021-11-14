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

const moduless = import.meta.glob('/src/views/**/*.vue') 
export default {
  namespaced: true,
  state:  { 
     menus:[]
  },
  mutations: {
    
     setMenus(state:State,data:Menu[]){
         let doData = []
        //  debugger
 
         data.forEach(item=>{
           let {id,pid,name,component,redirect,path,titleCn,titleEn,icon,breadcrumb,sort,hidden,onlyChild,level} = item
           if(level == 1&& !component){
             component = markRaw(layOut)
           }else if(level > 1 && !component){
              component =markRaw(RouterView) 
           }else if(typeof component==="string"){  
              component = moduless[component.replace(/@/,'/src')] 
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
         
         console.log(doData)

         const result = util.toTreeMenu(doData)          
         state.menus = result
     
         state.menus.forEach(item=>{
           router.addRoute(item)
         })
     }
  },
  actions: {
    setMenus:async ({state,commit},payload:{roleId:number})=>{
      const result = await getMenu(payload)   
      // debugger 
      if(result.status==200){             
           commit('setMenus',result.result)               
      }
      return result
   }
  },
} 