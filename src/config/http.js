import axios from 'axios';
import store from 'storejs';
import router from '../router'

/* axios全局设置 */
const http = axios.create({
    timeout: 30000,
    responseType: "json",
    withCredentials: false,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    }
});
// request拦截器
http.interceptors.request.use(
   config => {
      let token = store.get('token');
      if (token) {
         // 若token存在则添加request header
         config.headers.Authorization = token;
      }
      return config;
   },
   error => {
      // TODO
      return Promise.reject(error.data.error.message);
   }
);
// response拦截器
http.interceptors.response.use(
   response => {
      return response.data;
   },
   error => {
      let path = router.history.current.path;
      if (error && error.response) {
         switch (error.response.status) {
         case 401:
               error.message = '未授权，请登录';
               store.remove('token');
               router.replace({
                  name: 'login'
               });
               break;
         }
      }
      return Promise.reject(error.response);
   }
);

export default http;
