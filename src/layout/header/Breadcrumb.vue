<script setup lang="ts">
import { ref, watch,computed} from 'vue';
import type {Tbread} from '@/typings/route'
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';

const collapsed = ref<boolean>(false);
const store = useStore()
watch(collapsed,()=>{
  store.commit('setCollapse',!!collapsed.value)
})
const breads = computed(():Tbread[]=>{
    return store.state.breadcrumb
}) 
const {locale} =useI18n()
</script>

<template>
     <Icon icon="icon-zhankai"
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
       
        <Icon icon="icon-shouqi" v-else class="trigger" @click="() => (collapsed = !collapsed)" />
 <a-breadcrumb class="bread">
    <a-breadcrumb-item v-for='(item,index) in breads'> 
     <router-link :to="item.path">             
              {{ (locale==="zh"?item.title:item.titleEn) || $t(item.locale as string)}}
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