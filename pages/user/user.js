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
    var score = 75//这里拿到接口传入完成率就行

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
    ctx.closePath();

    const ctx2 = wx.createCanvasContext('classf')
    ctx2.setStrokeStyle('#F4F4F4')
    ctx2.setLineWidth(4)
    var width = wx.getSystemInfoSync().windowWidth;
    //var screenHeight = wx.getSystemInfoSync().windowHeight;
    var height = 10;
    console.log(width)
    var fromPoint = 0.04 * width;
    console.log(fromPoint)
    var disPoint = 0.29 * width;
    console.log(disPoint)
    var zihao = width > 330 ? 13 : 12;
    if(zihao != 12){
      zihao = width > 380 ? 14 : 13;
    }
    console.log(zihao);
    //画打底线
    var words = [['基本素养'],['形势政策'],['文化艺术'],['科技创新'],['社会实践'],['身体素质']];
    for(var i=0;i<6;i++){
      if(i == 3){
        fromPoint = 0.04 * width;
        disPoint = 0.29 * width;
        height += width/10;
      }
      ctx2.moveTo(fromPoint, height);
      ctx2.lineTo(disPoint, height);
      ctx2.setFontSize(zihao);
      ctx2.setFillStyle('#282828');
      ctx2.fillText(words[i], fromPoint, height+20);
      fromPoint += 0.27*width;
      disPoint += 0.27*width;
    }
    ctx2.stroke();

    ctx2.beginPath();
    ctx2.setStrokeStyle('white');
    ctx2.setLineWidth(6);
    ctx2.moveTo(0.43 * width, 10);
    ctx2.lineTo(0.44 * width, 10);
    ctx2.moveTo(0.70 * width, 10);
    ctx2.lineTo(0.71 * width, 10);
    ctx2.moveTo(0.43 * width, 10 + width / 10);
    ctx2.lineTo(0.44 * width, 10 + width / 10);
    ctx2.stroke();
    //画进度线
    var classPercent = [[0.8],[0.5],[0.5],[0.5],[0.5],[0.7]];//这里给出六项的进度
    var classPerfrom = 0.04 * width;
    var classPerto = 0.29 * width;
    height = 10;
    ctx2.setStrokeStyle('#756ff7');
    ctx2.setLineWidth(4);
    for(var i=0;i<6;i++){
      if (i == 3) {
        classPerfrom = 0.04 * width;
        classPerto = 0.29 * width;
        height += width / 10;
      }
      ctx2.moveTo(classPerfrom, height);
      ctx2.lineTo(classPerfrom + (classPerto - classPerfrom) * classPercent[i], height);
      classPerfrom += 0.27*width;
      classPerto += 0.27*width;
    }
    ctx2.stroke();
    //间隔
    ctx2.beginPath();
    ctx2.setStrokeStyle('white');
    ctx2.setLineWidth(6);
    ctx2.moveTo(0.43 * width, 10);
    ctx2.lineTo(0.445 * width, 10);
    ctx2.moveTo(0.70 * width, 10);
    ctx2.lineTo(0.715 * width, 10);
    ctx2.moveTo(0.43 * width, 10 + width / 10);
    ctx2.lineTo(0.445 * width, 10 + width / 10);
    ctx2.stroke();
    ctx2.draw();

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