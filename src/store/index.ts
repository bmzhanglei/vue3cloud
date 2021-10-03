import { InjectionKey } from 'vue'
import { createStore, Store ,useStore as baseUseStore} from "vuex";
import todos, { TodoState } from './modules/todos'


// 1.创建一个injectionKey
export const key: InjectionKey<Store<State>> = Symbol()

export type User = {
  _id:string,
  username:string
}

export type State = {
  counter: number,
  todos?: TodoState
  user?: User
}

export default createStore({
  state: {
    user:{},
    counter: 1
  },
  mutations: {
    add(state) {
      state.counter++
    },
    getUsers(state,data){
      state.user = data                     
    }
  },
  actions:{
    getUsers({commit},payload){
        fetch("/api/getUsers?name=a").then(res=>res.json()).then(data=>{
          console.log(data.data)
            commit('getUsers',data.data)
        })       
    }
  },
  modules: {
    todos
  }
})

export function useStore() {
  return baseUseStore(key);
}