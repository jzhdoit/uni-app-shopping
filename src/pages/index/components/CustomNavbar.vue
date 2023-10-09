<script setup lang="ts">
import { ref } from 'vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<template>
  <view class="navbar" :style="{ paddingTop: safeAreaInsets!.top + 10 + 'px' }">
    <!-- logo文字 -->
    <view class="logo">
      <!-- <image class="logo-image" src="@/static/images/logo.png"></image> -->
      <text class="logo-text">新鲜 · 亲民 · 快捷</text>
    </view>
    <!-- 搜索条 -->

    <navigator
      class="search"
      url="/pages/search/search"
      open-type="navigate"
      hover-class="navigator-hover"
    >
      <text class="icon-search">搜索商品</text>
      <text class="icon-scan"></text>
    </navigator>
  </view>
</template>

<style lang="scss">
@import '../styles/customNav.scss';
</style>
