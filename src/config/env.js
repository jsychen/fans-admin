
/**
 * 配置开发环境和测试、生产环境之间的接口配置
 *
 * baseUrl: 接口地址
 *
 */
let baseUrl = '';
if (process.env.NODE_ENV === 'development') {
   baseUrl = 'http://192.168.2.175:7000/admin';
} else {
    baseUrl = 'https://mp.evtape.cn/api';
}

export {baseUrl};