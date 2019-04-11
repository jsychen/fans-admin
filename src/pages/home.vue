<template>
  <div class="container">
     <div class="header">
         <div class="inner">
            <img src="../assets/images/logo.svg" alt="">
         <p>粉丝管理后台</p>
            <ul>
               <router-link :to="{name: 'index'}" tag='li' v-if="role === 1">订单记录</router-link>
               <router-link :to="{name: 'audit'}" tag='li' v-if="role === 1">注册审核</router-link>
               <router-link :to="{name: 'server'}" tag='li' v-if="role === 1">实例管理</router-link>
               <router-link :to="{name: 'monitor'}" tag='li'>实例监控</router-link>
               <router-link :to="{name: 'account'}" tag='li' v-if="role === 1">帐号管理</router-link>
            </ul>
            <div class="quit">
            <span class="icon-quit" @click="doLogout"></span>
            <em>{{userName}}</em>
         </div>
      </div>
   </div>
    <router-view/>
  </div>
</template>
<script>
import {logout} from '@/api/api';

export default {
   data: function () {
      return {
         userName: '',
         role: 2
      }
   },
   mounted: function(){
      this.userName = this.$store.get('userName');
      this.role = this.$store.get('role');
   },
   methods: {
      doLogout: function () {
         this.$store.remove('token');
         this.$store.remove('userName');
         this.$router.push({'name': 'login'});
      }
   }
}
</script>
