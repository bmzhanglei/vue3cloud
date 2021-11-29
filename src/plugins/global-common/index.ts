
import Contextmenu from '@/components/common/ContextMenu.vue'
import {Icon} from '@/components/Icon'
import { App } from 'vue'
import util from '@/utils/util';
import { emitter } from '../../utils/bus';

const commons = [
  {
    name: 'contextmenu',
    component: Contextmenu,
    register: () => {
      // 创建根节点
    //   debugger
      const rootNode = document.createElement('div')
      rootNode.id = 'contextmenu'
      document.body.appendChild(rootNode)
    }
  },{
    name:'Icon',
    component:Icon
  }
]

const GlobalCommon = {
  install: (app: App<Element>,options?:any) => {
    commons.forEach((common) => {
      app.component(common.name, common.component)
      common.register && common.register()
    })
   
    app.config.globalProperties.$utils = util
    app.config.globalProperties.emitter = emitter
  }
}

export default GlobalCommon
