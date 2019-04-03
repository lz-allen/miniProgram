// components/orderList/orderList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listData:{
      type: Array,
      value: []
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
    }
  }
})
