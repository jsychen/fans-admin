<template>
  <div class="content">
    <div class="part">
      <div class="title"><span>平台价格</span></div>
      <div class="table">
        <p>人气的价格是每日动态变化的，具体单价由下单的实时单价决定</p>
        <table>
          <tr>
            <th width="200">时间段</th>
            <th>人气动态单价</th>
          </tr>
          <tr>
            <td>00:00-06:00</td>
            <td>{{averagePrice/100}}元/小时</td>
          </tr>
          <tr>
            <td>06:00-16:00</td>
            <td>{{averagePrice/100}}元/小时</td>
          </tr>
          <tr>
            <td>16:00-22:00</td>
            <td>0.3元/小时</td>
          </tr>
          <tr>
            <td>22:00-00:00</td>
            <td>{{averagePrice/100}}元/小时</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import {getPrice} from '@/api/api';

export default {
   data: function (params) {
      return {
         averagePrice: 0
      }
   },
   mounted: function () {
      this.doGetPrice();
   },
   methods: {
      doGetPrice: async function () {
         let res = await getPrice();
         if(res.meta.code === 0){
            this.averagePrice = res.data.price;
         }
      }
   }
}
</script>

