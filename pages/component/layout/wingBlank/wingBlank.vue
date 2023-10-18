<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">WingBlank</view>
			<view class="fui-page__desc">左右间距，布局组件，主要用于设置元素内容两侧空白间距。</view>
		</view>
		<view class="fui-page__bd">
			<view class="fui-section__title">size = small（16rpx）</view>
			<fui-wing-blank size="small">
				<view class="fui-block"></view>
			</fui-wing-blank>
			<view class="fui-section__title">size = default（24rpx）</view>
			<fui-wing-blank size="default">
				<view class="fui-block"></view>
			</fui-wing-blank>

			<view class="fui-section__title">size = large（32rpx）</view>
			<fui-wing-blank size="large">
				<view class="fui-block"></view>
			</fui-wing-blank>

			<view class="fui-section__title">自定义间距（64rpx）</view>
			<fui-wing-blank gap="64">
				<view class="fui-block"></view>
			</fui-wing-blank>
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