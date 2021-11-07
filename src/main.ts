import { createApp } from 'vue'
import App from './App.vue'
import '@/style/common.scss'
import store,{key} from './store'
import util from './utils/util'
import i18n from './locales/i18n'
import router from './router/index';
import { emitter } from './utils/bus'
import GlobalCommon from './plugins/global-common'

const app = createApp(App)
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
      emitter: typeof emitter,
      util:typeof util
    }
  }
  
  // debugger
// app.config.globalProperties.emitter = emitter
app.config.globalProperties.$utils = util

app.use(store,key)
app.use(GlobalCommon)
app.use(router)
app.use(i18n)
app.mount('#app')
