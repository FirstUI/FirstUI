<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Divider</view>
			<view class="fui-page__desc">Divider 分割线，可自定义线条宽度、颜色等。</view>
		</view>
		<view class="fui-page__bd">
			<fui-divider text="没有更多了"></fui-divider>
			<fui-divider dividerColor="#465CFF" text="没有更多了"></fui-divider>
			<fui-divider dividerColor="#FFB703" color="#FFB703" text="没有更多了"></fui-divider>
			<fui-divider dividerColor="#09BE4F" color="#09BE4F" width="100%" text="没有更多了"></fui-divider>
			<fui-divider dividerColor="linear-gradient(to right,#eee,#ccc,#ccc,#eee)" text="没有更多了"></fui-divider>
			<fui-divider text="已加载完全部数据"></fui-divider>
			<fui-divider>
				<view class="fui-flex__center">
					<fui-icon name="like" color="#FF2B2B" :size="40"></fui-icon>
					<text class="fui-text">猜你喜欢</text>
				</view>
			</fui-divider>
			<fui-divider>
				<view class="fui-flex__center">
					<fui-icon name="fabulous" color="#FFB703" :size="40"></fui-icon>
					<text class="fui-text">好物推荐</text>
				</view>
			</fui-divider>
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
	.fui-text {
		font-size: 24rpx;
		padding-left: 8rpx;
	}
</style>
