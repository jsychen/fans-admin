import fetch from '@/config/fetch';

// 获取验证码
export const getCode = data => fetch('/sms/verification', data, 'GET');

// 注册
export const register = data => fetch('/register', data, 'POST');

// 登录
export const login = data => fetch('/session', data, 'POST');

// 退出
export const logout = () => fetch('/user', {}, 'DELETE');

// 获取任务列表
/**
 * 
 * @param {type} 
 * 
 * type 0:已购订单  1:计划
 * 
 */
export const getJob = data => fetch('/job', data, 'GET');

// 获取用户信息
export const getUserInfo = () => fetch('/user', {}, 'GET');

// 修改用户名
export const updateUser = data => fetch('/user', data, 'PUT');

// 获取服务器加个
export const getPrice = () => fetch('/spot', {}, 'GET');

/**
 * 新建计划
 * @param {*}  
 * {
  "endTime": "string",
  "jobName": "string",
  "jobNo": "string",
  "liveUrl": "string",
  "number": 0,
  "startTime": "string",
  "totalPrice": 0,
  "unitPrice": 0
}
 */
export const addPlan = data => fetch('/job', data, 'POST');

// 删除计划
export const deletePlan = id => fetch('/job/' + id, {}, 'DELETE');

// 获取计划详情
export const getJobInfo = id => fetch('/job/' + id, {}, 'GET');

// 编辑计划
export const updatePlan = (id, data) => fetch('/job/' + id, data, 'PUT');

// 使用计划
/**
 * 
 * @param {*} data 
 * type:  0: 使用计划和人气定制   2：账户充值  
 */
export const usePlan = data => fetch('/payment', data, 'POST');