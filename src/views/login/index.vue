
<script lang="ts" setup>
import type { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import type { UnwrapRef } from "vue";
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getCaptcha } from "../../apis/login";
import { useStore } from "../../store";
 import {useI18n } from 'vue-i18n'

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


const {t,locale} = useI18n()
// console.log(import.meta.env.VITE_BASE_URL)

const store = useStore()
const router = useRouter();
const layout = {
  labelCol: { span: 6},
  wrapperCol: { span: 12 },
};
const formRef = ref();
let langStr = ref('English')
const formState: UnwrapRef<FormState> = reactive({
  username: "zhanglei",
  password: "111111",
  verify: "",
  tip:""
});
//  debugger
 locale.value = store.state?.app?.language || "zh"
 const isZh2 = locale.value === "zh"
 langStr.value=isZh2?'English':'中文';
  const toggleLanguage = ()=>{
    const isZh = langStr.value === "中文"
    const val = isZh ?'zh':'en'
    langStr.value=isZh?'English':'中文';
    store.commit('setLanguage',val)
    locale.value = val
}

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
       const loginState = await store.dispatch('login/doLogin',{...formState})
        if(loginState.status==200){
          router.push("/index");
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
 <a-date-picker />
   <a-button type="primary" size="small" @click="toggleLanguage">
      {{langStr}}
    </a-button>
 <h1>{{formState.tip}}</h1>
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
       t("login")
      }}</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">{{
       t("reset")
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
