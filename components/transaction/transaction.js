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
      console.log(this.data)
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
    createOrder(){
      let token = wx.getStorageSync('token')
      if (!token) {
        return
      }
      request({
        url: '/createOrder',
        data: {
          pImg: this.data.pImg,
          price: this.data.price,
          openid: this.data.orderInfo.openid,
          uniqueId: this.data.orderInfo.uniqueId,
          replyId: this.data.orderInfo.replyId,
          desc: this.data.orderInfo.desc,
          status: '0'
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
