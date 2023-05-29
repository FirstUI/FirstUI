<template>
	<view class="fui-pagination__wrap">
		<view class="fui-pagination__btn"
			:class="{'fui-pagination__disabled':currentIndex === 1,'fui-pagination__btn-ac':currentIndex !== 1 && highlight,'fui-pagination__color':!color}"
			:style="{width:width+'rpx',height:height+'rpx',borderColor:borderColor,background:background,borderRadius:radius+'rpx'}"
			@click="clickPrev">
			<text :class="{'fui-pagination__color':!color}" :style="{color:color,fontSize:size+'rpx'}"
				v-if="!custom">{{prevText}}</text>
			<slot name="prev"></slot>
		</view>
		<view class="fui-pagination__num" v-if="isPage && pageType==1">
			<text :class="{'fui-pagination__active-color':!currentColor}"
				:style="{color:currentColor,fontSize:pageFontSize+'rpx'}">{{currentIndex}}</text>
			<text :class="{'fui-pagination__color':!pageColor}"
				:style="{color:pageColor,fontSize:pageFontSize+'rpx'}">/{{maxPage || 0}}</text>
		</view>

		<view class="fui-page__number" v-if="isPage && pageType==2">
			<view class="fui-page__num-item" :class="{'fui-pagination__bg':!activeBgColor && currentIndex===item}"
				v-for="(item,index) in pageNumber" :key="index"
				:style="{background:currentIndex===item?activeBgColor:pageBgColor,borderRadius:radius+'rpx'}"
				@tap.stop="handleClick(item,index)">
				<text class="fui-page__num-text" :class="{'fui-pagination__color':!color && currentIndex!==item}"
					:style="{color:currentIndex===item?activeColor:pageColor}">{{item}}</text>
			</view>
		</view>

		<view class="fui-pagination__btn"
			:class="{'fui-pagination__disabled':currentIndex === maxPage,'fui-pagination__btn-ac':currentIndex !== maxPage && highlight,'fui-pagination__color':!color}"
			:style="{width:width+'rpx',height:height+'rpx',borderColor:borderColor,background:background,borderRadius:radius+'rpx'}"
			@click="clickNext">
			<text :class="{'fui-pagination__color':!color }" :style="{color:color,fontSize:size+'rpx'}"
				v-if="!custom">{{nextText}}</text>
			<slot name="next"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "fui-pagination",
		emits: ['change'],
		props: {
			prevText: {
				type: String,
				default: '上一页'
			},
			nextText: {
				type: String,
				default: '下一页'
			},
			width: {
				type: [Number, String],
				default: 128
			},
			height: {
				type: [Number, String],
				default: 60
			},
			borderColor: {
				type: String,
				default: 'transparent'
			},
			background: {
				type: String,
				default: '#fff'
			},
			color: {
				type: String,
				// #ifdef APP-NVUE
				default: '#333'
				// #endif
				// #ifndef APP-NVUE
				default: ''
				// #endif
			},
			size: {
				type: [Number, String],
				default: 28
			},
			radius: {
				type: [Number, String],
				default: 12
			},
			//是否有点击效果
			highlight: {
				type: Boolean,
				default: true
			},
			//是否自定义按钮显示内容
			custom: {
				type: Boolean,
				default: false
			},
			//当前页码
			current: {
				type: [Number, String],
				default: 1
			},
			//当前页码字体颜色
			currentColor: {
				type: String,
				// #ifdef APP-NVUE
				default: '#465CFF'
				// #endif
				// #ifndef APP-NVUE
				default: ''
				// #endif
			},
			//页码字体颜色
			pageColor: {
				type: String,
				// #ifdef APP-NVUE
				default: '#333'
				// #endif
				// #ifndef APP-NVUE
				default: ''
				// #endif
			},
			//页码字体大小
			pageFontSize: {
				type: [Number, String],
				default: 36
			},
			//是否需要展示页码
			isPage: {
				type: Boolean,
				default: true
			},
			//页码展示类型 1-简约型 2-展开型
			pageType: {
				type: [Number, String],
				default: 1
			},
			pageBgColor: {
				type: String,
				default: 'rgba(0,0,0,0)'
			},
			activeBgColor: {
				type: String,
				// #ifdef APP-NVUE
				default: '#465CFF'
				// #endif
				// #ifndef APP-NVUE
				default: ''
				// #endif
			},
			activeColor: {
				type: String,
				default: '#fff'
			},
			//数据总量
			total: {
				type: [Number, String],
				default: 0
			},
			//每页数据量
			pageSize: {
				type: [Number, String],
				default: 10
			}
		},
		computed: {
			maxPage() {
				let maxPage = 1
				let total = Number(this.total)
				let pageSize = Number(this.pageSize)
				if (total && pageSize) {
					maxPage = Math.ceil(total / pageSize)
				}
				return maxPage
			}
		},
		watch: {
			current(val) {
				this.currentIndex = +val
			},
			total(val) {
				if (this.pageType == 2) {
					this.getPageNumber()
				}
			},
			pageSize(val) {
				if (this.pageType == 2) {
					this.getPageNumber()
				}
			}
		},
		created() {
			this.currentIndex = +this.current
			if (this.pageType == 2) {
				this.getPageNumber()
			}
		},
		data() {
			return {
				currentIndex: 1,
				pageNumber: [],
				pagerCount: 0
			};
		},
		methods: {
			toArray(start, end) {
				return Array.from(new Array(end + 1).keys()).slice(start);
			},
			getPageNumber() {
				const num = this.currentIndex
				const total = this.total
				const pageSize = this.pageSize
				// TODO 最大展示页数，移动端宽度有限，暂时固定
				let pagerCount = this.pagerCount
				if (!pagerCount) {
					pagerCount = 6
					const width = Number(this.width)
					if (!isNaN(width) && width <= 60) {
						pagerCount = 8;
					}
					this.pagerCount = pagerCount;
				}
				let showPagerArr = this.toArray(1, pagerCount)
				let pagerNum = Math.ceil(total / pageSize)
				if (pagerNum <= 1) {
					showPagerArr = [1]
				} else if (pagerNum <= pagerCount) {
					showPagerArr = this.toArray(1, pagerNum)
				} else {
					showPagerArr[pagerCount - 1] = pagerNum;
					if (num < pagerCount - 1) {
						showPagerArr[pagerCount - 2] = '...'
					} else if (num >= pagerNum - (pagerCount - 3)) {
						showPagerArr[1] = '...';
						showPagerArr.forEach((item, index) => {
							if (index > 1) {
								showPagerArr[index] = pagerNum - (pagerCount - 3) + (index - 2)
							}
						})
					} else {
						showPagerArr[1] = '...';
						for (let i = 0; i < pagerCount - 3; i++) {
							showPagerArr[i + 2] = num + i
						}
						showPagerArr[pagerCount - 2] = '...'
					}
				}
				this.pageNumber = showPagerArr
			},
			clickPrev() {
				if (Number(this.currentIndex) === 1) return;
				this.currentIndex -= 1
				this.change('prev')
			},
			clickNext() {
				if (Number(this.currentIndex) === this.maxPage) return;
				this.currentIndex += 1
				this.change('next')
			},
			handleClick(item, index) {
				let pageNo = Number(item)
				const idx = this.pagerCount === 6 ? 4 : 6;
				if (isNaN(pageNo)) {
					if (index === 1) {
						pageNo = this.pageNumber[index + 1] - (this.pagerCount - 4)
					} else if (index === idx) {
						pageNo = this.pageNumber[index - 1] + 1
					}
				} else {
					if (Number(this.currentIndex) === pageNo) return;
				}
				this.currentIndex = pageNo;
				this.change('pageNumber')
			},
			change(e) {
				if (this.pageType == 2) {
					this.getPageNumber()
				}
				this.$emit('change', {
					type: e,
					current: this.currentIndex
				})
			}
		}
	}
</script>

<style scoped>
	.fui-pagination__wrap {
		flex: 1;
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		/* #endif */
		position: relative;
		overflow: hidden;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.fui-pagination__btn {
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		position: relative;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-align: center;
		/* #ifdef APP-NVUE */
		border-width: 0.5px;
		/* #endif */

		/* #ifndef APP-NVUE */
		border-width: 1px;
		/* #endif */
		border-style: solid;
		flex-shrink: 0;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.fui-pagination__btn-ac:active {
		opacity: 0.5;
	}

	.fui-pagination__num {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	/* #ifndef APP-NVUE */
	.fui-pagination__active-color {
		color: var(--fui-color-primary, #465CFF) !important;
	}

	.fui-pagination__bg {
		background: var(--fui-color-primary, #465CFF) !important;
	}

	.fui-pagination__color {
		color: var(--fui-color-section, #333) !important;
	}

	/* #endif */

	.fui-pagination__disabled {
		opacity: 0.3;
		/* #ifdef H5 */
		cursor: not-allowed;
		/* #endif */
	}

	.fui-page__number {
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.fui-page__num-item {
		/* #ifndef APP-NVUE */
		min-width: 60rpx;
		display: flex;
		transform: translateZ(0);
		/* #endif */
		height: 60rpx;
		align-items: center;
		justify-content: center;
		margin: 0 4rpx;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.fui-page__num-item:active {
		opacity: .5;
	}

	.fui-page__num-text {
		font-size: 24rpx;
	}
</style>