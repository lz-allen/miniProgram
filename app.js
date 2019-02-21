//app.js
const {
  request
} = require('./utils/request.js')
App({
  onLaunch: function() {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        request({
          url: '/auth',
          data: {
            code: res.code
          }
        }).then(res => {
          if (res.data.code === 0 && res.data.data) {
            let openid = res.data.data.openid
            wx.setStorageSync('openid', openid)
            // 获取用户信息
            wx.getSetting({
              success: res => {
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: res => {
                      // 可以将 res 发送给后台解码出 unionId
                      wx.setStorageSync('userInfo', res.userInfo)
                      request({
                        url: '/getToken',
                        data: {
                          openid: openid,
                          userInfo: wx.getStorageSync('userInfo')
                        },
                        method: 'post'
                      }).then(res => {
                        if (res.data.code === 0 && res.data.data) {
                          wx.setStorageSync('token', res.data.data.token)
                        }
                      })
                      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                      // 所以此处加入 callback 以防止这种情况
                      if (this.userInfoReadyCallback) {
                        this.userInfoReadyCallback(res)
                      }
                    }
                  })
                }
              }
            })
          }
        })
      }
    })
  },
  globalData: {}
})