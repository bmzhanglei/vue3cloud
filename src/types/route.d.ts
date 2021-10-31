

import { RouteRecordRaw ,RouteMeta} from "vue-router";
import {defineComponent} from 'vue'

export type Component<T extends any = any> =
        | ReturnType<typeof defineComponent>
        | (() => Promise<typeof import('*.vue')>)
        | (() => Promise<T>);

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'children'> {
    hidden?:boolean,
    name: string;
    meta: RouteMeta;
    component?: Component | string;
    children?: AppRouteRecordRaw[] | undefined;
}

export type Tbread = Partial<Record<'name'|'path'|'key',string>>  //定义面包屑



// export type AppRouteModule =  AppRouteRecordRaw