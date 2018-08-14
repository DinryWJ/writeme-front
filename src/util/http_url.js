import axios from 'axios'
import {
  Message
} from 'element-ui'
import {
  objBase,
  modelBase
} from './config'

const errorMsg = '服务器内部错误'
const errorMsg401 = '登录超时，请重新登录'
const errorFn = err => {
  console.log(err.response.status)
  let status = err.response.status
  if (status == 500) {
    Message.error(errorMsg)
  }
  if (status == 401) {
    Message.error(errorMsg401)
  }
  return err
}
const codeerror = d => {
  if (d.data != null && d.data.code == 401) {
    Message.error(d.data.msg)
  }
  return d
}
/*const imgpost = (_url, obj) => axios({
  
  method: 'post',
  url: url + _url,
  data: obj,
  headers: {
    "Accept": "application/json;charset=utf-8",
    "Content-Type": undefined
  },
  processData: false,
  contentType: false
}).then(codeerror).catch(errorFn)*/
const post = (_url, obj) => axios.post(_url, obj, objBase).then(codeerror).catch(errorFn)
const post2 = (_url, body) => axios.post(_url, body, modelBase).then(codeerror).catch(errorFn)

/*通过标签获取宣教列表*/
const getMissionListByClassify = (fristClassify, secondClassify, pageNo, pageSize) => post('/mission/getMissionListByClassify', fristClassify, secondClassify, pageNo, pageSize)
/*获取微信config配置*/
const getWxConfig = (hospitalId, url) => post('/weixinsdk/getConfig', hospitalId, url)
/*获取OpenId*/
const getOpenId = (hospitalId, code) => post('/weiXinLogin/getOpenId', hospitalId, code)
/*根据id获取宣教详情*/
const getMissionById = (missionId, token) => post('/mission/getMissionById', missionId, token)
/*添加宣教订单或收藏*/
const addUserMission = (token, userMission) => post2('/userMission/addUserMission?token=' + token, userMission)
/*统一支付下订单*/
const topay = (orderId, type,payType,openid,token,hospitalId) => post('/onlinePayment/topay', orderId, type,payType,openid,token,hospitalId)
/*获取分类标签*/
const getClassifyByType = (frist,type) => post('/classify/getClassifyByType',frist,type)
/*新增宣教*/
const addMission = (token, mission) => post2('/mission/addMissionUseClassify?token=' + token, mission)
/*撤回宣教*/
const withdrawMissionListByIdList = (idList) => post('/mission/withdrawMissionListByIdList',idList)
/*重新发布宣教*/
const releaseMissionListByIdList = (idList) => post('/mission/releaseMissionListByIdList',idList)
/*后台分页获取宣教列表*/
const getMissionListByClassifyOfBackStage = (fristClassify, secondClassify, pageNo, pageSize) => post('/mission/getMissionListByClassifyOfBackStage', fristClassify, secondClassify, pageNo, pageSize)
/*通过id删除宣教*/
const deleteMissionListByIdList = (idList) => post('/mission/deleteMissionListByIdList',idList)
/*更新宣教信息*/
const updateMission = (token, mission) => post2('/mission/updateMission?token=' + token, mission)
export default {
  getMissionListByClassify,
  getWxConfig,
  getOpenId,
  getMissionById,
  addUserMission,
  topay,
  getClassifyByType,
  addMission,
  withdrawMissionListByIdList,
  releaseMissionListByIdList,
  getMissionListByClassifyOfBackStage,
  deleteMissionListByIdList,
  updateMission
}
