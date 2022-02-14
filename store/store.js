import {action, observable} from "mobx-miniprogram"

export const store = observable({
    userInfo: {},
    setUserInfo : action(function (v) {
        this.userInfo = v
    })
})