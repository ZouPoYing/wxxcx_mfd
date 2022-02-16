import {action, observable} from "mobx-miniprogram"

export const store = observable({
    userInfo: [],
    userType: '游客',
    activeTabbarIndex: 0,
    setUserInfo : action(function (v) {
        this.userInfo = v
    }),
    setUserType : action(function (v) {
        this.userType = v
    }),
    updateActiveTabbarIndex : action(function (v) {
        this.activeTabbarIndex = v
    })
})