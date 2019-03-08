// components/transaction/transaction.js
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close(){
      this.setData({
        isShow:false
      })
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 3000
      })
    }
  }
})
