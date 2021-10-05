import { Module } from "vuex";
import { State } from "..";
import { LoginState } from "../../types/login";
import { doLogin } from 'apis/login'

export default {
  namespaced: true,
  state:  { 
      user:{},
  },
  mutations: {
    doLogin(state,data){
        state.user = data                     
    }
  },
  actions: {
    doLogin:async ({commit},payload)=>{
        const result = await doLogin(payload)    
        if(result.status==200){             
             commit('doLogin',result)               
        }
        return result
     }
  },
} as Module<LoginState, State>;
