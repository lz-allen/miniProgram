// pages/orderDetail/orderDetail.js
const {
  request
} = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicsList: [{
      icon: 'select',
      name: '已付款'
    }, {
      icon: 'select',
      name: '已发货'
    }, {
      icon: 'select',
      name: '待收货'
    }, {
      icon: 'select',
      name: '完成'
    }, ],
    orderInfo: {},
    uniqueId: '',
    express: false,
    inputVal: '',
    openid: wx.getStorageSync('openid')
  },
  switchChange(e){
    this.setData({
      express: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  fetchData() {
    let token = wx.getStorageSync('token')
    if (!token) {
      return
    }
    request({
      url: '/getOrderItem',
      data: {
        uniqueId: this.data.uniqueId
      },
      header: {
        token: token
      },
      method: 'get'
    }).then(res => {
      if (res.data.code === 0) {
        this.setData({
          orderInfo: res.data.data
        })
      }
    })
  },
  onLoad: function(options) {
    this.setData({
      uniqueId: options.uniqueid
    })
    this.fetchData()
  },
  getInputVal: function(e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  setOrderStatus: function(e) {
    let that = this
    let token = wx.getStorageSync('token')
    if (!token) {
      return
    }
    request({
      url: '/updateOrderItem',
      data: {
        uniqueId: this.data.orderInfo.uniqueId,
        status: e.currentTarget.dataset.status,
        expressId: this.data.inputVal
      },
      header: {
        token: token
      },
      method: 'post'
    }).then(res => {
      if (res.data.code === 0) {
        that.fetchData()
      } else {
        wx.showToast({
          title: '网络错误',
          mask: true,
        })
      }
    })
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