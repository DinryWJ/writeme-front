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

/*登陆*/
const login = (name, pass) => post('/login/login', name, pass)
/*注册*/
const register = (parameters) => post('/user/register', parameters)
/*发布文章*/
const publish = (token, title, content, preview, coverImg, corpusId) => post('/article/publish', token, title, content, preview, coverImg, corpusId)
/*重新发布文章*/
const republish = (token, articleId, title, content, preview, coverImg, corpusId) => post('/article/republish', token, articleId, title, content, preview, coverImg, corpusId)
/*新增保存文章*/
const saveArticle = (token, title, content, corpusId) => post('/article/saveArticle', token, title, content, corpusId)
/*更新保存文章*/
const updateArticle = (token, articleId, title, content, corpusId) => post('/article/updateArticle', token, articleId, title, content, corpusId)
/*点赞文章*/
const likeArticle = (token, articleId) => post('/articleClick/like', token, articleId)
/*取消点赞文章*/
const nolikeArticle = (token, articleId) => post('/articleClick/nolike', token, articleId)
/*点赞状态*/
const getStarStatus = (token, articleId) => post('/articleClick/judge', token, articleId)
/*上传图片*/
const uploadImg = (file) => post2('/upload/upload', file)
/*通过id获取文章信息*/
const getArticleById = (articleId) => post('/article/getArticleById', articleId)
/*通过Id获取用户信息*/
const getUserInfoById = (userId) => post('/user/getUserInfoById', userId)
/*通过status获取用户文章列表*/
const getArticleListByUserId = (userId, status, pageNum, pageSize) => post('/article/getArticleListByUserId', userId, status, pageNum, pageSize);
/*通过token获取id信息*/
const getUserIdByToken = (token) => post('/user/getUserIdByToken', token)
/*发送评论*/
const addComment = (token, comment) => post2('/comment/addComment?token=' + token, comment)
/*获取文章评论*/
const getArticleComment = (articleId, pageNum, pageSize) => post('/comment/getArticleComment', articleId, pageNum, pageSize)
/*获取用户粉丝数*/
const getUserFansCount = (userId) => post('/concern/getUserFansCount', userId)
/*获取用户关注数*/
const getUserConcernCount = (userId) => post('/concern/getUserConcernCount', userId)
/*获取关注状态*/
const getConcernStatus = (token, concernedUserId) => post('/concern/getConcernStatus', token, concernedUserId)
/*关注*/
const addConcern = (token, concernedUserId) => post('/concern/addConcern', token, concernedUserId)
/*取消关注*/
const deleteConcern = (token, concernedUserId) => post('/concern/deleteConcern', token, concernedUserId)
/*获取用户关注人列表*/
const getUserConcernList = (userId, pageNum, pageSize) => post('/concern/getUserConcernList', userId, pageNum, pageSize)
/*获取用户粉丝列表*/
const getUserFansList = (userId, pageNum, pageSize) => post('/concern/getUserFansList', userId, pageNum, pageSize)
/*获取我的推荐用户*/
const getMyRecommentUserList = (token, pageNum, pageSize) => post('/user/getMyRecommentUserList', token, pageNum, pageSize)
/*管理员-模糊搜索用户*/
const getUserListByCondition = (name, flag, pageNum, pageSize) => post('/user/selectUserListByName', name, flag, pageNum, pageSize);
/*管理员-模糊搜索用户*/
const getArticleListByCondition = (value, flag, status, pageNum, pageSize) => post('/article/getArticleListByCondition', value, flag, status, pageNum, pageSize);
export default {
  login,
  register,
  publish,
  republish,
  saveArticle,
  updateArticle,
  nolikeArticle,
  likeArticle,
  getStarStatus,
  uploadImg,
  getArticleById,
  getUserInfoById,
  getArticleListByUserId,
  getUserIdByToken,
  addComment,
  getArticleComment,
  getUserFansCount,
  getUserConcernCount,
  getConcernStatus,
  addConcern,
  deleteConcern,
  getUserConcernList,
  getUserFansList,
  getMyRecommentUserList,
  getUserListByCondition,
  getArticleListByCondition
}