import https from './https'

export const getMenu = (query:{roleId:number}) => {  //获取验证码
    return https.request({
      url: '/v1/menu/find',
      method: 'get',
      query,
      cancelToken: null, // 避免被加入cancel队列
    })
}