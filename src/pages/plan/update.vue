<template>
   <div class="content">
      <div class="crumbs">
         <router-link :to="{name: 'plan'}">快捷计划</router-link>
         <span> > 编辑计划</span>
      </div>
      <div class="part">
         <div class="title">
         <span>编辑计划</span>
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
                  <label>计划名称：</label>
                  <input type="text" placeholder="计划一" name="jobName" v-model="job.jobName">
               </div>
               <div class="item">
                  <label>补充人气时间：</label>
                  <TimePicker type="time" format="HH:mm" placeholder="选择时间" :steps="[1, 60]" name="startTime" v-model="job.startTime"></TimePicker>
                  <i>至</i>
                  <TimePicker type="time" format="HH:mm" placeholder="选择时间" :steps="[1, 60]" name="endTime" v-model="job.endTime"></TimePicker>
                  <div class="clear"></div>
               </div>
               <div class="item">
                  <label>选购在线人气：</label>
                  <em>-</em>
                  <input type="number" name="number" v-model="job.number" @change="handleNumberChange">
                  <em>+</em>
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
                  <button class="blue" type="button" @click="doUpdatePlan">编辑计划</button>
               </div>
            </form>
         </div>
         </div>
      </div>
  </div>
</template>
<script>
let echarts = require("echarts");
import validate from "@/utils/validate";
import {getJobInfo, updatePlan} from '@/api/api';

export default {
   data: function () {
      return {
         payModal: true,
         job: {},
         id: null
      }
   },
   mounted: function () {
      this.initEcharts();
      
      this.doGetJobInfo();
   },
   methods: {
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
         }
      },
      // 编辑计划
      doUpdatePlan: async function () {
         // 验证
         let validatorJson = [
            {
               name: 'jobName',
               label: '计划名称',
               rules: ['required']
            },
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
         let res = await updatePlan(this.id, this.job);
         if(res.meta.code === 0){
            this.$Message.success('编辑成功');
            return;
         }
         this.$Message.error(res.meta.message);
      },
      // 修改人气数
      handleNumberChange: function () {
         let job = this.job;
         job.totalPrice = parseInt(job.unitPrice * job.number);
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
