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
          <input type="text" placeholder="填写11位手机号码" v-model="phone" name="phone">
        </div>
        <div class="code">
          <div class="item">
            <span class="icon-verification"></span>
            <input
              type="text"
              placeholder="输入短信收到的验证码"
              v-model="verification"
              name="verification"
            >
          </div>
          <button class="button" type="button" :disabled="disabled" @click="getVerificationCode">{{btnStr}}</button>
        </div>
        <button class="button" type="button" @click="doLogin">立即登录</button>
      </form>
    </div>
  </div>
</template>
<script>
import validate from "@/utils/validate";

import {} from '@/api/api';

export default {
    data: function() {
        return {
            phone: '13621371454',
            verification: '',
            disabled: false,
            btnStr: '获取验证码'
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
               name: 'verification',
               label: '验证码',
               rules: ['required', 'verification']
            }
         ];
         if(!validate(validatorJson)){
               return;
         }
         let data = {
               phone: this.phone
         };
      }
    }    
};
</script>