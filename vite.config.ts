import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from "path";
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components'

const url = 'http://101.34.156.252:7001'

export default defineConfig({
  css:{},
  esbuild:{},
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'src'),
      "apis":path.resolve(__dirname,'src/apis'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    },
  },
  server:{
    host:'0.0.0.0',
    port:80,
    proxy:{
      '^/login|user|role|category|fileupload/.*':{
        target:url,
        changeOrigin:true
      },
      '^/socket.io':{
        target:url,
        changeOrigin:true
      }
    }
  },
  plugins: [vue(),vueJsx(),vueI18n({
    // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
    // compositionOnly: false,
    // you need to set i18n resource including paths !
    include: path.resolve(__dirname, './src/locales/**')
  }),
  ViteComponents({
    customComponentResolvers: [AntDesignVueResolver()],
  })
]
})
