<template>
  <div class="container">
    <div class="header">
      <img src="../../assets/images/logo.svg" alt="">
      <div class="title">
        <p>粉丝管理平台</p>
        <span>evtape.fans.com</span>
      </div>
      <p>助力直播间人气高涨</p>
      <div class="quit">
        <span class="icon-quit" @click="doLogout"></span>
        <em>{{username}}</em>
      </div>
      <div class="clear"></div>
    </div>
    <!-- 左侧菜单 -->
    <ul class="menu">
      <router-link :to="{name: 'customized'}" tag="li">
        <span class="icon-customized"></span>
        人气定制
      </router-link>
      <router-link :to="{name: 'plan'}" tag="li">
        <span class="icon-plan"></span>
        快捷计划
      </router-link>
      <router-link :to="{name: 'platformPrice'}" tag="li">
        <span class="icon-price"></span>
        平台价格
      </router-link>
      <router-link :to="{name: 'account'}" tag="li">
        <span class="icon-account"></span>
        账户信息
      </router-link>
    </ul>
    <!-- 右侧内容 -->
    <router-view></router-view>
  </div>
</template>
<script>
import {logout} from '@/api/api';

export default {
    data: function () {
        return {
            username: this.$store.get('username')
        }
    },
    methods: {
       doLogout: async function () {
          let res = await logout();
          if(res.meta.code === 0){
             this.$store.remove('token');
             this.$store.remove('username');
             this.$router.push({'name': 'login'});
          }
       }
    }
}
</script>

