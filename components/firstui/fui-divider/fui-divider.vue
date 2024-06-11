<template>
	<view class="fui-divider__wrap" :style="{ height: height + 'rpx' }">
		<view class="fui-divider__wrap" :style="{width:width, height: height + 'rpx' }">
			<view class="fui-divider__line" :style="{ background: dividerColor}">
			</view>
			<view class="fui-divider__text-box">
				<slot></slot>
				<text class="fui-divider__text"
					:style="{fontWeight: fontWeight,color: color, fontSize: size + 'rpx',lineHeight: size + 'rpx'}"
					v-if="text">{{text}}</text>
			</view>
			<view class="fui-divider__line" :style="{ background: dividerColor}">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'fui-divider',
		props: {
			text: {
				type: String,
				default: ''
			},
			//divider占据高度，单位rpx
			height: {
				type: [Number, String],
				default: 100
			},
			//divider宽度
			width: {
				type: String,
				default: '400rpx'
			},
			//divider颜色
			dividerColor: {
				type: String,
				default: '#CCCCCC'
			},
			//文字颜色
			color: {
				type: String,
				default: '#B2B2B2'
			},
			//文字大小 rpx
			size: {
				type: [Number, String],
				default: 24
			},
			fontWeight: {
				type: [Number, String],
				default: 400
			}
		}
	};
</script>

<style scoped>
	.fui-divider__wrap {
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		box-sizing: border-box;
		/* #endif */
		text-align: center;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.fui-divider__line {
		/* #ifdef APP-NVUE */
		height: 0.5px;
		/* #endif */

		/* #ifndef APP-NVUE */
		height: 1px;
		-webkit-transform: scaleY(0.5) translateZ(0);
		transform: scaleY(0.5) translateZ(0);
		/* #endif */
		flex: 1;
	}

	.fui-divider__text-box {
		position: relative;
		text-align: center;
		padding: 0 8rpx;
		z-index: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		flex-shrink: 0;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.fui-divider__text {
		padding: 0 10rpx;
	}
</style>