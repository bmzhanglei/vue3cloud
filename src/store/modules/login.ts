import { ActionContext, Module } from "vuex";
import { LoginState, Result, UserInfo } from "@/typings/login";
import { doLogin } from 'apis/login'
import { UserState ,State} from "@/typings/vuex";

export default {
  namespaced: true,
  state:  { 
      userInfo:{  },
  },
  mutations: {
    setUserInfo(state:UserState,data?:UserInfo){ 
        state.userInfo = data || undefined 
    } 
  },
  actions: {
    doLogin:async ({commit}:ActionContext<UserState,State>,payload:any)=>{
        const result:Result = await doLogin(payload)    
        if(result.status==200){     
             commit('setUserInfo',result?.result)               
        }
        return result
     }    
  },
} as Module<UserState,State>
