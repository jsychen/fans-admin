<template>
  <div class="content">
      <div class="part">
         <div class="title">
            <span>创建机器</span>
         </div>
         <div class="server">
            <div class="left">
               <p>机器当前价格：</p>
               <div>
                  <span>￥100/台</span>
                  <button class="button">创建机器</button>
               </div>
            </div>
            <div class="left">
               <p>上次创建总数 100台</p>
               <p>已经创建总数 56台</p>
            </div>
         </div>
      </div>
      <div class="part mT20">
         <div class="title"><span>机器列表</span></div>
         <div class="tabs">
            <span v-for="(item, index) in areas" :key="index">{{item.label}}</span>
            <div class="filter">
               <em>全部</em>
               <em>已登录</em>
               <em>未登录</em>
            </div>
            <select>
               <option value="">全部</option>
               <option value="" v-for="(item, index) in areas" :key="index">{{item.label}}</option>
            </select>
            <div class="clear"></div>
         </div>
         <div class="table">
            <table>
               <tr>
                  <th>地域</th>
                  <th>实例ID</th>
                  <th>实例名称</th>
                  <th>实例规格</th>
                  <th>主机名</th>
                  <th>公网IP</th>
                  <th>内网IP</th>
                  <th>交换机</th>
                  <th>登录状态</th>
               </tr>
               <tr v-for="item in orders" :key="item.id">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
               </tr>
            </table>
            <div class="null" v-if="totalPage === 0">暂无数据</div>
            <div class="page" v-if="totalPage">
                <my-page :totalPage="totalPage" @page="paging"></my-page>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import {logout} from '@/api/api';

export default {
   data: function () {
      return {
         userName: '',
         areas: [
            {label: '北京'},
            {label: '上海'}
         ]
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
