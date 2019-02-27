Page({
  data: {
    phone: '',
    password: ''
  },

  // 获取输入账号
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入密码
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录
  login: function () {
    if (this.data.phone.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    }
    // 需要识别是否是导员端口登陆 
    else if (this.data.phone.length == 1){
      wx.showToast({
        title: '导员端登录成功',
        icon: 'success',
        duration: 2000
      })
      wx.navigateTo({
        url: '../counselor/counselor',
      })
    }
     else {
      // 这里修改成跳转的页面
      wx.showToast({
        title: '学生端登录成功',
        icon: 'success',
        duration: 2000
      })
      wx.navigateTo({
        url: '../choose/choose',
      })
    }
  }
})
