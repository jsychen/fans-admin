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