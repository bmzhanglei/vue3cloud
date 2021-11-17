<script lang="ts" setup>
import {ref} from 'vue'
import { TranslationOutlined } from '@ant-design/icons-vue';
let langStr = ref('English')
 import {useI18n } from 'vue-i18n'
 import { useStore } from "../store";
 const {t,locale} = useI18n()
 const store = useStore()
//  debugger
 locale.value = store.state?.gloabalStore?.language || "zh"
 const isZh2 = locale.value === "zh"
 langStr.value=isZh2?'English':'中文';
  const toggleLanguage = ()=>{
    const isZh = langStr.value === "中文"
    const val = isZh ?'zh':'en'
    langStr.value=isZh?'English':'中文';
    store.commit('setLanguage',val)
    locale.value = val
}

</script>

<template>
     <a-button  type="link" size="small" @click="toggleLanguage">
            <template #icon>
            <TranslationOutlined />
               {{langStr}}
            </template>
  </a-button>
</template>

<style lang="scss">

</style>