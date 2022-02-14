import {
  createStoreBindings
} from "mobx-miniprogram-bindings"
import {
  store
} from "../../store/store"

var WXBizDataCrypt = require('../../utils/RdWXBizDataCrypt.js');
var app = getApp();

Page({
  data: {
    userInfo: {},
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
        console.log('解密后 data: ', data)
        console.log('手机号码: ', data.phoneNumber)
      } else {
        Toast.fail('get Sessionkey And Openid fail!');
      }
    })
  },
  onLoad: function () {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['userInfo'],
      actions: ['setUserInfo']
    })
  },
  onUnload: function () {
    this.storeBindings.destroyStoreBindings()
  }
})