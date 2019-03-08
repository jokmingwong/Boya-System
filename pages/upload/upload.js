Page({
  /**
  * 页面的初始数据
  */
  data: {　　//初始化为空
    source: '',
    plain:true,
    items: [
      { name: 'valunteer', value: '志愿截图' },
      { name: 'run', value: '跑步APP截图', checked: 'true' },
      { name: 'art', value: '文艺参观图片' },
    ]
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  /**
   * 上传截图
   */
  uploadimg: function () {
    var that = this;
    wx.chooseImage({ //从本地相册选择图片或使用相机拍照
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        //console.log(res)
        //前台显示
        that.setData({
          source: res.tempFilePaths
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://www.website.com/home/api/uploadimg',
          filePath: tempFilePaths[0],
          name: 'file',

          success: function (res) {
            //打印
            console.log(res.data)
          }
        })

      }
    })
  }
  }
  )