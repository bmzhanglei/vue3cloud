import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from "path";
import {loadEnv} from 'vite'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components'

export default({command,mode})=>{
  const url = loadEnv(mode,process.cwd()).VITE_BASE_URL
  const port = loadEnv(mode,process.cwd()).VITE_PORT
  return defineConfig({
    css:{
      preprocessorOptions:{
        scss:{
          additionalData:'@import "@/assets/styles/global.scss";'
        }
      }
    },
    esbuild:{},
    // mode:"development",
    // mode:"production",
    build:{
      // sourcemap:false,
      // chunkSizeWarningLimit:1500,
      // rollupOptions:{
      //   output:{
      //     manualChunks(id){
      //         if(id.includes('node_modules')){
      //           return id.toString().split('node_modules/')[1].split('/')[0].toString()
      //         }
      //     }
      //   }
      // }
    },
    resolve:{
      alias:{
        "@":path.resolve(__dirname,'src'),
        "apis":path.resolve(__dirname,'src/apis'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      },
    },
    server:{
      host:'0.0.0.0',
      port:port,
      // https:true,
      cors:true,
      proxy:{
        '^/login|user|role|category|fileupload/.*':{
          target:url,
          changeOrigin:true
        },
        '^/socket.io':{
          target:url,
          changeOrigin:true
        }
      },
      hmr:{
        overlay:false //是否屏蔽服务器报错
      }
    },
    plugins: [vue(),vueJsx(),
      vueI18n({
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      // compositionOnly: false,
      // you need to set i18n resource including paths !
      include: path.resolve(__dirname, './src/locales/lang/**')
    }),
    ViteComponents({
      customComponentResolvers: [AntDesignVueResolver()],
    })
  ]
  })
}
