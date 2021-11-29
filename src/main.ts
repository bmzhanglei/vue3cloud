import { createApp, ComponentInternalInstance } from 'vue';
import App from './App.vue'
import '@/style/common.scss'
import store,{key} from './store'
import i18n from './locales/i18n'
import router from './router/index';
import GlobalCommon from './plugins/global-common'

const app = createApp(App)
app.use(store,key)
app.use(GlobalCommon)
app.use(router)
app.use(i18n)
app.mount('#app')
