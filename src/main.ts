import { createApp } from 'vue'
import App from './App.vue'
import '@/style/index.scss'
import store,{key} from './store'
import util from './utils/util'
import i18n from '@/language/i18n'
import router from './router/index';

const app = createApp(App)

app.config.globalProperties.$utils = util

app.use(router)
app.use(store,key)
app.use(i18n)
app.mount('#app')
