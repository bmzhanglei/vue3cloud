import { InjectionKey } from 'vue'
import { createStore, Store ,useStore as baseUseStore} from "vuex";
import createPersistedState from 'vuex-persistedstate'
import todos, { TodoState } from './modules/todos'
import { LoginState, UserInfo } from "@/typings/login";
import util from '@/utils/util';
import getters from './getters'
import modules from "./store";
import {doLogin} from '../apis/login'
import type {AppRouteRecordRaw, Tbread,Ttag} from '@/typings/route' 
import store from '@/store';
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
  gloabalStore?:{
    language:'zh'|'en',
    menus:AppRouteRecordRaw[],
    userInfo:UserInfo
  },
  breadcrumb:Tbread[],
  tagviews:Ttag[],
  cachedList:Ttag[],
  menus:AppRouteRecordRaw[],
  userInfo:UserInfo
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
       let vuexStore = sessionStorage.getItem('vuex')
       let gloabalStore = {}
       if(vuexStore){
          gloabalStore = JSON.parse(vuexStore)?.gloabalStore
       }
       gloabalStore.language = data.language
    
       if(data.app.menus?.length){
            Object.assign(gloabalStore,{menus:data.app?.menus})
       }
      //  if(data.login.userInfo?.id){
         gloabalStore.userInfo = data.login.userInfo
      //  }
      // console.log('数据持久化-->',data)
      // debugger
      return {gloabalStore}
    }
  })] 
})

export function useStore() {
  // console.log('baseUseStore--->',baseUseStore(key))
  // debugger
  return baseUseStore(key);
} 