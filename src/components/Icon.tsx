import { createVNode } from 'vue'
import  {createFromIconfontCN} from '@ant-design/icons-vue'
// import  * as $Icon from '@ant-design/icons-vue'
// import font from '../utils/font'
const MyIcon = createFromIconfontCN({  
  scriptUrl: "https://at.alicdn.com/t/font_2873021_ygng0v3nfl9.js", // 在 iconfont.cn 上生成
});

export const Icon = (props: { icon: string,color?:string,size?:string }) => {
  // debugger
  // console.log(icon)
  let { icon  ,color="#fff",size="16px"} = props;
  if(icon && icon.includes('icon-')){   
    return createVNode(MyIcon,{type:icon})
  }else if(icon){   
    // return createVNode($Icon[icon as keyof typeof $Icon],{style:`color:${color};font-size:${size}`});
  }
  return ""
};
