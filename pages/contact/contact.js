// pages/contact/contact.js
const { request } = require('../../utils/request.js')
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
  jumpChatDetail: function(e){
    // 卖家登录情况
    const newData = Object.assign({}, e.currentTarget.dataset.item)
    if (this.data.openid === newData.replyId){
      newData.openid = newData.replyId
      newData.replyId = this.data.openid
    }
    wx.navigateTo({
      url: '/pages/chatDetail/chatDetail?current=' + JSON.stringify(newData)
    })
  },
  onShow: function () {
    this.getListData()
  },
  onLoad: function() {
  },
  getListData() {
    let token = wx.getStorageSync('token')
    request({
      url: '/getChatImgList',
      data: {
        openid: this.data.openid
      },
      header: {
        token: token
      }
    }).then(res => {
      if (res.data.code === 0) {
        this.setData({
          list: res.data.data
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
  // onShow: function() {

  // },

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