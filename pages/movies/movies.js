// pages/movies/movies.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheaterUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3"
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3"
    var top250 = app.globalData.doubanBase + 
      "/v2/movie/top250" + "?start=0&count=3"
    
    this.getMovieListData(inTheaterUrl, "inTheaters")
    this.getMovieListData(comingSoonUrl, "comingSoon")
    this.getMovieListData(top250, "top250")
  },

  getMovieListData: function(url, settedKey){
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res)
        that.processDouban(res, settedKey)
      },
      fail: function () {
        console.log('fail')
      }
    })
  },

  processDouban: function (moviesDouban, settedKey){
    var movies = []
    for(var idx in moviesDouban.data.subjects){
      var subject = moviesDouban.data.subjects[idx]
      var title = subject.title
      if(title.length >= 6){
        title = title.substring(0, 6) + "..."
      }
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var readyData = {}
    readyData[settedKey] = {
      movies: movies
    }
    this.setData(readyData)
  }

})