<template>
  <div class="container">
    <div class="login">
      <div class="head">
        <img
          src="../../assets/images/logo.svg"
          alt
        >
        <div class="title">
          <p>粉丝管理平台</p>
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
        <p>没有账号， <router-link tag="a" :to="{name: 'register'}" >立即注册</router-link>
        </p>
      </form>
    </div>
  </div>
</template>
<script>
import validate from "@/utils/validate";

import {login, getCode} from '@/api/api';

export default {
    data: function() {
        return {
            phone: '13621371454',
            verification: '1111',
            disabled: false,
            btnStr: '获取验证码'
        };
    },
    methods: {
        // 获取验证码
        getVerificationCode: async function() {
            // 手机号码验证
            let validatorJson = [
                {
                    name: "phone",
                    label: "手机号码",
                    rules: ["required", "phoneNumber"]
                }
            ];
            if(!validate(validatorJson)){
                return;
            }
            let data = {
                phone: this.phone
            };
            
            let res = await getCode(data);
            let message = res.meta.message;
            if (res.meta.code !== 0) {
                this.$Message.error(message);
            } else {
                this.$Message.success(message);
                this.verification = res.data;
                //倒计时
                let count = 120;
                let timer;
                let self = this;
                (function countDown() {
                    if (count >= 0) {
                        self.btnStr = "重新发送 " + count;
                        count--;
                        self.disabled = true;
                        timer = setTimeout(countDown, 1000);
                    } else {
                        clearTimeout(timer);
                        self.btnStr = "重新发送";
                        self.disabled = false;
                    }
                })();
            }
        },
        // 登录
        doLogin: async function () {
            // 验证
            let validatorJson = [
                {
                    name: "phone",
                    label: "手机号码",
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
                phone: this.phone,
                verification: this.verification,
            }
            let res = await login(data);
            if(res.meta.code === 0){
                let data = res.data;
                this.$store.set('token', data.token);
                this.$store.set('username', data.username);
                this.$router.push({'name': 'customized'});
                return;
            }
            this.$Message.error(res.meta.message);
        }
    }    
};
</script>