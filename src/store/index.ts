import { InjectionKey } from 'vue'
import { createStore, Store ,useStore as baseUseStore} from "vuex";
import createPersistedState from 'vuex-persistedstate'
import todos, { TodoState } from './modules/todos'
import { LoginState } from "../types/login";
import getters from './getters'
import modules from "./store";
import {doLogin} from '../apis/login'

// console.log('modules----->',modules)
// 1.创建一个injectionKey
// debugger
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
  app?:Lang
  // todos?: TodoState
  // user?: LoginState
}

export default createStore<State>({
  state:{
    language:'zh'
  },
  mutations:{
    setLanguage(state:any,data:string){
        state.language = data
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
         app:{language:data.language}   //指定数据持久化
        //  app:data   //指定数据持久化
      }
    }
  })] 
})

export function useStore() {
console.log(baseUseStore(key))
  return baseUseStore(key);
}