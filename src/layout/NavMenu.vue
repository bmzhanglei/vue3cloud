<script setup lang="ts">
import { ref, watch, computed, nextTick, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
import SubMenus from './SubMenu.vue'
import { emitter } from '@/utils/bus';
import { useStore } from '@/store';
import type {AppRouteRecordRaw,Tbread} from '@/typings/route'
  const store = useStore()
  const router = useRouter()
  const selectedKeys= ref<string[]>([""]);
  const openKeys = ref<string[]>([""])

  const selKeys = computed(():Tbread[]=>{
    return store.state.breadcrumb 
  })

  const collapsedMenu = computed(()=>store.state.collapse);
    
  watch(selKeys,(newVal,oldVal)=>{
  if(newVal.length){
    selectedKeys.value = [newVal[newVal.length-1].name as string]
    if(!collapsedMenu.value){
      openKeys.value = newVal.map(res=>res.name as string)
    }
  }
  },{immediate:true})

  const routes:AppRouteRecordRaw[]= router.getRoutes().filter(res=>res.name=="layout")[0].children.filter(res=>!res.meta?.hidden) as unknown as AppRouteRecordRaw[]
  // console.log('routes--->', routes)
</script>

<template>
     <a-menu theme="dark" 
        mode="inline"         
       v-model:selectedKeys="selectedKeys"
         v-model:openKeys="openKeys"        
         >
        <template v-for="(item,index) in routes" :key="item.name">
                <a-menu-item  v-if="!item.children" :key="item.name" >  
                     <router-link :to="item.path">                     
                        <Icon  :icon="item.meta?.icon as string"/>       
                        <span>{{item.meta?.title || $t(item.meta?.locale as string) || "--"}}</span>                 
                     </router-link>                
                </a-menu-item>
                <SubMenus v-else :menu-info="item"></SubMenus>
              
          </template>
      </a-menu>
</template>

<style>
.ant-menu-submenu-popup.show{display: block;}
.ant-menu-submenu-popup.hide{display: none;}
</style>