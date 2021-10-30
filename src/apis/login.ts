
import https from './https'

export const getCaptcha = () => {  //获取验证码
    return https.request({
      url: '/v1/login/captcha',
      method: 'get',
      cancelToken: null, // 避免被加入cancel队列
    })
}

export const doLogin = (data:any) => {
  return https.request({
    url: '/v1/login/doLogin',
    data,
    method: 'post',
  })
}

export const loginOut = (data:any) => {
    return https.request({
      url: '/v1/login/loginOut',
      data,
      method: 'post' 
    })
}