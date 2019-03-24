// pages/movies/movies.js
var app = getApp();
var util = require('../utils/util.js')
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
    
    this.getMovieListData(inTheaterUrl, "inTheaters", "正在热映")
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映")
    this.getMovieListData(top250, "top250", "豆瓣Top250")
  },

  getMovieListData: function (url, settedKey, categoryTitle){
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res)
        that.processDouban(res, settedKey, categoryTitle)
      },
      fail: function () {
        console.log('fail')
      }
    })
  },

  processDouban: function (moviesDouban, settedKey, categoryTitle){
    var movies = []
    for(var idx in moviesDouban.data.subjects){
      var subject = moviesDouban.data.subjects[idx]
      var title = subject.title
      if(title.length >= 6){
        title = title.substring(0, 6) + "..."
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var readyData = {}
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData)
  }

})