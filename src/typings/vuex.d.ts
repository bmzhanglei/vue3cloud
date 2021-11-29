
import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import { emitter } from '@/utils/bus';
import util from '@/utils/util';
import { UserInfo } from '@/typings/login';
import { GlobalStore } from ".";
import {Tbread} from '@/typings/route';
import {Ttag} from '@/typings/route';
import { AppRouteRecordRaw } from '@/typings/route';

// 模块扩展
// this.$store强类型支持
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<UserState>,
    $emitter: typeof emitter,
    $utils: typeof util
  }
}

interface UserState {
  userInfo:UserInfo | undefined
}

interface MenuState{
  menus:AppRouteRecordRaw[] | undefined
}

export type State = {
  roleIdCurrent:number, 
  collapse:boolean,
  fullScreen:boolean,
  language?: 'zh'|'en'|undefined,
  gloabalStore?:GlobalStore,
  breadcrumb:Tbread[],
  tagviews:Ttag[],
  app?:MenuState,
  login?:UserState,
}


