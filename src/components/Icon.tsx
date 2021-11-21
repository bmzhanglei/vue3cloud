import { createVNode } from 'vue'
import  * as $Icon from '@ant-design/icons-vue'
// import font from '../utils/font'
const MyIcon = $Icon.createFromIconfontCN({  
  scriptUrl: "https://at.alicdn.com/t/font_2873021_bk0ltw6wu1q.js", // 在 iconfont.cn 上生成
});

export const Icon = (props: { icon: string,color?:string,size?:string }) => {
  // debugger
  // console.log(icon)
  const { icon ,color="#fff",size="14px"} = props;
  if(icon && icon.includes('icon-')){   
    return createVNode(MyIcon,{type:icon})
  }else if(icon){   
    return createVNode($Icon[icon as keyof typeof $Icon],{style:`color:${color};font-size:${size}`});
  }
  return ""
};
