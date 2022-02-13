Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    userType: '游客'
  },
  getUserProfile(e) {
    console.log(e);
    wx.getUserProfile({
      desc: '用于完善会员资料', 
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getPhoneNumber (e) {
    wx.login({
      success (res) {
        console.log('res:'+res);
      }
    })
    console.log(e);
  },
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  }
})