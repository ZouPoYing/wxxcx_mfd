import { createStoreBindings } from "mobx-miniprogram-bindings"
import { store } from "../../store/store"
import { Toast } from '../../miniprogram_npm/@vant/weapp/toast/toast'

var WXBizDataCrypt = require('../../utils/RdWXBizDataCrypt.js');
var app = getApp();

Page({
  data: {
    userInfo: [],
    app: [],
    hasUserInfo: false,
    userType: '游客',
    sessionkey: '',
    openid: ''
  },
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.setUserInfo(res.userInfo)
        this.getAppByPhoneNumber(null)
      }
    })
  },
  getPhoneNumber(e) {
    getApp().globalData.encryptedData = e.detail.encryptedData
    getApp().globalData.iv = e.detail.iv
    var that = this
    // 检查登录态是否过期
    wx.checkSession({
      success(res) {
        that.getSessionkeyAndOpenid()
      },
      fail(err) {
        wx.login({
          success: res => {
            getApp().globalData.code = res.code
            that.getSessionkeyAndOpenid()
          }
        })
      }
    })
  },
  async getSessionkeyAndOpenid() {
    await wx.p.request({
      method: 'GET',
      url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+app.globalData.appID +'&secret='+app.globalData.appSecret+'&js_code='+app.globalData.code+'&grant_type=authorization_code'}).then(res => {
      if (res.errMsg == 'request:ok') {
        getApp().globalData.sessionkey = res.data.session_key
        getApp().globalData.openid = res.data.openid
        var pc = new WXBizDataCrypt(app.globalData.appID, app.globalData.sessionkey)
        var data = pc.decryptData(app.globalData.encryptedData, app.globalData.iv)
        this.registerAndLoginByPhoneNumber(data.phoneNumber)
        this.getAppByPhoneNumber(data.phoneNumber)
      } else {
        Toast.fail('get Sessionkey And Openid fail!')
      }
    })
  },
  async registerAndLoginByPhoneNumber(phoneNumber) {
    await wx.p.request({
      method: 'POST',
      url: app.globalData.api + 'user/register',
      data: {
        phoneNumber: phoneNumber,
        nickName: this.data.userInfo.nickName,
        avatarUrl: this.data.userInfo.avatarUrl
      }
    }).then(res => {
      if (res.data.success) {
        this.setUserType(res.data.user.userType)
        this.setUserInfo(res.data.user)
      }
    })
  },
  async getAppByPhoneNumber(phoneNumber) {
    await wx.p.request({
      method: 'POST',
      url: app.globalData.api + 'app/getAppByPhoneNumber',
      data: {
        phoneNumber: phoneNumber
      }
    }).then(res => {
      this.setData({
        app: res.data
      })
    })
  },
  goto(url) {
    wx.navigateTo({
      url: url,
    })
  },
  onLoad: function () {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['userInfo','userType'],
      actions: ['setUserInfo','setUserType']
    })
  },
  onUnload: function () {
    this.storeBindings.destroyStoreBindings()
  }
})