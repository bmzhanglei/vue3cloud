<script lang="ts" setup>
import NavMemu from './NavMenu.vue'
import Header from './header/index.vue'
import RouterView  from './RouterView.vue';
import { useStore } from '@/store';
// import Header from './Header.vue'
import { emitter } from '@/utils/bus';
import {useRouter} from 'vue-router'
import util from '@/utils/util'
import {  ref ,nextTick,provide, computed} from 'vue';

const {commit,state} = useStore()
const router = useRouter()
const collapsed = computed(()=>state.collapse);


  // emitter.on("getCollapse",param=>{
  //   collapsed.value = !!param 
  //     debugger
  // })
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
      <a-layout-content class="main">
        <RouterView></RouterView>    
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
  .main{margin: 10px; padding: 10px; background: #fff; }
}
</style>