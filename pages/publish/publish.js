// pages/publish/publish.js
const {
  request,
  uploadFile
} = require('../../utils/request.js')
const {
  formatLocation
} = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    addIsShow: true,
    imgList: [],
    location: '',
    address: '获取定位'
  },
  formSubmit(e) {
    let data = e.detail.value
    data['nickName'] = wx.getStorageSync('userInfo').nickName
    data['avatarUrl'] = wx.getStorageSync('userInfo').avatarUrl
    data['openid'] = wx.getStorageSync('openid')
    data['imgList'] = this.data.imgList
    data['publishTime'] = new Date()
    data['address'] = this.data.address
    data['isVisible'] = true
    if (data.isFree === '0') {
      data['price'] = '0'
    }
    if (data['imgList'].length && data.desc && data.mode.length && data.price && (data.address !== '获取定位' && data.address !== '')) {
      wx.showToast({
        title: '加载中...',
        mask: true,
        icon: 'loading'
      })
      request({
        url: '/insertList',
        data: data,
        header: {
          token: wx.getStorageSync('token')
        },
        method: 'post'
      }).then(res => {
        if(res.data.code === 0) {
          wx.showToast({
            title: '发布成功',
            mask: true,
            icon: 'success'
          })
        }
      })
    } else {
      wx.showToast({
        title: '数据不完整',
        image: '/assets/image/error.png',
        duration: 2000
      })
    }
  },
  typeChange(e) {
    if (e.detail.value === '2') {
      this.setData({
        isScanShow: true
      })
    } else {
      this.setData({
        isScanShow: false
      })
    }
  },
  radioChange(e) {
    e.detail.value === '1' ? this.setData({
      isShow: true
    }) : this.setData({
      isShow: false
    })
  },
  uploadPhoto(e) {
    let that = this
    let imgList = that.data.imgList
    wx.chooseImage({
      count: 3 - imgList.length, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        uploadFile({
          url: '/upload',
          filepath: tempFilePaths[0],
          header: {
            token: wx.getStorageSync('token')
          }
        }).then(res => {
          let data = JSON.parse(res.data)
          if (res.statusCode === 200 && data) {
            imgList.push(data.file)
            that.setData({
              imgList: imgList,
            })
            if (imgList.length >= 3) {
              that.setData({
                addIsShow: false
              })
            }
            console.log('本地图片的路径:', imgList)
          }
        })
      }
    })
  },
  previewImage: function(e) {
    let that = this
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: that.data.imgList
    })
  },
  deleteImg(e) {
    let index = e.currentTarget.dataset.index
    let imgList = this.data.imgList
    request({
      url: '/delete',
      data: {
        filepath: imgList[index]
      },
      header: {
        token: wx.getStorageSync('token')
      },
      method: 'post'
    }).then(res => {
      if(res.data.code === 0) {
        imgList.splice(index, 1)
        if (imgList.length < 3) {
          this.setData({
            addIsShow: true
          })
        }
        this.setData({
          imgList: imgList
        })
      }
    })
  },
  // 定位
  chooseLocation: function() {
    var that = this
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
        that.setData({
          location: formatLocation(res.longitude, res.latitude),
          address: res.address
        })
      },
      fail: function() {
        wx.getSetting({
          success: (res) => {
            if (!res.authSetting['scope.userLocation']) {
              //打开提示框，提示前往设置页面
              that.setData({
                showCon: true
              })
            }
          }
        })
      }
    })
  },
  // upload(p, path){
  //   console.log(p,path)
  // }
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