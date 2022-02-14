// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: 'hello world',
    movies: [
      {name:"queen",song:"bo-rep"},
      {name:"zeb",song:"strain"},
      {name:"bob",song:"anyway"}
    ],
    count: 0,
    msg: '',
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false
  },
  houduanButton1() {
    wx.request({
      url: 'http://localhost:8080/api/hs/test',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        this.setData({
          msg : res.data
        })
      }
    })
  },
  add() {
    this.setData({
      count: ++this.data.count
    })
  },
  de() {
    this.setData({
      count: --this.data.count
    })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})