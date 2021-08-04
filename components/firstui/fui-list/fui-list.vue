<template>
	<view class="fui-list__wrap" :style="{marginTop:marginTop+'rpx'}">
		<view class="fui-list__title"
			:style="{paddingTop:padding[0] || 0,paddingRight:padding[1] || 0,paddingBottom:padding[2] || padding[0] || 0,paddingLeft:padding[3] || padding[1] || 0,background:background}"
			v-if="title">
			<text :style="{color:color,fontSize:size+'rpx'}">{{title}}</text>
		</view>
		<view class="fui-list__container">
			<view v-if="topBorder" :style="{background:borderColor,left:topLeft+'rpx',right:topRight+'rpx'}"
				class="fui-list__border-top" :class="{'fui-list__border-color':!borderColor}"></view>
			<slot></slot>
			<view v-if="bottomBorder" :style="{background:borderColor,left:bottomLeft+'rpx',right:bottomRight+'rpx'}"
				class="fui-list__border-bottom" :class="{'fui-list__border-color':!borderColor}"></view>
		</view>
		<view class="fui-list__footer"
			:style="{paddingTop:footerPadding[0] || 0,paddingRight:footerPadding[1] || 0,paddingBottom:footerPadding[2] || footerPadding[0] || 0,paddingLeft:footerPadding[3] || footerPadding[1] || 0}"
			v-if="footer">
			<text :style="{color:footerColor,fontSize:footerSize+'rpx'}">{{footer}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "fui-list",
		props: {
			//fui-list margin-top值,单位rpx
			marginTop: {
				type: [Number, String],
				default: 0
			},
			//标题
			title: {
				type: String,
				default: ''
			},
			//标题颜色
			color: {
				type: String,
				default: '#7F7F7F'
			},
			//标题字体大小 单位rpx
			size: {
				type: [Number, String],
				default: 28
			},
			//标题padding值['32rpx','32rpx','20rpx','32rpx'] 上、右、下、左
			padding: {
				type: Array,
				default () {
					return ['32rpx', '32rpx', '20rpx', '32rpx']
				}
			},
			//标题背景色
			background: {
				type: String,
				default: 'transparent'
			},
			//底部说明文字
			footer: {
				type: String,
				default: ''
			},
			//底部说明文字颜色
			footerColor: {
				type: String,
				default: '#7F7F7F'
			},
			//底部说明文字大小 单位rpx
			footerSize: {
				type: [Number, String],
				default: 28
			},
			//底部说明文本padding值['20rpx','32rpx','0','32rpx'] 上、右、下、左
			footerPadding: {
				type: Array,
				default () {
					return ['20rpx', '32rpx', '0']
				}
			},
			//是否显示上边框
			topBorder: {
				type: Boolean,
				default: true
			},
			//是否显示下边框
			bottomBorder: {
				type: Boolean,
				default: false
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
				default: 0
			},
			//下边框right值，单位rpx
			bottomRight: {
				type: [Number, String],
				default: 0
			}
		}
	}
</script>

<style scoped>
	.fui-list__wrap {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
	}

	.fui-list__title,
	.fui-list__footer {
		line-height: 1;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		word-break: break-all;
		/* #endif */
	}

	.fui-list__container {
		position: relative;
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
	}

	.fui-list__border-top {
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

	.fui-list__border-bottom {
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
	.fui-list__border-color {
		background-color: var(--fui-color-border, #EEEEEE) !important;
	}

	/* #endif */
</style>
