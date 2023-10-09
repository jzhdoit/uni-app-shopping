<script setup lang="ts">
import type { CategoryItem } from '@/types/home'

defineProps<{
  list: CategoryItem[]
}>()
</script>
<template>
  <div class="category">
    <navigator
      class="category-item"
      url="/pages/category/category"
      open-type="switchTab"
      hover-class="navigator-hover"
      v-for="item in list"
      :key="item.id"
    >
      <image class="icon" :src="item.icon"></image>
      <text class="text">{{ item.name }}</text>
    </navigator>
  </div>
</template>
<style lang="scss" scoped>
@import '../styles/category.scss';
</style>
