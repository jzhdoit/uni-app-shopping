<script setup lang="ts">
import { getMemberAddressAPI } from '@/services/address'
import { useAddressStore } from '@/stores/modules/address'
import type { AddressItem } from '@/types/address'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
// 获取收货地址列表数据
const addressList = ref<AddressItem[]>([])
const getMemberAddressData = async () => {
  const res = await getMemberAddressAPI()
  addressList.value = res.result
  console.log(addressList.value)
}
// 修改收货地址
const onChangeAddress = (item: AddressItem) => {
  const addressStore = useAddressStore()
  addressStore.changeSelectedAddress(item)
  emit('close')
}
// 初始化调用(页面显示)
onShow(() => {
  getMemberAddressData()
})
const emit = defineEmits<{
  (ev: 'close'): void
}>()
</script>

<template>
  <view class="address-panel">
    <!-- 关闭按钮 -->
    <text class="close icon-close" @tap="emit('close')"></text>
    <!-- 标题 -->
    <view class="title">配送至</view>
    <!-- 内容 -->
    <view class="content">
      <view class="item" @tap="onChangeAddress(item)" v-for="item in addressList" :key="item.id">
        <view class="user">
          {{ item.receiver }}
          <text class="contact">{{ item.contact }}</text>
          <text v-if="item.isDefault" class="badge">默认</text>
        </view>
        <view class="address">{{ item.fullLocation }}{{ item.address }}</view>
        <text class="icon icon-checked"></text>
      </view>
    </view>
    <view class="footer">
      <view class="button primary">
        <navigator
          url="/pagesMember/address-form/address-form"
          open-type="navigate"
          hover-class="navigator-hover"
        >
          新建地址
        </navigator>
      </view>
    </view>
  </view>
</template>
<style scoped lang="scss">
.address-panel {
  padding: 0 30rpx;
  border-radius: 10rpx 10rpx 0 0;
  position: relative;
  background-color: #fff;
  .close {
    position: absolute;
    right: 24rpx;
    top: 24rpx;
  }

  .title {
    line-height: 1;
    padding: 40rpx 0;
    text-align: center;
    font-size: 32rpx;
    font-weight: normal;
    border-bottom: 1rpx solid #ddd;
    color: #444;
  }
  .content {
    min-height: 300rpx;
    max-height: 540rpx;
    overflow: auto;
    padding: 20rpx;
    .item {
      padding: 30rpx 50rpx 30rpx 60rpx;
      background-size: 45rpx;
      background-repeat: no-repeat;
      background-position: 0 center;
      background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png);
      position: relative;
      .user {
        font-size: 30rpx;
        margin-bottom: 5rpx;
        color: #333;

        .contact {
          color: #666;
        }

        .badge {
          display: inline-block;
          padding: 4rpx 10rpx 2rpx 14rpx;
          margin: 2rpx 0 0 10rpx;
          font-size: 25rpx;
          color: #27ba9b;
          border-radius: 6rpx;
          border: 1rpx solid #27ba9b;
        }
      }
      .address {
        font-size: 26rpx;
        color: #666;
      }
      .icon {
        color: #999;
        font-size: 40rpx;
        transform: translateY(-50%);
        position: absolute;
        top: 50%;
        right: 0;
      }
      .icon-checked {
        color: #27ba9b;
      }
      .icon-ring {
        color: #444;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    padding: 20rpx 0 40rpx;
    font-size: 28rpx;
    color: #444;

    .button {
      flex: 1;
      height: 72rpx;
      text-align: center;
      line-height: 72rpx;
      margin: 0 20rpx;
      color: #fff;
      border-radius: 72rpx;
    }
    .primary {
      color: #fff;
      background-color: #27ba9b;
    }
  }
}
</style>
