<script setup lang="ts">
import {Icon} from '@/components/Icon';
import { ref, watch, computed, nextTick, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
import SubMenu from './SubMenu.vue'
// import SubMenu from './test.vue'
import { emitter } from '@/utils/bus';
import { useStore } from '@/store';
import type {AppRouteRecordRaw,Tbread} from '@/typings/route'
  const store = useStore()
  const selectedKeys= ref<string[]>([""]);
  const openKeys = ref<string[]>([""])

  const selKeys = computed(():Tbread[]=>{
    return store.state.breadcrumb 
  })

  const collapsedMenu = computed(()=>store.state.collapse);
    
  watch(selKeys,(newVal,oldVal)=>{
    selectedKeys.value = [newVal[newVal.length-1].name as string]
    if(!collapsedMenu.value){
      openKeys.value = newVal.map(res=>res.name as string)
    }
  },{immediate:true})

  const  collapsed= ref<boolean>(false);
  const router = useRouter()
  const routes:AppRouteRecordRaw[]= router.getRoutes().filter(res=>res.redirect && !res.meta?.hidden) as unknown as AppRouteRecordRaw[]
  // console.log('routes--->', routes)
</script>

<template>
     <a-menu theme="dark" 
        mode="inline"         
         v-model:selectedKeys="selectedKeys"
         v-model:openKeys="openKeys"
         :inline-collapsed="collapsed"
         >
        <template v-for="(item,index) in routes" :key="item.name">        
            <template v-if="item.children?.length==1 && item.meta?.onlyChild">
                <a-menu-item :key="item.children[0].name" > 
                     <router-link :to="item.children[0].path">
                        <Icon v-if='item.children[0].meta?.icon' :icon="item.children[0].meta?.icon as string"/>       
                        <span>{{item.children[0].meta?.title || $t(item.children[0].meta?.locale as string) || "--"}}</span>                 
                     </router-link>                
                </a-menu-item>
            </template>
            <template v-else>
               <SubMenu :menu-info="item"></SubMenu>
            </template>
           
          </template>
      </a-menu>
</template>

<style>
.ant-menu-submenu-popup.show{display: block;}
.ant-menu-submenu-popup.hide{display: none;}
</style>