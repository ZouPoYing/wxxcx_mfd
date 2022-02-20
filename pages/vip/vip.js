var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        query: {},
        info: []
    },
    async getUserByUserId() {
        await wx.p.request({
          method: 'POST',
          url: app.globalData.api + 'user/getUserByUserId',
          data: {
            userId: this.data.query.userId
          }
        }).then(res => {
          this.setData({
              info: res.data
          })
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
        this.getUserByUserId()
    }
})