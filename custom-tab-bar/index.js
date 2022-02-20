import { storeBindingsBehavior } from "mobx-miniprogram-bindings"
import { store } from "../store/store"

var app = getApp();

Component({
    options: {
        styleIsolation: 'shared'
    },
    behaviors: [storeBindingsBehavior],
    storeBindings: {
        store,
        fields: {
            active: 'activeTabbarIndex'
        },
        actions: {
            updateActive: 'updateActiveTabbarIndex'
        }
    },
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        list: [
            {
              "pagePath": "/pages/home/home",
              "text": "首页",
              "iconPath": "/images/tabbar/home.png",
              "selectedIconPath": "/images/tabbar/home-active.png",
            },
            {
              "pagePath": "/pages/haircut/haircut",
              "text": "剪发",
              "iconPath": "/images/tabbar/haircut.png",
              "selectedIconPath": "/images/tabbar/haircut-active.png"
            },
            {
                "pagePath": "/pages/order/order",
                "text": "订单",
                "iconPath": "/images/tabbar/order.png",
                "selectedIconPath": "/images/tabbar/order-active.png"
              },
            {
              "pagePath": "/pages/my/my",
              "text": "我的",
              "iconPath": "/images/tabbar/my.png",
              "selectedIconPath": "/images/tabbar/my-active.png"
            }
          ]
    },
    lifetimes: {
      ready: function() {
        this.getAppTabbar()
      }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onChange(event) {
            this.updateActive(event.detail)
            wx.switchTab({
              url: this.data.list[event.detail].pagePath,
            })
        },
        async getAppTabbar() {
          await wx.p.request({
            method: 'POST',
            url: app.globalData.api + 'app/getAppTabbar'
          }).then(res => {
            this.setData({
              list: res.data
            })
          })
        }
    }
})