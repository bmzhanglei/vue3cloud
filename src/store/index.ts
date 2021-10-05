import { InjectionKey } from 'vue'
import { createStore, Store ,useStore as baseUseStore} from "vuex";
import createPersistedState from 'vuex-persistedstate'
import todos, { TodoState } from './modules/todos'
import { LoginState } from "../types/login";
import getters from './getters'
import modules from "./store";
import {doLogin} from '../apis/login'

console.log('modules----->',modules)
// 1.创建一个injectionKey
export const key: InjectionKey<Store<State>> = Symbol()

export type User = {
  _id?:string,
  username:string,
  password:string,
  verify:string
}

export type State = {
  // counter: number,
  // todos?: TodoState
  user?: Login
}

export default createStore({
  // state: {
  //   user:{},
  //   // counter: 1
  // },
  // mutations: {
  //   // add(state) {
  //   //   state.counter++
  //   // },   
  // },
  // actions:{
   
  // },
  modules,
  getters,
  plugins:[createPersistedState({  //状态管理持久化
    storage:window.sessionStorage,
    reducer: data =>{
      // console.log(data.app)
      return {
        //  app:{username:data.app.username}   //指定数据持久化
         app:data.app   //指定数据持久化
      }
    }
  })] 
})

export function useStore() {
  return baseUseStore(key);
}