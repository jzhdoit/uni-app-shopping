const HISTORY_KEY = 'history_list'

export const getHistoryList = () => {
  const result = uni.getStorageSync(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}
export const setHistoryList = (arr: []) => {
  uni.setStorageSync(HISTORY_KEY, JSON.stringify(arr))
}
