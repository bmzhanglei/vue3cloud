<script setup lang="ts">
import {Icon} from '@/components/Icon';
import { ref, watch, computed, nextTick, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
import SubMenu from './SubMenu.vue'
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
    selectedKeys.value = [newVal[newVal.length-1].key as string]
    if(!collapsedMenu.value){
      openKeys.value = newVal.map(res=>res.key as string)
    }
  },{immediate:true})

  const  collapsed= ref<boolean>(false);
  const router = useRouter()
  const routes:AppRouteRecordRaw[]= router.getRoutes().filter(res=>res.redirect) as unknown as AppRouteRecordRaw[]

</script>

<template>
<div>
     <a-menu theme="dark" 
        mode="inline"         
         v-model:selectedKeys="selectedKeys"
         v-model:openKeys="openKeys"
         :inline-collapsed="collapsed"
         >

        <template v-for="(item,index) in routes" :key="item.meta.key">        
            <template v-if="item.children?.length==1">
                <a-menu-item :key="item.children[0].meta.key"> 
                     <router-link :to="item.children[0].path">                     
                        <Icon :icon="item.meta.icon as string"/>       
                        <span>{{$t(item.children[0].name as string)+'-'+item.children[0].name as string}}</span>                 
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

<style>
.ant-menu-submenu-popup.show{display: block;}
.ant-menu-submenu-popup.hide{display: none;}
</style>