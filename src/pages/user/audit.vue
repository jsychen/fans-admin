<template>
   <div class="content">
      <div class="part">
         <div class="title"><span>待审核</span></div>
         <div class="table">
            <table>
               <tr>
                  <th>申请人</th>
                  <th>注册号码</th>
                  <th>邀请人</th>
                  <th>申请时间</th>
                  <th>操作</th>
               </tr>
               <tr v-for="item in records.other" :key="item.id">
                  <td>{{item.username}}</td>
                  <td>{{item.phone}}</td>
                  <td>{{item.inviter}}</td>
                  <td>{{item.createAt}}</td>
                  <td>
                     <span class="blue" @click="doAuditUser(item.id, 1)">通过</span>
                     <span class="red" @click="doAuditUser(item.id, 0)">不通过</span>
                  </td>
               </tr>
            </table>
            <div class="null" v-if="records.other.length === 0">暂无数据</div>
         </div>
      </div>
      <div class="part">
         <div class="title"><span>已审核</span></div>
         <div class="table">
            <table>
               <tr>
                  <th>申请人</th>
                  <th>注册号码</th>
                  <th>邀请人</th>
                  <th>申请时间</th>
                  <th>审核时间</th>
                  <th>审核结果</th>
                  <th>审核人</th>
               </tr>
               <tr v-for="item in records.audited" :key="item.id">
                  <td>{{item.username}}</td>
                  <td>{{item.phone}}</td>
                  <td>{{item.inviter}}</td>
                  <td>{{item.createAt}}</td>
                  <td>{{item.auditAt}}</td>
                  <td>{{item.audited ? '已通过' : '未通过'}}</td>
                  <td>{{item.verifier}}</td>
               </tr>
            </table>
            <div class="null" v-if="records.audited.length === 0">暂无数据</div>
         </div>
      </div>
   </div>
</template>
<script>
import { getAuditItems, auditUser } from '@/api/api'
export default {
   data: function () {
      return {
         records: {
            other: [],
            audited: []
         }
            
      }
   },
   mounted: function () {
      this.doGetAuditItems();
   },
   methods: {
      // 获取审核列表
      doGetAuditItems: async function () {
         let res = await getAuditItems();
         if(res.meta.code === 0){
            this.records = res.data;
            return;
         }
         this.$Message.error(res.meta.message);
      },
      // 注册审核
      doAuditUser: async function (id, type) {
         let data = {
            audited: type
         };
         let res = await auditUser(id, data);
         let message = res.meta.message;
         if(res.meta.code === 0){
            this.$Message.success(message);
            this.doGetAuditItems();
            return;
         }
         this.$Message.error(message);
      }
   }
}
</script>

