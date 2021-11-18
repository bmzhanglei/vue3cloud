
import axios ,{ AxiosRequestConfig, AxiosResponse, AxiosError } from "axios"
const cancelTokenSources = new Map(); // 定义cancel队列

class Https{
    config = null
    constructor(config:any) {
        this.config = config || {
          timeout: 6000,
          withCredentials: true, //指定具体请求来源域名
          // baseURL: process.env.VUE_APP_API_BASE_URL,
          // baseURL: 'https://api.coderen.top',
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        };       
      }
      interceptors(instance:any) {
          instance.interceptors.request.use((config:AxiosRequestConfig):AxiosRequestConfig => {
            // console.log('config--->',config)
            // debugger
            //  if(config.method=='get'){            
            //    config.params = config.params
            //  }         
                // 请求拦截器中将请求加入cancel队列
                if (!config.hasOwnProperty('cancelToken')) { // 排除不需要cancel的请求
                    const source = axios.CancelToken.source();  
                    cancelTokenSources.set(source.token, source.cancel); // 加入cancel队列   
                    config.cancelToken = source.token;
                 }
                return config;
            },
            (error:AxiosError)=>{
                return Promise.reject(error); 
          });
          instance.interceptors.response.use(
             (response:AxiosResponse): AxiosResponse | Promise<AxiosResponse> => {
                if (response.config.cancelToken) {
                    cancelTokenSources.delete(response.config.cancelToken);
                 }
                return response.data;
              },
              (error:AxiosError) => {
                if (error.response) {
                    const data = error.response.data;
                    if (error.response.status === 403) {
                        // console.log("无权限访问",data.message)
                    }
                    if (error.response.status === 401) {
                         //退出登陆
                    }

                }else{
                    let { message } = error;
                    if (message === "Network Error") {
                        message = "连接异常";
                    }
                    if (message.includes("timeout")) {
                        message = "请求超时";
                    }
                    if (message.includes("Request failed with status code")) {
                        const code = message.substr(message.length - 3);
                        message = "接口" + code + "异常";
                    }
                    console.log(message);
                }
                if (axios.isCancel(error)) {
                    cancelTokenSources.delete(error.message)
                  }
                return Promise.reject(error);
              }
          );
      }
      request(options:any) {      
        const instance = axios.create();
        const requestOptions = Object.assign({}, this.config, options);
        this.interceptors(instance);
        return instance(requestOptions);
      }
}

const https = new Https(null);
export default https;
export {
    cancelTokenSources
}