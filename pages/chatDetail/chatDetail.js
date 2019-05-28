// pages/chatDetail/chatDetail.js
const {
  request
} = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    input: '',
    openid: wx.getStorageSync('openid'),
    myAvatarUrl: wx.getStorageSync('userInfo').avatarUrl
  },
  getInputVal(e) {
    this.data.input = e.detail.value
  },
  sendMessage() {
    let token = wx.getStorageSync('token')
    if (!token) {
      return
    }
    if (!this.data.input) return
    request({
      url: '/sendMessage',
      data: {
        text: this.data.input,
        openid: this.data.openid,
        replyId: this.data.replyId,
        uniqueId: this.data.uniqueId,
        avatarUrl: this.data.avatarUrl
      },
      header: {
        token: token
      },
      method: 'post'
    }).then(res => {
      if (res.data.code === 0) {
        this.setData({
          input: ''
        })
        this.getMessage()
      }
    })
  },
  getMessage() {
    let token = wx.getStorageSync('token')
    if (!token) {
      return
    }
    request({
      url: '/getMessage',
      data: {
        openid: this.data.openid,
        replyId: this.data.replyId,
        uniqueId: this.data.uniqueId
      },
      header: {
        token: token
      },
    }).then(res => {
      if (res.data.code === 0) {
        let arr = res.data.data.map(item => {
          if (item.openid !== this.data.openid) {
            item['left'] = true
          }
          return item
        })
        this.setData({
          list: arr
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData(JSON.parse(options.current))
    console.log(options.current)
    this.getMessage()
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