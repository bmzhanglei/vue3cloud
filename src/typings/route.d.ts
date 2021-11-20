

import { RouteRecordRaw ,RouteMeta,RouteRecordName} from "vue-router";
import {defineComponent} from 'vue'

export type Component<T extends any = any> =
        | ReturnType<typeof defineComponent>
        | (() => Promise<typeof import('*.vue')>)
        | (() => Promise<T>);

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'children'> {
    name: string;
    meta?: RouteMeta;
    component?: Component | string | null;
    children?: AppRouteRecordRaw[] | undefined;
}

export type Tbread = Partial<Record<'name'|'path'|'title'|'locale',string>>  //定义面包屑

export type Ttag = Tbread & {active?:boolean}  

export type Reload = (routeName: string | RouteRecordName) => void

declare module 'vue-router' {
    interface RouteMeta {
      id?:number,
      pid?:number,
      hidden?: boolean,      
      sort?: number, //排序
      icon?:string,
      title?:string,
      breadcrumb?:boolean  //是否在面包屑里显示

    }
  }

// export type AppRouteModule =  AppRouteRecordRaw