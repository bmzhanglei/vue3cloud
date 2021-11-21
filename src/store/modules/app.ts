import { AppRouteRecordRaw } from "@/typings/route";
import { Module ,Commit, ActionContext, MapperForAction, ActionHandler, ActionTree, CommitOptions} from "vuex";
import type { State } from "..";
import router from '@/router'
import { getMenu } from '../../apis/menu';
import { useI18n } from "vue-i18n";
import util from '@/utils/util';
import layOut from "@/layout/index.vue";
import RouterView from "@/layout/RouterView.vue";
import { Menu, Result } from '@/typings/login';
import { markRaw } from "vue";
import store from '@/store';

// const moduless = import.meta.glob('/src/views/**/*.vue') 
export default {
  namespaced: true,
  state:  { 
     menus:[]
  },
  mutations: {    
     setMenus(state:State,data?:any[]){
          state.menus = data || []
     }
  },
  actions: {
    setMenus:async ({commit}:ActionContext<State,State>,payload:{roleId:number})=>{
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
} 