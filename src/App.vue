
<script lang="ts" setup>
import en_US from 'ant-design-vue/es/locale/en_US';
import zh_CN from 'ant-design-vue/es/locale/zh_CN';
import {useI18n } from 'vue-i18n'
const {locale} = useI18n()   
</script>

<template>
 <a-config-provider :locale="locale=='zh'?zh_CN:en_US"> 
   <router-view></router-view>
 </a-config-provider>
</template>

<style>
#app{
  height:100%
}
</style>
