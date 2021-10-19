
import { createRouter,RouteMeta, createWebHashHistory, RouteRecordRaw } from "vue-router";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue';
import {defineComponent} from 'vue'

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'children'> {
  key:string,
  hidden?:boolean,
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  children?: AppRouteRecordRaw[] | undefined;
}

export type AppRouteModule =  AppRouteRecordRaw

// export type AppRouteRecordRaw = RouteRecordRaw & {hidden?:boolean,key:string,children?:AppRouteRecordRaw[]}
import layOut from "@/layout/index.vue";
import RouterView from "@/layout/RouterView.vue";
import Home from '@/views/Home.vue'

const routes = [
  {
      key:"0.1",
      path: '/',
      hidden:true,
      name: 'Login',     
      component: () => import(/* webpackChunkName: "userManager" */'@/views/login/index.vue')
    },
    {
      key:"1",
      path: '/index',
      name: 'index',
      component:layOut,
      redirect: "/index/dashboard",
      meta: {
        title: "index",
        locale: 'index',
        icon: "UserOutlined",
        // breadcrumb: true
      },           
      children:[
        {
          key:"1.1",
          path: "/index/dashboard",
          name: "dashboard",
          component: () => import("@/views/dashboard/index.vue"),
          meta: {
            title: "index",
            locale: 'index',        
            icon: "UserOutlined",
          }
        },{
          key:"1.2",
          path: "/index/role",
          name: "roles",
          hidden:false,
          component: RouterView,
          meta: {
            title: "role",
            locale: 'role',        
            icon: "UserOutlined",
          },
          children:[{
            key:"1.21",
            path: "/index/role",
            name: "role",
            component: () => import("@/views/role/index.vue"),
            meta: {
              title: "role",
              locale: 'role',        
              icon: ""
            }
            }
          ]
        },{
          key:"1.3",
          path: "/index/user",
          name: "user",
          hidden:false,
          component: () => import("@/views/user/index.vue"),
          meta: {
            title: "user",
            locale: 'user',        
            icon: "UserOutlined",
          }        
        }
      ]           
    },{   
        key:"2",         
        path: '/menu',
        name: 'menu',
        // hidden:true,
        component:layOut,            
        meta: {         
          title: "menu",
          locale: 'index',
          icon: "icon-dizhi",
          // breadcrumb: true
        },     
        redirect: "/menu/childmenu1",      
        children:[
          {
            key:"2.1",   
            // hidden:true,           
            path: "/menu/childmenu1",
            name: "menu2",
            component: () => import("@/views/menu/index.vue"),
            meta: {
              title: "menu",
              locale: 'index',        
              icon: "",
            }
          
          }
        ]
    },{
      key:"0.2",
      path:"/:pathMatch(.*)",
      hidden:true,
      name: '404',
      component: () => import("@/views/404.vue"),
    }
]



const router = createRouter({
    history:createWebHashHistory(),
    routes:routes as unknown as RouteRecordRaw[]
})

export default router