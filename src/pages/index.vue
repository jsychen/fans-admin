<template>
   <div class="content">
      <div class="part mT20">
         <div class="title">
            <span>已购订单</span>
            <input type="text" placeholder="用户名"  v-model="userName" @keyup.enter="handleSearch">
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
      width="360"
      footer-hide
      >
      <div id="echarts"></div>
      <div class="detail">
         <div class="item">
            <label>补充人气时间：</label>
            <span>{{current.startTime}}</span>
            <i>至</i>
            <span>{{current.endTime}}</span>
         </div>
         <div class="item">
            <label>直播房间地址：</label>
            <span>{{current.liveUrl}}</span>
         </div>
         <div class="item">
            <label>支付方式：</label>
            <span>{{current.payStr}}</span>
         </div>
      </div>
      </Modal>
   </div>
</template>
<script>
let echarts = require("echarts");

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
         userName: ''
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
         if(this.userName){
            data.userName = this.userName;
         }
         let res = await getOrders(data);
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
         // this.initEcharts();
      },
      // 初始化图表
      initEcharts: function() {
         // 指定图表的配置项和数据
         let myChart = echarts.init(document.getElementById("echarts"));
         let arr = [0, 200, 500, 100, 0];
         let option = {
         color: ["#0ece5b"],
         xAxis: {
            type: "category",
            data: ["11:00", "12:00", "13:00", "14:00", "15:00"],
            nameTextStyle: {
               color: "#999"
            },
            axisLine: {
               lineStyle: {
               color: "#999"
               }
            }
         },
         grid: {
            top: "20",
            bottom: "30",
            left: "40",
            right: "10"
         },
         yAxis: {
            type: "value",
            splitLine: {
               color: "#ccc"
            },
            axisLine: {
               show: false,
               lineStyle: {
               color: "#999"
               }
            },
            axisTick: {
               show: false
            }
         },
         series: [
            {
               data: [0, 200, 500, 100, 0],
               type: "line"
            }
         ]
         };
         // 使用刚指定的配置项和数据显示图表。
         myChart.setOption(option, true);
      },
      // 翻页
      paging: function(page){
         this.page = page;
      },
      // 查询
      handleSearch: function () {
         this.page = 1;
         this.doGetOrders();
      }
   }
}
</script>