<script setup lang="ts">
import { ref,computed } from 'vue'
import { useStore } from '@/store';
import type {Ttag} from '@/types/route'
import {Icon} from '@/components/Icon';
import { VueDraggableNext } from 'vue-draggable-next'

const {state,commit} = useStore()

const tags = computed({
  get:()=>state.tagviews ,
  set:(value)=>commit('sortTagviews',value)
}) 

const closeTag = (key:string)=>{
    commit('delTagview',[key])
}

</script>

<template>
<div class='tagview'>
      <VueDraggableNext
      v-model="tags"      
      animation="300" 
      ghostClass="tag-ghost"
      filter=".no-drag" 
    >
      <transition-group>
        <a-button v-for="(item,index) in tags" :key="item.key" 
                  :class="{'no-drag': item.name === 'desktop' }"   
                  :type="item.active?'primary':'default'" size="small">
            <router-link :to="item.path"> {{$t(item?.name)}}  </router-link> 
            <Icon icon="CloseOutlined" v-if="item.key!=='3.1'" class="icon" @click="closeTag(item.key)"/>      
        </a-button>
    </transition-group>
    </VueDraggableNext>
</div>
</template>

<style lang='scss' scoped>
.tagview{
    border-top: solid 1px #eee;
    padding-left:10px;
    .ant-btn{margin-right: 5px;}
    .ant-btn-primary {
        a{color:white}
        span{color:#ccc !important;
          &:hover{color:white !important;background-color: transparent;}
        }
    }
    ::v-deep(a){font-size:12px;color:currentColor}
    .icon{color:#999 !important;
          font-size:12px;
      &:hover{background-color: #eee;}
      
    } 
}
.tag-ghost {
    opacity: 0;
  }

</style>