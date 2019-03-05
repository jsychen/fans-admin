import http from './http'
import {baseUrl} from './env'
const timeoutResponse = {
    "meta":  {
        "code":-1,
        "message":"请求服务失败"
    }
  };

export default async (url = '', data = {}, method = 'GET') => {
   method = method.toUpperCase();
   url = baseUrl + url;
   // GET方法
   if( method === 'GET' ) {
      let params = '';
      Object.keys(data).forEach(key => {
         params += key + '=' + data[key] + '&';
      });

      if (params !== '') {
      params = params.substr(0, params.lastIndexOf('&'));
      url = url + '?' + params;
      }

      return await http.get(url)
      .then(response => response)
      .catch(err => {
         return timeoutResponse;
      });
   }
   // PUT和POST方法
   if( method === 'POST' || method === 'PUT' ) {
      return await http({
         method: method,
         url: url,
         data: data,
         // headers: {
         //     'Content-Type': 'application/x-www-form-urlencoded'
         // }
         }).then(response => response)
         .catch(function (err) {
            return timeoutResponse;
      });
   }

   // DELETE方法
   if (method === 'DELETE') {
      return await http.delete(url)
         .then(response => response)
         .catch(function (err) {
         return timeoutResponse;
         });
   }
}
  