import { InjectionKey } from 'vue'
import { createStore, Store ,useStore as baseUseStore} from "vuex";
import createPersistedState from 'vuex-persistedstate'
import { LoginState, UserInfo } from "@/typings/login";
import util from '@/utils/util';
import getters from './getters'
import modules from "./store";
import {doLogin} from 'apis/login'
import type {AppRouteRecordRaw, Tbread,Ttag} from '@/typings/route' 
import store from '@/store';
import type{ GlobalStore } from '@/typings';
import { MenuState, State, UserState } from '@/typings/vuex';
// console.log('modules----->',modules)

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state:{
    language:'zh',
    breadcrumb:[],
    tagviews:[],
    fullScreen:false,
    collapse:false,  //左侧菜单是否展示
    roleIdCurrent:-1   //当前切换角色 id 
  },
  mutations:{
    setLanguage(state:State,data:'zh'|'en'){
        state.language = data
    },
    setCollapse(state:State,data:boolean){
      state.collapse = data
    },
    setCurrentRole(state:State,data:number){
      state.roleIdCurrent = data
    },
    setFullScreen(state:State,data:boolean){
      state.fullScreen = data
    },
    setBreadcrumb(state:State,data:Tbread[]){
        state.breadcrumb = data                     
    },
    addTagview(state:State,data:Ttag){
      if(!state.tagviews.some(res=>res.name === data.name)){
        state.tagviews.push(data)                    
      }
    },
    addAllTagview(state:State,data?:Ttag[]){      
      state.tagviews = data || []
    },
    delTagview(state:State,data:string[]){
       util.delRest(state.tagviews,data);    
    },
    activeTagview(state:State,name:string){  //name必须是唯一的
      state.tagviews.forEach(item=>{
          item.active = item.name === name         
      })
    },
    sortTagviews(state:State,data:Ttag[]){
        state.tagviews = data
    }
  },
  modules,
  getters,
  plugins:[createPersistedState({  //状态管理持久化
    storage:window.sessionStorage,
    reducer: (data:State) =>{ 
      let gloabalStore:GlobalStore ={
        language : data.language,
        menus : data?.app?.menus,
        userInfo : data?.login?.userInfo,
        tagviews:data?.tagviews,
      };
      return {gloabalStore}
    }
  })] 
})

export function useStore() {
  return baseUseStore(key);
} 