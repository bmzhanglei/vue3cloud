import { Module } from "vuex";
import { State } from "..";
import { LoginState } from "../../types/login";
import { doLogin } from '../../apis/login'

export default {
  namespaced: true,
  state:  { 
      user:{},
  },
  mutations: {
    doLogin(state:any,data:any){
        // state.user = data                     
    }
  },
  actions: {
    doLogin:async ({},payload:any)=>{
        const result = await doLogin(payload)    
        if(result.status==200){             
            //  commit('doLogin',result)               
        }
        return result
     }
  },
} 
// } as Module<LoginState, State>;  1_login.coderen.top_bundle.crt	2_login.coderen.top.key
//docker cp /root/ftpfile/* 3dbfd8c5b61c:etc/nginx/sslkey

// docker run -p 8082:80 --name login_nginx  -v /root/nginx/login_nginx/log/:/var/log/nginx -v /root/nginx/login_nginx/wwwroot:/usr/share/nginx/html -v /root/nginx/login_nginx/nginx.conf:/etc/nginx/nginx.conf -d nginx

// server {
//     listen       80;
//     listen       443 ssl;
//     server_name login.coderen.top
//     ssl_certificate                          /etc/nginx/sslkey/1_login.coderen.top_bundle.crt;
//     ssl_certificate_key                        /etc/nginx/sslkey/2_login.coderen.top.key;
//     ssl_session_timeout 5m;
//     ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
//     ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
//     ssl_prefer_server_ciphers on;

//     root  /usr/share/nginx/html;           #项目路径
//     index index.html;
//     # Any route that doesn't have a file extension (e.g. /devices)
//     location / {
//         try_files $uri $uri/ /index.html;
//     }

// }

// server {
//     listen       80;
//     server_name  coderen.top;    #监听的URL
//     root  /usr/share/nginx/html;           #项目路径
//     index index.html;
//     # Any route that doesn't have a file extension (e.g. /devices)
//     location / {
//         try_files $uri $uri/ /index.html;
//     }

// }

//dd34e67e3371