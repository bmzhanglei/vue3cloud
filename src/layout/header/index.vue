<script setup lang="ts">

import Breadcrumb from './Breadcrumb.vue';
import ToolBar from './ToolBar.vue';
import TagView from './tagview/index.vue';
import { getCurrentInstance, ref ,watch} from 'vue'

 const curInstance = getCurrentInstance()
//  console.log(curInstance?.proxy?.$utils.add(1,2))
</script>

<template>
<div>
 <a-row class="bread-tool">
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