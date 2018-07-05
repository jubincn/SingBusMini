//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    busArrival14: {},
    busArrival74: {},
    busArrival166: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://okwi44wbfg.execute-api.ap-southeast-1.amazonaws.com/prod/busarrival',
      data: {
        BusStopCode: 19029,
        ServiceNo: 74
      },
      success: function(resp) {       
        that.setData({
          busArrival74: resp.data
        })
      }
    })
  }
})
