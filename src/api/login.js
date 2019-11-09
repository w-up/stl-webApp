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
    url: '/server/data/admin/auth/role/page?type='+parameter,
    method: 'get',
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
export function structureEquipment () {
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

//设备三层结构
export function structDeviceList (key) {
  return axios({
    url: '/server/data/admin/device/struct',
    method: 'get',
    params:{
      level:key
    }
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
//河道保存
export function getSaveRiver (parameter) {
  return axios({
    url: '/server/data/admin/river/save',
    method: 'post',
    data:parameter
  })
}
//街道列表
export function getStreetList () {
  return axios({
    url: '/server/data/admin/street/page?projectId=5da7d092ea6c156d792df816',
    method: 'get',
  })
}
//街道详细信息
export function informationStreet (id) {
  return axios({
    url: '/server/data/admin/street/detail/'+id,
    method: 'get',
  })
}
//街道删除
export function delStreet (id) {
  return axios({
    url: '/server/data/admin/street/remove/'+id,
    method: 'post',
  })
}
//街道保存
export function getSaveStreet (parameter) {
  return axios({
    url: '/server/data/admin/street/save',
    method: 'post',
    data:parameter
  })
}
//任务列表
export function taskList(type) {
  return axios({
    url: '/server/data/admin/task/page?projectId=5da7d092ea6c156d792df816&type='+type,
    method: 'get',
  })
}
//任务保存
export function getTaskSave (parameter) {
  return axios({
    url: '/server/data/admin/task/save',
    method: 'post',
    data:parameter
  })
}
//任务详情
export function getTaskDetail (id) {
  return axios({
    url: '/server/data/admin/task/detail/'+id,
    method: 'get',
  })
}
//任务删除
export function taskRemove (id) {
  return axios({
    url: '/server/data/admin/task/remove/'+id,
    method: 'post',
  })
}
//任务点分页
export function taskSpotPage(id) {
  return axios({
    url: '/server/data/admin/task/point/page?taskId='+id,
    method: 'get',
  })
}
//任务点列表
export function taskSpotList(data) {
  return axios({
    url: '/server/data/admin/task/point/list',
    method: 'get',
    params:{
      riverId:data.id,
      coordinate:data.coordinate,
      radius:data.radius,
    }
  })
}
//任务线列表
export function taskLineList(id) {
  return axios({
    url: '/server/data/admin/task/line/list?riverId='+id,
    method: 'get',
  })
}
//任务点详情
export function taskPointDetail(id) {
  return axios({
    url: '/server/data/admin/task/point/detail/'+id,
    method: 'get',
  })
}
//任务点保存
export function taskPointSave(parameter) {
  return axios({
    url: '/server/data/admin/task/point/save',
    method: 'post',
    data:parameter
  })
}
//任务点保存
export function taskPointDel(id) {
  return axios({
    url: '/server/data/admin/task/point/remove/'+id,
    method: 'post',
  })
}
//方案分页
export function programmeList(id) {
  return axios({
    url: '/server/data/admin/scheme/page?projectId=5da7d092ea6c156d792df816&riverId='+id,
    method: 'get',
  })
}
//方案保存
export function programmeSave(parameter) {
  return axios({
    url: '/server/data/admin/scheme/save',
    method: 'post',
    data:parameter
  })
}
//方案详情
export function programmeDetail(id) {
  return axios({
    url: '/server/data/admin/scheme/detail/'+id,
    method: 'get',
  })
}
//方案删除
export function programmeRemove(id) {
  return axios({
    url: '/server/data/admin/scheme/remove/'+id,
    method: 'post',
  })
}
//方案设默认
export function programmePrimary(parameter) {
  return axios({
    url: '/server/data/admin/scheme/set/primary/',
    method: 'post',
    data:parameter
  })
}
//水质监测分页
export function testingPage(id) {
  return axios({
    url: '/server/data/admin/monitor/page?projectId=5da7d092ea6c156d792df816&type='+id,
    method: 'get',
  })
}
//水质保存
export function testingSave(parameter) {
  return axios({
    url: '/server/data/admin/monitor/save',
    method: 'post',
    data:parameter
  })
}
//水质详情
export function testingDetail(id) {
  return axios({
    url: '/server/data/admin/monitor/detail/'+id,
    method: 'get'
  })
}
//水质删除
export function testingDel(id) {
  return axios({
    url: '/server/data/admin/monitor/remove/'+id,
    method: 'post',
  })
}
//督办单分页
export function SupervisePage() {
  return axios({
    url: '/server/data/admin/supervision/page?projectId=5da7d092ea6c156d792df816',
    method: 'get',
  })
}
//督办单保存
export function SuperviseSave(parameter) {
  return axios({
    url: '/server/data/admin/supervision/save',
    method: 'post',
    data:parameter
  })
}
//督办单删除
export function SuperviseDel(id) {
  return axios({
    url: '/server/data/admin/supervision/remove/'+id,
    method: 'post',
  })
}
//督办单详情
export function SuperviseDetail(id) {
  return axios({
    url: '/server/data/admin/supervision/detail/'+id,
    method: 'get',
  })
}
//巡河
//巡河计划列表
export function planPage(data) {
  return axios({
    url: '/server/data/admin/inspect/plan/page?=',
    method: 'get',
    params:{
      projectId:'5da7d092ea6c156d792df816',
      status:data.status,
      year:data.year,
      month:data.month,
      day:data.day
    }
  })
}
//巡河计划保存
export function planSave(data) {
  return axios({
    url: '/server/data/admin/inspect/plan/save',
    method: 'post',
    data:data
  })
}
//巡河计划发布
export function planPublish(id) {
  return axios({
    url: '/server/data/admin/inspect/plan/publish/'+id,
    method: 'post',
  })
}
//调查点列表
export function inspectPointPage(id) {
  return axios({
    url: '/server/data/admin/inspect/point/page?planId='+id,
    method: 'get',
  })
}
//调查点保存
export function inspectPointSave(data) {
  return axios({
    url: '/server/data/admin/inspect/point/save',
    method: 'post',
    data:data
  })
}
//调查点删除
export function inspectPointDel(id) {
  return axios({
    url: '/server/data/admin/inspect/point/remove/'+id,
    method: 'post',
  })
}
//目标列表
export function targetPage(data) {
  return axios({
    url: '/server/data/admin/inspect/target/page',
    method: 'get',
    params:{
      projectId:'5da7d092ea6c156d792df816',
      planId:data.id,
      teamId:data.teamId
    }
  })
}
//目标保存
export function targetSave(data) {
  return axios({
    url: '/server/data/admin/inspect/target/save',
    method: 'post',
    data:data
  })
}
//目标删除
export function targetDel(id) {
  return axios({
    url: '/server/data/admin/inspect/target/remove/'+id,
    method: 'post',
  })
}
//目标设置分组
export function targetSetTeam(data) {
  return axios({
    url: '/server/data/admin/inspect/target/set/team',
    method: 'post',
    data:data
  })
}
//分组列表
export function groupingPage(id) {
  return axios({
    url: '/server/data/admin/inspect/team/list',
    method: 'get',
    params:{
      projectId:'5da7d092ea6c156d792df816',
      planId:id
    }
  })
}
//分组保存
export function groupingSave(data) {
  return axios({
    url: '/server/data/admin/inspect/team/save',
    method: 'post',
    data:data
  })
}
//分组删除
export function groupingDel(id) {
  return axios({
    url: '/server/data/admin/inspect/team/remove/'+id,
    method: 'post',
  })
}
//巡河任务分页
export function taskInspectPage(data) {
  return axios({
    url: '/server/data/admin/inspect/task/page',
    method: 'get',
    params:{
      projectId:'5da7d092ea6c156d792df816',
      planId:data.id,
      Object:data.Object,
      objectId:data.objectId
    }
  })
}
//巡河人员分页
export function staffInspectPage(id) {
  return axios({
    url: '/server/data/admin/inspect/task/roles?teamId='+id,
    method: 'get',
  })
}
//巡河设备分页
export function deviceInspectPage(id) {
  return axios({
    url: '/server/data/admin/inspect/task/devices?teamId='+id,
    method: 'get',
  })
}
//巡河设备保存
export function equipmentRiverSave(data) {
  return axios({
    url: '/server/data/admin/inspect/device/save',
    method: 'post',
    data:data
  })
}
//巡河成员保存
export function memberRiverSave(data) {
  return axios({
    url: '/server/data/admin/inspect/staff/save',
    method: 'post',
    data:data
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
