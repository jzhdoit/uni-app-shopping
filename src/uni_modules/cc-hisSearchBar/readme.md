# cc-hisSearchBar

#### 使用方法 
```使用方法
// 不同的业务功能历史记录设置不同存储key
const kStorageKey = "storageKey"

// 执行搜索事件
doSearch() {
if (this.keyword == '') {
uni.showToast({
title: '请输入要搜索的内容',
icon: 'none'
});
return;
}
//
if (this.keyword && this.keyword !== '') {
this.saveKeyword(this.keyword); //保存为历史
}

uni.showLoading({
title: '搜索中...'
});
this.setData({
keywordList: []
});


uni.hideLoading()
uni.showModal({
title: "温馨提示",
content: '搜索的内容 = ' + this.keyword
})

},

//点击历史记录搜索
doHisSearch(item) {
console.log(item)
uni.showModal({
title: '点击的历史搜索条目',
content: '点击的历史搜索条目 = ' + item
})
},

```

#### HTML代码实现部分
```html
<template>
	<view class="content">

		<view class="search-box">
			<view class="input-box">
				<input type="text" adjust-position="true" v-model="keyword" :placeholder="defaultKeyword"
					placeholder-class="search_text" @confirm="doSearch" data-key="false" confirm-type="search"
					@input="onclear"></input>
				<image src="/static/close.png" @tap="clears" v-if="shows == true"></image>
			</view>
			<view class="search-btn" @tap="doSearch" data-key="false" :style="'background:' + colors">搜索</view>
		</view>

		<view class="search-keyword">

			<scroll-view class="keyword-box" scroll-y>
				<view class="keyword-block" v-if="oldKeywordList.length>0">
					<view class="keyword-list-header">
						<view>历史搜索</view>
						<view>
							<image @tap="oldDelete" src="/static/delete.png"></image>
						</view>
					</view>
					<view class="keyword">
						<view v-for="(item, index) in oldKeywordList" :key="index" @tap="doHisSearch(item)">{{item}}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>


<script>
	// 不同的业务功能历史记录设置不同存储key
	const kStorageKey = "storageKey"

	import Vue from 'vue'

	Vue.mixin({
		methods: {
			setData: function(obj, callback) {
				let that = this;
				const handleData = (tepData, tepKey, afterKey) => {
					tepKey = tepKey.split('.');
					tepKey.forEach(item => {
						if (tepData[item] === null || tepData[item] === undefined) {
							let reg = /^[0-9]+$/;
							tepData[item] = reg.test(afterKey) ? [] : {};
							tepData = tepData[item];
						} else {
							tepData = tepData[item];
						}
					});
					return tepData;
				};
				const isFn = function(value) {
					return typeof value == 'function' || false;
				};
				Object.keys(obj).forEach(function(key) {
					let val = obj[key];
					key = key.replace(/\]/g, '').replace(/\[/g, '.');
					let front, after;
					let index_after = key.lastIndexOf('.');
					if (index_after != -1) {
						after = key.slice(index_after + 1);
						front = handleData(that, key.slice(0, index_after), after);
					} else {
						after = key;
						front = that;
					}
					if (front.$data && front.$data[after] === undefined) {
						Object.defineProperty(front, after, {
							get() {
								return front.$data[after];
							},
							set(newValue) {
								front.$data[after] = newValue;
								that.$forceUpdate();
							},
							enumerable: true,
							configurable: true
						});
						front[after] = val;
					} else {
						that.$set(front, after, val);
					}
				});
				isFn(callback) && this.$nextTick(callback);
			}
		}
	});

	var app = getApp();

	export default {
		data() {
			return {
				defaultKeyword: "",
				keyword: "",
				oldKeywordList: [],
				hotKeywordList: [],
				keywordList: [],
				forbid: '',

				shows: false,
				colors: ''
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.setData({
				colors: app.globalData.newColor
			});
			this.init();
		},


		methods: {
			init() {
				this.loadDefaultKeyword();
				this.loadOldKeyword();
			},

			loadDefaultKeyword() {
				//定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
				this.setData({
					defaultKeyword: "请输入搜索的内容"
				});
			},

			//加载历史搜索,自动读取本地Storage
			loadOldKeyword() {
				uni.getStorage({
					key: kStorageKey,
					success: res => {
						var OldKeys = JSON.parse(res.data);
						this.setData({
							oldKeywordList: OldKeys
						});
					}
				});
			},
			// 执行搜索事件
			doSearch() {
				if (this.keyword == '') {
					uni.showToast({
						title: '请输入要搜索的内容',
						icon: 'none'
					});
					return;
				}
				// 
				if (this.keyword && this.keyword !== '') {
					this.saveKeyword(this.keyword); //保存为历史
				}

				uni.showLoading({
					title: '搜索中...'
				});
				this.setData({
					keywordList: []
				});


				uni.hideLoading()
				uni.showModal({
					title: "温馨提示",
					content: '搜索的内容 = ' + this.keyword
				})

				// uni.showToast({
				// 	title: '暂无结果',
				// 	icon: 'none'
				// })
			},

			onclear(e) {
				this.setData({
					keyword: e.detail.value,
					shows: e.detail.value !== '' ? true : false
				});
			},

			//保存关键字到历史记录
			saveKeyword(keyword) {
				uni.getStorage({
					key: kStorageKey,
					success: res => {
						var OldKeys = JSON.parse(res.data);
						var findIndex = OldKeys.indexOf(keyword);

						if (findIndex == -1) {
							OldKeys.unshift(keyword);
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(keyword);
						} //最多10个纪录


						OldKeys.length > 10 && OldKeys.pop();
						uni.setStorage({
							key: kStorageKey,
							data: JSON.stringify(OldKeys)
						});
						this.setData({
							oldKeywordList: OldKeys //更新历史搜索

						});
					},
					fail: e => {
						var OldKeys = [keyword];
						uni.setStorage({
							key: kStorageKey,
							data: JSON.stringify(OldKeys)
						});
						this.setData({
							oldKeywordList: OldKeys //更新历史搜索

						});
					}
				});
			},

			oldDelete() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: res => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.setData({
								oldKeywordList: []
							});
							uni.removeStorage({
								key: kStorageKey
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},



			clears() {
				this.setData({
					keyword: '',
					keywordList: [],
				});
			},
			//点击历史记录搜索
			doHisSearch(item) {
				console.log(item)
				uni.showModal({
					title: '点击的历史搜索条目',
					content: '点击的历史搜索条目 = ' + item
				})
			},



		}
	};
</script>
<style scoped lang="scss">
	view {
		display: block;
	}

	.search-box {
		background-color: rgb(242, 242, 242);
		padding: 15upx 2.5%;
		display: flex;
		justify-content: space-between;
		position: sticky;
		top: 0;
	}

	.search-box .mSearch-input-box {
		width: 100%;
	}

	.search-box .input-box {
		width: 85%;
		flex-shrink: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.search-box .search-btn {
		width: 15%;
		margin: 0 0 0 2%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		font-size: 24upx;
		color: #fff;
		background: linear-gradient(to right, #4492EB, #3F92EE);
		border-radius: 60upx;
	}

	.search-box .input-box>input {
		width: 95%;
		height: 60upx;
		font-size: 24upx;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		margin: 0;
		background-color: #ffffff;
	}

	.placeholder-class {
		color: #9e9e9e;
	}

	.search-keyword {
		width: 100%;
		background-color: rgb(242, 242, 242);
	}

	.keyword-list-box {
		height: calc(100vh - 110upx);
		padding-top: 10upx;
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
	}

	.keyword-entry-tap {
		background-color: #eee;
	}

	.keyword-entry {
		width: 94%;
		height: 80upx;
		margin: 0 3%;
		font-size: 30upx;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1upx #e7e7e7;
	}

	.keyword-entry image {
		width: 60upx;
		height: 60upx;
	}

	.keyword-entry .keyword-text,
	.keyword-entry .keyword-img {
		height: 80upx;
		display: flex;
		align-items: center;
	}

	.keyword-entry .keyword-text {
		width: 90%;
	}

	.keyword-entry .keyword-img {
		width: 10%;
		justify-content: center;
	}

	.keyword-box {
		height: calc(100vh - 110upx);
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
	}

	.keyword-box .keyword-block {
		padding: 10upx 0;
	}

	.keyword-box .keyword-block .keyword-list-header {
		width: 94%;
		padding: 10upx 3%;
		font-size: 27upx;
		color: #333;
		display: flex;
		justify-content: space-between;
	}

	.keyword-box .keyword-block .keyword-list-header image {
		width: 40upx;
		height: 40upx;
	}

	.keyword-box .keyword-block .keyword {
		width: 94%;
		padding: 3px 3%;
		display: flex;
		flex-flow: wrap;
		justify-content: flex-start;
	}

	.keyword-box .keyword-block .hide-hot-tis {
		display: flex;
		justify-content: center;
		font-size: 28upx;
		color: #6b6b6b;
	}

	.keyword-box .keyword-block .keyword>view {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 38upx;
		padding: 0 20upx;
		margin: 10upx 20upx 10upx 0;
		height: 60upx;
		font-size: 24upx;
		background-color: rgb(242, 242, 242);
		color: #6b6b6b;
		line-height: 60upx;
	}

	.search_text {
		font-size: 24upx;
		color: #B6B6C6;
	}

	.input-box {
		position: relative;
		height: 60upx;
		font-size: 24upx;
		border: 0;
		border-radius: 60upx;
		-webkit-appearance: none;
		appearance: none;
		padding: 0 3%;
		margin: 0;
		background-color: #ffffff;
	}

	.input-box image {
		height: 40upx;
		width: 40upx;
		float: right;
		position: absolute;
		right: 2%;
		top: 50%;
		transform: translateY(-50%);
		z-index: 100;
	}
</style>



```