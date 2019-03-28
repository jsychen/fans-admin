<template>
   <div class="content">
      <div class="part mT20">
         <div class="title">
            <span>帐号管理</span>
            <button type="button" @click="addModal = true">添加账号</button>
         </div>
         <div class="tabs">
            <span :class="{'current': type === 1}" @click="changeType(1)">已使用</span>
            <span :class="{'current': type === 0}" @click="changeType(0)">未使用</span>
            <div class="clear"></div>
         </div>
         <div class="table mT20">
            <table>
               <tr>
                  <th>帐号</th>
                  <th>密码</th>
                  <th>手机号</th>
                  <th v-if="type===1">绑定实例</th>
                  <th>操作</th>
               </tr>
               <tr v-for="(item,index) in accounts" :key="index">
                  <td>{{item.account}}</td>
                  <td>{{item.password}}</td>
                  <td>{{item.phone || ''}}</td>
                  <td v-if="type===1">{{item.instanceId}}</td>
                  <td>
                     <span class="blue" @click="beforeUpdate(item)">编辑</span>
                     <span class="red" @click="beforeDelete(item)">删除</span>
                  </td>
               </tr>
            </table>
            <div class="null" v-if="totalPage === 0">暂无数据</div>
            <div class="page" v-if="totalPage" :key="total">
                <my-page :totalPage="totalPage" @page="paging"></my-page>
            </div>
         </div>
      </div>
      <!-- 添加账号 -->
      <Modal
         v-model="addModal"
         title="添加账号"
         width="360"
         footer-hide
      >
         <div class="createModal">
            <div class="item">
               <label>帐号：</label>
               <input type="text" v-model.trim="addItem.account" name="account1">
               <div class="clear"></div>
            </div>
            <div class="item">
               <label>密码：</label>
               <input type="text" v-model.trim="addItem.password" name="password1">
               <div class="clear"></div>
            </div>
            <div class="item">
               <label>手机号：</label>
               <input type="text" v-model.trim="addItem.phone" name="phone1">
               <div class="clear"></div>
            </div>
            <button class="button" type="button" @click="handleAdd">确定</button>
         </div>
      </Modal>
      <!-- 编辑账号 -->
      <Modal
         v-model="editModal"
         title="编辑账号"
         width="360"
         footer-hide
      >
         <div class="createModal">
            <div class="item">
               <label>帐号：</label>
               <input type="text" v-model.trim="editItem.account" readonly>
               <div class="clear"></div>
            </div>
            <div class="item">
               <label>密码：</label>
               <input type="text" v-model.trim="editItem.password" name="password2">
               <div class="clear"></div>
            </div>
            <div class="item">
               <label>手机号：</label>
               <input type="text" v-model.trim="editItem.phone" name="phone2">
               <div class="clear"></div>
            </div>
            <button class="button" type="button" @click="handleUpdate">确定</button>
         </div>
      </Modal>
   </div>
</template>
<script>
import validate from '@/utils/validate';

import myPage from '@/components/paging';
import { getAccount, deleteAccount, addAccount, updateAccount } from '@/api/api';
export default {
   components: {
      myPage: myPage,
   },
   data: function () {
      return {
         accounts: [],
         page: 1,
         totalPage: 0,
         total: 0,
         qq: '',
         psw: '',
         addModal: false,
         editModal: false,
         type: 0,
         addItem: {
            account: '982380723',
            password: 'chenyun',
            phone: '13621371454'
         },
         editItem: {
            account: '',
            password: '',
            phone: '',
            id: 0
         }
      }
   },
   mounted: function () {
      this.getData();
   },
   methods: {
      // 获取帐号
      getData: async function () {
         let data = {
            page: this.page,
            type: this.type
         };
         let res = await getAccount(data);
         if(res.meta.code === 0){
            if(res.data){
               this.accounts = res.data.records;
               this.totalPage = res.data.pages;
               this.total = res.data.total;
            } else {
               this.accounts = [];
               this.totalPage = 0;
               this.total = 0;
            }
            return;
         }
         this.$Message.error(res.meta.message);
      },
      // 翻页
      paging: function(page){
         this.page = page;
         this.getData();
      },
      // 确认添加账号
      handleAdd: async function () {
         let data = this.addItem;
         let validatorJson = [
            {
               name: 'account1',
               label: '帐号',
               rules: ['required', 'number']
            },
            {
               name: 'password1',
               label: '密码',
               rules: ['required']
            },
            {
               name: 'phone1',
               label: '手机号码',
               rules: ['required', 'phoneNumber']
            }            
         ];
         if( !validate(validatorJson) ){
            return;
         }
         let res = await addAccount(data);
         if(res.meta.code === 0){
            this.$Message.success('添加成功');
            this.account = '';
            this.password = '';
            this.phone = '';
            this.addModal = false;
            this.page = 1;
            this.getData();
            return;
         }
         this.$Message.error(res.meta.message);
      },
      // 删除账号
      beforeDelete: function (item) {
         this.$Modal.confirm({
            title: '确定删除帐号'+ item.account +'吗？',
            onOk: () => {
               this.handleDelete(item.id);
            }
         });
      },
      handleDelete: async function (id) {
         let res = await deleteAccount(id, this.type);
         if(res.meta.code === 0){
            this.$Message.success(res.meta.message);
            this.page = 1;
            this.getData();
            return;
         }
         this.$Message.error(res.meta.message);
      },
      // 切换tab
      changeType: function (type) {
         this.type = type;
         this.page = 1;
         this.getData();
      },
      // 编辑帐号
      beforeUpdate: function (item) {
         this.editItem = {...item};
         this.editModal = true;
      },
      handleUpdate: async function () {
         let validatorJson = [
            {
               name: 'password2',
               label: '密码',
               rules: ['required']
            },
            {
               name: 'phone2',
               label: '手机号码',
               rules: ['required', 'phoneNumber']
            }            
         ];
         if( !validate(validatorJson) ){
            return;
         }
         let res = await updateAccount(this.editItem);
         if(res.meta.code === 0){
            this.editModal = false;
            this.$Message.success('编辑成功');
            this.page = 1;
            this.getData();
            return;
         }
         this.$Message.error(res.meta.message);
      }
   }
}
</script>