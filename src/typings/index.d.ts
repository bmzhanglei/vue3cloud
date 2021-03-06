
// import util from '@/utils/util'
// import { emitter } from '@/utils/bus'
import { Menu, UserInfo } from '@/typings/login';
import { AppRouteRecordRaw,Ttag } from '@/typings/route';
export interface CommonObject {
  [key: string]: string
}
export interface GlobalStore {
  language:string | undefined,
  menus:AppRouteRecordRaw[] | undefined,
  userInfo:UserInfo | undefined,
  tagviews:Ttag[]
} 
