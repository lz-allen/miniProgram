const app = getApp()
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
    textValue: '',
    publishId: '',
    typeList: [{
        value: '1',
        text: '任务',
        checked: true
      },
      {
        value: '2',
        text: '二手书',
        checked: false
      },
      {
        value: '3',
        text: '失物招领',
        checked: false
      }
    ],
    isFreeList: [{
        value: '0',
        text: '免费',
        checked: true
      },
      {
        value: '1',
        text: '收费',
        checked: false
      },
    ],
    checkboxList: [{
        value: '自提',
        text: '自提',
        checked: true
      },
      {
        value: '邮寄',
        text: '邮寄',
        checked: true
      },
    ],
    price: '',
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
      if (this.data.publishId) {
        data['_id'] = this.data.publishId
        request({
          url: '/updatePublishItem',
          data,
          header: {
            token: wx.getStorageSync('token')
          },
          method: 'post'
        }).then(res => {
          if (res.data.code === 0) {
            this.setData({
              imgList: [],
              textValue: '',
              address: '',
              typeList: [{
                  value: '1',
                  text: '任务',
                  checked: true
                },
                {
                  value: '2',
                  text: '二手书',
                  checked: false
                },
                {
                  value: '3',
                  text: '失物招领',
                  checked: false
                }
              ],
              isFreeList: [{
                  value: '0',
                  text: '免费',
                  checked: true
                },
                {
                  value: '1',
                  text: '收费',
                  checked: false
                },
              ],
              checkboxList: [{
                  value: '自提',
                  text: '自提',
                  checked: true
                },
                {
                  value: '邮寄',
                  text: '邮寄',
                  checked: true
                },
              ],
              isShow: false,
              publishId: '',
              price: '',
              location: '',
              address: '获取定位'
            })
            wx.showToast({
              title: '修改成功',
              mask: true,
              icon: 'success'
            })
          } else {
            wx.showToast({
              title: '修改失败',
              mask: true
            })
          }
        })
        return
      }
      request({
        url: '/insertList',
        data: data,
        header: {
          token: wx.getStorageSync('token')
        },
        method: 'post'
      }).then(res => {
        if (res.data.code === 0) {
          this.setData({
            imgList: [],
            textValue: '',
            address: '',
            typeList: [{
                value: '1',
                text: '任务',
                checked: true
              },
              {
                value: '2',
                text: '二手书',
                checked: false
              },
              {
                value: '3',
                text: '失物招领',
                checked: false
              }
            ],
            isFreeList: [{
                value: '0',
                text: '免费',
                checked: true
              },
              {
                value: '1',
                text: '收费',
                checked: false
              },
            ],
            checkboxList: [{
                value: '自提',
                text: '自提',
                checked: true
              },
              {
                value: '邮寄',
                text: '邮寄',
                checked: true
              },
            ],
            isShow: false,
            publishId: '',
            price: '',
            location: '',
            address: '获取定位'
          })
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
      if (res.data.code === 0) {
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
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

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
    const {
      editPublishItem
    } = app.globalData
    if (editPublishItem) {
      const newTypeList = [...this.data.typeList]
      const newIsFreeList = [...this.data.isFreeList]
      const newCheckboxList = [...this.data.checkboxList]
      newTypeList.forEach(item => {
        item.checked = item.value === editPublishItem.type ? true : false
      })
      newIsFreeList.forEach(item => {
        item.checked = item.value === editPublishItem.isFree ? true : false
      })
      newCheckboxList.forEach((item, index) => {
        item.checked = item.value === editPublishItem.mode[index] ? true : false
      })
      let isShow = editPublishItem.isFree === '1' ? true : false
      this.setData({
        imgList: editPublishItem.imgList,
        textValue: editPublishItem.desc,
        address: editPublishItem.address,
        typeList: newTypeList,
        isFreeList: newIsFreeList,
        checkboxList: newCheckboxList,
        isShow: isShow,
        publishId: editPublishItem._id,
        price: editPublishItem.isFree === '1' ? editPublishItem.price : '',
      })
    } 
    app.globalData.editPublishItem = null
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