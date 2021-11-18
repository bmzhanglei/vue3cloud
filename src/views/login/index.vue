
<script lang="ts" setup>
import Locale from '@/components/Locale.vue' 
import type { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import type { UnwrapRef } from "vue";
import { reactive, ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import type {  RouteRecordRaw } from 'vue-router';
import { getCaptcha } from "apis/login";
import { useStore } from "@/store";
 import {useI18n } from 'vue-i18n'
import type { Result } from '@/typings/login';
import layOut from '@/layout/index.vue';
import RouterView from '@/layout/RouterView.vue';
 const {t,locale} = useI18n()
interface FormState {
  username: string;
  password: string;
  verify: string;
  tip?:string
}
interface VerifyCode {
  data: string | undefined;
  text: string | undefined;
}

// console.log(import.meta.env.VITE_BASE_URL)

const store = useStore()
const router = useRouter();
const layout = {
  labelCol: { span: 6},
  wrapperCol: { span: 12 },
};
const formRef = ref();
const formState: UnwrapRef<FormState> = reactive({
  username: "zhangsan",
  password: "111111",
  verify: "",
  tip:""
});

const validObj = { required: true, message: "required!", trigger: "blur" }
const rules = {username: [validObj], password: [validObj],verify: [validObj]};

let code: UnwrapRef<VerifyCode> = reactive({
  text: "",
  data: "",
});
const getCode = () => {
  getCaptcha().then((res:any):void => {
    code.text = res.text;
    code.data = res.data;
  });
};

onMounted(() => {
  getCode();
});

// const routerPackag = (routers:AppRouteRecordRaw[]) => {
//   routers.filter(itemRouter => {
//     if (itemRouter.component != layOut && itemRouter.component != RouterView) {
//       console.log(itemRouter.component)
//       if(typeof itemRouter.component=="string"){        
//            itemRouter.component = ()=>import(itemRouter.component)
//         }
//       router.addRoute(itemRouter as RouteRecordRaw);
//     }
//     // 是否存在子集
//     if (itemRouter.children && itemRouter.children.length) {
//       routerPackag(itemRouter.children);
//     }
//     return true;
//   });
// };

const onSubmit = () => {
  formRef.value.validate().then(async () => {
       const loginState:Result = await store.dispatch('login/doLogin',{...formState})
        if(loginState.status==200){
            store.dispatch('app/setMenus',{roleId:loginState.result?.roleId}).then(res=>{
               //  doData.forEach(item=>router.addRoute(item))
              //  let menus = store.state.app?.menus
              //  menus?.forEach(item=>{
              //   //  if(router.hasRoute(item.name)){
              //      router.addRoute(item as RouteRecordRaw)
              //   //  }
              //   })
              //  debugger
              // routerPackag(menus as AppRouteRecordRaw[])
                router.push("/dashboard");
            })          
        }else{
          formState.tip = loginState.tip
        }
    }).catch((error: ValidateErrorEntity<FormState>) => {
      console.log("error", error);
    });
};
const resetForm = () => {
  formRef.value.resetFields();
};
</script>

<template>
 <a-row>
    <a-col :offset="8" :span="8"><h3>{{formState.tip}}</h3></a-col>
    <a-col :span="8" > <Locale/></a-col>
  </a-row>
  <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
    <a-form-item :label="$t('username')" name="username">
      <a-input v-model:value="formState.username" />
    </a-form-item>
    <a-form-item :label="$t('password')" name="password">
      <a-input v-model:value="formState.password" />
    </a-form-item>
    <a-form-item :label="$t('verify')" name="verify" class="verify">
      <a-input
        style="width: 200px"
        v-model:value="formState.verify"
        size="default"
      />
      <div @click="getCode" v-html="code.data"></div>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit" @click="onSubmit">{{
       $t("login")
      }}</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">{{
       $t("reset")
      }}</a-button>
    </a-form-item>
  </a-form>
</template>
<style lang="scss" scoped>
.verify ::v-deep(.ant-form-item-control .ant-form-item-control-input-content) {
  display: flex;
  .ant-input {
    margin-right: 10px;
    height: 32px;
  }
}
</style>
