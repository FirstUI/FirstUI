<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Loading</view>
			<view class="fui-page__desc">Loading 加载。</view>
		</view>
		<view class="fui-page__bd fui-page__spacing">
			<view class="fui-section__title">基础使用（type=row）</view>
			<fui-loading type="row" :isFixed="false"></fui-loading>
			<view class="fui-section__title">基础使用（type=col）</view>
			<fui-loading :isFixed="false"></fui-loading>
			<view class="fui-section__title">更换图标（type=row）</view>
			<fui-loading type="row" :isFixed="false" srcRow="/static/images/component/loading_gray.png" text="正在加载...">
			</fui-loading>
			<view class="fui-section__title">更换图标（type=col）</view>
			<fui-loading :isFixed="false" srcCol="/static/images/component/loading_white.png" text="正在加载...">
			</fui-loading>
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
</style>
