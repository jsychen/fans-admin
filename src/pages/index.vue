<template>
   <div class="content">
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
   </div>
</template>
<script>
export default {
   data: function () {
      return {
         orders: []
      }
   }
}
</script>

