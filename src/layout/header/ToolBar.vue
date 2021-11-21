<script setup lang="ts">
import Locale from '@/components/Locale.vue' 
import {loginOut} from 'apis/login'
import { useStore } from '@/store';
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const {commit} = useStore()
const router = useRouter()

const logout = async ()=>{
   let result = await loginOut("");
   if(result.status==200){
       commit('login/setUserInfo')
       commit('app/setMenus')
       commit('addAllTagview')
       router.push('/login')
   }else{

   }
}
</script>

<template>
<div class="op">
    <Locale/>
    <a-button @click='logout' type="link">{{$t('logout')}}</a-button>
</div>
</template>

<style lang='scss' scoped>
.op{}
</style>