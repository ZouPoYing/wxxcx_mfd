import { createStoreBindings } from "mobx-miniprogram-bindings"
import { store } from "../../store/store"
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

var dataUtil = require('../../utils/dataUtil.js')
var app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        query: {},
        value: 0,
        info: {},
        fileId: '',
        img: '',
        imgFile: [],
        message: ''
    },
    onChange(event) {
        this.setData({
            value: event.detail
        })
    },
    deleteImg() {
        this.setData({
            img: '',
            imgFile: []
        })
        Toast('删除成功')
    },
    uploadImg(event) {
        var that = this
        var files = event.detail;
        var fileIndex = files.file.path.lastIndexOf(".");
        var fileNameLength = files.file.path.length;
        var fileFormat = files.file.path.substring(fileIndex + 1, fileNameLength);
        var file = []
        file.push(files.file)
        that.setData({
            imgFile : file,
            fileType : fileFormat
        })
        const fileSystemManager = wx.getFileSystemManager()
        fileSystemManager.readFile({
            filePath: files.file.path, // 例如图片临时路径
            encoding: 'base64',
            success (res) {
                that.setData({
                    file: res.data
                })
                that.upload()
            }
        })
    },
    initPage() {
        this.getOrderDetailByOrderId()
    },
    async evaluate() {
        if (this.data.query.order_id == '') {
            Toast('订单编号不能为空')
            return
        } else if (this.data.value == 0) {
            Toast('请先选择评级')
            return
        } else if (this.data.img == '') {
            Toast('请先上传图片')
            return
        } else if (this.data.message == '') {
            Toast('请先填写评价内容')
            return
        }
        await wx.p.request({
          method: 'POST',
          url: app.globalData.api + 'evaluate/evaluate',
          data: {
            orderId: this.data.query.order_id,
            level: this.data.value,
            img: this.data.img,
            message: this.data.message
          }
        }).then(res => {
            if (res.data.success) {
                Toast('评价成功')
                this.gotoTab('/pages/order/order')
            } else {
                Toast(res.data.msg || res.data.message)
            }
        })
    },
    async getOrderDetailByOrderId() {
        await wx.p.request({
          method: 'POST',
          url: app.globalData.api + 'order/getOrderDetailByOrderId',
          data: {
            orderId: this.data.query.order_id
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
    async upload() {
        await wx.p.request({
          method: 'POST',
          url: app.globalData.api + 'file/upload',
          data: {
              file: this.data.file,
              userId: this.data.userInfo.userId,
              fileType: this.data.fileType
          }
        }).then(res => {
            if (res.data.success) {
                this.setData({
                    fileId: res.data.fileId,
                    img: res.data.fileId
                })
                Toast('上传成功')
            } else {
                Toast(res.data.msg)
            }
        })
    },
    gotoUrl(url) {
        wx.navigateTo({
          url: url
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
        this.setData({
            query: options
        })
    },
    onUnload: function () {
        this.storeBindings.destroyStoreBindings()
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