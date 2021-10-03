import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@/css/index.scss'
import store,{key} from './store'
import util from './utils/util'
import i18n from '@/language/i18n'
import router from './router/index';

const app = createApp(App)

app.config.globalProperties.$utils = util

app.use(router)
app.use(store,key)
app.use(Antd)
app.use(i18n)
app.mount('#app')
