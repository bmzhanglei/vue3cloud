<script setup lang="ts">
import {Icon} from '@/components/Icon';
import { ref,watch } from 'vue'
import { useRoute, useRouter } from "vue-router";
import SubMenu from './SubMenu.vue'
import type {AppRouteModule} from '@/router'
// import type {routesType} from '@/router'

  const  selectedKeys= ref<string[]>(["1.1"]);
  watch(selectedKeys,(newVal,oldVal)=>{
      console.log(selectedKeys.value)
  })
  const  collapsed= ref<boolean>(false);
  const router = useRouter()
  const routes:AppRouteModule[]= router.getRoutes().filter(res=>res.redirect) as unknown as AppRouteModule[]
//   console.log(router)
  const setMenuKey = () => {
    debugger
    // selectedKeys.value = [menuInfo.name as string]

      }

   
  // console.log(routes)
//  watch(router, setMenuKey)
</script>

<template>
<div>
     <a-menu theme="dark" 
        mode="inline"   
        :default-selected-keys="['1.3']"
        :default-open-keys="['1.3']"
         v-model:selectedKeys="selectedKeys"
         :inline-collapsed="collapsed"
         >

        <template v-for="item in routes" :key="item.key">        
            <template v-if="item.children?.length==1">
                <a-menu-item :key="item.children[0].key"> 
                     <router-link :to="item.children[0].path">                     
                        <Icon :icon="item.meta.icon as string"/>       
                        <span>{{$t(item.meta.title as string)}}</span>                 
                     </router-link>                
                </a-menu-item>
            </template>
            <template v-else>
                <SubMenu  :menu-info="item"></SubMenu>
            </template>
          </template>
      </a-menu>
</div>
</template>

<style lang='scss' scoped>

</style>