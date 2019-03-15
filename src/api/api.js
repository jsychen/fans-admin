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
export const getOrders = page => fetch('/job?page=' + page, {}, 'GET');

// 获取审核列表
export const getAuditItems = () => fetch('/user', {}, 'GET');

/**
 * 注册审核
 * data: audited 0: 不通过  1: 通过
 */
export const auditUser = (id, data) => fetch('/user/' + id, data, 'POST'); 

// 获取实例信息
export const getEcs = () => fetch('/ecs', {}, 'GET');