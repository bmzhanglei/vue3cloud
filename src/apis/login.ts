
import https from './https'

export const getCaptcha = () => {  //获取验证码
    return https.request({
      url: '/login/captcha',
      method: 'get',
      cancelToken: null, // 避免被加入cancel队列
    })
}

export const doLogin = data => {
  return https.request({
    url: '/login/doLogin',
    data,
    method: 'post',
  })
}

export const loginOut = data => {
    return https.request({
      url: '/login/loginOut',
      data,
      method: 'post' 
    })
}