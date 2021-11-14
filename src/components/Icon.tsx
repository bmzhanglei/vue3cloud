import { createVNode } from 'vue'
import  * as $Icon from '@ant-design/icons-vue'

const MyIcon = $Icon.createFromIconfontCN({
  // scriptUrl: '//at.alicdn.com/t/font_2873021_d2cl69gkfju.js', // 在 iconfont.cn 上生成
});

export const Icon = (props: { icon: string,color?:string,size?:string }) => {
  const { icon ,color="#fff",size="14px"} = props;
  if(icon && icon.includes('icon-')){
    return createVNode(MyIcon,{type:icon})
  }else if(icon){
    return createVNode($Icon[icon as keyof typeof $Icon],{style:`color:${color};font-size:${size}`});
  }
  return ""
};
