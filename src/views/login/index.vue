<template>
 <h1>{{formState.tip}}</h1>
  <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
    <a-form-item :label="$t('user.username')" name="username">
      <a-input v-model:value="formState.username" />
    </a-form-item>
    <a-form-item :label="$t('user.password')" name="password">
      <a-input v-model:value="formState.password" />
    </a-form-item>
    <a-form-item :label="$t('user.verify')" name="verify" class="verify">
      <a-input
        style="width: 200px"
        v-model:value="formState.verify"
        size="default"
      />
      <div @click="getCode" v-html="code.data"></div>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit" @click="onSubmit">{{
        $t("common.login")
      }}</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">{{
        $t("common.reset")
      }}</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { reactive, UnwrapRef, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getCaptcha } from "../../apis/login";
import { useStore } from "../../store";
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

const store = useStore()
const router = useRouter();
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
const formRef = ref();
const formState: UnwrapRef<FormState> = reactive({
  username: "zhanglei",
  password: "111111",
  verify: "",
  tip:""
});

const rules = {
  username: [{ required: true, message: "required!", trigger: "blur" }],
  password: [{ required: true, message: "required!", trigger: "blur" }],
  verify: [{ required: true, message: "required!", trigger: "blur" }],
};

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

<style lang="scss" scoped>
.verify ::v-deep(.ant-form-item-control .ant-form-item-control-input-content) {
  display: flex;
  .ant-input {
    margin-right: 10px;
    height: 32px;
  }
}
</style>
