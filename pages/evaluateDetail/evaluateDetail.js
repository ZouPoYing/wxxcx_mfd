import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        query: {},
        info: []
    },
    initPage() {
        this.getBarberByBarberId()
    },
    async getBarberByBarberId() {
        await wx.p.request({
          method: 'POST',
          url: app.globalData.api + 'evaluate/getEvaluateDeatilByEvaluateId',
          data: {
              evaluateId: this.data.query.evaluateId
          }
        }).then(res => {
            if (res.data.success) {
                this.setData({
                    info: res.data
                })
            } else {
                Toast(res.data.msg || res.data.message)
            }
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
        this.initPage()
    }
})