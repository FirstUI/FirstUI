<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Grid</view>
			<view class="fui-page__desc">Grid 宫格，主要使用场景如：热门内容等。</view>
		</view>
		<view class="fui-page__bd"> 
			<view class="fui-section__title">九宫格</view>
			<fui-grid>
				<fui-grid-item v-for="(item,index) in nums" :key="index">
					<view class="fui-grid__cell">
						<image src="/static/images/common/icon_tabbar_3x.png" class="fui-icon" mode="widthFix"></image>
						<text>Grid</text>
					</view>
				</fui-grid-item>
			</fui-grid>
			<view class="fui-section__title">高度自适应</view>
			<fui-grid :square="false">
				<fui-grid-item v-for="(item,index) in nums" :key="index">
					<view class="fui-grid__cell fui-padding">
						<image src="/static/images/common/icon_tabbar_2x.png" class="fui-icon__2x" mode="widthFix">
						</image>
						<text>Grid</text>
					</view>
				</fui-grid-item>
			</fui-grid>
			<view class="fui-section__title">改变列数（4列）</view>
			<fui-grid :columns="4">
				<fui-grid-item v-for="(item,index) in arrs" :key="index">
					<view class="fui-grid__cell fui-padding">
						<image src="/static/images/common/icon_tabbar_2x.png" class="fui-icon__2x" mode="widthFix">
						</image>
						<text>Grid</text>
					</view>
				</fui-grid-item>
			</fui-grid>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//百度小程序循环数字有问题
				nums: [0, 1, 2, 3, 4, 5, 6, 7, 8],
				arrs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			}
		},
		onLoad() {}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
		/* 非nvue端可通过此变量控制边框颜色 */
		/* --fui-color-border:#465CFF; */
	}

	.fui-section__title {
		margin-left: 32rpx;
	}

	.fui-grid__cell {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		flex: 1;
		font-size: 28rpx;
		font-weight: 400;
	}

	.fui-padding {
		padding: 36rpx 0;
	}

	.fui-icon {
		width: 96rpx;
		height: 96rpx;
		margin-bottom: 16rpx;
	}

	.fui-icon__2x {
		width: 64rpx;
		height: 64rpx;
		margin-bottom: 16rpx;
	}

	.fui-flex__column {
		flex: 1;
	}
</style>
