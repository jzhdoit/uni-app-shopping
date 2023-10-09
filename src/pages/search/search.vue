<script setup>
import { getHistoryList, setHistoryList } from '@/utils/search'
import { ref } from 'vue'

const search = ref('')
let history = getHistoryList()
const historyList = ref(history)
const goSearch = (key) => {
  if (!key) return
  const index = history.indexOf(key)
  if (index !== -1) {
    // 存在相同的项，将原有关键词移除
    // splice
    history.splice(index, 1)
  }
  history.unshift(key)
  setHistoryList(history)
  uni.switchTab({ url: `/pages/index/index` })
}

const del = () => {
  historyList.value = []
  setHistoryList([])
  uni.showToast({ title: '清空历史成功' })
}
</script>
<template>
  <view class="search">
    <view class="search-input">
      <uni-icons type="search" color="#777" size="30" />
      <input v-model="search" class="uni-input" focus placeholder="请输入需要搜索的商品" />
      <button @tap="goSearch(search)">搜索</button>
    </view>
    <view class="search-history" v-if="history?.length > 0">
      <view class="title">
        <text>最近搜索</text>
        <uni-icons @click="del" type="trash-filled" size="25"></uni-icons>
      </view>
      <view class="list">
        <view v-for="item in historyList" :key="item" class="list-item" @click="goSearch(item)">{{
          item
        }}</view>
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.search {
  margin: 10px 10px;
}
.search-input {
  font-size: 20px;
  height: 47px;
  display: flex;
  align-items: center;
  .uni-icons {
    margin-right: 5px;
  }
  .uni-input {
    background-color: #f8f8f8;
    flex: 1;
    font-size: 20px;
    height: 47px;
    align-items: center;
  }
  button {
    height: 47px;
    font-size: 20px;
    border-radius: 0 7px 7px 0;
    background: #fa2209;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.search-history {
  margin: 10px 0;
}
.title {
  height: 40px;
  line-height: 40px;
  font-size: 22px;
  display: flex;
  color: #777;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
}
.list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 10px 10px;
  gap: 5%;
}
.list-item {
  width: 30%;
  text-align: center;
  padding: 7px;
  line-height: 20px;
  border-radius: 50px;
  background: #fff;
  font-size: 19px;
  border: 1px solid #efefef;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 10px;
}
</style>
