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
                  <th>手机号</th>
                  <th v-if="type===1">绑定实例</th>
                  <th>操作</th>
               </tr>
               <tr v-for="(item,index) in accounts" :key="index">
                  <td>{{item.phone || ''}}</td>
                  <td v-if="type===1">{{item.instanceId}}</td>
                  <td>
                     <!-- <span class="blue" @click="beforeUpdate(item)">编辑</span> -->
                     <span class="red" @click="beforeDelete(item)">删除</span>
                  </td>
               </tr>
            </table>
            <div class="null" v-if="!total">暂无数据</div>
            <div class="page" v-if="total" :key="total">
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
               <label>手机号：</label>
               <textarea v-model="phones" placeholder="每输入一个手机号后按回车"></textarea>
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
         totalPage: 1,
         total: 0,
         qq: '',
         psw: '',
         addModal: false,
         editModal: false,
         type: 1,
         editItem: {
            account: '',
            password: '',
            phone: '',
            id: 0
         },
         phones: ''
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
               if(res.data.pages){
                  this.totalPage = res.data.pages;
                  this.total = res.data.total;
               }
               
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
         if(!this.phones){
            this.$Message.error('请输入手机号');
            return;
         }
         let phones = new Set(this.phones.split('\n'));
         phones = [...phones];
         
         for(let i=0;i<phones.length;i++){
            let reg = /^1([356789][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
            if(!reg.test(phones[i])){
               this.$Message.error('第' + (i+1) + '个手机号格式错误');
               return;
            }
         }
         let data = {
            phone: phones
         };
         let res = await addAccount(data);
         if(res.meta.code === 0){
            this.$Message.success('添加成功');
            for(let key in this.addItem){
               this.addItem[key] = '';
            }
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
            title: '确定删除帐号'+ item.phone +'吗？',
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