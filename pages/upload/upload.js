Page({

  data: {　　//初始化为空
    source: '',
    plain: true,
    array:['志愿时长截图','跑步APP截图','游泳APP截图','文艺参观图片'],
    objectArray: [
      {
        id: 0,
        name: '志愿时长截图'
      },
      {
        id: 1,
        name: '跑步APP截图'
      },
      {
        id: 2,
        name: '游泳APP截图'
      },
      {
        id: 3,
        name: '文艺参观图片'
      }
    ],
    index:0,
  },

  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        this.data.images = images.length <= 3 ? images : images.slice(0, 3)
        $digest(this)
      }
    })
  },

  onLoad(options) {
    $init(this)
  },

  display(id){
    var target=document.getElementById(id);
    if(target.style.display=="none"){
      target.style.display="inline";
    }
  },

  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    
  },

  submitForm(e) {
    const title = this.data.title
    const content = this.data.content

    if (title && content) {
      const arr = []

      //将选择的图片组成一个Promise数组，准备进行并行上传
      for (let path of this.data.images) {
        arr.push(wxUploadFile({
          url: config.urls.question + '/image/upload',
          filePath: path,
          name: 'qimg',
        }))
      }

      wx.showLoading({
        title: '正在创建...',
        mask: true
      })

      // 开始并行上传图片
      Promise.all(arr).then(res => {
        // 上传成功，获取这些图片在服务器上的地址，组成一个数组
        return res.map(item => JSON.parse(item.data).url)
      }).catch(err => {
        console.log(">>>> upload images error:", err)
      }).then(urls => {
        // 调用保存问题的后端接口
        return createQuestion({
          title: title,
          content: content,
          images: urls
        })
      }).then(res => {
        // 保存问题成功，返回上一页（通常是一个问题列表页）
        const pages = getCurrentPages();
        const currPage = pages[pages.length - 1];
        const prevPage = pages[pages.length - 2];

        // 将新创建的问题，添加到前一页（问题列表页）第一行
        prevPage.data.questions.unshift(res)
        $digest(prevPage)

        wx.navigateBack()
      }).catch(err => {
        console.log(">>>> create question error:", err)
      }).then(() => {
        wx.hideLoading()
      })
    }
  }
})
  
      /*key和value*/
 
