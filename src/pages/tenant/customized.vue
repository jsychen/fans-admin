<template>
  <div class="content">
    <div class="platform">
      <div class="info">
        <p>28888</p>
        <span>直播间在线人气资源<br>企鹅电竞</span>
      </div>
      <img src="../../assets/images/qie.svg" alt="">
    </div>
    <div class="part">
      <div class="title">
        <span>人气定制</span>
      </div>
      <div class="part-content">
        <div class="echarts">
          <div id="echarts"></div>
          <p>购买的人气会在服务时间里按规律进入直播间保证平均每小时会有额外500人观看</p>
        </div>
        <div class="orderForm">
          <div class="payMent">
            支付金额：<span>￥298</span>
          </div>
          <form>
            <div class="item">
              <label>补充人气时间：</label>
              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择时间" :time-picker-options="{steps: [1, 60]}"></DatePicker>
              <i>至</i>
              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择时间" :time-picker-options="{steps: [1, 60]}"></DatePicker>
              <div class="clear"></div>
            </div>
            <div class="item">
              <label>选购在线人气：</label>
              <em>-</em>
              <input type="number">
              <em>+</em>
              <p>所选时间段共有可用在线人气28888</p>
              <div class="clear"></div>
            </div>
            <div class="item">
              <label>直播房间地址：</label>
              <input type="text">
              <div class="clear"></div>
            </div>
            <div class="item">
              <label>人气均价：</label>
              <span>0.3元 / 个 / 小时</span>
              <div class="clear"></div>
            </div>
            <div class="formBtn">
              <button class="red" type="button">
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
            <i>298元</i>
          </div>
          <div class="item">
            <label>支付方式：</label>
            <span class="icon-wechat"></span>
            <em>微信</em>
          </div>
          <div class="qrcode">
            支付二维码
          </div>
          <p class="tip">请打开微信扫码支付</p>
        </div>
    </Modal>
  </div>
</template>
<script>
let echarts = require("echarts");
export default {
  data: function () {
    return {
      payModal: false
    }
  },
  mounted: function () {
    this.initEcharts();
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
    }
  }
}
</script>
