const { request } = require('../../utils/request.js')
Page({

  data: {
    openid: wx.getStorageSync('openid'),
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  jumpPage: function (e) {
    wx.navigateTo({
      url: '/pages/editAddress/editAddress',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.fetchData()
  },
  jumpDetail: function(e){
    wx.navigateTo({
      url: '/pages/editAddress/editAddress?current=' + JSON.stringify(e.currentTarget.dataset.item)
    })
  },
  fetchData: function(){
    let token = wx.getStorageSync('token')
    if (!token) {
      return
    }
    request({
      url: '/getAddress',
      data: {
        openid: this.data.openid
      },
      header: {
        token: token
      },
      method: 'get'
    }).then(res => {
      if (res.data.code === 0) { 
        this.setData({
          listData: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})