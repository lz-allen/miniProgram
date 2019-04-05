//index.js
//获取应用实例
const {
  request
} = require('../../utils/request.js')
const {
  formatTime
} = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    hasUserInfo: false,
    loading: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [{
        image: '/assets/image/banner1.jpeg',
        link: '/pages/help/help'
      },
      {
        image: '/assets/image/banner2.jpeg',
        link: '/pages/books/books'
      },
      {
        image: '/assets/image/banner3.jpeg',
        link: '/pages/lost/lost'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    list: []
  },
  //事件处理函数
  jumpHelp: () => {
    wx.navigateTo({
      url: '/pages/help/help'
    })
  },
  jumpPage: e => {
    wx.navigateTo({
      url: e.target.dataset.link
    })
  },
  jumpDetail: (e) => {
    wx.navigateTo({
      url: '/pages/listDetail/listDetail?current=' + JSON.stringify(e.currentTarget.dataset.item)
    })
  },
  onShow: function(){
    this.getListData()
  },
  onLoad: function() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.getListData()
        }
      }
    })
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          this.setData({
            hasUserInfo: true
          })
        }
      })
    }
  },
  onPullDownRefresh() {
    // 下拉刷新
    if (!this.data.loading) {
      wx.showNavigationBarLoading()
      this.getListData()
      // 处理完成后，终止下拉刷新
      if (this.data.loading) {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
      }
    }
  },
  getListData() {
    let token = wx.getStorageSync('token')
    if (!token) {
      return
    }
    this.data.loading = true
    request({
      url: '/getList',
      data: {
        pageSize: 6,
        currentPage: 1
      },
      header: {
        token: token
      }
    }).then(res => {
      if (res.data.code === 0) {
        let listArr = res.data.data.list
        if (!listArr.length) {
          wx.showToast({
            title: '暂无数据,下拉刷新试试',
            icon: 'none',
            duration: 3000
          })
        }
        listArr.map(item => {
          item.publishTime = formatTime(item.publishTime)
          return item
        })
        this.setData({
          list: listArr
        })
        this.data.loading = false
      }
    })
  },
  getUserInfo: function(e) {
    let that = this
    let userInfo = e.detail.userInfo
    let openid = wx.getStorageSync('openid')
    if (!openid) {
      return
    }
    if (userInfo) {
      wx.setStorageSync('userInfo', userInfo)
      request({
        url: '/getToken',
        data: {
          openid: openid,
          userInfo: userInfo
        },
        method: 'post'
      }).then(res => {
        if (res.data.code === 0 && res.data.data) {
          wx.setStorageSync('token', res.data.data.token)
          that.getListData()
          this.setData({
            hasUserInfo: true
          })
        }
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '您点击了拒绝授权，将无法使用小程序相关功能',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {}
      })
    }
  }
})