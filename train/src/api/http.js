import axios from 'axios'
import qs from 'qs'
import router from '@/router/index.js'
import baseUrl from '@/api/setBaseUrl'
import { Loading, Message } from 'element-ui'

let loadinginstace

/* axios 请求拦截器 */
axios.interceptors.request.use(config => { // 这里面写每次请求的配置内容
  // 判断Storage中是否存在token
  // if (localStorage.getItem('token')) {
  //   // 将token放在请求的头部
  //   config.headers.token = `${localStorage.getItem('token')}`
  // }
  loadinginstace = Loading.service({ fullscreen: true }) // 打开loading
  return config
}, err => {
  Message.error({
    message: '网络出错',
    onClose: function () {
      // router.push({ name: 'error-404' })
      console.log('请求失败时的打印')
    }
  })
  return Promise.reject(err)
})

/* axios 响应拦截器 */
axios.interceptors.response.use(response => {
  loadinginstace.close() // 成功响应时关闭loading
  return response
}, error => {
  // Message.error({
  //   message: '网络出错',
  //   onClose: function () {
  //     loadinginstace.close()
  //     // router.push({ name: 'error-404' })
  //   }
  // })
  loadinginstace.close()
  return Promise.resolve(error.response)
})

/* 状态码的代表 默认为response */
function statusCode (response) {
  switch (response.status) {
    case 401:
      Message.error({
        message: '未授权，请登录',
        onClose: function () {
          // router.push({ name: 'error-404' })
          // 处理方法
        }
      })
      break
    case 403:
      Message.error({
        message: '拒绝访问',
        onClose: function () {
          // router.push({ name: 'error-404' })
          // 处理方法
        }
      })
      break
    case 404:
      Message.error({
        message: '请求地址出错',
        onClose: function () {
          // router.push({ name: 'error-404' })
          // 处理方法
        }
      })
      break
    case 408:
      Message.error({
        message: '请求超时',
        onClose: function () {
          // router.push({ name: 'error-404' })
          // 处理方法
        }
      })
      break
    case 500:
      Message.error({
        message: '服务器内部错误',
        onClose: function () {
          // router.push({ name: 'error-404' })
          // 处理方法
        }
      })
      break
    default:
      return response
  }
}

/* 统一捕获正确和错误的状态码 */
function checkStatus (response) {
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    // 0是失败 1是成功 -1需要登陆
    if (response.data.ret === 0 || response.data.ret === -2 || response.data.ret === -3 || response.data.ret === -4) { // 如果返回成功，数据错误的处理
      Message({
        type: 'warning',
        message: response.data.msg
      })
      return response
    } else if (response.data.ret === 401) {
      // 返回需要登陆的提示，然后执行的方法
      Message({
        type: 'error',
        message: '登陆失效',
        onClose: function () {
          console.log('这里是返回成功，登陆失效的处理')
        }
      })
      localStorage.removeItem('token')
      router.push({ name: 'login' })
    } else {
      return response
    }
  } else {
    return statusCode(response) // 异常状态，执行statusCode方法
  }
}

/* 检查完状态码后如果成功了就需要检查后端的状态码处理网络正常时后台语言返回的响应 */
function checkCode (res) {
  // Code异常
  if (res.data && (res.data.status !== 200)) {
    return statusCode(res)
  }
  return res
}

// 请求方式
export default {
  // post
  post (url, data) {
    return axios({
      method: 'post',
      baseURL: baseUrl,
      url,
      data: qs.stringify(data),
      timeout: 5000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        // console.log('第一次检测')
        // console.log(response.data)
        return checkStatus(response)
      }
    ).then(
      (res) => {
        // console.log('第二次检测')
        // console.log(res)
        return checkCode(res)
      }
    )
  },
  // get
  get (url, params) {
    return axios({
      method: 'get',
      baseURL: baseUrl,
      url,
      params, // get 请求带的参数
      timeout: 5000
    }).then(
      (response) => {
        // console.log('第一次检测')
        // console.log(response.data)
        return checkStatus(response)
      }
    ).then(
      (res) => {
        // console.log('第二次检测')
        // console.log(res)
        return checkCode(res)
      }
    )
  }
}
