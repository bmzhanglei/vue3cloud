import { InjectionKey } from 'vue'
import { createStore, Store ,useStore as baseUseStore} from "vuex";
import createPersistedState from 'vuex-persistedstate'
import todos, { TodoState } from './modules/todos'
import { LoginState } from "@/typings/login";
import util from '@/utils/util';
import getters from './getters'
import modules from "./store";
import {doLogin} from '../apis/login'
import type {Tbread,Ttags} from '@/typings/route' 
// console.log('modules----->',modules)
// debugger
const clearCache = (state: State) => {
  state.cachedList = state.tagviews.map((view) => util.getBigName(view.name as string))
}

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
  language?: string,
  app?:Lang,
  breadcrumb:Tbread[],
  tagviews:Ttags[],
  cachedList:Ttags[]
  // todos?: TodoState
  // user?: LoginState
}

export default createStore<State>({
  state:{
    language:'zh',
    breadcrumb:[],
    tagviews:[],
    cachedList:[]
  },
  mutations:{
    setLanguage(state:State,data:string){
        state.language = data
    },
    setBreadcrumb(state:State,data:Tbread[]){
        state.breadcrumb = data                     
    },
    addTagview(state:State,data:Ttags){
      if(!state.tagviews.some(res=>res.key === data.key)){
        state.tagviews.push(data)                    
      }
    },
    delTagview(state:State,data:string[]){
       util.delRest(state.tagviews,'key',data);    
    },
    activeTagview(state:State,key:string){
      state.tagviews.forEach(item=>{
          item.active = item.key === key         
      })
      // console.log(state.tagviews.map(res=>res.name))
    },
    sortTagviews(state:State,data:Ttags[]){
        state.tagviews = data
    },
    

  },
  modules,
  getters,
  plugins:[createPersistedState({  //状态管理持久化
    storage:window.sessionStorage,
    reducer: (data:State) =>{
      // console.log('数据持久化-->',data)
      // debugger
      return {
         app:{language:data.language}   //指定数据持久化
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