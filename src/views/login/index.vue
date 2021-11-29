<script lang="ts" setup>
import { reactive, ref, onMounted, defineComponent } from 'vue';
import type { UnwrapRef } from "vue";
import { useRouter } from 'vue-router';
import type { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import Locale from '@/components/Locale.vue' 
import useChangeRoute from '@/hooks/useChangeRoute'
import { getCaptcha } from "apis/login";
import { useStore } from "@/store";
import type { Result, VerifyCode,LoginState } from '@/typings/login';
import { useI18n } from 'vue-i18n';

// console.log(import.meta.env.VITE_BASE_URL)
const {t} = useI18n()
const store = useStore()
const router = useRouter();

const layout = {
  labelCol: { span: 6},
  wrapperCol: { span: 12 },
};
const formRef = ref();
const formState: UnwrapRef<LoginState> = reactive({
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

const onSubmit = () => {
  formRef.value.validate().then(async () => {
       const loginState:Result = await store.dispatch('login/doLogin',{...formState})
        if(loginState.status==200){
            useChangeRoute(store.state,store.dispatch,router,loginState.result?.roleId as number,()=>{
               router.push("/dashboard");
            })                
        }else{
          formState.tip = loginState.tip || t("loginFail")
        }
    }).catch((error: ValidateErrorEntity<LoginState>) => {
      console.log("error", error);
    });
};
const resetForm = () => {
  formRef.value.resetFields();
};
</script>
<script lang='ts'>export default defineComponent({name:'login'}) </script>

<template>
<div class="login">
  <img class="login-bg" src="https://images-1255367492.cos.ap-guangzhou.myqcloud.com/login-bg.svg"/>
<div>
 <a-row>
    <a-col :offset="6" :span="13"><h3>{{formState.tip}}</h3></a-col>
    <a-col :span="5" > <Locale/></a-col>
  </a-row>
  <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
    <a-form-item :label="$t('username')" name="username">
      <a-input v-model:value="formState.username" >
       <template #prefix>  
         <Icon icon="icon-geren" color="#666"></Icon>       
      </template>
      </a-input>
    </a-form-item>
    <a-form-item :label="$t('password')" name="password">
      <a-input-password v-model:value="formState.password" >
          <template #prefix>  
            <Icon icon="icon-mima" color="#666"></Icon>       
          </template>        
      </a-input-password>
    </a-form-item>
    <a-form-item :label="$t('verify')" name="verify" class="verify">
      <a-input
        style="width: 121px"
        v-model:value="formState.verify"
        size="default"
      />
      <div @click="getCode" v-html="code.data"></div>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 14, offset: 6 }">
      <a-button type="primary" html-type="submit" @click="onSubmit">{{
       $t("login")
      }}</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">{{
       $t("reset")
      }}</a-button>
    </a-form-item>
  </a-form>
  </div>
  </div>
</template>
<style lang="scss" scoped>
.login{
  display:flex;
  justify-content:center;
  position:relative;
  .login-bg{
    position:absolute;
    height:100vh;
    z-index:-1
  }
  h3{color:red}
  & > div{width:370px;
  box-shadow: 5px 5px 17px 0px #173d5c;
  padding-left:10px;
     transform: translateY(36vh);
     border-radius:10px;
    background-color:snow
  }
}
 ::v-deep(.ant-form-item-control) {
  max-width:70%
}
.verify ::v-deep(.ant-form-item-control .ant-form-item-control-input-content) {
  
  display: flex;
  .ant-input {
    margin-right: 10px;
    height: 32px;
  }
}
</style>
