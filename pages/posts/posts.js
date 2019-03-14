// require引入外部文件只能用相对路径
var postsData = require('../../data/posts-data.js') 

// pages/posts/posts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      posts_key: postsData.postList
    });
  },

  onPostTap: function(event){
    var postId = event.currentTarget.dataset.postId;
    console.log("on post ie is =" + postId)
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },

  // onSwiperItemTap:function(event){
  //   var postId = event.currentTarget.dataset.postId;
  //   console.log("on post ie is =" + postId)
  //   wx.navigateTo({
  //     url: 'post-detail/post-detail?id=' + postId,
  //   })
  // },

  onSwiperTap:function(event){
    // target和currentTarget
    // target指的是当前点击的组件，currentTarget指的是事件捕获的组件
    // target这里指的是Image， currentTarget指的是swiper
    var postId = event.target.dataset.postId;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  }

  
})