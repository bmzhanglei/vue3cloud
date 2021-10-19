import { createVNode } from 'vue'
import  * as $Icon from '@ant-design/icons-vue'

const MyIcon = $Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2873021_d2cl69gkfju.js', // 在 iconfont.cn 上生成
});

export const Icon = (props: { icon: string }) => {
  const { icon } = props;
  if(icon.includes('icon-')){
    return createVNode(MyIcon,{type:icon})
  }else if(icon){
    return createVNode($Icon[icon as keyof typeof $Icon],{style:"color:#fff"});
  }
  return ""
};
