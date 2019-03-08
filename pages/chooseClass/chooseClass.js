Page({

  /**
   * Page initial data
   */
  data: {
    players: [{
      A: '甲',
      B: '乙',
      C: '丙',
      D: '丁',
    }],
    buyers: [1,],
    listData: [
      { "name": "形式政策分析", "time": "09/24/19:00", "population": "105/200" },
      { "name": "恋爱心理学", "time": "09/25/18:30", "population": "105/200" },
      { "name": "科技创新", "time": "09/27/18:00", "population": "105/200" },
      { "name": "德国文化介绍", "time": "09/27/15:00", "population": "105/200" },
      { "name": "诗词大会", "time": "09/29/19:00", "population": "105/200" },
    ],
    src_add: '../images/add.png',
    src_minus: "../images/minus.png",
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },
  addround: function (e) {
    var that = this
    console.log(that.data.listData.length)
    var index = that.data.listData.length + 1
    var obj = { "name": index, "time": "", "population": "" }
    that.data.listData.push(obj)
    that.setData({ listData: that.data.listData })
  },
  minusround: function (e) {
    var that = this
    that.data.listData.pop()
    that.setData({ listData: that.data.listData })
  },
  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})