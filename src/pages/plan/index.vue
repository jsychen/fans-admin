<template>
  <div class="content">
    <div class="pannel">
      <div class="part">
        <div class="title">
          <span>创建计划</span>
        </div>
        <div class="pannel-content">
          <p>使用相对时间创建一个计划，之后点击该计划，日期就会根据当前时间自动变更，点击计划后就可以快速定制自己的直播间人气热度。</p>
          <p>由于人气价格为动态变化的，因此使用计划时，实际支付价格可能与预计支付金额略有差异。</p>
          <router-link class="newBtn" tag="a" :to="{name: 'addPlan'}">+ 创建一个计划</router-link>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="pannel">
      <div class="part" v-for="item in plans" :key="item.id">
         <div class="title">
            <span>{{item.jobName}}</span>
            <Dropdown trigger="click">
               <a href="javascript:void(0)">
                  <Icon type="ios-arrow-down"></Icon>
               </a>
               <DropdownMenu slot="list">
                  <router-link class="ivu-dropdown-item" tag="div" :to="{'path': '/plan/update?id=' + item.id}">编辑</router-link>
                  <div class="ivu-dropdown-item" @click="doDeletePlan(item.id)">删除</div>
               </DropdownMenu>
            </Dropdown>
        </div>
        <div class="detail">
          <div class="item">
            <label>预计支付金额：</label>
            <span>￥{{item.totalPrice/100}}</span>
          </div>
          <div class="item">
            <label>补充人气时间：</label>
            <span>{{item.startTime}}</span>
            <i>至</i>
            <span>{{item.endTime}}</span>
          </div>
          <div class="item">
            <label>直播房间地址：</label>
            <span>{{item.liveUrl}}</span>
          </div>
          <div class="item">
            <label>选购在线人气：</label>
            <span>{{item.number}}</span>
          </div>
        </div>
        <router-link class="button" tag="button" :to="{'path': '/plan/use?id=' + item.id}">使用计划</router-link>
      </div>
    </div>
  </div>
</template>
<script>

import {getJob, deletePlan} from '@/api/api';

export default {
   data: function () {
      return {
         plans: []
      }
   },
   mounted: function () {
      this.doGetJob();
   },
   methods: {
      // 获取计划列表
      doGetJob: async function () {
         let data = {
            type: 1
         };
         let res = await getJob(data);
         if(res.meta.code === 0){
            this.plans = res.data;
            return;
         }
         this.$Message.error(res.meta.message);
      },
      // 删除计划
      doDeletePlan: async function (id) {
         let res = await deletePlan(id);
         if(res.meta.code === 0){
            this.$Message.success('删除成功');
            this.plans = res.data;
         }
      }
   }
}
</script>
