<template>
  <div class="content">
      <div class="part" v-if="role === 1">
         <div class="title">
            <span>创建机器</span>
         </div>
         <div class="server">
            <div class="left">
               <p>机器当前价格：</p>
               <div>
                  <span>￥{{price}}/台/小时</span>
                  <button class="button" type="button" @click="creatModal = true">创建实例</button>
               </div>
            </div>
            <!-- <div class="left">
               <p>上次创建总数 100台</p>
               <p>已经创建总数 56台</p>
            </div> -->
         </div>
      </div>
      <div class="part mT20">
         <div class="title"><span>机器列表</span></div>
         <div class="tabs">
            <span :class="{'current': item.value === region}" v-for="(item, index) in areas" :key="index" @click="areaChange(item)">{{item.label}}</span>
            <div class="filter">
               <em :class="{'current': status === item.code}" v-for="item in statusArr" :key="item.code" @click="handleFilter(item.code)">{{item.label}}</em>
            </div>
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
                  <th v-if="role === 1">操作</th>
               </tr>
               <tr v-for="item in instance.records" :key="item.id">
                  <td>{{item.instanceId}}</td>
                  <td>{{item.instanceName}}</td>
                  <td>{{item.instanceType}}</td>
                  <td>{{item.instanceStatus}}</td>
                  <td>{{item.publicIpAddress}}</td>
                  <td>{{item.startTime}}</td>
                  <td>{{item.signInStatus == 1 ? '已登录' : '未登录'}}</td>
                  <td v-if="role === 1">
                     <a href="javascript:;" @click="beforeRelease(item.instanceId)">释放</a>
                  </td>
               </tr>
            </table>
            <div class="null" v-if="instance.records.length === 0">暂无数据</div>
            <div class="page" v-if="instance.pages-1">
               <span>共 {{instance.total}} 台</span>
                <my-page :totalPage="instance.pages" @page="paging"></my-page>
            </div>
         </div>
      </div>
      <!-- 创建实例 -->
      <Modal
         v-model="creatModal"
         title="创建实例"
         width="400"
         footer-hide
      >
         <div class="createModal">
            <div class="item">
               <label>创建数量：</label>
               <input type="number" v-model="number"> 台
               <div class="clear"></div>
            </div>
            <div class="item">
               <label>价格上限：</label>
               <input type="number" v-model="priceLimit"> 元
               <div class="clear"></div>
            </div>
            <div class="item">
               <label>区域：</label>
               <select v-model="newRegion">
                  <option value="">选择区域</option>
                  <option :value="item.value" v-for="(item, index) in areas" :key='index'>{{item.label}}</option>
               </select>
               <div class="clear"></div>
            </div>
            <button class="button" type="button" @click="handleAddInstance">开始创建</button>
         </div>
      </Modal>
   </div>
</template>
<script>
import { getInstance, addInstance, releaseInstance } from '@/api/api';
import myPage from '@/components/paging';

export default {
   components: {
      myPage: myPage,
   },
   data: function () {
      return {
         region: 'cn-beijing',
         newRegion: '',
         priceLimit: 0,
         number: 0,
         areas: [
            {label: '北京', value: "cn-beijing"},
            {label: '青岛', value: "cn-qingdao"},
            {label: '上海', value: "cn-shanghai"}, 
            {label: '杭州', value: "cn-hangzhou"}, 
            {label: '呼和浩特', value: "cn-huhehaote"}, 
            {label: '张家口', value: "cn-zhangjiakou"},
            {label: '深圳', value: "cn-shenzhen"}
         ],
         creatModal: false,
         pages: 0,
         instance: {
            records: []
         },
         page: 1,
         price: 0,
         role: 2,
         status: 0,
         statusArr: [
            {code: 0, label: '全部'},
            {code: 1, label: '已登录'},
            {code: -1, label: '未登录'}
         ]
      }
   },
   mounted: function(){
      this.role = this.$store.get('role');
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
         let res = await getInstance(data);
         this.$Spin.hide();
         if(res.meta.code === 0){
            this.price = res.data.price;
            this.instance = res.data.instance;
            return;
         }
         this.$Message.error(res.meta.message);
      },
      // 创建实例
      handleAddInstance: async function () {
         let data = {
            region: this.newRegion,
            price: parseFloat(this.priceLimit),
            number: parseInt(this.number)
         };
         let flag = Object.entries(data).every( (val) => {
            return val[1];
         })
         if(!flag){
            return;
         }
         this.$Spin.show({
            render: (h) => {
               return h('div', [
                  h('div', '创建中...')
               ])
            }
         });
         let res = await addInstance(data);
         this.$Spin.hide();
         if(res.meta.code === 0){
            this.$Message.success('创建成功');
            this.newRegion = '';
            this.number = 0;
            this.priceLimit = 0;
            this.creatModal = false;
            this.page = 1;
            this.handleGetInstance();
            return;
         }
         this.$Message.error(res.meta.message);
      },
      // 翻页
      paging: function (page) {
         this.page = page;
      },
      // 切换地区
      areaChange: function (item) {
         if(item.value === this.region){
            return;
         }
         this.region = item.value;
         this.page = 1;
         this.handleGetInstance();
      },
      // 根据状态筛选
      handleFilter: function (code) {
         this.status = code;
         this.page = 1;
         this.handleGetInstance();
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
      }
   }
}
</script>
