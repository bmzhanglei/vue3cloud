
import Contextmenu from '@/components/common/ContextMenu.vue'
import {Icon} from '@/components/Icon'
import { App } from 'vue'

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
  install: (app: App<Element>) => {
    commons.forEach((common) => {
        // debugger
      app.component(common.name, common.component)
      common.register && common.register()
    })
  }
}

export default GlobalCommon
