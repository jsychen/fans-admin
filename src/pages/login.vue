<template>
  <div class="container">
    <div class="login">
      <div class="head">
        <img
          src="../assets/images/logo.svg"
          alt
        >
        <div class="title">
          <p>粉丝管理后台</p>
          <span>evtape.fans.com</span>
        </div>
      </div>
      <form id="myForm">
        <div class="item">
          <span class="icon-phone"></span>
          <input type="text" placeholder="填写11位手机号码" autocomplete="off" v-model.trim="phone" name="phone">
        </div>
        <div class="item">
          <span class="icon-verification"></span>
          <input type="password" placeholder="请输入密码" disableautocomplete v-model.trim="password" name="password" autocomplete="new-password">
        </div>
        <button class="button" type="button" @click="doLogin">立即登录</button>
      </form>
    </div>
  </div>
</template>
<script>
import validate from "@/utils/validate";

import {login} from '@/api/api';

export default {
    data: function() {
        return {
            phone: '13621371454',
            password: 'livefan2019',
        };
    },
    mounted: function(){
    },
    methods: {
      // 登录
      doLogin: async function () {
         // 手机号码验证
         let validatorJson = [
            {
               name: 'phone',
               label: '手机号码',
               rules: ['required', 'phoneNumber']
            },
            {
               name: 'password',
               label: '密码',
               rules: ['required']
            }
         ];
         if(!validate(validatorJson)){
               return;
         }
         let data = {
               phone: this.phone,
               password: this.password
         };
         let res = await login(data);
         if(res.meta.code === 0){
            this.$store.set('token', res.data.token);
            this.$store.set('userName', res.data.name);
            this.$router.push({'name': 'index'});
            this.$Message.success('登录成功');
            return;
         }
         this.$Message.error(res.meta.$Message);
      }
    }    
};
</script>