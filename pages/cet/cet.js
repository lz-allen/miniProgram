// pages/cet/cet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  connectSocket: function() {
    let token = wx.getStorageSync('token')
    if (!token) {
      return
    }
    wx.connectSocket({
      url: 'wss://localhost:3000/test/1',
      header: {
        token,
        'content-type': 'application/json'
      },
      method: 'GET',
      // protocols: [],
      success: function(res) {
        wx.onSocketMessage(function (res) {
          console.log('收到服务器内容：' + res.data)
        })
        console.log('wss连接成功')
      },
      fail: function(res) {
        onsole.log('WebSocket连接打开失败，请检查！')
      },
      complete: function(res) {},
    })
    wx.onSocketError(function (e) {
      console.log('websocket连接失败！', e);
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.connectSocket()
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