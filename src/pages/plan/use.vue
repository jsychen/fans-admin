<template>
   <div class="content">
      <div class="crumbs">
         <router-link :to="{name: 'plan'}">快捷计划</router-link>
         <span> > 使用计划</span>
      </div>
      <div class="part">
         <div class="title">
         <span>使用计划</span>
         </div>
         <div class="part-content">
         <div class="echarts">
            <div id="echarts"></div>
            <p>购买的人气会在服务时间里按规律进入直播间保证平均每小时会有额外500人观看</p>
         </div>
         <div class="orderForm">
            <div class="payMent">
               预计支付金额：<span>￥{{job.totalPrice/100}}</span>
            </div>
            <form>
               <div class="item">
                  <label>补充人气时间：</label>
                  <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" :time-picker-options="{steps: [1, 60]}" v-model="job.startTime" name="startTime"></DatePicker>
                  <i>至</i>
                  <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" :time-picker-options="{steps: [1, 60]}" v-model="job.endTime" name="endTime"></DatePicker>
               </div>
               <div class="item">
                  <label>选购在线人气：</label>
                  <em @click="doReduce">-</em>
                  <input type="number" name="number" v-model="job.number" @change="handleNumberChange">
                  <em @click="doIncrease">+</em>
                  <p>所选时间段共有可用在线人气28888</p>
                  <div class="clear"></div>
               </div>
               <div class="item">
                  <label>直播房间地址：</label>
                  <input type="text" name="liveUrl" v-model="job.liveUrl">
                  <div class="clear"></div>
               </div>
               <div class="item">
                  <label>人气均价：</label>
                  <span>{{job.unitPrice/100}}元 / 个 / 小时</span>
                  <div class="clear"></div>
               </div>
               <div class="formBtn">
                  <button class="red" type="button" @click="doSubmit">
                     <span class="icon-cart"></span>
                     <i>购买人气</i>
                  </button>
               </div>
            </form>
         </div>
         </div>
      </div>
      <!-- 支付订单 -->
      <Modal
         v-model="payModal"
         title="支付订单"
         width="300"
         footer-hide>
         <div class="pay-content">
            <div class="item">
               <label>支付金额：</label>
               <i>{{job.totalPrice/100}}元</i>
            </div>
            <div class="item">
               <label>支付方式：</label>
               <span class="icon-wechat"></span>
               <em>微信</em>
            </div>
            <div class="qrcode">
               <img :src="qrcodeStr" alt="支付二维码">
            </div>
            <p class="tip">请打开微信扫码支付</p>
         </div>
      </Modal>
   </div>
</template>
<script>
let echarts = require("echarts");
import validate from "@/utils/validate";
import {getJobInfo, usePlan, getPrice} from '@/api/api';

export default {
   data: function () {
      return {
         payModal: false,
         job: {},
         id: null,
         qrcodeStr: ''
      }
   },
   mounted: function () {
      this.initEcharts();
      
      this.doGetJobInfo();
   },
   methods: {
      // 获取人气单价
      doGetPrice: async function () {
         let res = await getPrice();
         if(res.meta.code === 0){
            this.job.unitPrice = res.data.price;
            this.handleNumberChange();
         }
      },
      initEcharts: function () {
         // 指定图表的配置项和数据
         let myChart = echarts.init(document.getElementById('echarts'));
         let arr = [0,200,500,100,0];
         let option = {
         color: ['#0ece5b'],
         xAxis: {
            type: 'category',
            data: ['11:00', '12:00', '13:00', '14:00', '15:00'],
            nameTextStyle: {
               color: '#999'
               },
            axisLine: {
            lineStyle: {
               color: '#999'
               }
            },
         },
         grid: {
            top: "20",
            bottom: '30',
            left: '40',
            right: '10'
         },
         yAxis: {
            type: 'value',
            splitLine: { 
               color: '#ccc'
               },
            axisLine: {
               show: false,
               lineStyle: {
                  color: '#999'
               }
            },
            axisTick: {
               show: false
            }
         },
         series: [{
               data: [0, 200, 500, 100, 0],
               type: 'line'
         }]
         };
         // 使用刚指定的配置项和数据显示图表。
         myChart.setOption(option, true);
      },
      // 获取计划详情
      doGetJobInfo: async function () {
         this.id = this.$route.query.id;
         let res = await getJobInfo(this.id);
         if(res.meta.code === 0){
            this.job = res.data;
            let date = new Date();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let dateStr = date.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
            this.job.startTime = dateStr + ' ' + this.job.startTime;
            this.job.endTime = dateStr + ' ' + this.job.endTime;
            this.doGetPrice();
         }
      },
      // 修改人气数
      handleNumberChange: function () {
         let job = this.job;
         job.totalPrice = parseInt(job.unitPrice * job.number);
      },
      // 购买人气
      doSubmit: async function () {
         // 验证
         let validatorJson = [
            {
               name: "startTime",
               label: "开始时间",
               rules: ['required']
            },
            {
               name: 'endTime',
               label: '结束时间',
               rules: ['required']
            },
            {
               name: 'number',
               label: '在线人气',
               rules: ['required']
            },
            {
               name: 'liveUrl',
               label: '直播房间地址',
               rules: ['required', 'platform']
            }
         ];
         if(!validate(validatorJson)){
            return;
         }
         let data = this.job;
         if(typeof data.startTime === 'object'){
            data.startTime = this.dateConversion(data.startTime);
            data.endTime = this.dateConversion(data.endTime);
         }
         
         data.type = 0;

         let res = await usePlan(data);
         if(res.meta.code === 0){
            if(res.data){
               this.qrcodeStr = res.data;
               this.payModal = true;
            } else {
               this.$Message.success('支付成功');
            }
            setTimeout( () => {
               this.$router.push({'name': 'plan'});
            }, 2000);
            return;
         }
         this.$Message.error(res.meta.message);
      },
      // 日期格式转化
      dateConversion: function (date) {
         let year = date.getFullYear();
         let month = date.getMonth() + 1;
         let day = date.getDate();
         let hour = date.getHours();
         return year + '-' + (month<10 ? '0' + month : month) + '-' + (day<10 ? '0' + day : day) + ' ' + (hour<10 ? '0' + hour : hour) + ':00';
      },
      // 减少在线人气
      doReduce: function () {
         if(this.job.number > 0){
            this.job.number--;
            this.handleNumberChange();
         }
      },
      // 增加在线人气
      doIncrease: function () {
         this.job.number++;
         this.handleNumberChange();
      }
   }
}
</script>
