const app = getApp();
const {
  request,
} = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    showBuySell: {
      type: 'sell'
    },
    openid: wx.getStorageSync('openid')
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
  fetchData: function () {
    let token = wx.getStorageSync('token')
    if (!token) {
      return
    }
    request({
      url: '/getSellList',
      data: {
        pageSize: 6,
        currentPage: 1,
        openid: this.data.openid
      },
      header: {
        token: token
      },
      method: 'get'
    }).then(res => {
      if (res.data.code === 0) {
        this.setData({
          listData: res.data.data.list
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.fetchData()
  },
  jumpChat: function (e) {
    console.log(e)
    let token = wx.getStorageSync('token')
    if (!token) {
      return
    }
    request({
      url: '/getChatImgListItem',
      data: {
        // pImg: e.detail.item.imgList[0],
        // openid: e.detail.item.openid,
        uniqueId: e.detail.item.uniqueId,
        // replyId: e.detail.item.replyId,
      },
      header: {
        token: token
      },
      method: 'get'
    }).then(res => {
      if (res.data.code === 0) {
        wx.navigateTo({
          url: '/pages/chatDetail/chatDetail?current=' + JSON.stringify(res.data.data)
        })
      } else {
        wx.showToast({
          title: '请先创建联系人',
        })
      }
    })
  },
  jumpOrderDetail: (e) => {
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?uniqueid=' + e.detail.uniqueid
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