<template>
  <div class="container">
    <div class="login">
      <div class="head">
        <img src="../../assets/images/logo.svg" alt="">
        <div class="title">
          <p>粉丝管理平台</p>
          <span>evtape.fans.com</span>
        </div>
      </div>
      <form id="myForm">
        <div class="item">
          <span class="icon-user"></span>
          <input type="text" placeholder="填写2-12个字的中英文昵称" name="username" v-model="username">
        </div>
        <div class="item">
          <span class="icon-phone"></span>
          <input type="text" placeholder="填写11位手机号码" name="phone" v-model="phone">
        </div>
        <div class="code">
          <div class="item">
            <span class="icon-verification"></span>
            <input type="text" placeholder="输入短信收到的验证码" name="verification" v-model="verification">
          </div>
          <button class="button" type="button" :disabled="disabled" @click="getVerificationCode">{{btnStr}}</button>
        </div>
        <div class="item">
          <span class="icon-inviter"></span>
          <input type="text" placeholder="请填写邀请人的名字" name="inviter" v-model="inviter">
        </div>
        <button class="button" type="button" @click="doRegist">注册并等待审核</button>
        <p>审核完成后会发送短信通知，请注意查看</p>
        <p>已有账号，<router-link tag="a" :to="{name: 'login'}">返回登录</router-link></p>
      </form>
    </div>
  </div>
</template>
<script>
import validate from "@/utils/validate";
import {register, getCode} from '@/api/api';

export default {
    data: function() {
        return {
            phone: '13621371454',
            username: 'jsychen',
            verification: '1234',
            inviter: 'jsy',
            disabled: false,
            btnStr: '获取验证码'
        };
    },
    methods: {
        // 获取验证码
        getVerificationCode: async function() {
            let self = this;
            let phone = this.phone;
            let data = {};

            // 手机号码验证
            let validatorJson = [
                {
                    name: "phone",
                    label: "手机号码",
                    rules: ['required', 'phoneNumber']
                }
            ];
            if(!validate(validatorJson)){
                return;
            }

            data = {
                phone: phone
            };
            let res = await getCode(data);
            let message = res.meta.message;
            if (res.meta.code !== 0) {
                this.$Message.error(message);
            } else {
               this.verification = res.data;
               this.$Message.success(message);
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
        // 注册
        doRegist: async function () {
            // 验证
            let validatorJson = [
                {
                    name: 'username',
                    label: '昵称',
                    rules: ['required', 'userName']
                },
                {
                    name: "phone",
                    label: "手机号码",
                    rules: ['required', 'phoneNumber']
                },
                {
                    name: 'verification',
                    label: '验证码',
                    rules: ['required', 'verification']
                },
                {
                    name: 'inviter',
                    label: '邀请人',
                    rules: ['required']
                }
            ];
            if(!validate(validatorJson)){
                return;
            }
            let data = {
                phone: this.phone,
                username: this.username,
                verification: this.verification,
                inviter: this.inviter
            }
            let res = await register(data);
            if(res.meta.code === 0){
                this.$Message.success('注册成功');
                setTimeout( () => {
                    this.$router.push({'name': 'login'});
                }, 2000);
                return;
            }
            this.$Message.error(res.meta.message);
        }
    }
};
</script>