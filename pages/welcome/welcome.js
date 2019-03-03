Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  onContainerTap: function(event){
    // 有返回键，生命周期走onHide，不走ubLoad
    // wx.navigateTo({
    //   url: '../posts/posts',
    // })

    // 没有返回键，生命周期走unLoad，不走onHide
    wx.redirectTo({
      url: '../posts/posts',
    })
  }
})