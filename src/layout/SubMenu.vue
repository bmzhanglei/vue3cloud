<script setup lang="ts">
import { ref ,watch} from 'vue'
import {Icon} from '@/components/Icon';
import { useRoute, useRouter } from "vue-router";
import type {AppRouteRecordRaw} from '@/types/route'
 const menuInfos = defineProps<{menuInfo:AppRouteRecordRaw}>()

</script>

<template>
   <a-sub-menu :key='menuInfo.meta.key'>
       <template #icon> <Icon :icon="menuInfo.meta.icon as string"/></template>
       <template #title>{{ $t(menuInfo.meta.title as string) + menuInfo.meta.key as string }}</template>
      <template v-for="item in menuInfo.children" :key="item.meta.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.meta.key as string">
            <router-link :to="item.path">
              <Icon :icon="item.meta?.icon as string"/>         
              {{ $t(item.meta.title as string)+item.meta.key as string}}
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