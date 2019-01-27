//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      '/assets/image/banner1.png',
      '/assets/image/banner2.jpg',
      '/assets/image/banner3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    list: [{
        id: 1,
        name: "hi，那个谁",
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
        price: "3000",
        time: "一天前",
        address: "上海应用技术大学",
        desc: "临近毕业，二手台式机，打算便宜甩卖，cpu：i5，内存8G，1080P显卡",
        imgList: [
          'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
          'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
          'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132'
        ]
      },
      {
        id: 1,
        name: "hi，那个谁",
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
        price: "3000",
        time: "一天前",
        address: "上海应用技术大学",
        desc: "临近毕业，二手台式机，打算便宜甩卖，cpu：i5，内存8G，1080P显卡",
        imgList: []
      },
      {
        id: 1,
        name: "hi，那个谁",
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
        price: "3000",
        time: "一天前",
        address: "上海应用技术大学",
        desc: "临近毕业，二手台式机，打算便宜甩卖，cpu：i5，内存8G，1080P显卡",
        imgList: []
      },
      {
        id: 1,
        name: "hi，那个谁",
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
        price: "3000",
        time: "一天前",
        address: "上海应用技术大学",
        desc: "临近毕业，二手台式机，打算便宜甩卖，cpu：i5，内存8G，1080P显卡",
        imgList: []
      },
      {
        id: 1,
        name: "hi，那个谁",
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
        price: "3000",
        time: "一天前",
        address: "上海应用技术大学",
        desc: "临近毕业，二手台式机，打算便宜甩卖，cpu：i5，内存8G，1080P显卡",
        imgList: []
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function() {
    console.log(app.globalData.userInfo)
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})