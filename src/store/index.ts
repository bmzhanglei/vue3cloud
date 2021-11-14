import { InjectionKey } from 'vue'
import { createStore, Store ,useStore as baseUseStore} from "vuex";
import createPersistedState from 'vuex-persistedstate'
import todos, { TodoState } from './modules/todos'
import { LoginState } from "@/typings/login";
import util from '@/utils/util';
import getters from './getters'
import modules from "./store";
import {doLogin} from '../apis/login'
import type {AppRouteRecordRaw, Tbread,Ttag} from '@/typings/route' 
// console.log('modules----->',modules)

// debugger
// 1.创建一个injectionKey
export const key: InjectionKey<Store<State>> = Symbol()

export type User = {
  _id?:string,
  username:string,
  password:string,
  verify:string
}
type Lang = {language:string}

export type State = {
  collapse:boolean,
  fullScreen:boolean,
  language?: string,
  app?:{menus:AppRouteRecordRaw[]},
  breadcrumb:Tbread[],
  tagviews:Ttag[],
  cachedList:Ttag[],
  menus:AppRouteRecordRaw[]
  // todos?: TodoState
  // user?: LoginState
}

export default createStore<State>({
  state:{
    language:'zh',
    breadcrumb:[],
    tagviews:[],
    cachedList:[],
    fullScreen:false,
    collapse:false  //左侧菜单是否展示
  },
  mutations:{
    setLanguage(state:State,data:string){
        state.language = data
    },
    setCollapse(state:State,data:boolean){
      state.collapse = data
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
      // console.log('数据持久化-->',data)
      // debugger
      return {
         gloabalData:{language:data.language}   //指定数据持久化
        //  app:data   //指定数据持久化
      }
    }
  })] 
})

export function useStore() {
  // console.log('baseUseStore--->',baseUseStore(key))
  // debugger
  return baseUseStore(key);
} 