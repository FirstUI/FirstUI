<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Card</view>
			<view class="fui-page__desc">Card 卡片，常用的布局组件。</view>
		</view>
		<view class="fui-page__bd">
			<view class="fui-section__title">基础使用</view>
			<fui-card :src="src" title="标题文字" tag="额外信息">
				<view class="fui-card__content">这是一个基础卡片的示例，此处为自定义内容区域，自行控制内容样式。</view>
			</fui-card>
			<view class="fui-section__title">通栏展示</view>
			<fui-card :padding="['20rpx','32rpx']" full :src="src" title="标题文字" tag="额外信息">
				<view class="fui-card__content fui-padding">这是一个基础卡片的示例，此处为自定义内容区域，自行控制内容样式。</view>
			</fui-card>
			<view class="fui-section__title">推荐布局</view>
			<fui-card :src="src2" imageRadius="50%" title="First UI" color="#465CFF" tag="23小时前" :headerLine="false" showBorder>
				<view class="fui-list__item">
					<image class="fui-cover" :src="`${resUrl}/cooperate/light/img_banner_3x.png`" mode="widthFix">
					</image>
					<view class="fui-list__title">First UI重磅上线，一款轻量、全面、可靠的移动端组件库。</view>
				</view>
			</fui-card>
			<view class="fui-section__title">推荐布局</view>
			<fui-card>
				<view class="fui-list__item">
					<image class="fui-cover" :src="`${resUrl}/cooperate/dark/img_banner_3x.png`" mode="widthFix"></image>
				</view>
				<view class="fui-card__title">
					First UI重磅上线，一款轻量、全面、可靠的移动端组件库。
				</view>
			</fui-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				resUrl:this.fui.resUrl(),
				src: '/static/images/common/icon_tabbar_3x.png',
				src2: '/static/images/common/img_logo.png'
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

	.fui-card__content {
		font-size: 28rpx;
		padding: 32rpx 20rpx;
		box-sizing: border-box;
	}

	.fui-padding {
		padding-left: 32rpx;
		padding-right: 32rpx;
	}

	.fui-list__item {
		width: 100%;
		height: 385rpx;
		position: relative;
		background: #eee;
	}

	.fui-cover {
		width: 100%;
		height: 385rpx;
		display: block;
	}

	.fui-list__title {
		position: absolute;
		left: 0;
		bottom: 0;
		color: #fff;
		font-weight: 500;
		padding: 24rpx 20rpx;
		box-sizing: border-box;
		background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.6));
	}

	.fui-card__title {
		width: 100%;
		padding: 32rpx;
		box-sizing: border-box;
		font-weight: 500;
	}
</style>
