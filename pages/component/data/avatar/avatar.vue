<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Avatar</view>
			<view class="fui-page__desc">Avatar 头像，用图标、图片或者字符的形式展示用户或事物信息。</view>
		</view>
		<view class="fui-page__bd fui-page__spacing">
			<view class="fui-section__title">基础使用</view>
			<fui-avatar size="small" text="A"></fui-avatar>
			<fui-avatar text="B"></fui-avatar>
			<fui-avatar size="large" text="丁"></fui-avatar>
			<fui-avatar text="刘" background="#FFB703"></fui-avatar>
			<fui-avatar size="small" text="邹" background="#465CFF"></fui-avatar>
			<view class="fui-section__title">改变圆角值</view>
			<fui-avatar size="small" text="A" shape="square" marginRight="24"></fui-avatar>
			<fui-avatar text="B" shape="square" marginRight="24"></fui-avatar>
			<fui-avatar size="large" text="丁" radius="30" marginRight="24"></fui-avatar>
			<fui-avatar text="刘" background="#FFB703" radius="30" marginRight="24"></fui-avatar>
			<fui-avatar size="small" text="邹" background="#465CFF" radius="0"></fui-avatar>
			<view class="fui-section__title">使用图片</view>
			<view class="fui-align__center">
				<fui-avatar size="small" src="/static/images/common/img_logo.png" shape="square"></fui-avatar>
				<fui-avatar src="/static/images/common/img_logo.png" radius="0"></fui-avatar>
				<fui-avatar size="large" src="/static/images/common/img_logo.png" radius="30"></fui-avatar>
				<fui-avatar src="/static/images/common/img_logo.png"></fui-avatar>
				<fui-avatar size="small" src="/static/images/common/img_logo.png"></fui-avatar>
			</view>
			<view class="fui-section__title">自定义图标</view>
			<fui-avatar marginRight="24">
				<fui-icon name="my" color="#fff"></fui-icon>
			</fui-avatar>
			<fui-avatar>
				<fui-icon name="my-fill" color="#fff"></fui-icon>
			</fui-avatar>
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
	page{
		background-color: #fff;
	}
	.fui-wrap{
		padding-bottom: 64rpx;
	}
</style>
