import { createI18n } from 'vue-i18n' 
import store from '../store'
import messages from '@intlify/vite-plugin-vue-i18n/messages'
import getters from '../store/getters';

const language = store.getters.language || navigator.language.split('-')[0] || 'zh'

const i18n = createI18n({
  globalInjection:true,
  legacy: false, // you must specify 'legacy: false' option
  locale:  store.getters.language  || 'zh',
  messages,
});

export default i18n