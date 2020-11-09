import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/logistics/api/api/login',
    method: 'post',
    params: { ...data }
  })
}

export function keycloaklogin(data) {
  return request({
    url: 'http://localhost:8180/auth/realms/Julong/protocol/openid-connect/token',
    method: 'post',
    data: {
      ...data,
      'grant_type': 'password',
      'client_id': 'login-app'
    },
    transformRequest: [function(data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret.substring(0, ret.length - 1)
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
