<script setup lang="ts">
import { ref ,watch} from 'vue'
import {Icon} from '@/components/Icon';
import { useRoute, useRouter } from "vue-router";
import type {AppRouteModule}  from '@/router'
 const menuInfos = defineProps<{menuInfo:AppRouteModule}>()

   const  selectedKeys= ref<string[]>(['1.3']);
     watch(selectedKeys,(newVal,oldVal)=>{
      console.log(selectedKeys.value)
  })


 console.log(menuInfos)
   const router = useRouter()

</script>

<template>
   <a-sub-menu>
       <template #icon> <Icon :icon="menuInfo.meta.icon as string"/>    </template>
       <template #title>{{ $t(menuInfo.meta.title as string) }}</template>
      <template v-for="item in menuInfo.children" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item?.key as string">
            <router-link :to="item.path">
              <Icon :icon="item.meta?.icon as string"/>         
              {{ $t(item.meta.title as string)}}
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