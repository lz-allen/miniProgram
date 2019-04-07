// components/orderList/orderList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listData:{
      type: Array,
      value: []
    },
    isSHowBtn:{
      type: Boolean,
      value: false
    },
    isSHowBuySellBtn: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached(){
  },
  /**
   * 组件的方法列表
   */
  methods: {
    edit:function(e){
      this.triggerEvent('editItem', { id: e.currentTarget.dataset.id})
    },
    delete: function (e) {
      this.triggerEvent('deleteItem', { id: e.currentTarget.dataset.id })
    },
    jumpChat: function(e){
      this.triggerEvent('jumpChat', { item: e.currentTarget.dataset.item })
    },
    jumpOrderDetail: function(e){
      this.triggerEvent('jumpOrderDetail', { uniqueid: e.currentTarget.dataset.uniqueid })
    },
    jumpDetail(e){
      this.triggerEvent('jumpItem', { item: e.currentTarget.dataset.item })
    }
  }
})
