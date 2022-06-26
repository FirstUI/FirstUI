<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Text</view>
			<view class="fui-page__desc">Text 文本，用于包裹文本内容。</view>
		</view>
		<view class="fui-page__bd fui-page__spacing">
			<view class="fui-section__title">基本使用</view>
			<fui-text :text="text" :size="28"></fui-text>
			<view class="fui-section__title">不同样式类型</view>
			<fui-text text="primary" type="primary"></fui-text>
			<fui-text text="success" type="success"></fui-text>
			<fui-text text="warning" type="warning"></fui-text>
			<fui-text text="danger" type="danger"></fui-text>
			<fui-text text="purple" type="purple"></fui-text>
			<fui-text text="gray" type="gray"></fui-text>
			<fui-text text="black" type="black"></fui-text>
			<view class="fui-section__title">块状 | 自定义颜色</view>
			<fui-text text="block" color="brown" block></fui-text>
			<fui-text text="yellow" color="yellow" block></fui-text>
			<view class="fui-section__title">数据脱敏-姓名</view>
			<fui-text text="张三" text-type="name" format block></fui-text>
			<fui-text text="王小仙" text-type="name" format block></fui-text>
			<view class="fui-section__title">数据脱敏-手机号</view>
			<fui-text text="13544339908" text-type="mobile" format></fui-text>
			<view class="fui-section__title">金额格式化</view>
			<fui-text text="20000" text-type="amount" format>￥</fui-text>
			<view class="fui-section__title">点击效果</view>
			<fui-text text="https://firstui.cn" highlight @click="handleClick"></fui-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: 'First UI是一套超高性能、超高颜值的移动端UI综合解决方案，包含业内顶尖的组件库、强大的功能库、丰富精美的模板库，提供uni-app(完美支持nvue)、微信小程序、支付宝小程序等版本，兼顾高效率与高性能，让您的开发获得百倍提质提速！'
			}
		},
		methods: {
			handleClick(e) {
				console.log(e)
				this.fui.toast('点击了~');
			}
		}
	}
</script>

<style>
	.fui-wrap {
		padding-bottom: 96rpx;
	}
</style>
