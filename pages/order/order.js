import {
  createStoreBindings
} from "mobx-miniprogram-bindings"
import {
  store
} from "../../store/store"
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: '0',
    hasLogin: false,
    info: [],
    show: false
  },
  initPage() {
    if (this.data.userInfo.userId == '' || this.data.userInfo.userId == undefined) {
      Toast('请先登录')
      this.setData({
        hasLogin: false
      })
    } else {
      this.getOrderDetailByUserIdAndStatus()
      this.setData({
        hasLogin: true
      })
    }
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  showPopup() {
    this.setData({
      show: true
    })
  },
  changeTab(event) {
    this.setData({
      active: event.detail.name
    })
    this.getOrderDetailByUserIdAndStatus()
  },
  async pay(event) {
    await wx.p.request({
      method: 'POST',
      url: app.globalData.api + 'order/pay',
      data: {
        orderId: event.currentTarget.dataset.orderid
      }
    }).then(res => {
      if (res.data.success) {
        Toast('支付成功')
        this.getOrderDetailByUserIdAndStatus()
      } else {
        Toast(res.data.msg || res.data.message)
      }
      this.onClose()
    })
  },
  async cancelLine(event) {
    await wx.p.request({
      method: 'POST',
      url: app.globalData.api + 'order/cancelLine',
      data: {
        orderId: event.currentTarget.dataset.orderid
      }
    }).then(res => {
      if (res.data.success) {
        Toast('取消成功')
        this.getOrderDetailByUserIdAndStatus()
      } else {
        Toast(res.data.msg || res.data.message)
      }
    })
  },
  async getOrderDetailByUserIdAndStatus() {
    await wx.p.request({
      method: 'POST',
      url: app.globalData.api + 'order/getOrderDetailByUserIdAndStatus',
      data: {
        userId: this.data.userInfo.userId,
        status: this.data.active
      }
    }).then(res => {
      this.setData({
        info: res.data
      })
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

  onShow: function () {
    this.initPage()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.initPage()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.storeBindings.destroyStoreBindings()
  }
})