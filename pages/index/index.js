//index.js
//获取应用实例
// const app = getApp()
const ONE_MINUTE_MILLIS = 60 * 1000;

Page({
  data: {
    busArrival14: "",
    busArrival74: "",
    busArrival166: ""
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getBusArrival(19029, 14);
    this.getBusArrival(19029, 74);
    this.getBusArrival(19029, 166);
  },
  getBusArrival: function (busStopCode, serviceNo) {
    console.log("getBusArrival is called with busStopCode: " + busStopCode + ", serviceNo: " + serviceNo);
    let that = this;
    wx.request({
      url: 'https://okwi44wbfg.execute-api.ap-southeast-1.amazonaws.com/prod/busarrival',
      data: {
        BusStopCode: busStopCode,
        ServiceNo: serviceNo
      },
      success: function (resp) {
        let busService = JSON.parse(resp.data).Services[0];
        console.log("success callback:" + serviceNo);
        console.log(busService.NextBus);
        return;
        let nextBusArrival = Date.parse(busService.NextBus.EstimatedArrival);
        let nextBusArrival2 = Date.parse(busService.NextBus2.EstimatedArrival);
        let nextBusArrival3 = Date.parse(busService.NextBus3.EstimatedArrival);
        let countDownMillis = nextBusArrival - Date.now();
        let countDownMins = Math.max(countDownMillis, 0) / (1000 * 60);
        let countDownText = Math.round(countDownMins) + " mins"
        switch (serviceNo) {
          case 14:
            that.setData({
              busArrival14: countDownText
            });
            break;
          case 74:
            that.setData({
              busArrival74: countDownText
            });
            break;
          case 166:
            that.setData({
              busArrival166: countDownText
            });
            break;
        }
        setTimeout(function () {          
          that.getBusArrival(busStopCode, serviceNo)
        }, ONE_MINUTE_MILLIS);
      }
    })
  },
  getArrivalMinutesText: function(busArrivalMillis) {

  }
})