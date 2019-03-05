<template>
   <div class="content">
      <div class="part">
         <div class="title"><span>账户信息</span></div>
         <div class="basic">
         <div class="item">
            <label>用户昵称：</label>
            <em>{{username}}</em>
            <span class="icon-edit" @click="beforeUpdateUser"></span>
         </div>
         <div class="item">
            <label>联系手机：</label>
            <em>{{phone}}</em>
         </div>
         </div>
         <div class="balance">
            <p>账户余额：</p>
            <label>￥{{(balance/100).toFixed(2)}}</label>
            <button class="button" type="button" @click="beforeRecharge" >充值</button>
         </div>
      </div>
      <div class="part mT20">
         <div class="title"><span>已购订单</span></div>
         <div class="table">
         <table>
            <tr>
               <th>下单时间</th>
               <th>补充人气时间</th>
               <th>在线人气</th>
               <th>直播房间</th>
               <th>订单价格</th>
               <th>支付方式</th>
               <th>订单状态</th>
               <th>操作</th>
            </tr>
            <tr v-for="item in orders" :key="item.id">
               <td>{{item.createAt}}</td>
               <td>{{item.startTime}} 至 {{item.endTime}}</td>
               <td>{{item.fansNum}}</td>
               <td>{{item.liveUrl}}</td>
               <td>￥{{(item.price/100).toFixed(2)}}</td>
               <td>{{item.payStr}}</td>
               <td>{{item.stateStr}}</td>
               <td>
               <a href="javascript:;" class="blue" @click="showEchart">人气图标</a>
               <a href="javascript:;" class="red" @click="cancelOrder" v-if="item.state === 0">撤销订单</a>
               </td>
            </tr>
         </table>
         </div>
      </div>
      <!-- 充值 -->
      <Modal
      v-model="rechargeModal"
      title="账户充值"
      width="540"
      footer-hide
      >
      <div class="recharge">
         <div class="left">
            <p>支付金额</p>
            <ul>
               <li :class="{'active': item === amount}" v-for="item in rechargeArr" :key="item" @click="getQrcode(item)">{{item}}元</li>
            </ul>
            <p>支付方式</p>
            <p>
               <span class="icon-wechat"></span>
               <em>微信</em>
            </p>
         </div>
         <div class="right">
            <div class="qrcode">
               <img :src="qrcodeStr" v-if="qrcodeStr" alt="支付二维码">
            </div>
            <p class="tip">请打开微信扫码支付</p>
         </div>
      </div>
      </Modal>
      <!-- 人气图标 -->
      <Modal
      v-model="echartModal"
      title="人气图表"
      width="360"
      footer-hide
      >
      <div id="echarts"></div>
      </Modal>
      <!-- 修改用户昵称 -->
      <Modal
      v-model="updateModal"
      title="编辑用户昵称"
      width="300"
      :loading="true"
      @on-ok="doUpdateUser"
      >
      <div class="update">
         <input class="ivu-input ivu-input-default" v-model="newUsername" placeholder="填写2-12个字的中英文昵称" name="username"/>
      </div>
      </Modal>
  </div>
</template>
<script>
let echarts = require("echarts");

import validate from "@/utils/validate";
import {getUserInfo, getJob, updateUser, usePlan} from '@/api/api';

export default {
   data: function() {
      return {
         username: '',
         phone: '',
         balance: 0,
         rechargeModal: false,
         echartModal: false,
         rechargeArr: [200, 500, 2000],
         qrcodeStr: '',
         amount: 200,
         orders: [],
         updateModal: false,
         newUsername: ''
      };
   },
   mounted: function() {
      this.doGetJob();
      this.doGetUserInfo();
   },
   methods: {
      // 获取账户信息
      doGetUserInfo: async function () {
         let res = await getUserInfo();
         if(res.meta.code === 0){
            this.username = res.data.userName;
            this.balance = res.data.balance;
            this.phone = res.data.phone;
            return;
         }
         this.$Message.error(res.meta.message);
      },
      // 获取已购订单列表
      doGetJob: async function () {
         let data = {
            type: 0
         };
         let res = await getJob(data);
         if(res.meta.code === 0){
            this.orders = res.data;
            return;
         }
         this.$Message.error(res.meta.message);
      },
      // 点击编辑图标
      beforeUpdateUser: function () {
         this.newUsername = this.username;
         this.updateModal = true;
      },
      // 编辑用户名
      doUpdateUser: async function () {
         // 验证
         let validatorJson = [
            {
               name: 'username',
               label: '昵称',
               rules: ['required', 'userName']
            }
         ];
         if(!validate(validatorJson)){
            return;
         }
         let data = {
            username: this.newUsername
         }
         let res = await updateUser(data);
         if(res.meta.code === 0){
            this.updateModal = false;
            this.username = res.data;
            this.$store.set('username', res.data);
            return;
         }
         this.$Message.error(res.meta.code);
      },
      // 显示人气图表
      showEchart: function() {
         this.echartModal = true;
         this.initEcharts();
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
      // 撤销订单
      cancelOrder: function() {
         this.$Modal.confirm({
         title: "确认撤销订单吗？",
         content: "",
         onOk: () => {
            console.log("Clicked ok");
         },
         onCancel: () => {
            console.log("Clicked cancel");
         }
         });
      },
      // 点击充值按钮
      beforeRecharge: async function () {
         let data = {
            type: 2,
            totalPrice: this.amount * 100
         };
         let res = await usePlan(data);
         if(res.meta.code === 0){
            this.rechargeModal = true;
            this.qrcodeStr = res.data;
         }
      },
      // 获取支付二维码
      getQrcode: function (amount) {
         this.amount = amount;
         this.beforeRecharge();
      }
   }
};
</script>

