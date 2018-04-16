import axios from 'axios'
import {getToken} from './auth.js'
// export default axios.create({
//   baseURL: 'http://localhost:8888/api/private/v1'
// })
const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1'
})

http.interceptors.request.use(function (config) {
  if (config.url !== '/login') {
    config.headers['Authorization'] = getToken()
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

const httpPlugin = {}

httpPlugin.install = function (Vue, options) {
  Vue.prototype.$http = http
}

export default httpPlugin
