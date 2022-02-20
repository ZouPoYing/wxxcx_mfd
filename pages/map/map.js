Page({
    data: {
        query: [],
        points: [],
        markers: [
            {
                id: 1,
                latitude: 23.099994,
                longitude: 113.324520,
                name: '咕咕理发店',
                callout: {
                    content: '咕咕理发店',
                    borderWidth: 1,
                    borderRadius: 5,
                    display: 'ALWAYS'
                }
            }
        ],
        covers: [{
            latitude: 23.099994,
            longitude: 113.344520,
            iconPath: '/image/location.png'
        }, {
            latitude: 23.099994,
            longitude: 113.304520,
            iconPath: '/image/location.png'
        }]
    },
    onReady: function (e) {
        this.mapCtx = wx.createMapContext('myMap')
    },
    getCenterLocation: function () {
        this.mapCtx.getCenterLocation({
            success: function (res) {
                console.log(res.longitude)
                console.log(res.latitude)
            }
        })
    },
    moveToLocation: function () {
        this.mapCtx.moveToLocation()
    },
    translateMarker: function () {
        this.mapCtx.translateMarker({
            markerId: 1,
            autoRotate: true,
            duration: 1000,
            destination: {
                latitude: 23.10229,
                longitude: 113.3345211,
            },
            animationEnd() {
                console.log('animation end')
            }
        })
    },
    includePoints: function () {
        this.mapCtx.includePoints({
            padding: [10],
            points: [{
                latitude: 23.10229,
                longitude: 113.3345211,
            }, {
                latitude: 23.00229,
                longitude: 113.3345211,
            }]
        })
    },
    onLoad: function (options) {
        var that = this
        this.setData({
            query: options
        })
        wx.getLocation({
            success: function (res) {
                var marker = [{
                    latitude: res.latitude,
                    longitude: res.longitude
                }]
                var points = [
                    {
                      latitude: res.latitude,
                      longitude: res.longitude
                    },
                    {
                      latitude: that.data.markers[0].latitude,
                      longitude: that.data.markers[0].longitude
                    }
                ]
                that.setData({
                    markers: [...that.data.markers,...marker],
                    points: points
                })
            }
        })
    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: this.data.query.title,
        })
    }
})