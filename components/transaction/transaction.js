// components/transaction/transaction.js
const {
  request
} = require('../../utils/request.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pImg: {
      type: String,
      value: ''
    },
    price: {
      type: String,
      value: ''
    },
    isShow: {
      type: Boolean,
      value: false
    },
    orderInfo: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    btnLoading: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close(){
      this.setData({
        btnLoading: true
      })
      this.createOrder()
      setTimeout(()=> {
        this.setData({
          btnLoading: false,
          isShow: false
        })
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        })
      },1000)
    },
    hideModal: function () {
      this.setData({
        isShow: false
      })
    },
    createOrder(){
      let token = wx.getStorageSync('token')
      if (!token) {
        return
      }
      request({
        url: '/createOrder',
        data: {
          imgList: [this.data.pImg],
          price: this.data.price,
          openid: wx.getStorageSync('openid'),
          uniqueId: this.data.orderInfo.uniqueId,
          replyId: this.data.orderInfo.replyId,
          desc: this.data.orderInfo.desc,
          name: this.data.orderInfo.name,
          province: this.data.orderInfo.province,
          detailAddr: this.data.orderInfo.detailAddr,
          tel: this.data.orderInfo.tel,
          time: new Date(),
          status: '0',
          expressId: ''
        },
        header: {
          token: token
        },
        method: 'post'
      }).then(res => {
        if (res.data.code === 0) {
         console.log(res)
        } else {
          wx.showToast({
            title: '网络错误',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  }
})
