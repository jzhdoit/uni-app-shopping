<!--
此文件为开发者工具生成，生成时间: 2023/10/3下午3:06:33
使用方法：
在 D:\前端文件夹\uniapp练习文件夹\heima-shop\dist\dev\mp-weixin\pagesOrder\detail\detail.wxml 引入模板

```
<import src="detail.skeleton.wxml"/>
<template is="skeleton" wx:if="{{loading}}" />
```

在 D:\前端文件夹\uniapp练习文件夹\heima-shop\dist\dev\mp-weixin\pagesOrder\detail\detail.wxss 中引入样式
```
@import "./detail.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
-->
<template name="skeleton">
  <view class="sk-container">
    <view class="navbar" style="padding-top: 44px">
      <view class="wrap">
        <navigator
          class="back icon-left sk-pseudo sk-pseudo-circle"
          open-type="navigateBack"
        ></navigator>
        <view class="title sk-transparent sk-text-14-2857-706 sk-text">订单详情</view>
      </view>
    </view>
    <scroll-view :scroll-y="true" class="viewport" id="scroller" :enable-back-to-top="true">
      <view class="overview sk-image" style="padding-top: 64px">
        <view class="status sk-transparent sk-text-0-0000-799 sk-text">待发货</view>
        <view class="button-group">
          <navigator
            class="button sk-transparent sk-text-28-1250-95 sk-text"
            hover-class="none"
            style="background-position-x: 50%"
          >
            再次购买
          </navigator>
          <view
            class="button sk-transparent sk-text-28-1250-914 sk-text"
            style="background-position-x: 50%"
          >
            模拟发货
          </view>
        </view>
      </view>
      <view class="shipment">
        <view class="locate sk-image">
          <view class="user sk-transparent sk-text-14-2857-33 sk-text">123456 13744243233</view>
          <view class="address sk-transparent sk-text-14-2857-346 sk-text"
            >北京市 北京市 西城区阿瑟打完23</view
          >
        </view>
      </view>
      <view class="goods">
        <view class="item">
          <navigator class="navigator" hover-class="none">
            <image class="cover sk-image"></image>
            <view class="meta">
              <view class="name ellipsis sk-transparent sk-text-14-2857-465 sk-text"
                >ins风小碎花泡泡袖衬110-160cm</view
              >
              <view class="type sk-transparent sk-text-22-2222-597 sk-text">藏青小花， 130</view>
              <view class="price">
                <view class="actual">
                  <text class="symbol sk-transparent sk-opacity">¥</text>
                  <text class="sk-transparent sk-text-14-2857-283 sk-text">99</text>
                </view>
              </view>
              <view class="quantity sk-transparent sk-opacity">x1</view>
            </view>
          </navigator>
        </view>
        <view class="total">
          <view class="row">
            <view class="text sk-transparent sk-text-0-0000-628 sk-text">商品总价: </view>
            <view
              class="symbol sk-transparent sk-text-0-0000-747 sk-text sk-pseudo sk-pseudo-circle"
              >99</view
            >
          </view>
          <view class="row">
            <view class="text sk-transparent sk-text-0-0000-742 sk-text">运费: </view>
            <view class="symbol sk-transparent sk-text-0-0000-15 sk-text sk-pseudo sk-pseudo-circle"
              >5</view
            >
          </view>
          <view class="row">
            <view class="text sk-transparent sk-text-0-0000-149 sk-text">应付金额: </view>
            <view
              class="symbol primary sk-transparent sk-text-0-0000-813 sk-text sk-pseudo sk-pseudo-circle"
              >104</view
            >
          </view>
        </view>
      </view>
      <view class="detail">
        <view class="title sk-transparent sk-text-0-0000-337 sk-text">订单信息</view>
        <view class="row">
          <view class="item sk-transparent">
            订单编号: 1709050152884375553
            <text class="copy sk-transparent sk-text-0-0000-859 sk-text">复制</text>
          </view>
          <view class="item sk-transparent sk-text-0-0000-940 sk-text"
            >下单时间: 2023-10-03 11:38:04</view
          >
        </view>
      </view>
      <view is="components/XtxGuess" class="r">
        <view class="caption XtxGuess--caption data-v-e94a02da XtxGuess--data-v-e94a02da">
          <text
            class="text XtxGuess--text data-v-e94a02da XtxGuess--data-v-e94a02da sk-transparent sk-text-0-0000-981 sk-text sk-pseudo sk-pseudo-circle"
            >猜你喜欢</text
          >
        </view>
        <view class="guess XtxGuess--guess data-v-e94a02da XtxGuess--data-v-e94a02da">
          <navigator
            class="guess-item XtxGuess--guess-item data-v-e94a02da XtxGuess--data-v-e94a02da"
          >
            <image
              class="image XtxGuess--image data-v-e94a02da XtxGuess--data-v-e94a02da sk-image"
              mode="aspectFill"
            ></image>
            <view
              class="name XtxGuess--name data-v-e94a02da XtxGuess--data-v-e94a02da sk-transparent sk-text-14-2857-713 sk-text"
              >囤货装云珍·轻软旅行长绒棉毛巾6条装</view
            >
          </navigator>
          <navigator
            class="guess-item XtxGuess--guess-item data-v-e94a02da XtxGuess--data-v-e94a02da"
          >
            <image
              class="image XtxGuess--image data-v-e94a02da XtxGuess--data-v-e94a02da sk-image"
              mode="aspectFill"
            ></image>
            <view
              class="name XtxGuess--name data-v-e94a02da XtxGuess--data-v-e94a02da sk-transparent sk-text-14-2857-516 sk-text"
              >【新疆棉】简约山形纹全棉提花毛巾</view
            >
          </navigator>
        </view>
      </view>
      <view class="toolbar" style="padding-bottom: 34px">
        <navigator
          class="button secondary sk-transparent sk-text-14-2857-377 sk-text"
          hover-class="none"
        >
          再次购买
        </navigator>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
/*
此文件为开发者工具生成，生成时间: 2023/10/3下午3:06:33

在 D:\前端文件夹\uniapp练习文件夹\heima-shop\dist\dev\mp-weixin\pagesOrder\detail\detail.wxss 中引入样式
```
@import "./detail.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
*/
/* #ifdef H5 || APP-PLUS */
@import '../styles/detail.scss';

/* #endif */
.sk-transparent {
  color: transparent !important;
}
.sk-text-14-2857-706 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 44.8rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-0-0000-799 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 36rpx;
  position: relative !important;
}
.sk-text-28-1250-95 {
  background-image: linear-gradient(
    transparent 28.125%,
    #eeeeee 0%,
    #eeeeee 71.875%,
    transparent 0%
  ) !important;
  background-size: 100% 64rpx;
  position: relative !important;
}
.sk-text-28-1250-914 {
  background-image: linear-gradient(
    transparent 28.125%,
    #eeeeee 0%,
    #eeeeee 71.875%,
    transparent 0%
  ) !important;
  background-size: 100% 64rpx;
  position: relative !important;
}
.sk-text-14-2857-33 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-346 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-14-2857-465 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-22-2222-597 {
  background-image: linear-gradient(
    transparent 22.2222%,
    #eeeeee 0%,
    #eeeeee 77.7778%,
    transparent 0%
  ) !important;
  background-size: 100% 43.2rpx;
  position: relative !important;
}
.sk-opacity {
  opacity: 0 !important;
}
.sk-text-14-2857-283 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 33.6rpx;
  position: relative !important;
}
.sk-text-0-0000-628 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 26rpx;
  position: relative !important;
}
.sk-text-0-0000-747 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 26rpx;
  position: relative !important;
}
.sk-text-0-0000-742 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 26rpx;
  position: relative !important;
}
.sk-text-0-0000-15 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 26rpx;
  position: relative !important;
}
.sk-text-0-0000-149 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 26rpx;
  position: relative !important;
}
.sk-text-0-0000-813 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 36rpx;
  position: relative !important;
}
.sk-text-0-0000-337 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 30rpx;
  position: relative !important;
}
.sk-text-0-0000-859 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 20rpx;
  position: relative !important;
}
.sk-text-0-0000-940 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 26rpx;
  position: relative !important;
}
.sk-text-0-0000-981 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 32rpx;
  position: relative !important;
}
.sk-text-14-2857-713 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-516 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-text-14-2857-377 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 36.4rpx;
  position: relative !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
