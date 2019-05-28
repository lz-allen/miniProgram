// pages/cet/cet.js
const io = require('../../utils/weapp.socket.io.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: wx.getStorageSync('openid'),
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.websocket()
  },
  getInputVal(e) {
    this.data.input = e.detail.value
  },
  sendMessage(){
    console.log(this.data.input)
  },
  websocket: function(){
    var that = this
    this.socket = io.connect('http://localhost:3000');
    this.socket.emit('start', { openid: this.data.openid });
    this.socket.on('system', function (data) {
      const oldList = that.data.list
      oldList.push(data)
      that.setData({
        list: oldList
      })
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})