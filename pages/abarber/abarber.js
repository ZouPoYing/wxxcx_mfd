import { createStoreBindings } from "mobx-miniprogram-bindings"
import { store } from "../../store/store"
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

var dataUtil = require('../../utils/dataUtil.js')
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isMod: false,
        fileType: '',
        file: '',
        fileId: '',
        query: {},
        info: [],
        head: '',
        headFile: [],
        back: '',
        backFile: [],
        barber_name: '',
        skill: '',
        skillOptions: ['洗剪吹','烫发','染发','发型设计'],
        showSkill: false,
        star_time: '',
        showStarTime: false,
        currentDate: '',
        end_time: '',
        showEndTime: false,
        is_work: '',
        isWorkOptions: ['是','否'],
        showIsWork: false,
        position: '',
        positionOptions: ['初级发型师','中级发型师','高级发型师','总监'],
        showPosition: false,
        describe: ''
    },
    addBarber() {
        if (this.data.head === '') {
            Toast('请先上传头像')
        } else if (this.data.back === '') {
            Toast('请先上传背景')
        } else if (this.data.barber_name === '') {
            Toast('请先输入姓名')
        } else if (this.data.skill === '') {
            Toast('请先选择技能')
        } else if (this.data.star_time === '') {
            Toast('请先选择上班时间')
        } else if (this.data.end_time === '') {
            Toast('请先选择下班时间')
        } else if (this.data.is_work === '') {
            Toast('请先选择是否在职')
        } else if (this.data.position === '') {
            Toast('请先选择职位')
        } else if (this.data.describe === '') {
            Toast('请先输入描述内容')
        } else {
            this.insertBarber()
            this.gotoUrl('/pages/mbarbers/mbarbers?title=理发师管理')
        }
    },
    async getBarberByBarberId(barberId) {
        await wx.p.request({
          method: 'POST',
          url: app.globalData.api + 'barber/getBarberByBarberId',
          data: {
              barberId: barberId
          }
        }).then(res => {
            if (res.data.success) {
                var headFile = [{url: '',name: ''}]
                var backFile = [{url: '',name: ''}]
                headFile[0].url = res.data.barber_head
                backFile[0].url = res.data.barber_back
                this.setData({
                    head: res.data.head,
                    back: res.data.back,
                    barber_name: res.data.barber_name,
                    skill: res.data.skill,
                    star_time: res.data.star_time,
                    end_time: res.data.end_time,
                    is_work: res.data.is_work,
                    position: res.data.position,
                    describe: res.data.describe,
                    headFile: headFile,
                    backFile: backFile
                })
            } else {
                Toast(res.data.msg)
            }
        })
    },
    async insertBarber() {
        await wx.p.request({
          method: 'POST',
          url: app.globalData.api + 'barber/insertBarber',
          data: {
              head: this.data.head,
              back: this.data.back,
              barberName: this.data.barber_name,
              skill: this.data.skill,
              starTime: this.data.star_time,
              endTime: this.data.end_time,
              isWork: this.data.is_work,
              position: this.data.position,
              describe: this.data.describe,
              isMod: this.data.isMod,
              barberId: this.data.query.barberId
          }
        }).then(res => {
            if (res.data.success) {
                Toast('操作成功')
            } else {
                Toast(res.data.msg)
            }
        })
    },
    async upload(p) {
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
                if (p == 'head') {
                    this.setData({
                        fileId: res.data.fileId,
                        head: res.data.fileId
                    })
                } else {
                    this.setData({
                        fileId: res.data.fileId,
                        back: res.data.fileId
                    })
                }
                Toast('上传成功')
            } else {
                Toast(res.data.msg)
            }
        })
    },
    deleteHead() {
        this.setData({
            head: '',
            headFile: []
        })
        Toast('删除成功')
    },
    deleteBack() {
        this.setData({
            back: '',
            backFile: []
        })
        Toast('删除成功')
    },
    uploadHead(event) {
        var that = this
        var files = event.detail;
        var fileIndex = files.file.path.lastIndexOf(".");
        var fileNameLength = files.file.path.length;
        var fileFormat = files.file.path.substring(fileIndex + 1, fileNameLength);
        var file = []
        file.push(files.file)
        that.setData({
            headFile : file,
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
                that.upload('head')
            }
        })
    },
    uploadBack(event) {
        var that = this
        var files = event.detail;
        var fileIndex = files.file.path.lastIndexOf(".");
        var fileNameLength = files.file.path.length;
        var fileFormat = files.file.path.substring(fileIndex + 1, fileNameLength);
        var file = []
        file.push(files.file)
        that.setData({
            backFile : file,
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
                that.upload('back')
            }
        })
    },
    confirmS(event) {
        this.setData({
          star_time: event.detail,
        })
        this.showStarTime()
    },
    showStarTime() {
        this.setData({ showStarTime: !this.data.showStarTime });
    },
    confirmE(event) {
        this.setData({
          end_time: event.detail,
        })
        this.showEndTime()
    },
    showEndTime() {
        this.setData({ showEndTime: !this.data.showEndTime });
    },
    skillChange(event) {
        const { picker, value, index } = event.detail;
        this.setData({
            skill: value
        })
        this.showSkill()
    },
    showSkill() {
        this.setData({ showSkill: !this.data.showSkill });
    },
    isWorkChange(event) {
        const { picker, value, index } = event.detail;
        this.setData({
            is_work: value
        })
        this.showIsWork()
    },
    showIsWork() {
        this.setData({ showIsWork: !this.data.showIsWork });
    },
    positionChange(event) {
        const { picker, value, index } = event.detail;
        this.setData({
            position: value
        })
        this.showPosition()
    },
    showPosition() {
        this.setData({ showPosition: !this.data.showPosition });
    },
    gotoUrl(url) {
        wx.navigateTo({
          url: url
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
        if (options.barberId !== undefined) {
            this.getBarberByBarberId(options.barberId)
            this.setData({
                isMod: true
            })
        }
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
        this.setData({
            currentDate: dataUtil.getNowHoursAndMinutes()
        })
    }
})