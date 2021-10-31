<script setup lang="ts">
import { ref,computed } from 'vue'
import { useStore } from '@/store';
import type {Ttag} from '@/types/route'
import {Icon} from '@/components/Icon';

  const {state,commit} = useStore()

const tags = computed(()=>state.tagviews) 



const closeTag = (key:string)=>{
    commit('delTagview',[key])
}
</script>

<template>
<div class='tagview'>

    <a-button v-for="(item,index) in tags" :key="item.key"  
              :type="item.active?'primary':'default'" size="small">
            <router-link :to="item.path"> {{$t(item.name)}}  </router-link> 
            <Icon icon="CloseOutlined" v-if="item.key!=='3.1'" class="icon" @click="closeTag(item.key)"/>      
 
    </a-button>
</div>
</template>

<style lang='scss' scoped>
.tagview{
    border-top: solid 1px #eee;
    padding-left:10px;
    .ant-btn{margin-right: 10px;}
    ::v-deep(a){font-size:12px;}
    .icon{color:#999 !important;font-size:12px;
      &:hover{background-color: #eee;}
      
    } 
}
</style>