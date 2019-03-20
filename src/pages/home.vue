<template>
  <div class="container">
     <div class="header">
         <div class="inner">
            <img src="../assets/images/logo.svg" alt="">
         <p>粉丝管理后台</p>
            <ul>
               <router-link :to="{name: 'index'}" tag='li'>订单记录</router-link>
               <router-link :to="{name: 'audit'}" tag='li'>注册审核</router-link>
               <router-link :to="{name: 'servers'}" tag='li'>实例管理</router-link>
               <!-- <router-link :to="{name: 'servers'}" tag='li'>实例状态</router-link> -->
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
         userName: ''
      }
   },
   mounted: function(){
      this.userName = this.$store.get('userName');
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
