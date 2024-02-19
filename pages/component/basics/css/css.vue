<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">CSS</view>
			<view class="fui-page__desc">CSS 常用样式，用于页面布局。</view>
		</view>
		<view class="fui-page__bd fui-page__spacing">
			<view class="fui-section__title">Common</view>
			<view class="fui-cell fs-flex__center fs-hover">点击效果：fs-hover</view>
			<view class="fui-cell fs-flex__center fs-text__hover">点击效果：fs-text__hover</view>
			<view class="fui-cell fs-flex__center fs-disabled">禁用效果：fs-disabled</view>
			<view class="fui-cell fs-flex__center fs-cell__thin">底部细线：fs-cell__thin</view>

			<view class="fui-section__title">Color</view>
			<view class="fui-cell fs-flex__center fs-color__primary">字体颜色：fs-color__primary</view>
			<view class="fui-cell fs-flex__center fs-color__success">fs-color__success</view>
			<view class="fui-cell fs-flex__center fs-color__warning">fs-color__warning</view>
			<view class="fui-cell fs-flex__center fs-color__danger">fs-color__danger</view>
			<view class="fui-cell fs-flex__center fs-color__purple">fs-color__purple</view>
			<view class="fui-cell fs-flex__center fs-color__title">fs-color__title</view>
			<view class="fui-cell fs-flex__center fs-color__section">fs-color__section</view>
			<view class="fui-cell fs-flex__center fs-color__subtitle">fs-color__subtitle</view>
			<view class="fui-cell fs-flex__center fs-color__label">fs-color__label</view>

			<view class="fui-section__title">FontSize</view>
			<view class="fui-cell fs-flex__center fs-size__h1">字体大小：fs-size__h1</view>
			<view class="fui-cell fs-flex__center fs-size__h2">字体大小：fs-size__h2</view>
			<view class="fui-cell fs-flex__center fs-size__h3">字体大小：fs-size__h3</view>
			<view class="fui-cell fs-flex__center fs-size__h4">字体大小：fs-size__h4</view>
			<view class="fui-cell fs-flex__center fs-size__h5">字体大小 h5/h6</view>

			<view class="fui-cell fs-flex__center fs-size__24">字体大小 fs-size__24</view>
			<view class="fui-cell fs-flex__center fs-size__25">字体大小 fs-size__25</view>
			<view class="fui-cell fs-flex__center fs-size__28">字体大小 fs-size__28</view>
			<view class="fui-cell fs-flex__center fs-size__32">字体大小 fs-size__32</view>
			<view class="fui-cell fs-flex__center fs-size__36">字体大小 fs-size__36</view>
			<view class="fui-cell fs-flex__center fs-size__40">字体大小 fs-size__40</view>
			<view class="fui-cell fs-flex__center fs-size__48">字体大小 48rpx</view>
			
			<view class="fui-section__title">Margin</view>
			
			<view class="fui-cell fs-flex__center fs-ml8">fs-ml8</view>
			<view class="fui-cell fs-flex__center fs-mt24">fs-mt24</view>
			<view class="fui-cell fs-flex__center fs-mt32">fs-mt32</view>
			
			<view class="fui-section__title">Padding</view>
			<view class="fs-flex__center fs-bg__white fs-p30 ">fs-p30：padding:30rpx</view>
			<view class="fs-flex__center fs-bg__white fs-mt24 fs-pt24">fs-pt24：padding-top:24rpx</view>
			
			<view class="fui-section__title">其他样式</view>
			<view class="fui-page__desc">
				以上仅部分使用示例，完整使用请查看文档。
			</view>
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
	/*项目中使用可全局引入scss文件：firstui.scss*/
	@import '@/components/firstui/fui-css/firstui.css';

	page {
		font-weight: normal;
	}

	.fui-cell {
		width: 100%;
		height: 96rpx;
		border-radius: 16rpx;
		background: #fff;
		margin-bottom: 16rpx;
	}
</style>