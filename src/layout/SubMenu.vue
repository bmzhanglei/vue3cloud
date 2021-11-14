<script setup lang="ts">
import { ref ,watch} from 'vue'
import {Icon} from '@/components/Icon';
import { useRoute, useRouter } from "vue-router";
import type {AppRouteRecordRaw} from '@/typings/route'
 const menuInfos = defineProps<{menuInfo:AppRouteRecordRaw}>()

// debugger
// console.log('menuInfo--->',menuInfo)

</script>

<template>
<a-sub-menu :key='menuInfo.name'>    
       <template #icon  v-if='menuInfo.meta?.icon'> <Icon :icon="menuInfo.meta?.icon as string"/></template>
       <template #title>{{ menuInfo.meta?.title || $t(menuInfo.meta?.locale as string) || "--" + menuInfo.path}}</template>
        <template v-for="item in menuInfo.children" :key="item.name">
            <template v-if="!item.children">
              <a-menu-item :key="item.name">
                <router-link :to="item.path">
                  <Icon  v-if='item.meta?.icon' :icon="item.meta?.icon as string"/>         
                  {{item.meta?.title || $t(item.meta?.locale as string) || "--" + item.path}}
              </router-link>  
              </a-menu-item>
            </template>
            <template v-else>
                <SubMenu :menuInfo="item"/> 
            </template>
      </template>
    
    </a-sub-menu>

</template>

<style lang='scss' scoped>

</style>