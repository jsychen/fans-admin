<template>
   <div class="content">
      <div class="part mT20">
         <div class="title">
            <span>已购订单</span>
            <input type="text" placeholder="用户名"  v-model="userName" @keyup.enter="handleSearch">
            <select @change="stateChange" v-model="currentState">
               <option :value="-1" @click="currentState=-1">请选择</option>
               <option :value="item.state" v-for="item in states" :key="item.state" @click="currentState = item.state">{{item.label}}</option>
            </select>
         </div>
         <div class="table">
            <table>
               <tr>
                  <th>订单金额</th>
                  <th>消费用户</th>
                  <th>下单时间</th>
                  <th>在线人气</th>
                  <th>订单状态</th>
                  <th>操作</th>
               </tr>
               <tr v-for="item in orders" :key="item.id">
                  <td>￥{{item.totalPrice/100}}</td>
                  <td>{{item.userName}}</td>
                  <td>{{item.createDate}}</td>
                  <td>{{item.number}}</td>
                  <td>{{item.stateStr}}</td>
                  <td>
                     <a href="javascript:;" class="blue" @click="showDetail(item)">查看详情</a>
                  </td>
               </tr>
            </table>
            <div class="null" v-if="totalPage === 0">暂无数据</div>
            <div class="page" v-if="totalPage">
                <my-page :totalPage="totalPage" @page="paging"></my-page>
            </div>
         </div>
      </div>
      <!-- 订单详情 -->
      <Modal
      v-model="detailMadal"
      title="人气图表"
      width="440"
      footer-hide
      >
      <div class="detail">
         <div class="item">
            <label>补充人气时间：</label>
            <span>{{current.startTime}}</span>
            <i>至</i>
            <span>{{current.endTime}}</span>
         </div>
         <div class="item">
            <label>人气定制数：</label>
            <span>{{current.number}}</span>
         </div>
         <div class="item">
            <label>直播房间地址：</label>
            <span>{{current.liveUrl}}</span>
         </div>
         <div class="item">
            <label>支付方式：</label>
            <span>{{current.payStr}}</span>
         </div>
         <div class="item" v-if="current.state === 2">
            <label>执行情况：</label>
            <span>已登录：{{current.executeInNum}}</span>
            <span style="margin-left: 10px;">未登录：{{current.executeOutNum}}</span>
         </div>
      </div>
      </Modal>
   </div>
</template>
<script>
import myPage from '@/components/paging';
import {getOrders} from '@/api/api';
export default {
   components: {
      myPage: myPage,
   },
   data: function () {
      return {
         orders: [],
         detailMadal: false,
         current: {},
         page: 1,
         totalPage: 1,
         userName: '',
         states: [
            { state: 0, label: '待进入服务' },
            { state: 1, label: '服务中' },
            { state: 2, label: '已完成' },
            { state: 3, label: '失败' },
            { state: 4, label: '退款' },
         ],
         currentState: -1
      }
   },
   mounted: function () {
      this.doGetOrders();
   },
   methods: {
      // 获取订单记录
      doGetOrders: async function(){
         let data = {
            page: this.page
         };
         if( this.currentState !== -1 ){
            data.state = this.currentState;
         }
         if(this.userName){
            data.userName = this.userName;
         }
         this.$Spin.show({
            render: (h) => {
               return h('div', [
                  h('div', '加载中...')
               ])
            }
         });
         let res = await getOrders(data);
         this.$Spin.hide();
         if(res.meta.code === 0){
            this.orders = res.data.jobs;
            this.totalPage = res.data.totalPage;
            return;
         }
         this.$Message.error(res.meta.message);
      },
      // 查看详情
      showDetail: function(item){
         this.current = item;
         this.detailMadal = true;
      },
      // 翻页
      paging: function(page){
         this.page = page;
         this.doGetOrders();
      },
      // 查询
      handleSearch: function () {
         this.page = 1;
         this.doGetOrders();
      },
      // 切换订单状态进行筛选
      stateChange: function () {
         this.doGetOrders();
      }
   }
}
</script>