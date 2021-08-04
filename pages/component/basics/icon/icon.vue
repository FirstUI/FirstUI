<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Icon</view>
			<view class="fui-page__desc">Icon 图标，First UI字体图标库，可自行扩展。</view>
		</view>
		<view class="fui-page__bd fui-page__spacing">
			<fui-grid ref="fuiGrid" :columns="3">
				<fui-grid-item v-for="(item, index) in icons" :index="index" :key="index">
					<view class="fui-icon__item">
						<fui-icon :name="item"></fui-icon>
						<text class="fui-icon__name">{{ item }}</text>
					</view>
				</fui-grid-item>
			</fui-grid>
		</view>
	</view>
</template>

<script>
	const icons = require('./icon.js');
	export default {
		data() {
			return {
				icons: icons
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: 'fuiFont';
		src: url("~@/components/firstui/fui-icon/fui-icon.ttf") format("truetype");
	}

	/* #endif */
	page {
		background-color: #FFFFFF;
	}

	.fui-icon__item {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.fui-icon__name {
		font-size: 28rpx;
		font-weight: 400;
		padding-top: 16rpx;
	}
</style>
