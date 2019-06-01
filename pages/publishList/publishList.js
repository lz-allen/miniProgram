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
    openid: wx.getStorageSync('openid'),
    pageSize: 6,
    currentPage: 1,
    pullFlag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      pageSize,
      currentPage
    } = this.data
    this.fetchData(pageSize, currentPage)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  fetchData: function(pageSize, currentPage) {
    let token = wx.getStorageSync('token')
    if (!token) {
      return
    }
    request({
      url: '/getPublishList',
      data: {
        pageSize,
        currentPage,
        openid: this.data.openid
      },
      header: {
        token: token
      },
      method: 'get'
    }).then(res => {
      if (res.data.code === 0) {
        if (res.data.data.list.length) {
          this.setData({
            listData: res.data.data.list
          })
        }else{
          this.data.pullFlag = false
        }
      }
    })
  },
  jumpItem(e) {
    wx.navigateTo({
      url: '/pages/listDetail/listDetail?current=' + JSON.stringify(e.detail.item)
    })
  },
  editItem(e) {
    let token = wx.getStorageSync('token')
    if (!token) {
      return
    }
    let {
      id
    } = e.detail
    request({
      url: '/getItemById',
      data: {
        _id: id
      },
      header: {
        token: token
      },
      method: 'get'
    }).then(res => {
      if (res.data.code === 0) {
        app.globalData.editPublishItem = res.data.data
        wx.switchTab({
          url: '/pages/publish/publish'
        })
      }
    })
  },
  deleteItem(e) {
    let token = wx.getStorageSync('token')
    if (!token) {
      return
    }
    let {
      id
    } = e.detail
    request({
      url: '/deleteItemById',
      data: {
        _id: id
      },
      header: {
        token: token
      },
      method: 'post'
    }).then(res => {
      if (res.data.code === 0) {
        this.fetchData(6, 1)
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  jumpDetail: (e) => {
    wx.navigateTo({
      url: '/pages/listDetail/listDetail?current=' + JSON.stringify(e.currentTarget.dataset.item)
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