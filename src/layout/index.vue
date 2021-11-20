<script lang="ts" setup>
import NavMemu from './NavMenu.vue'
import Header from './header/index.vue'
import RouterView  from './RouterView.vue';
import { useStore } from '@/store';
// import Header from './Header.vue'
import { emitter } from '@/utils/bus';
import {useRouter} from 'vue-router'
import util from '@/utils/util'
import { ref, nextTick, provide, computed, watch } from 'vue';
// import getters from '../store/getters';
const {commit,state,getters} = useStore()
const router = useRouter()
const collapsed = computed(()=>state.collapse);
const isScreen = computed(()=>state.fullScreen);
  // emitter.on("getCollapse",param=>{
  //   collapsed.value = !!param 
  //     debugger
  // })
//  watch(menus,(newVal,oldVal)=>{
//    console.log('menus--->',newVal)
//  },{immediate:true})
</script>

<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" :class="{'isCollapse':collapsed}" :trigger="null" collapsible v-show="!isScreen">
      <div class="logo">   
         <Icon icon="Html5Outlined" color="yellowgreen" size="30px"/> 
        <span :class='{"ttlShow":!collapsed}'>系统通用模版</span>    
      </div>
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
.logo {
  color:white;
  font-size:18px;
  display: flex;
  padding-top:10px;
  align-items: center;
  max-height: 40px;
  overflow: hidden;
  flex-wrap: nowrap;
  > span:first-of-type{margin-right: 10px;margin-left:16px;display: inline-flex;}
  > span:last-of-type{opacity: 0;}
}
.layout{
    height:100%;
  .ant-layout-header{
       background: #fff; padding: 0;height:auto;line-height: 40px;
  }  
  .isCollapse {
    .logo{margin-left:8px; transition: all .3s;}
     &::v-deep(.ant-menu-submenu>.ant-menu-submenu-title ){
        left: 0;
        padding: 0 calc(50% - 16px / 2);
        text-overflow: clip;
    
    .ant-menu-title-content,.ant-menu-submenu-arrow{
      opacity:0
    }
  }
  }

  .main{margin: 10px; padding: 10px; background: #fff; }
}
.ttlShow{
  opacity: 1!important;  
  transition: all .7s;
}
</style>