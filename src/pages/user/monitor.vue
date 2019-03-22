<template>
  <div class="content">
      <div class="part mT20">
         <div class="title"><span>机器列表</span></div>
         <div class="tabs">
            <span :class="{'current': item.value === region}" v-for="(item, index) in areas" :key="index" @click="areaChange(item)">{{item.label}}</span>
            <div class="clear"></div>
         </div>
         <div class="table">
            <table>
               <tr>
                  <th>实例ID</th>
                  <th>实例名称</th>
                  <th>实例规格</th>
                  <th>实例状态</th>
                  <th>公网IP</th>
                  <th>启动时间</th>
                  <th>登录状态</th>
                  <th>操作</th>
               </tr>
               <tr v-for="(item, index) in currentData" :key="index">
                  <td>{{item.instanceId}}</td>
                  <td>{{item.instanceName}}</td>
                  <td>{{item.instanceType}}</td>
                  <td>{{item.instanceStatus}}</td>
                  <td>{{item.publicIpAddress}}</td>
                  <td>{{item.startTime}}</td>
                  <td>{{item.signInStatus == 1 ? '已登录' : '未登录'}}</td>
                  <td>
                     <a href="javascript:;" @click="beforeRelease(item.instanceId)">释放</a>
                     <a href="javascript:;" @click="handleChangeStatus(item.instanceId, index)">已处理</a>
                  </td>
               </tr>
            </table>
            <div class="null" v-if="!currentData.length">暂无数据</div>
         </div>
      </div>
   </div>
</template>
<script>
import { getErrorInstance, releaseInstance, changeStatus } from '@/api/api';
import myPage from '@/components/paging';

export default {
   components: {
      myPage: myPage,
   },
   data: function () {
      return {
         areas: [
            {label: '北京', value: "cn-beijing"},
            {label: '青岛', value: "cn-qingdao"},
            {label: '上海', value: "cn-shanghai"}, 
            {label: '杭州', value: "cn-hangzhou"}, 
            {label: '呼和浩特', value: "cn-huhehaote"}, 
            {label: '张家口', value: "cn-zhangjiakou"},
            {label: '深圳', value: "cn-shenzhen"}
         ],
         region: 'cn-beijing',
         record: {},
         currentData: []
      }
   },
   mounted: function(){
      this.handleGetInstance();
   },
   methods: {
      // 获取实例
      handleGetInstance: async function () {
         let data = {
            page: this.page,
            region: this.region,
            type: this.status
         };
         this.$Spin.show({
            render: (h) => {
               return h('div', [
                  h('div', '加载中...')
               ])
            }
         });
         let res = await getErrorInstance();
         this.$Spin.hide();
         if(res.meta.code === 0){
            this.record = res.data;
            this.currentData = (this.record[this.region] && [...this.record[this.region]]) || [];
            return;
         }
         this.$Message.error(res.meta.message);
      },
      // 切换地区
      areaChange: function (item) {
         if(item.value === this.region){
            return;
         }
         this.region = item.value;
         this.currentData = (this.record[this.region] && [...this.record[this.region]]) || [];
      },
      // 释放实例
      beforeRelease: function (id) {
         this.$Modal.confirm({
            title: '确定释放实例吗？',
            onOk: () => {
               this.handleRelease(id);
            }
         });
      },
      handleRelease: async function (id) {
         let res = await releaseInstance(this.region, id);
         if(res.meta.code === 0){
            this.$Message.sccess(res.meta.message);
            this.handleGetInstance();
            return;
         }
         this.$Message.error(res.meta.message);
      },
      // 标记已处理实例
      handleChangeStatus: async function (instanceId, index) {
         let res = await changeStatus(instanceId);
         if(res.meta.code === 0){
            this.$Message.success('已删除' + res.data + '条记录');
            this.currentData.splice(index, 1);
            return;
         }
         this.$Message.error(res.meta.message);
      }
   }
}
</script>
