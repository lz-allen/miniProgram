// pages/chatDetail/chatDetail.js
const { request} =require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        openid: '',
        text: '在吗？',
        left: true
      },
      {
        openid: '',
        text: '在'
      },
      {
        openid: '',
        text: '在吗？',
        left: true
      },
      {
        openid: '',
        text: '在'
      },
      {
        openid: '',
        text: '在吗？',
        left: true
      },
      {
        openid: '',
        text: '在'
      },
      {
        openid: '',
        text: '在吗？',
        left: true
      },
      {
        openid: '',
        text: '在'
      },
      {
        openid: '',
        text: '在吗？',
        left: true
      },
      {
        openid: '',
        text: '在'
      },
      {
        openid: '',
        text: '在吗？',
        left: true
      },
      {
        openid: '',
        text: '在'
      },
    ],
    input: '',
    openid: wx.getStorageSync('openid')
  },
  getInputVal(e){
    this.data.input = e.detail.value
  },
  sendMessage() {
    let token = wx.getStorageSync('token')
    if (!token) {
      return
    }
    request({
      url: '/sendMessage',
      data: {
        text: this.data.input,
        openid: this.data.openid,
        replyId: this.data.replyId
      },
      header: {
        token: token
      },
      method: 'post'
    }).then(res => {
      if(res.data.code === 0) {
        this.setData({
          input: ''
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.current)
    this.setData(JSON.parse(options.current))
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