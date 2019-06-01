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
    pageSize: 6,
    currentPage: 1,
    pullFlag: true,
    openid: wx.getStorageSync('openid')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  fetchData: function() {
    const {
      pageSize,
      currentPage
    } = this.data
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
        if (res.data.data.list.length){
          this.setData({
            listData: res.data.data.list
          })
        }else{
          this.data.pullFlag = false
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.fetchData()
  },
  jumpChat: function(e) {
    let token = wx.getStorageSync('token')
    if (!token) {
      return
    }
    request({
      url: '/getItemById',
      data: {
        _id: e.detail.item.uniqueId,
      },
      header: {
        token: token
      },
      method: 'get'
    }).then(res => {
      if (res.data.code === 0) {
        wx.navigateTo({
          url: '/pages/listDetail/listDetail?current=' + JSON.stringify(res.data.data)
        })
      } else {
        wx.showToast({
          title: '网络错误',
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
    if (this.data.pullFlag) {
      this.data.currentPage++;
      const {
        pageSize,
        currentPage
      } = this.data
      this.fetchData(pageSize, currentPage)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})