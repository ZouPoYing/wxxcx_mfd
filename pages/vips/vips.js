import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        query: {},
        info: [],
        show: false,
        money: 0,
        userId: ''
    },
    initPage: function (data) {
        var info = data
        this.setData({
          info: info
        })
    },
    onChange(event) {
        this.setData({
            money: event.detail
        })
    },
    onClose() {
        this.setData({
            show: false
        })
    },
    showPopup(event) {
        this.setData({
            show: true,
            userId: event.currentTarget.dataset.userid
        })
    },
    async recharge() {
        await wx.p.request({
            method: 'POST',
            url: app.globalData.api + 'user/recharge',
            data: {
                userId: this.data.userId,
                money: this.data.money
            }
        }).then(res => {
            if (res.data.success) {
                this.setData({
                    money: 0,
                    userId: ''
                })
                Toast('充值成功！')
            } else {
                Toast(res.data.msg || res.data.message)
            }
            this.onClose()
        })
    },
    async getVipInfo() {
        await wx.p.request({
          method: 'POST',
          url: app.globalData.api + 'user/getVipInfo',
        }).then(res => {
          this.initPage(res.data)
        })
    },
    goto(e) {
        var url = e.currentTarget.dataset.url
        wx.navigateTo({
          url: url,
        })
    },
    gotoTab(url) {
        wx.switchTab({
            url: url,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            query: options
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.setNavigationBarTitle({
            title: this.data.query.title,
        })
        this.getVipInfo()
    }
})