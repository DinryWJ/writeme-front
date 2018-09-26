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
/*主页个性推荐文章*/
const getMyRecommentArticleList = (userId, pageNum, pageSize) => post('/article/getMyRecommentArticleList', userId, pageNum, pageSize)
/*发布文章*/
const publish = (token, title, content, preview, coverImg, corpusId) => post('/article/publish', token, title, content, preview, coverImg, corpusId)
/*重新发布文章*/
const republish = (token, articleId, title, content, preview, coverImg, corpusId) => post('/article/republish', token, articleId, title, content, preview, coverImg, corpusId)
/*新增保存文章*/
const saveArticle = (token, title, content, corpusId) => post('/article/saveArticle', token, title, content, corpusId)
/*更新保存文章*/
const updateArticle = (token, articleId, title, content, corpusId) => post('/article/updateArticle', token, articleId, title, content, corpusId)
/*删除文章*/
const deleteArticle = (token, articleId) => post('/article/deleteArticle', token, articleId)
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
/*通过token获取用户信息*/
const getUserByToken = (token) => post('/user/getUserByToken', token)
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
/*获取未读评论消息 */
const getCommentList = (userId, pageNum, pageSize) => post('/comment/getCommentList', userId, pageNum, pageSize)
/*获取未读关注消息 */
const getNoReadConcernList = (token) => post('/concern/getNoReadConcernList', token)
/*获取未读点赞消息 */
const getLikeList = (token) => post('/article_click/getNoReadlikeList', token)
/*获取我的推荐用户*/
const getMyRecommentUserList = (token, pageNum, pageSize) => post('/user/getMyRecommentUserList', token, pageNum, pageSize)
/*获取我的消息*/
const getUserMessageList = (token, status) => post('/message/getUserMessageList', token, status)
/*获取聊天记录*/
const getMessageRecord = (token,guestId) => post('/message/getMessageRecord',token,guestId)
/*管理员-模糊搜索用户*/
const getUserListByCondition = (name, flag, status, pageNum, pageSize) => post('/user/selectUserListByName', name, flag, status, pageNum, pageSize);
/*管理员-用户封禁管理*/
const userManage = (token, currentId, status) => post('/manage/userManage', token, currentId, status);
/*管理员-文章模糊搜索*/
const getArticleListByCondition = (value, flag, status, pageNum, pageSize) => post('/article/getArticleListByCondition', value, flag, status, pageNum, pageSize);
/*管理员-文章封禁解封管理*/
const articleManage = (token, articleId, status) => post('/manage/articleManage', token, articleId, status)
/*管理员-文章审核*/
const articlePassInfo = (token, articleId, status, msg) => post('/manage/articlePassInfo', token, articleId, status, msg)
export default {
  login,
  register,
  getMyRecommentArticleList,
  publish,
  republish,
  saveArticle,
  updateArticle,
  deleteArticle,
  nolikeArticle,
  likeArticle,
  getStarStatus,
  uploadImg,
  getArticleById,
  getUserInfoById,
  getUserByToken,
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
  getCommentList,
  getNoReadConcernList,
  getLikeList,
  getMyRecommentUserList,
  getUserMessageList,
  getMessageRecord,
  getUserListByCondition,
  userManage,
  getArticleListByCondition,
  articleManage,
  articlePassInfo
}