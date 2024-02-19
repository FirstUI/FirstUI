<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Number</view>
			<view class="fui-page__desc">Number 数字，DigitalNumbers字体，仅支持数字和小数点。默认字体显示：123456789.00</view>
		</view>
		<view class="fui-page__bd fui-page__spacing">
			<view class="fui-section__title">基本使用</view>
			<fui-number text="1234567890.00"></fui-number>
			<view class="fui-section__title">调整颜色</view>
			<fui-number text="200" color="#465CFF"></fui-number>
			<view class="fui-section__title">调整字体大小</view>
			<fui-number text="123" color="#FFB703" size="24"></fui-number>
			<fui-number text="678" color="#FFB703" size="48"></fui-number>
			<view class="fui-section__title">加粗/点击效果</view>
			<fui-number :text="520" color="#09BE4F" size="64" fontWeight="bold" highlight @click="onTap"></fui-number>
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
			onTap(e) {
				console.log(e)
				this.fui.toast(String(e.text))
			}
		}
	}
</script>

<style>
	.fui-wrap {
		padding-bottom: 96rpx;
	}
</style>