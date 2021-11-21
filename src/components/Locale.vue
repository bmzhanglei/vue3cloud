<script lang="ts" setup>

import {ref} from 'vue'
import {useI18n } from 'vue-i18n'
import { useStore } from "@/store";

const {locale} = useI18n()
const store = useStore()
let langStr = ref('')

locale.value = store.state?.language || store.state?.gloabalStore?.language || "zh"
langStr.value = locale.value === "zh"?'English':'中文';

const toggleLanguage = ()=>{
  const isZh = langStr.value === "中文"
  langStr.value = isZh?'English':'中文';
  locale.value = isZh ?'zh':'en'
  store.commit('setLanguage',locale.value)
}

</script>

<template>
  <a-button  type="link" size="small" @click="toggleLanguage">
      <template #icon>
          <Icon icon="icon-shuyi_fanyi-36"></Icon>
          {{langStr}}
      </template>
  </a-button>
</template>

<style lang="scss">
.ant-btn{width:auto !important}
</style>