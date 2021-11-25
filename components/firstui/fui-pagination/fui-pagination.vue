<template>
	<view class="fui-pagination__wrap">
		<view class="fui-pagination__btn"
			:class="{'fui-pagination__disabled':currentIndex === 1,'fui-pagination__btn-ac':currentIndex !== 1 && highlight,'fui-pagination__color':!color}"
			:style="{width:width+'rpx',height:height+'rpx',borderColor:borderColor,background:background,borderRadius:(radius==-1?height:radius)+'rpx'}"
			@click="clickPrev">
			<text :class="{'fui-pagination__color':!color}" :style="{color:color,fontSize:size+'rpx'}" v-if="!custom">{{prevText}}</text>
			<slot name="prev"></slot>
		</view>
		<view class="fui-pagination__num" v-if="isPage">
			<text :class="{'fui-pagination__active-color':!currentColor}"
				:style="{color:currentColor,fontSize:pageFontSize+'rpx'}">{{currentIndex}}</text>
			<text :class="{'fui-pagination__color':!pageColor}" :style="{color:pageColor,fontSize:pageFontSize+'rpx'}">/{{maxPage || 0}}</text>
		</view>
		<view class="fui-pagination__btn"
			:class="{'fui-pagination__disabled':currentIndex === maxPage,'fui-pagination__btn-ac':currentIndex !== maxPage && highlight,'fui-pagination__color':!color}"
			:style="{width:width+'rpx',height:height+'rpx',borderColor:borderColor,background:background,borderRadius:(radius==-1?height:radius)+'rpx'}"
			@click="clickNext">
			<text :class="{'fui-pagination__color':!color}" :style="{color:color,fontSize:size+'rpx'}" v-if="!custom">{{nextText}}</text>
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
				default: 160
			},
			height: {
				type: [Number, String],
				default: 64
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
				default: -1
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
			}
		},
		created() {
			this.currentIndex = +this.current
		},
		data() {
			return {
				currentIndex: 1
			};
		},
		methods: {
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
			change(e) {
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
		border-width: 1rpx;
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
	.fui-pagination__color{
		color: var(--fui-color-section, #333) !important;
	}

	/* #endif */

	.fui-pagination__disabled {
		opacity: 0.3;
		/* #ifdef H5 */
		cursor: not-allowed;
		/* #endif */
	}
</style>
