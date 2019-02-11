const app = getApp()

Page({
  data: {
    motto: 'Hello',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReady: function () {//绘制界面
    // 页面渲染完成
    const ctx = wx.createCanvasContext('jinDu')
    /*接口: 数据给到这里 */
    var score = 75

    //进度圈
    ctx.beginPath()
    ctx.arc(150, 100, 85, 0, 2 * Math.PI)
    ctx.setLineWidth(5)
    ctx.setStrokeStyle('#F4F4F4')
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(150, 100, 85, 3 / 2 * Math.PI, (3/2-score / 50) * Math.PI,1)
    ctx.setLineWidth(5)
    ctx.setStrokeStyle('#756ff7')
    ctx.stroke()
    // Draw arc

    //两侧的小圆弧装饰
    ctx.beginPath()
    ctx.arc(150, 100, 115, 11 / 6 * Math.PI, 1 / 6 * Math.PI)
    ctx.setLineWidth(5)
    ctx.setGlobalAlpha(0.5)
    ctx.setStrokeStyle('#756ff7')
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(150, 100, 115, 5 / 6 * Math.PI, 7 / 6 * Math.PI)
    ctx.setLineWidth(5)
    ctx.setGlobalAlpha(0.5)
    ctx.setStrokeStyle('#756ff7')
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(150, 100, 145, 23 / 12 * Math.PI, 1 / 12 * Math.PI)
    ctx.setLineWidth(5)
    ctx.setGlobalAlpha(0.2)
    ctx.setStrokeStyle('#756ff7')
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(150, 100, 145, 11 / 12 * Math.PI, 13 / 12 * Math.PI)
    ctx.setLineWidth(5)
    ctx.setGlobalAlpha(0.2)
    ctx.setStrokeStyle('#756ff7')
    ctx.stroke()

    //圆圈中间的完成率等字样
    ctx.setFontSize(70)
    ctx.setFillStyle('black')
    ctx.setGlobalAlpha(1)
    ctx.fillText(score, 110, 115)

    ctx.setFontSize(20)
    ctx.setFillStyle('black')
    ctx.setGlobalAlpha(1)
    ctx.fillText('%', 195, 115)

    ctx.setFontSize(20)
    ctx.setFillStyle('#A6A6A6')
    ctx.setGlobalAlpha(1)
    ctx.fillText('完成率', 120, 140)
    
    ctx.draw()
    ctx.closePath()
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})