// pages/movies/more-movie/more-movie.js
var app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: {},
    requestUrl: "",
    totalCount: 0,
    isEmpty: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var category = options.category;
    var dataUrl = ''
    switch (category) {
      case '正在热映':
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters"
        break;
      case '即将上映':
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon"
        break;
      case '豆瓣Top250':
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/top250"
        break;

    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData)
    wx.setNavigationBarTitle({
      title: category,
    })
  },

  processDoubanData: function (moviesDouban){
    var movies = []
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx]
      var title = subject.title
      if (title.length >= 6) {
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
    var totalMovies = {}
    // 如果要绑定新加载的数据，需要合并旧的数据
    if(!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies)
    }else{
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    })
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading()
  },
  // 上拉加载
  onScrollLower: function(event){
    var nextUrl = this.data.requestUrl + "?start=" 
    + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData)  
    wx.showNavigationBarLoading()
 },

// 下拉刷新回调函数
 onPullDownRefresh: function(){
   wx.showNavigationBarLoading()
   this.data.isEmpty = true;
   this.data.totalMovies={}
   var pullUrl = this.data.requestUrl + "?start=0&count=20"
   util.http(pullUrl, this.processDoubanData)
   wx.stopPullDownRefresh()
 }


})