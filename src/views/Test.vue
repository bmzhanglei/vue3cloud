<script setup lang="ts">
import { ref } from 'vue'

</script>
<script lang='ts'>export default{name:'test'}</script>
<template>
<div>
    home

    <!-- <a-sub-menu :key='menuInfo.name'>    
       <template #icon  v-if='menuInfo.meta?.icon'> <Icon :icon="menuInfo.meta?.icon as string"/></template>
       <template #title>{{ menuInfo.meta?.title || $t(menuInfo.meta?.locale as string) || "--" + menuInfo.name}}</template>
       
     
    
    </a-sub-menu> -->

       <!--   <template v-for="item in menuInfo.children" :key="item.name">
            <template v-if="!item.children">
              <a-menu-item :key="item.name">
                <router-link :to="item.path">
                  <Icon v-if='item.meta?.icon' :icon="item.meta?.icon as string"/>         
                  {{item.meta?.title || $t(item.meta?.locale as string) || "--" + item.path}}
              </router-link>  
              </a-menu-item>
            </template>
            <template v-else>
                <SubMenu :menuInfo="item"/> 
            </template>
      </template>-->
</div>
</template>

<style lang='scss' scoped>

</style>