import fetch from '@/config/fetch';


// 登录
/**
 * 
 * @param {*} data 
 * 
 * phone  password
 * 
 */
export const login = data => fetch('/session', data, 'POST');

// 退出
export const logout = () => fetch('/user', {}, 'DELETE');

// 获取订单记录
export const getOrders = data => fetch('/job', data, 'GET');

// 获取审核列表
export const getAuditItems = () => fetch('/user', {}, 'GET');

/**
 * 注册审核
 * data: audited 0: 不通过  1: 通过
 */
export const auditUser = (id, data) => fetch('/user/' + id, data, 'POST'); 

// 获取实例信息
export const getInstance = data => fetch('/ecs', data, 'GET');

/**
 * 创建实例
 * @param {*} data 
 * 
 * region
 * price
 * number
 * 
 */
export const addInstance = data => fetch('/ecs', data, 'POST');

/**
 * 释放实例
 * data: region instanceId
 * 
 */
export const releaseInstance = (region, instanceId) => fetch('/ecs/' + region + '/' + instanceId, {}, 'DELETE');

/** 获取服务异常实例 */
export const getErrorInstance = () => fetch('/ecs/status?action=t', {}, 'GET');

/** 标记已处理实例 */
export const changeStatus = instanceId => fetch('/ecs/status/' + instanceId, {} ,'PUT');

/**
 * 
 * type  1:已使用  0:未使用
 */
export const getAccount = data => fetch('/account', data, 'GET');

/**
 * 添加账号
 * account, password, phone
 */
export const addAccount = data => fetch('/account', data, 'POST');

/** 编辑账号 */
export const updateAccount = data => fetch('/account', data, 'PUT');

/** 删除帐号 */
export const deleteAccount = (id, type) => fetch('/account/' + id + '?type=' + type, {}, 'DELETE');