import type { AppRouteRecordRaw } from "@/typings/route";
import type { Module, ActionContext} from "vuex";
import type { Menu, Result } from '@/typings/login';
import { getMenu } from 'apis/menu';
import util from '@/utils/util';
import { MenuState,State } from "@/typings/vuex";

export default {
  namespaced: true,
  state:  { 
     menus:[]
  },
  mutations: {    
    setMenus(state:MenuState,data?:any[]){
      state.menus = data || []
    }
  },
  actions: {
    setMenus:async ({commit}:ActionContext<MenuState,State>,payload:{roleId:number})=>{
      const result:Result = await getMenu(payload)   
      // debugger 
      if(result.status==200){    
        let doData:AppRouteRecordRaw[] = []
        //  debugger
        let resMenu = result.result as Menu[]
        resMenu.forEach((item:Menu)=>{
           let {id,pid,name,component,redirect,path,titleCn,titleEn,icon,breadcrumb,sort,hidden,level} = item
           let obj = {name,path,component,meta:{id,pid,sort}}
           if(redirect){
               Object.assign(obj,{redirect})
            }
            if(titleCn){
              Object.assign(obj.meta,{title:titleCn,titleEn})
            }
            if(icon){
              Object.assign(obj.meta,{icon})
            }           
            Object.assign(obj.meta,{breadcrumb:!!breadcrumb})
            Object.assign(obj.meta,{hidden:!!hidden})                        
            doData.push(obj)
         })           
         const res = util.toTreeMenu(doData)         
          commit('setMenus',res)               
      }
      return result
   }
  },
} as Module<MenuState,State>