<script setup lang="ts">
import { ref } from 'vue'

</script>

<template>
<div>
   <router-view v-slot="{ Component }">
    <transition name="fadeRouter" mode="out-in">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</div>
</template>

<style lang='scss' scoped>

</style>