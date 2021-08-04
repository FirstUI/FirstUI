<template>
	<view class="fui-list__cell" :class="{'fui-highlight':highlight}"
		:style="{paddingTop:padding[0] || 0,paddingRight:padding[1] || 0,paddingBottom:padding[2] || padding[0] || 0,paddingLeft:padding[3] || padding[1] || 0,background:background,marginTop:marginTop+'rpx',marginBottom:marginBottom+'rpx',borderRadius:radius}"
		@tap="handleClick">
		<view v-if="topBorder" :style="{background:borderColor,left:topLeft+'rpx',right:topRight+'rpx'}"
			class="fui-cell__border-top" :class="{'fui-cell__border-color':!borderColor}"></view>
		<slot></slot>
		<view v-if="bottomBorder" :style="{background:borderColor,left:bottomLeft+'rpx',right:bottomRight+'rpx'}"
			class="fui-cell__border-bottom" :class="{'fui-cell__border-color':!borderColor}"></view>
		<view class="fui-cell__arrow" v-if="arrow" :style="{'border-color':arrowColor}">
		</view>
	</view>
</template>

<script>
	export default {
		name: "fui-list-cell",
		props: {
			//padding值，上、右、下、左,nvue下padding-right(右)无效
			padding: {
				type: Array,
				default () {
					return ['32rpx', '32rpx']
				}
			},
			//margin-top 单位rpx
			marginTop: {
				type: [Number, String],
				default: 0
			},
			//margin-bottom 单位rpx
			marginBottom: {
				type: [Number, String],
				default: 0
			},
			//背景颜色
			background: {
				type: String,
				default: '#fff'
			},
			//是否有点击效果
			highlight: {
				type: Boolean,
				default: true
			},
			//是否需要右侧箭头
			arrow: {
				type: Boolean,
				default: false
			},
			arrowColor: {
				type: String,
				default: '#B2B2B2'
			},
			//是否显示上边框
			topBorder: {
				type: Boolean,
				default: false
			},
			//是否显示下边框
			bottomBorder: {
				type: Boolean,
				default: true
			},
			//边框颜色，非nvue下传值则全局默认样式失效
			borderColor: {
				type: String,
				// #ifdef APP-NVUE
				default: '#EEEEEE'
				// #endif
				// #ifndef APP-NVUE
				default: ''
				// #endif

			},
			//上边框left值，单位rpx
			topLeft: {
				type: [Number, String],
				default: 0
			},
			//上边框right值，单位rpx
			topRight: {
				type: [Number, String],
				default: 0
			},
			//下边框left值，单位rpx
			bottomLeft: {
				type: [Number, String],
				default: 32
			},
			//下边框right值，单位rpx
			bottomRight: {
				type: [Number, String],
				default: 0
			},
			//border-radius圆角值
			radius: {
				type: String,
				default: '0'
			},
			index: {
				type: Number,
				default: 0
			}
		},
		methods: {
			handleClick() {
				this.$emit('click', {
					index: this.index
				});
			}
		}
	}
</script>

<style scoped>
	.fui-list__cell {
		position: relative;
		flex: 1;
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	/* #ifdef APP-NVUE */
	.fui-list__item {
		flex: 1;
	}

	/* #endif */
	.fui-cell__arrow {
		height: 40rpx;
		width: 40rpx;
		border-width: 3px 3px 0 0;
		border-style: solid;
		transform: Rotate(45deg) scale(0.5);
		/* #ifndef APP-NVUE */
		border-radius: 4rpx;
		flex-shrink: 0;
		margin-left: auto;
		box-sizing: border-box;
		/* #endif */
		/* #ifdef APP-NVUE */
		border-top-right-radius: 3rpx;
		/* #endif */
		transform-origin: center center;
		margin-right: -5.8579rpx;
	}

	.fui-cell__border-top {
		position: absolute;
		top: 0;
		/* #ifdef APP-NVUE */
		height: 0.5px;
		z-index: -1;
		/* #endif */

		/* #ifndef APP-NVUE */
		height: 1px;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		transform-origin: 0 0;
		z-index: 1;
		/* #endif */
	}

	.fui-cell__border-bottom {
		position: absolute;
		bottom: 0;
		/* #ifdef APP-NVUE */
		height: 0.5px;
		z-index: -1;
		/* #endif */
		/* #ifndef APP-NVUE */
		height: 1px;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		transform-origin: 0 100%;
		z-index: 1;
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	.fui-cell__border-color {
		background-color: var(--fui-color-border, #EEEEEE) !important;
	}

	/* #endif */
	.fui-highlight:active {
		/* #ifdef APP-NVUE */
		background-color: rgba(0, 0, 0, 0.2) !important;
		/* #endif */

		/* #ifndef APP-NVUE */
		background-color: var(--fui-bg-color-hover, rgba(0, 0, 0, 0.2)) !important;
		/* #endif */
	}
</style>
