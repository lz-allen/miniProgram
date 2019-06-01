// components/tabChange/tabChange.js
const {
  request
} = require('../../utils/request.js')
const {
  formatTime
} = require('../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    tab: ['最新', '附近'],
    loading: false,
    pageSize: 6,
    currentPage: 1,
    pullFlag: true
  },
  // 组件所在页面的生命周期函数
  attached() {
    let that = this;
    that.getListData()
    wx.getSystemInfo({
      success: function(res) {
        let clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        let calc = clientHeight * rpxR;
        that.setData({
          winHeight: calc - 80,
        })
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      if (e.detail.current) {
        this.setData({
          currentTab: e.detail.current,
        });
      } else {
        this.setData({
          currentTab: e.detail.current,
        });
      }
    },
    jumpDetail: (e) => {
      wx.navigateTo({
        url: '/pages/listDetail/listDetail?current=' + JSON.stringify(e.currentTarget.dataset.item)
      })
    },
    getListData(curIndex = '0') {
      let data = this.data
      data.loading = true
      this.setData({
        loading: data.loading
      })
      request({
        url: '/getList',
        data: {
          pageSize: data.pageSize,
          currentPage: data.currentPage,
          type: data.type,
          condition: curIndex
        },
        header: {
          token: wx.getStorageSync('token')
        }
      }).then(res => {
        if (res.data.code === 0) {
          let listArr = res.data.data.list
          if (!listArr.length) {
            this.data.pullFlag = false
            this.data.loading = false
            this.setData({
              loading: data.loading
            })
            return
          }
          let list = listArr.map(item => {
            item.publishTime = formatTime(item.publishTime)
            return item
          })
          this.data.loading = false
          this.setData({
            list: list,
            loading: data.loading
          })
        }
      }).catch(() => {
        this.data.loading = false
        this.setData({
          list: list,
          loading: data.loading
        })
      })
    },
    // 点击标题切换当前页时改变样式
    swichNav(e) {
      var cur = e.target.dataset.current;
      if (this.data.currentTaB == cur) {
        return false;
      } else {
        this.getListData(cur)
        this.setData({
          currentTab: cur
        })
      }
    },
    scrollLower(e) {
      const {
        pullFlag
      } = this.data
      if (pullFlag) {
        this.data.currentPage++;
        this.getListData()
      } else {
        wx.showToast({
          title: '到底了！',
          icon: 'none',
          duration: 2000
        })
      }
    },
    jumpSearch() {
      wx.navigateTo({
        url: '/pages/search/search',
      })
    }
  }
})