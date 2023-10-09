<script setup lang="ts">
import { getMemberProfileAPI, putMemberProfileAPI } from '@/services/profile'
import { useMemberStore } from '@/stores'
import type { Gender, ProfileDetail } from '@/types/member'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const MemberStore = useMemberStore()
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 获取个人信息
const profile = ref<ProfileDetail>({} as ProfileDetail)
const getMemberProfileData = async () => {
  const res = await getMemberProfileAPI()
  profile.value = res.result
}
//修改性别
const onGenderChange: UniHelper.RadioGroupOnChange = (e) => {
  profile.value.gender = e.detail.value as Gender
}
//修改生日
const onBirthdayChange: UniHelper.DatePickerOnChange = (e) => {
  profile.value.birthday = e.detail.value
}
// 修改城市

// #ifdef MP-WEIXIN
let fullLocationCode = ['', '', '']
const onFullLocationChange: UniHelper.RegionPickerOnChange = (ev) => {
  //修改前端界面
  profile.value.fullLocation = ev.detail.value.join(' ')
  //提交后端更新
  fullLocationCode = ev.detail.code!
}
// #endif

// #ifdef H5 || APP-PLUS
const fullLocationCodeH5 = ref({
  provinceCode: '',
  cityCode: '',
  countyCode: '',
})
const onCityChange: UniHelper.UniDataPickerOnChange = (ev) => {
  //修改前端界面
  // profile.value.fullLocation = ev.detail.value.map((v) => v.text).join(' ')
  //提交后端更新
  const [provinceCode, cityCode, countyCode] = ev.detail.value.map((v) => v.value)
  Object.assign(fullLocationCodeH5.value, { provinceCode, cityCode, countyCode })
}
// #endif
//修改头像
const onAvatarChange = () => {
  // #ifdef MP-WEIXIN
  // uni.chooseMedia 仅支持微信小程序端
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    success: (res) => {
      const { tempFilePath } = res.tempFiles[0]
      //文件上传
      uploadFile(tempFilePath)
    },
  })
  // #endif
  // #ifdef H5 || APP-PLUS
  // 微信小程序从基础库 2.21.0 开始， wx.chooseImage 停止维护，请使用 uni.chooseMedia 代替
  uni.chooseImage({
    count: 1,
    success: (res) => {
      // 文件路径
      const tempFilePaths = res.tempFilePaths
      // 上传
      uploadFile(tempFilePaths[0])
    },
  })
  // #endif
}
// 文件上传-兼容小程序端、H5端、App端
const uploadFile = (file: string) => {
  //文件上传
  uni.uploadFile({
    url: '/member/profile/avatar',
    name: 'file', // 后端数据字段名
    filePath: file, // 新头像
    success: (res) => {
      if (res.statusCode === 200) {
        const { avatar } = JSON.parse(res.data).result
        profile.value!.avatar = avatar

        MemberStore.profile!.avatar = avatar
        uni.showToast({ icon: 'none', title: '更新成功' })
      } else {
        uni.showToast({ icon: 'none', title: '出现错误' })
      }
    },
  })
}
// 点击保存提交表单
const onSubmit = async () => {
  const { nickname, gender, birthday, profession } = profile.value
  const res = await putMemberProfileAPI({
    nickname,
    gender,
    birthday,
    profession,
    provinceCode: fullLocationCodeH5.value.provinceCode,
    cityCode: fullLocationCodeH5.value.cityCode,
    countyCode: fullLocationCodeH5.value.countyCode,
  })
  MemberStore.profile!.nickname = res.result.nickname
  uni.showToast({ icon: 'none', title: '保存成功' })
  setTimeout(() => {
    uni.navigateBack()
  }, 500)
}
onLoad(() => {
  getMemberProfileData()
})
</script>
<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <navigator open-type="navigateBack" hover-class="navigator-hover" class="back icon-left">
      </navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar">
      <view class="avatar-content" @tap="onAvatarChange">
        <image class="image" :src="profile?.avatar" mode="aspectFill" />
        <text class="text">点击修改头像</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ profile?.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input type="text" class="input" placeholder="请填写昵称" v-model="profile.nickname" />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onGenderChange">
            <label class="radio" for="">
              <radio :value="'男'" :checked="profile?.gender === '男'" color="#27ba9b" />
            </label>
            <label class="radio" for="">
              <radio :value="'女'" :checked="profile?.gender === '女'" color="#27ba9b" />
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            class="picker"
            mode="date"
            :value="profile?.birthday"
            start="1900-01-01"
            :end="new Date()"
            @change="onBirthdayChange"
          >
            <view v-if="profile?.birthday">{{ profile.birthday }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <!-- #ifdef MP-WEIXIN -->
          <picker
            @change="onFullLocationChange"
            mode="region"
            class="picker"
            :value="profile?.fullLocation?.split(' ')"
          >
            <view v-if="profile?.fullLocation">{{ profile?.fullLocation }}</view>
            <view class="placeholder" v-else>请选择城市</view>
          </picker>
          <!-- #endif -->
          <!-- #ifdef H5 || APP-PLUS -->
          <uni-data-picker
            :clear-icon="false"
            placeholder="请选择地址"
            popup-title="请选择城市"
            collection="opendb-city-china"
            field="code as value, name as text"
            orderby="value asc"
            :step-searh="true"
            self-field="code"
            parent-field="parent_code"
            @change="onCityChange"
            v-model="fullLocationCodeH5.countyCode"
          >
          </uni-data-picker>
          <!-- #endif -->
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input class="input" type="text" placeholder="请填写职业" v-model="profile.profession" />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button" @tap="onSubmit">保 存</button>
    </view>
  </view>
</template>
<style lang="scss">
// #ifdef H5||APP-PLUS
:deep(.selected-area) {
  height: auto;
  flex: 0 1 auto;
}
//  #endif
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
