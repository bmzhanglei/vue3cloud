
import type{ Dispatch, Store } from 'vuex';
import type { AppRouteRecordRaw } from '@/typings/route';
import util from '@/utils/util';
import type { Router } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import type{ State } from '@/typings/vuex';

export default (state:State,dispatch:Dispatch,router:Router,roleId:number,callBack:()=>void)=>{
    dispatch('app/setMenus',{roleId}).then(res=>{                
        const menuComs:AppRouteRecordRaw[] = JSON.parse(JSON.stringify(state.app?.menus))
        util.changeComponent(menuComs);

        const routes = router.getRoutes().filter(res=>res.name === "layout")[0];
        //白名单
        const routeNames = ['dashboard','error401','error404']
        routes.children = routes.children.filter(res=>routeNames.includes(res.name as string))
        if(routes.children.length<4){         
          routes.children.push(...(menuComs as RouteRecordRaw[]));
          router.addRoute(routes)    
        }            
        callBack()
    }) 
}