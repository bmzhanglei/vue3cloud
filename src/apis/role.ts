
import https from './https'

export const getAllRoles = (params?:{id?:number}) => {  //获取验证码
    return https.request({
      url: '/v1/role/getRoles',
      method: 'get',
      params
    })
}