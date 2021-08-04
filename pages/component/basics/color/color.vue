<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Color</view>
			<view class="fui-page__desc">Color 色彩，First UI用色指南。</view>
		</view>
		<view class="fui-page__bd fui-page__spacing">
			<block v-for="(item,index) in colors" :key="item.key">
				<view class="fui-section__title">{{item.text}}</view>
				<view  v-for="(model,idx) in item.data" :key="idx"
					class="fui-color__item fui-page__spacing fui-align__center"
					:style="{background:model.gradual || model.value,color:model.color}">
					<text>{{model.text}}</text>
					<text>{{model.value}}</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	const colors = require('./color.js');
	export default {
		data() {
			return {
				colors: colors
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.fui-color__item {
		width: 100%;
		justify-content: space-between;
		height: 84rpx;
		border-radius: 42px;
		margin-bottom: 24rpx;
		font-size: 28rpx;
		font-weight: 400;
		box-shadow: 0 4rpx 8rpx 0 rgba(2, 4, 38, 0.05);
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}
</style>