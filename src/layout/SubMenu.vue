<script setup lang="ts">
import { ref ,watch,computed} from 'vue'
import { useRoute, useRouter } from "vue-router";
import { useStore } from '@/store';
import type {AppRouteRecordRaw} from '@/typings/route'
import { useI18n } from 'vue-i18n';
 const menuInfos = defineProps<{menuInfo:AppRouteRecordRaw}>()
 const {locale} = useI18n()
  const store = useStore()
 const lang = computed(()=>store.getters.language==="zh")
// debugger
// console.log('menuInfo--->',menuInfos)

</script>
<template>
<div>
<a-sub-menu :key='menuInfo.name'>    

       <template #icon> <Icon :icon="menuInfo.meta?.icon as string"/>{{menuInfo.meta?.icon}}</template>
       <template #title>{{ locale==="zh"?menuInfo.meta?.title:menuInfo.meta?.titleEn || $t(menuInfo.meta?.locale as string) || + menuInfo.name}}</template>
       
     <template v-for="item in menuInfo.children" :key="item.name">
            <template v-if="!item.children">
              <a-menu-item :key="item.name">
               <router-link :to="item.path">
                  <Icon v-if='item.meta?.icon' :icon="item.meta?.icon as string"/>         
                  {{locale==="zh"?item.meta?.title:item.meta?.titleEn || $t(item.meta?.locale as string) || "--" + item.path}}
              </router-link>  
              </a-menu-item>
            </template>
            <template v-else>
                <SubMenu :menuInfo="item"/> 
            </template>
      </template>
    
    </a-sub-menu> 

</div>

</template>

<style lang='scss' scoped>

</style>