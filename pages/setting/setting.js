import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        query: {},
        skillReadonly: true,
        positionReadonly: true,
        positionPrice1: '',
        positionPrice2: '',
        positionPrice3: '',
        positionPrice4: '',
        skillPrice1: '',
        skillPrice2: '',
        skillPrice3: '',
        skillPrice4: '',
    },
    async setCommon() {
        var that = this
        await wx.p.request({
            method: 'POST',
            url: app.globalData.api + 'app/setCommon'
        }).then(res => {
            if (res.data.success) {
                Toast('配置成功，重新进入小程序即可生效！')
                setTimeout(function() {
                    that.gotoTab('../../pages/my/my')
                }, 1500);
            }
        })
    },
    async setNewYear() {
        var that = this
        await wx.p.request({
            method: 'POST',
            url: app.globalData.api + 'app/setNewYear'
        }).then(res => {
            if (res.data.success) {
                Toast('配置成功，重新进入小程序即可生效！')
                setTimeout(function() {
                    that.gotoTab('../../pages/my/my')
                }, 1500);
            }
        })
    },
    async getPriceSet() {
        await wx.p.request({
            method: 'POST',
            url: app.globalData.api + 'app/getPriceSet'
        }).then(res => {
            this.setData({
                positionPrice1: res.data.positionPrice1,
                positionPrice2: res.data.positionPrice2,
                positionPrice3: res.data.positionPrice3,
                positionPrice4: res.data.positionPrice4,
                skillPrice1: res.data.skillPrice1,
                skillPrice2: res.data.skillPrice2,
                skillPrice3: res.data.skillPrice3,
                skillPrice4: res.data.skillPrice4
            })
        })
    },
    async updateSkillPrice() {
        await wx.p.request({
            method: 'POST',
            url: app.globalData.api + 'app/updateSkillPrice',
            data: {
                skillPrice1: this.data.skillPrice1,
                skillPrice2: this.data.skillPrice2,
                skillPrice3: this.data.skillPrice3,
                skillPrice4: this.data.skillPrice4
            }
        }).then(res => {
            if (res.data.success) {
                Toast('设置成功！')
                this.editSkillPrice()
            } else {
                Toast(res.data.msg)
            }
        })
    },
    async updatePositionPrice() {
        await wx.p.request({
            method: 'POST',
            url: app.globalData.api + 'app/updatePositionPrice',
            data: {
                positionPrice1: this.data.positionPrice1,
                positionPrice2: this.data.positionPrice2,
                positionPrice3: this.data.positionPrice3,
                positionPrice4: this.data.positionPrice4,
            }
        }).then(res => {
            if (res.data.success) {
                Toast('设置成功！')
                this.editPositionPrice()
            } else {
                Toast(res.data.msg)
            }
        })
    },
    editSkillPrice() {
        this.setData({
            skillReadonly: !this.data.skillReadonly
        })
    },
    editPositionPrice() {
        this.setData({
            positionReadonly: !this.data.positionReadonly
        })
    },
    setSkillPrice() {
        if (this.data.skillPrice1 == '' || this.data.skillPrice2 == '' || this.data.skillPrice3 == '' || this.data.skillPrice4 == '') {
            Toast('请先输入价格！')
        } else if (parseInt(this.data.skillPrice1) >= parseInt(this.data.skillPrice2)) {
            Toast('洗剪吹收费要低于烫发！')
        } else if (parseInt(this.data.skillPrice2) >= parseInt(this.data.skillPrice3)) {
            Toast('烫发收费要低于染发！')
        } else if (parseInt(this.data.skillPrice3) >= parseInt(this.data.skillPrice4)) {
            Toast('烫发收费要低于发型设计！')
        } else {
            this.updateSkillPrice()
        }
    },
    setPositionPrice() {
        if (this.data.positionPrice1 == '' || this.data.positionPrice2 == '' || 
            this.data.positionPrice3 == '' || this.data.positionPrice4 == '') {
            Toast('请先输入价格！')
        } else if (parseInt(this.data.positionPrice1) >= parseInt(this.data.positionPrice2)) {
            Toast('初级理发师手艺费要低于中级理发师！')
        } else if (parseInt(this.data.positionPrice2) >= parseInt(this.data.positionPrice3)) {
            Toast('中级理发师手艺费要低于高级理发师！')
        } else if (parseInt(this.data.positionPrice3) >= parseInt(this.data.positionPrice4)) {
            Toast('高级理发师手艺费要低于总监！')
        } else {
            this.updatePositionPrice()
        }
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
    onReady: function (options) {
        wx.setNavigationBarTitle({
            title: this.data.query.title,
        })
        this.getPriceSet()
    },
})