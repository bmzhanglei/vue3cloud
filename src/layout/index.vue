<script lang="ts" setup>
import NavMemu from './NavMenu.vue'
import Header from './header/index.vue'
import RouterView  from './RouterView.vue';
import { useStore } from '@/store';
// import Header from './Header.vue'
import { emitter } from '@/utils/bus';
import {RouteRecordName,useRouter} from 'vue-router'
import util from '@/utils/util'
import {  ref ,nextTick,provide} from 'vue';
  const collapsed = ref<boolean>(false);
const {commit} = useStore()
const router = useRouter()
  emitter.on("getCollapse",param=>{
     collapsed.value = !!param 
  })
     const reload = ref(true)
    const onReload = (routerName: string | RouteRecordName) => {
      // commit("REMOVE_CACHED_VIEW", routerName)
      // reload.value = false
      nextTick(() => {
        // if (activeView.value !== routerName) {
        //   router.push({ name: routerName })
        // }
        // reload.value = true
        // commit("ADD_CACHED_VIEW", routerName)
      })
    }
    provide('reload', onReload)
</script>

<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo"> login</div>
      <NavMemu></NavMemu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header> 
        <Header/>
      </a-layout-header>

      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <RouterView></RouterView>
         <!-- <router-view></router-view> -->
      </a-layout-content>
    </a-layout>
  </a-layout>
  
</template>

<style lang="scss" scoped>
.logo {color:white}
.layout{
    height:100%;
  .ant-layout-header{
       background: #fff; padding: 0;height:auto;line-height: 40px;

  
  }
}
</style>