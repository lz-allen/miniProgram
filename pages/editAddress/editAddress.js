const { request } = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    province: '获取定位',
    name: '',
    tel: '',
    detailAddr: '',
    main: false,
    openid: wx.getStorageSync('openid'),
    update: false
  },
  chooseLocation: function() {
    var that = this
    wx.chooseLocation({
      success: function(res) {
        that.setData({
          province: res.address
        })
      },
      fail: function() {
        wx.getSetting({
          success: (res) => {
            if (!res.authSetting['scope.userLocation']) {
              //打开提示框，提示前往设置页面
            }
          }
        })
      }
    })
  },
  formSubmit(e) {
    const {
      name,
      tel,
      detailAddr,
      main
    } = e.detail.value
    const { province, update, _id} = this.data
    if (name && tel && detailAddr && province && province !== '获取定位'){
      let token = wx.getStorageSync('token')
      if (!token) {
        return
      }
      request({
        url: '/createAddress',
        data: {
          name,
          tel,
          detailAddr,
          main,
          province,
          openid: this.data.openid,
          update,
          _id
        },
        header: {
          token: token
        },
        method: 'post'
      }).then(res => {
        if (res.data.code === 0) {
          wx.navigateBack(); 
        }
      })
    }else{
      wx.showToast({
        title: '数据不完整',
        image: '/assets/image/error.png',
        duration: 2000
      })
    }
  },
  deleteAddress: function(){
    let token = wx.getStorageSync('token')
    const {_id } = this.data
    if (!token) {
      return
    }
    request({
      url: '/deleteAddress',
      data: {
        _id
      },
      header: {
        token: token
      },
      method: 'post'
    }).then(res => {
      if (res.data.code === 0) {
        wx.navigateBack();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.current){
      const current = JSON.parse(options.current)
      this.setData({
        _id: current._id,
        name: current.name,
        openid: current.openid,
        main: current.main,
        detailAddr: current.detailAddr,
        province: current.province,
        tel: current.tel,
        update: true
      })
    }
   
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