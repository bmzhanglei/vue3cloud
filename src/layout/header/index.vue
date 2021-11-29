<script setup lang="ts">
import { useStore } from '@/store';
import Breadcrumb from './Breadcrumb.vue';
import ToolBar from './ToolBar.vue';
import TagView from './tagview/index.vue';
import { computed} from 'vue'
const {state} = useStore()
const isScreen = computed(()=>state.fullScreen);

</script>
<template>
<div>
 <a-row class="bread-tool" v-show='!isScreen'>
    <a-col > <Breadcrumb/> </a-col>
    <a-col class="tool"><ToolBar/></a-col>
  </a-row>
   <a-row>
       <a-col :span="24"><TagView/></a-col>
   </a-row>
</div>
</template>

<style lang='scss' scoped>
.bread-tool ::v-deep > div{
//    display:flex
}
.bread-tool .tool{
    margin-left:auto
}
</style>