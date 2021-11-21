<script setup lang="ts">
import { ref } from 'vue'
import HelloWorldVue from '@/components/HelloWorld.vue';
import util from '@/utils/util';
import {useStore} from '@/store'

// const {dispatch} = useStore()

//  dispatch('app/setMenus',{roleId:1})
//  console.log(loginState)

</script>
<script lang='ts'>export default{name:'dashboard'}</script>
<template>
<div>
     <a-input></a-input>
  <HelloWorldVue msg="xxx">{{}}</HelloWorldVue>
  <a_y>888</a_y>
  dashboard
</div>
</template>

<style lang='scss' scoped>

</style>