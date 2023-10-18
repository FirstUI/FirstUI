<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">WhiteSpace</view>
			<view class="fui-page__desc">上下间距，布局组件，主要用于设置内容之间上下间距使用。</view>
		</view>
		<view class="fui-page__bd">
			<view class="fui-section__title">size = small（16rpx）</view>
			<view class="fui-block"></view>
			<fui-white-space size="small"></fui-white-space>
			<view class="fui-block"></view>

			<view class="fui-section__title">size = default（24rpx）</view>
			<view class="fui-block"></view>
			<fui-white-space size="default"></fui-white-space>
			<view class="fui-block"></view>

			<view class="fui-section__title">size = large（32rpx）</view>
			<view class="fui-block"></view>
			<fui-white-space size="large"></fui-white-space>
			<view class="fui-block"></view>

			<view class="fui-section__title">自定义间距（10rpx）</view>
			<view class="fui-block"></view>
			<fui-white-space height="10"></fui-white-space>
			<view class="fui-block"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	page {
		font-weight: normal;
	}

	.fui-section__title {
		margin-left: 32rpx;
	}

	.fui-block {
		width: 100%;
		height: 80rpx;
		background-color: #fff;
	}
</style>