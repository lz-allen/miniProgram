// pages/listDetail/listDetail.js
const {
  request
} = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myOpenid: wx.getStorageSync('openid'),
    transiactionFlag : false,
    orderInfo: {}
  },
  buy: function() {
    this.setData({
      transiactionFlag: true,
      orderInfo: {
        openid: this.data.myOpenid,
        replyId: this.data.openid,
        replyName: this.data.nickName,
        uniqueId: this.data._id,
        desc: this.data.desc
      }
    })
  },
  jumpChatDetail: function() {
    let token = wx.getStorageSync('token')
    if (!token) {
      return
    }
    request({
      url: '/addChatImgList',
      data: {
        pImg: this.data.imgList[0],
        openid: this.data.myOpenid,
        uniqueId: this.data._id,
        replyId: this.data.openid,
        avatarUrl: this.data.avatarUrl,
        replyUrl: wx.getStorageSync('userInfo').avatarUrl,
        nickName: this.data.nickName,
        price: this.data.price,
        status: '正在交易'
      },
      header: {
        token: token
      },
      method: 'post'
    }).then(res => {
      if (res.data.code === 0) {
        wx.navigateTo({
          url: '/pages/chatDetail/chatDetail?current=' + JSON.stringify({
            price: this.data.price,
            replyId: this.data.openid,
            avatarUrl: this.data.avatarUrl,
            pImg: this.data.imgList[0]
          }),
        })
      } else {
        wx.showToast({
          title: '网络错误',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  previewImage: function (e) {
    let that = this
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: that.data.imgList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData(JSON.parse(options.current))
    console.log(options.current)
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