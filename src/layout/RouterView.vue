<script setup lang="ts">
import { ref, computed,watch } from 'vue';
import { useStore } from '@/store';
const {state,commit} = useStore()
import { emitter } from '@/utils/bus';

interface RefreshState{
  name:string,
  state:boolean
}
// const tagCache = computed(()=>state.tagviews.map(res=>res.name)) 

const excludeTag = ref<string>('')

const reload = ref<boolean>(true)

emitter.on('reload',(val:any):void=>{
    reload.value = val.state;    
    excludeTag.value = val.names  
    // console.log(tagCache.value)  
})
</script>

<template>
<div>
   <router-view v-slot="{ Component }">
    <transition name="fadeRouter" mode="out-in">
      <keep-alive  :exclude="[excludeTag]">
        <component :is="Component" v-if='reload' :key='$route.name'/>
      </keep-alive>
    </transition>
  </router-view>
</div>
</template>

<style lang='scss' scoped>

</style>