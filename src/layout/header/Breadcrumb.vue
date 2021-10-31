<script setup lang="ts">
import { emitter } from '@/utils/bus';
import { ref, watch, onMounted, reactive } from 'vue';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
  type Tbread = Partial<Record<'name'|'path',string> > 

  const collapsed = ref<boolean>(false);

  watch(collapsed,()=>{
      emitter.emit("getCollapse",collapsed.value as boolean)
  })
  let breads= ref<Tbread[]>([])
  onMounted(()=>{
    emitter.on('getBread',(param)=>{
      //  breads.value = []
      //  breads.value[0] = {name:'desktop',path:'/desktop/index'}
      // debugger
       breads.value = param as Tbread[]
   
    })
  })


</script>

<template>
     <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
 <a-breadcrumb class="bread">
    <a-breadcrumb-item v-for='(item,index) in breads'> 
     <router-link :to="item.path">             
              {{ $t(item.name as string) }}
           </router-link>  </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<style lang='scss' scoped>
  .trigger {
    font-size: 18px;
    padding: 0 12px;
    cursor: pointer;
    transition: color 0.3s;
     &:hover{color: #1890ff;}
    }
    .bread{
        display: inline-block;
    }
</style>