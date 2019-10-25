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
//风险源，绘制类型列表
export function paramList (parameter) {
  return axios({
    url: '/server/data/admin/param/list?type='+parameter.type,
    method: 'get',
  })
}
//风险源，绘制类型保存
export function paramSave (parameter) {
  return axios({
    url: '/server/data/admin/param/save',
    method: 'post',
    data: parameter
  })
}
//风险源，绘制类型删除
export function paramDel (parameter) {
  return axios({
    url: '/server/data/admin/param/remove/'+parameter.id,
    method: 'post',
  })
}
//设备管理结构列表
export function structureEquipment (parameter) {
  return axios({
    url: '/server/data/admin/device/type/tree',
    method: 'get',
  })
}
//设备类型列表
export function equipmentTypeList (parameter) {
  return axios({
    url: '/server/data/admin/device/type/list?parentId='+parameter.id,
    method: 'get',
  })
}
//设备类型保存
export function equipmentTypeSave (parameter) {
  return axios({
    url: '/server/data/admin/device/type/save',
    method: 'post',
    data:parameter
  })
}
//设备类型删除
export function equipmentTypeDel (parameter) {
  return axios({
    url: '/server/data/admin/device/type/remove/'+parameter.id,
    method: 'post',
  })
}
//设备信息列表
export function equipmentNewsList (parameter) {
  return axios({
    url: '/server/data/admin/device/info/page?typeId='+parameter.id,
    method: 'get',
  })
}
//设备信息保存
export function equipmentNewsSave (parameter) {
  return axios({
    url: '/server/data/admin/device/info/save',
    method: 'post',
    data:parameter
  })
}
//设备信息删除
export function equipmentNewsDel (parameter) {
  return axios({
    url: '/server/data/admin/device/info/remove/'+parameter.id,
    method: 'post',
  })
}
//关联设备分页
export function relatedList (parameter) {
  return axios({
    url: '/server/data/admin/device/related/'+parameter.id,
    method: 'get',
  })
}


//项目类型列表
export function projectTypeList (parameter) {
  return axios({
    url: '/server/data/admin/project/type/list?parentId='+parameter.id,
    method: 'get',
  })
}
//项目类型保存
export function projectTypeSave (parameter) {
  return axios({
    url: '/server/data/admin/project/type/save',
    method: 'post',
    data:parameter
  })
}
//项目类型删除
export function projectTypeDel (parameter) {
  return axios({
    url: '/server/data/admin/project/type/remove/'+parameter.id,
    method: 'post',
  })
}
//项目信息列表
export function projectNewsList (parameter) {
  return axios({
    url: '/server/data/admin/project/info/page?typeId='+parameter.id,
    method: 'get',
  })
}
//项目信息保存
export function projectNewsSave (parameter) {
  return axios({
    url: '/server/data/admin/project/info/save',
    method: 'post',
    data:parameter
  })
}
//项目信息删除
export function projectNewsDel (parameter) {
  return axios({
    url: '/server/data/admin/project/info/remove/'+parameter.id,
    method: 'post',
  })
}
//设备类型树列表
// export function typeTreeList (parameter) {
//   return axios({
//     url: '/server/data/admin/project/info/remove/'+parameter.id,
//     method: 'post',
//   })
// }
//区域列表
export function regionList (id) {
  return axios({
    url: '/server/data/admin/area/list?parentId='+id,
    method: 'get',
  })
}
//河道列表
export function getRiverList () {
  return axios({
    url: '/server/data/admin/river/page?projectId=5da7d092ea6c156d792df816',
    method: 'get',
  })
}
//河道详细信息
export function informationRiver (id) {
  return axios({
    url: '/server/data/admin/river/detail/'+id,
    method: 'get',
  })
}
//河道删除
export function delRiver (id) {
  return axios({
    url: '/server/data/admin/river/remove/'+id,
    method: 'post',
  })
}
export function getSaveRiver (parameter) {
  return axios({
    url: '/server/data/admin/river/save',
    method: 'post',
    data:parameter
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
