
// import util from '@/utils/util'
// import { emitter } from '@/utils/bus'
import { Menu, UserInfo } from '@/typings/login';
import { AppRouteRecordRaw } from '@/typings/route';
export interface CommonObject {
    [key: string]: string
  }


 export interface GlobalStore {
  language:string | undefined,
  menus:AppRouteRecordRaw[] | undefined,
  userInfo:UserInfo | undefined
 } 
  // declare module '@vue/runtime-core' {
  //     export interface ComponentCustomProperties {
  //       emitter: typeof emitter,
  //       $utils: typeof util
  //     }
  //     // export interface ComponentInternalInstance {
       
  //     // }
  // }
