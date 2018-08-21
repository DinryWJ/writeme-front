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

/*更新宣教信息*/
const updateMission = (token, mission) => post2('/mission/updateMission?token=' + token, mission)

/*登陆*/
const login =(name,pass) => post('/login/login',name,pass)
/*注册*/
const register = (parameters) =>post('/user/register',parameters)
/*发布文章*/
const publish = (token,title,content,corpusId) =>post('/article/addArticle',token,title,content,corpusId)
export default {
  getMissionListByClassify,

  updateMission,

  login,
  register,
  publish
}
