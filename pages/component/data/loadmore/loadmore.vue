<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">LoadMore</view>
			<view class="fui-page__desc">LoadMore 加载更多，主要使用场景如：上拉加载等。</view>
		</view>
		<view class="fui-page__bd">
			<view class="fui-section__title">基本使用</view>
			<fui-loadmore></fui-loadmore>
			<fui-loadmore activeColor="#FFB703"></fui-loadmore>
			<fui-loadmore iconColor="rgba(255, 183, 3, .2)" activeColor="#FFB703" color="#FFB703"></fui-loadmore>
			<view class="fui-section__title">direction:col</view>
			<fui-loadmore direction="col" text="加载中" color="#465CFF"></fui-loadmore>
			<view class="fui-section__title">自定义图标</view>
			<fui-loadmore src="/static/images/component/loading_gray.png" :iconWidth="36" text="加载中...">
			</fui-loadmore>
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
</style>
