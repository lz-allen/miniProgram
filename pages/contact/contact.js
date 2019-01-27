// pages/contact/contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
      id: '1',
      avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
      name: 'hi，那个谁',
      tradingStatus: "正在交易",
      proImg: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
    },
     {
      id: '1',
      avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
      name: 'hi，那个谁',
      tradingStatus: "正在交易",
      proImg: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
    },
      {
        id: '1',
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
        name: 'hi，那个谁',
        tradingStatus: "正在交易",
        proImg: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
      },
      {
        id: '1',
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
        name: 'hi，那个谁',
        tradingStatus: "正在交易",
        proImg: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
      },
      {
        id: '1',
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
        name: 'hi，那个谁',
        tradingStatus: "正在交易",
        proImg: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
      },
      {
        id: '1',
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
        name: 'hi，那个谁',
        tradingStatus: "正在交易",
        proImg: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
      },
      {
        id: '1',
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
        name: 'hi，那个谁',
        tradingStatus: "正在交易",
        proImg: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
      },
      {
        id: '1',
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
        name: 'hi，那个谁',
        tradingStatus: "正在交易",
        proImg: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQHJCTY7U2iamloKPiaToN9Z9HXNogQtFRxdzQjZF7Z3hXMCtONel5mksJN1KaMRYVcl2Gia5cZQCdw/132',
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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