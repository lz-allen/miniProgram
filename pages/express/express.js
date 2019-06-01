// pages/express/express.js
const {
  request
} = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expressInfo: {},
    word: ''
  },
  btnEvent: function() {
    if (!this.data.word) return
    this.fetchData()
  },
  getInputVal(e) {
    this.data.word = e.detail.value
  },
  fetchData: function() {
    let token = wx.getStorageSync('token')
    if (!token) {
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    request({
      url: '/getExpressList',
      data: {
        word: this.data.word
      },
      header: {
        token: token
      },
      method: 'get'
    }).then(res => {
      if (res.data.code === 0) {
        let list = res.data.data.result.list
        list && list.length && list.forEach(item => {
          item.d = item.time.split(' ')[0]
          item.t = time = item.time.split(' ')[1]
        })
        this.setData({
          expressInfo: res.data.data.result,
        })
        wx.hideLoading()
      }else{
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.expressId){
      this.setData({
        word: options.expressId
      })
    }
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