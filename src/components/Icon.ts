import { createVNode } from 'vue'
import  * as $Icon from '@ant-design/icons-vue'

interface icons{
  icon: string 
}

export const Icon = (props: icons) => {
  const { icon } = props;
  return createVNode($Icon[icon]);
};