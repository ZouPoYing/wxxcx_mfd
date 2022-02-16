import { storeBindingsBehavior } from "mobx-miniprogram-bindings"
import { store } from "../store/store"

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
              "text": "home",
              "iconPath": "/images/tabbar/home.png",
              "selectedIconPath": "/images/tabbar/home-active.png",
              info: 2
            },
            {
              "pagePath": "/pages/my/my",
              "text": "my",
              "iconPath": "/images/tabbar/my.png",
              "selectedIconPath": "/images/tabbar/my-active.png"
            }
          ]
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
        }
    }
})