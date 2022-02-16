import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

// pages/myinfo/myinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: {},
    active: 0,
    steps: [
      {
        text: '第一步',
        desc: '性别',
        options: [
          {
            img: '/images/myinfo/man-active.png',
            value: '男'
          },
          {
            img: '/images/myinfo/woman.png',
            value: '女'
          }
        ]
      },
      {
        text: '第二步',
        desc: '出生年代',
        options: [
          {
            img: '/images/myinfo/man-active.png',
            value: '≥70后'
          },
          {
            img: '/images/myinfo/woman.png',
            value: '80后'
          },
          {
            img: '/images/myinfo/woman.png',
            value: '90后'
          },
          {
            img: '/images/myinfo/woman.png',
            value: '≤00后'
          }
        ]
      },
      {
        text: '第三步',
        desc: '发长',
        options: [
          {
            img: '/images/myinfo/man-active.png',
            value: '短发'
          },
          {
            img: '/images/myinfo/woman.png',
            value: '中发'
          },
          {
            img: '/images/myinfo/woman.png',
            value: '长发'
          }
        ]
      },
      {
        text: '第四步',
        desc: '脸型',
        options: [
          {
            img: '/images/myinfo/man-active.png',
            value: '椭圆形'
          },
          {
            img: '/images/myinfo/woman.png',
            value: '菱形'
          },
          {
            img: '/images/myinfo/woman.png',
            value: '长方形'
          },
          {
            img: '/images/myinfo/woman.png',
            value: '圆形'
          },
          {
            img: '/images/myinfo/woman.png',
            value: '心形'
          },
          {
            img: '/images/myinfo/woman.png',
            value: '其他'
          }
        ]
      },
      {
        text: '第五步',
        desc: '职业',
        options: [
          {
            img: '/images/myinfo/man-active.png',
            value: '程序员'
          },
          {
            img: '/images/myinfo/woman.png',
            value: '市场营销'
          },
          {
            img: '/images/myinfo/woman.png',
            value: '产品运营'
          },
          {
            img: '/images/myinfo/woman.png',
            value: '设计'
          },
          {
            img: '/images/myinfo/woman.png',
            value: '学生'
          },
          {
            img: '/images/myinfo/woman.png',
            value: '公务员'
          },
          {
            img: '/images/myinfo/woman.png',
            value: '行政文员'
          },
          {
            img: '/images/myinfo/woman.png',
            value: '其他'
          }
        ]
      },
      {
        text: '第六步',
        desc: '学历',
        options: [
          {
            img: '/images/myinfo/man-active.png',
            value: '高中及以下'
          },
          {
            img: '/images/myinfo/woman.png',
            value: '大专/本科'
          },
          {
            img: '/images/myinfo/woman.png',
            value: '研究生及以上'
          }
        ]
      }
    ],
  },
  change: function (active,item,index) {
    console.log(active)
    console.log(item)
    console.log(index)
  },
  nextStep: function () {
    if (this.data.active == 5) {
      Toast('已经是最后一步了!')
    } else {
      this.setData({
        active: this.data.active + 1
      })
    }
  },
  prevStep: function () {
    if (this.data.active == 0) {
      Toast('已经是第一步了!')
    } else {
      this.setData({
        active: this.data.active - 1
      })
    }
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
  }
})