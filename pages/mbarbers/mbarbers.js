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
    onClose(event) {
        const { position, instance } = event.detail;
        var barberId = event.currentTarget.dataset.barber_id
        var url = event.currentTarget.dataset.url
        switch (position) {
          case 'left':
            this.deleteBarber(barberId)
            instance.close();
            break;
          case 'cell':
            this.gotoUrl(url)
            instance.close();
            break;
          case 'right':
            this.gotoUrl('/pages/abarber/abarber?title=编辑理发师&barberId=' + barberId)
            instance.close();
            break;
        }
      },
    initPage: function (data) {
        var info = data
        this.setData({
          info: info
        })
    },
    async deleteBarber(barberId) {
        await wx.p.request({
          method: 'POST',
          url: app.globalData.api + 'barber/deleteBarberByBarberId',
          data: {
            barberId: barberId
          }
        }).then(res => {
            Toast('删除成功')
            this.getBarbers()
        })
    },
    async getBarbers() {
        await wx.p.request({
          method: 'POST',
          url: app.globalData.api + 'barber/getBarbers',
        }).then(res => {
          this.initPage(res.data)
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
        this.getBarbers()
    },

    onUnload: function () {
        this.getBarbers()
    }  
})