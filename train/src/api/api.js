import http from '../api/http.js'

export default {
  /* 登录 */
  login: data => http.post('/api/index/login', data),
  /* 厂房列表 */
  getFactory: data => http.post('/api/index/get_factory', data),
  /* 模型列表 */
  modelList: data => http.post('/api/index/model_list', data),
  /* 模型详情 */
  modelDetail: data => http.post('/api/index/model_detail', data),

  /* 机器列表 */
  machineList: data => http.post('/api/index/machine_list', data),
  /* 机器详情 */
  machineDetail: data => http.post('/api/index/machine_detail', data),

  /* 获取组合位置人的图片 */
  getPeoplePicture: data => http.post('/api/index/get_people_picture', data),
  /* 添加任务 */
  addTask: data => http.post('/api/index/add_task', data),
  /* 任务列表 */
  taskList: data => http.post('/api/index/task_list', data),
  /* 删除任务 */
  delTask: data => http.post('/api/index/del_task', data),
  /* 任务详情 */
  taskDetail: data => http.post('/api/index/task_detail', data),

  /* 获取部位详情 */
  machinePartsDetail: data => http.post('/api/index/machine_parts_detail', data),
  /* 获取评分标准 */
  getStandard: data => http.post('/api/index/get_standard', data),

  /* 示列接口 */
  uploadFile1: data => http.post('/index/User/uploadFile', data)
}
