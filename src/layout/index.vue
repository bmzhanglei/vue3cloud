<script lang="ts" setup>
import NavMemu from './NavMenu.vue'
import Header from './header/index.vue'
import RouterView  from './RouterView.vue';
// import Header from './Header.vue'
import { emitter } from '@/utils/bus';
import util from '@/utils/util'
import {  ref } from 'vue';
  const collapsed = ref<boolean>(false);

  emitter.on("getCollapse",param=>{
     collapsed.value = !!param 
  })
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