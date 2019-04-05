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
    openid: wx.getStorageSync('openid')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.fetchData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  fetchData: function() {
    let token = wx.getStorageSync('token')
    if (!token) {
      return
    }
    request({
      url: '/getBuyList',
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
  editItem(e) {
    console.log(1)
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
        this.fetchData()
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
    // 卖家登录情况
    // if (this.data.openid === newData.replyId) {
    //   newData.openid = newData.replyId
    //   newData.replyId = this.data.openid
    // }
    let token = wx.getStorageSync('token')
    if (!token) {
      return
    }
    request({
      url: '/getChatImgListItem',
      data: {
        uniqueId: e.detail.item.uniqueId
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
      }else{
        wx.showToast({
          title: '请先创建联系人',
        })
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})