import { createStoreBindings } from "mobx-miniprogram-bindings"
import { store } from "../../store/store"
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

var app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [],
        option: [
            { text: '洗剪吹', value: '洗剪吹' },
            { text: '烫发', value: '烫发' },
            { text: '染发', value: '染发' },
            { text: '发型设计', value: '发型设计' }
        ],
        value: '洗剪吹',
        info: []
    },
    initPage() {
        this.getHaircuter()
        this.matchBarberBySkill()
    },
    line(event) {
        if (this.data.userInfo.userId == '' || this.data.userInfo.userId == undefined) {
            Toast('请先登录')
            this.gotoTab('/pages/my/my')
        } else {
            wx.p.request({
                method: 'POST',
                url: app.globalData.api + 'order/insertOrder',
                data: {
                    userId: this.data.userInfo.userId,
                    barberId: event.currentTarget.dataset.barberid,
                    price: event.currentTarget.dataset.price,
                    orderType: event.currentTarget.dataset.ordertype
                }
            }).then(res => {
                if (res.data.success) {
                    Toast('排队成功')
                    this.matchBarberBySkill()
                } else {
                    Toast(res.data.msg || res.data.message)
                }
            })
        }
    },
    skillChange(event) {
        this.setData({
            value: event.detail
        })
        this.matchBarberBySkill()
    },
    async matchBarberBySkill() {
        await wx.p.request({
            method: 'POST',
            url: app.globalData.api + 'barber/matchBarberBySkill',
            data: {
                skill: this.data.value
            }
        }).then(res => {
            this.setData({
                info: res.data
            })
        })
    },
    async getHaircuter() {
        await wx.p.request({
            method: 'POST',
            url: app.globalData.api + 'app/getHaircuter'
        }).then(res => {
            this.setData({
                swiperList: res.data
            })
        })
    },
    onClickRight() {
        this.gotoUrl('/pages/map/map?title=地图找店')
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
        this.storeBindings = createStoreBindings(this, {
            store,
            fields: ['userInfo','userType'],
            actions: ['setUserInfo','setUserType']
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
    onUnload: function () {
        this.storeBindings.destroyStoreBindings()
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.initPage()
    }
})