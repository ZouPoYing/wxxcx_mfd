//app.js
import {promisifyAll} from "miniprogram-api-promise"

const wxp = wx.p = {}

promisifyAll(wx, wxp)

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({
      success: res => {
        this.globalData.code = res.code
      }
  })
  },
  globalData: {
    appID : 'wx25c35dde5b34e0d6',
    appSecret : '6adf4d58ec1b29d6bdfcca98274fff77',
    encryptedData : '',
    iv : '',
    code : '',
    sessionkey: '',
    openid: ''
  }
})