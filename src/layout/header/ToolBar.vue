<script setup lang="ts">
import Locale from '@/components/Locale.vue' 
import {loginOut} from 'apis/login'
import { useStore } from '@/store';
import { computed, ref } from 'vue'
import {getAllRoles} from 'apis/role'
import { useRouter } from 'vue-router';
import type { Result, Role } from '@/typings/login';
import { useI18n } from 'vue-i18n';
import useChangeRoute from '@/hooks/useChangeRoute'

const {commit,state,dispatch} = useStore()

const router = useRouter()
const {locale} = useI18n()
const avatarDefault = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'

const userInfo = computed(()=>state.login?.userInfo)

const roles = ref<Role[]>()
let params = userInfo.value?.roleId==1?{}:{id:userInfo.value?.roleId}
// let params = {id:userInfo.value?.roleId}
getAllRoles(params).then(res=>{
    let role:Result = res
    roles.value =  role.result as Role[] 
    if(roles.value && roles.value.length > 1){
        commit('setCurrentRole',userInfo.value?.roleId)
    }
}) 

const toDashboard = (id:number)=>{
   if(state.roleIdCurrent>-1){
       if(state.roleIdCurrent!=id){
           useChangeRoute(state,dispatch,router,id,()=>{
               let delTags = state.tagviews.filter(res=>res.name!=="dashboard")    
                commit('setCurrentRole',id)
                if(id!=1){
                    commit('delTagview',delTags.map(res=>res.name))
                    router.push("/dashboard");
                } 
           })
       }
   }
}

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
    <a-avatar :src="userInfo?.avatar || avatarDefault" />
    <a-dropdown class="role" overlayClassName="roles_toolbar">
        <a class="ant-dropdown-link" @click.prevent>
        {{userInfo?.username}}
        <Icon icon="icon-arrow-down" />
        </a>
         <template #overlay>
              <a-menu>             
                <a-menu-item v-for="item in roles" :key='item.id' :class="{'sel':item.id == state.roleIdCurrent}">
                    <a @click.stop="toDashboard(item.id)">{{locale==="zh"?item.name_cn:item.name_en}}</a>
                </a-menu-item>            
             </a-menu>
         </template>
    </a-dropdown>    
    <Locale/>
    <a-button @click='logout' type="link">{{$t('logout')}}</a-button>
</div>
</template>

<style lang='scss' scoped>
.op{
    .role{margin-left:10px;margin-right:10px; }
}
</style>
<style lang="scss">
.roles_toolbar  .sel{background-color: #eee;}
</style>