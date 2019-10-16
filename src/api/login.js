import api from './index'
import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
//登录
export function login (parameter) {
  return axios({
    url: '/server/sso/auth/login',
    method: 'post',
    data: parameter
  })
}
//用户保存
export function userPreservation (parameter) {
  return axios({
    url: '/server/data/admin/user/save',
    method: 'post',
    data: parameter
  })
}
//用户列表
export function userList (parameter) {
  return axios({
    url: '/server/data/admin/user/page',
    method: 'get',
    data: parameter
  })
}
//用户详情
export function userDetails (parameter) {
  return axios({
    url: '/server/data/admin/user/detail/'+parameter.id,
    method: 'get',
  })
}
//用户启用
export function userEnable (parameter) {
  return axios({
    url: '/server/data/admin/user/actived/'+parameter.id,
    method: 'post',
  })
}
//用户禁用
export function userProhibit (parameter) {
  return axios({
    url: '/server/data/admin/user/inactived/'+parameter.id,
    method: 'post',
  })
}
//用户删除
export function userDel (parameter) {
  return axios({
    url: '/server/data/admin/user/remove/'+parameter.id,
    method: 'post',
  })
}
//角色保存
export function rolePreservation (parameter) {
  return axios({
    url: '/server/data/admin/auth/role/save',
    method: 'post',
    data: parameter
  })
}
//角色列表
export function roleList (parameter) {
  return axios({
    url: '/server/data/admin/auth/role/page',
    method: 'get',
    data: parameter
  })
}
//角色详情
export function roleDetails (parameter) {
  return axios({
    url: '/server/data/admin/auth/role/detail/'+parameter.id,
    method: 'get',
  })
}
//角色启用
export function roleEnable (parameter) {
  return axios({
    url: '/server/data/admin/auth/role/actived/'+parameter.id,
    method: 'post',
  })
}
//角色禁用
export function roleProhibit (parameter) {
  return axios({
    url: '/server/data/admin/auth/role/inactived/'+parameter.id,
    method: 'post',
  })
}
//角色删除
export function roleDel (parameter) {
  return axios({
    url: '/server/data/admin/auth/role/remove/'+parameter.id,
    method: 'post',
  })
}

export function getSmsCaptcha (parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return axios({
    url: '/user/info',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getCurrentUserNav (token) {
  return axios({
    url: '/user/nav',
    method: 'get'
  })
}

export function logout () {
  return axios({
    url: '/auth/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*} 
 */
export function get2step (parameter) {
  return axios({
    url: api.twoStepCode,
    method: 'post',
    data: parameter
  })
}
