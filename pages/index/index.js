//index.js
//获取应用实例
// const app = getApp()
const ONE_MINUTE_MILLIS = 60 * 1000;

Page({
  data: {
    bus14Arrival: "",
    bus14Arrival2: "",
    bus14Arrival3: "",
    bus74Arrival: "",
    bus74Arrival2: "",
    bus74Arrival3: "",
    bus166Arrival: "",
    bus166Arrival2: "",
    bus166Arrival3: ""
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

        let nextBusArrival = Date.parse(busService.NextBus.EstimatedArrival);        
        let countDownText = that.getArrivalMinutesText(nextBusArrival);
        let nextBusArrival2 = Date.parse(busService.NextBus2.EstimatedArrival);
        let countDownText2 = that.getArrivalMinutesText(nextBusArrival2);
        let nextBusArrival3 = Date.parse(busService.NextBus3.EstimatedArrival);
        let countDownText3 = that.getArrivalMinutesText(nextBusArrival3);

        countDownText3 = null;

        switch (serviceNo) {         
          case 14:            
            that.setData({              
              bus14Arrival:   countDownText,
              bus14Arrival2:  countDownText2,
              bus14Arrival3:  countDownText3
            });            
            break;
          case 74:
            that.setData({
              bus74Arrival:   countDownText,
              bus74Arrival2:  countDownText2,
              bus74Arrival3:  countDownText3,
            });
            break;
          case 166:
            that.setData({
              bus166Arrival: countDownText,
              bus166Arrival2: countDownText2,
              bus166Arrival3: countDownText3
            });
            break;
        }

        setTimeout(function () {
          that.getBusArrival(busStopCode, serviceNo)
        }, ONE_MINUTE_MILLIS);
      }
    })
  },
  getArrivalMinutesText: function (busArrivalMillis) {
    if(busArrivalMillis > 0) {
      let countDownMillis = busArrivalMillis - Date.now();
      let countDownMins = Math.max(countDownMillis, 0) / (1000 * 60);
      return Math.round(countDownMins) + "mins";
    } else {
      return null;
    }
  }
})