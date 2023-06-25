<template>
	<view class="fui-list__cell" :class="{'fui-highlight':highlight,'fui-list__cell-background':!background}"
		:style="{paddingTop:getPadding[0] || 0,paddingRight:getPadding[1] || 0,paddingBottom:getPadding[2] || getPadding[0] || 0,paddingLeft:getPadding[3] || getPadding[1] || 0,background:background,marginTop:marginTop+'rpx',marginBottom:marginBottom+'rpx',borderRadius:radius}"
		@tap="handleClick">
		<view v-if="topBorder" :style="{background:getBorderColor,left:topLeft+'rpx',right:topRight+'rpx'}"
			class="fui-cell__border-top" :class="{'fui-cell__border-color':!getBorderColor}"></view>
		<slot></slot>
		<view v-if="bottomBorder" :style="{background:getBorderColor,left:getBottomLeft+'rpx',right:bottomRight+'rpx'}"
			class="fui-cell__border-bottom" :class="{'fui-cell__border-color':!getBorderColor}"></view>
		<view class="fui-cell__arrow" v-if="arrow" :style="{'border-color':getArrowColor}">
		</view>
	</view>
</template>

<script>
	export default {
		name: "fui-list-cell",
		emits: ['click'],
		props: {
			//padding值，上、右、下、左,nvue下padding-right(右)无效
			padding: {
				type: Array,
				default () {
					return []
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
			// #ifdef APP-NVUE
			background: {
				type: String,
				default: '#fff'
			},
			// #endif
			// #ifndef APP-NVUE
			background: {
				type: String,
				default: ''
			},
			// #endif
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
				default: ''
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
				default: ''
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
				default: -1
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
		computed: {
			getPadding() {
				let padding = this.padding
				if (Array.isArray(padding) && padding.length === 0) {
					const app = uni && uni.$fui && uni.$fui.fuiListCell;
					padding = app && app.padding;
					if (!padding || (Array.isArray(padding) && padding.length === 0)) {
						padding = ['32rpx', '32rpx']
					}
				}
				return padding;
			},
			getArrowColor() {
				const app = uni && uni.$fui && uni.$fui.fuiListCell;
				return this.arrowColor || (app && app.arrowColor) || '#B2B2B2'
			},
			getBorderColor() {
				let color = this.borderColor;
				// #ifdef APP-NVUE
				if (!color || color === true) {
					const app = uni && uni.$fui && uni.$fui.fuiListCell;
					color = (app && app.borderColor) || '#EEEEEE'
				}
				// #endif
				return color;
			},
			getBottomLeft() {
				const app = uni && uni.$fui && uni.$fui.fuiListCell;
				let left = this.bottomLeft;
				const c_left = app && app.bottomLeft
				if (left === -1) {
					left = (c_left === undefined || c_left === null) ? 32 : c_left
				}
				return left
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
		transform: rotate(45deg) scale(0.5);
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
		-webkit-transform: scaleY(0.5) translateZ(0);
		transform: scaleY(0.5) translateZ(0);
		transform-origin: 0 100%;
		z-index: 1;
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	.fui-cell__border-color {
		background-color: var(--fui-color-border, #EEEEEE) !important;
	}

	.fui-list__cell-background {
		background-color: var(--fui-bg-color, #fff);
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