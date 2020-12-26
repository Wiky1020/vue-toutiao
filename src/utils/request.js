/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store/index'
var jsonBig = require('json-bigint')
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config // 必须写返回值
}, function (err) {
  // 处理错误信息
  return Promise.reject(err)
})

export default request
