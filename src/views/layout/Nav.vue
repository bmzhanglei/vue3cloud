<script setup lang="ts">
import {Icon} from '../../components/Icon';
import { ref } from 'vue'
import { useRoute, useRouter } from "vue-router";
import  {routesType} from '../../router'
  const  selectedKeys= ref<string[]>(['1']);
  const router = useRouter()
  const routes = router.getRoutes().filter(res=>res.redirect) 
//   console.log(router)
  console.log(routes)

</script>

<template>
<div>
     <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item v-for="item in routes" :key="item.path">
          <Icon :icon="item.meta.icon"/>       
         <span>{{item.meta.title}}</span>
        </a-menu-item>
   
      </a-menu>
</div>
</template>

<style lang='scss' scoped>

</style>