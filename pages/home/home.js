import { createStoreBindings } from "mobx-miniprogram-bindings"
import { store } from "../../store/store"
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [],
    updateLoading: false,
    isAllLoaded: false,
    swiperList: [],
    notice: '',
    updatedCount: 1,
    updateNum: 10
  },
  initPage() {
    this.getSwiper()
    this.getNotice()
    this.getEvaluate()
  },
  handleScrollLower() {
    if(this.data.updateLoading || this.data.isAllLoaded) return;
    this.getEvaluate();
  },
  async getSwiper() {
    await wx.p.request({
        method: 'POST',
        url: app.globalData.api + 'app/getSwiper'
    }).then(res => {
        this.setData({
            swiperList: res.data
        })
    })
  },
  async getNotice() {
    await wx.p.request({
        method: 'POST',
        url: app.globalData.api + 'app/getNotice'
    }).then(res => {
        this.setData({
            notice: res.data.title
        })
    })
  },
  async getEvaluate() {
    this.setData({
      updateLoading: true,
    })
    await wx.p.request({
        method: 'POST',
        url: app.globalData.api + 'evaluate/getEvaluate',
        data: {
          // offset: this.data.updatedCount * this.data.updateNum - this.data.updateNum,
          // rows: this.data.updateNum
        }
    }).then(res => {
        var isAllLoaded = false
        if (res.data.length < this.data.updateNum) {
          isAllLoaded = true
        }
        this.setData({
          isAllLoaded: isAllLoaded,
          updateLoading:  false,
          products: res.data//this.data.products.concat(res.data)
        })
        this.data.updatedCount += 1;
    })
},
  gotoUrl(url) {
    wx.navigateTo({
        url: url,
      })
  },
  goto(e) {
      var url = e.currentTarget.dataset.url
      wx.navigateTo({
        url: url,
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['userInfo', 'userType'],
      actions: ['setUserInfo', 'setUserType']
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.initPage()
  },
  onUnload: function () {
    this.storeBindings.destroyStoreBindings()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.dataset({
      products: []
    })
    this.initPage()
  },
  onReachBottom: function () {
    // this.handleScrollLower()
  }
})