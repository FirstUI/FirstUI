<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Layout</view>
			<view class="fui-page__desc">Layout 栅格布局，将整个屏幕宽度分为 24 单位，每个单位的大小，由当前屏幕尺寸决定。</view>
		</view>
		<view class="fui-page__bd">
			<view class="fui-section__title">基础布局</view>
			<fui-row margin-bottom="24rpx">
				<fui-col>
					<view class="fui-col__item fui-color__black"></view>
				</fui-col>
			</fui-row>
			<fui-row margin-bottom="24rpx">
				<fui-col :span="12">
					<view class="fui-col__item fui-color__black"></view>
				</fui-col>
				<fui-col :span="12">
					<view class="fui-col__item fui-color__yellow"></view>
				</fui-col>
			</fui-row>

			<fui-row marginBottom="24rpx">
				<fui-col :span="8">
					<view class="fui-col__item fui-color__black"></view>
				</fui-col>
				<fui-col :span="8">
					<view class="fui-col__item fui-color__yellow"></view>
				</fui-col>
				<fui-col :span="8">
					<view class="fui-col__item fui-color__black"></view>
				</fui-col>
			</fui-row>

			<fui-row marginBottom="24rpx">
				<fui-col :span="6">
					<view class="fui-col__item fui-color__black"></view>
				</fui-col>
				<fui-col :span="6">
					<view class="fui-col__item fui-color__yellow"></view>
				</fui-col>
				<fui-col :span="6">
					<view class="fui-col__item fui-color__black"></view>
				</fui-col>
				<fui-col :span="6">
					<view class="fui-col__item fui-color__yellow"></view>
				</fui-col>
			</fui-row>
			<fui-row marginBottom="24rpx">
				<fui-col :span="4">
					<view class="fui-col__item fui-color__black"></view>
				</fui-col>
				<fui-col :span="4">
					<view class="fui-col__item fui-color__yellow"></view>
				</fui-col>
				<fui-col :span="4">
					<view class="fui-col__item fui-color__black"></view>
				</fui-col>
				<fui-col :span="4">
					<view class="fui-col__item fui-color__yellow"></view>
				</fui-col>
				<fui-col :span="4">
					<view class="fui-col__item fui-color__black"></view>
				</fui-col>
				<fui-col :span="4">
					<view class="fui-col__item fui-color__yellow"></view>
				</fui-col>
			</fui-row>

			<view class="fui-section__title">混合布局</view>
			<fui-row marginBottom="24rpx" :gutter="gutter">
				<fui-col :span="8">
					<view class="fui-col__item fui-color__black"></view>
				</fui-col>
				<fui-col :span="8">
					<view class="fui-col__item fui-color__yellow"></view>
				</fui-col>
				<fui-col :span="4">
					<view class="fui-col__item fui-color__black"></view>
				</fui-col>
				<fui-col :span="4">
					<view class="fui-col__item fui-color__yellow"></view>
				</fui-col>
			</fui-row>

			<fui-row marginBottom="24rpx" :gutter="gutter">
				<fui-col :span="4">
					<view class="fui-col__item fui-color__black"></view>
				</fui-col>
				<fui-col :span="16">
					<view class="fui-col__item fui-color__yellow"></view>
				</fui-col>
				<fui-col :span="4">
					<view class="fui-col__item fui-color__black"></view>
				</fui-col>
			</fui-row>

			<view class="fui-section__title">分栏偏移</view>
			<fui-row marginBottom="10px" :gutter="gutter">
				<fui-col :span="8">
					<view class="fui-col__item fui-color__black"></view>
				</fui-col>
				<fui-col :span="8" :offset="6">
					<view class="fui-col__item fui-color__yellow"></view>
				</fui-col>
			</fui-row>

			<fui-row marginBottom="10px" :gutter="gutter">
				<fui-col :span="6" :offset="6">
					<view class="fui-col__item fui-color__black"></view>
				</fui-col>
				<fui-col :span="6" :offset="6">
					<view class="fui-col__item fui-color__yellow"></view>
				</fui-col>
			</fui-row>

			<fui-row marginBottom="10px" :gutter="gutter">
				<fui-col :span="12" :pullRight="0">
					<view class="fui-col__item fui-color__black"></view>
				</fui-col>
				<fui-col :span="6" :pushLeft="6">
					<view class="fui-col__item fui-color__yellow"></view>
				</fui-col>
			</fui-row>

			<fui-row marginBottom="24rpx" :gutter="gutter">
				<fui-col :span="12" :offset="6">
					<view class="fui-col__item fui-color__black"></view>
				</fui-col>
			</fui-row>
			<view class="fui-section__title">响应式布局</view>
			<fui-row marginBottom="24rpx" :gutter="gutter">
				<fui-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
					<view class="fui-col__item fui-color__black"></view>
				</fui-col>
				<fui-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
					<view class="fui-col__item fui-color__yellow"></view>
				</fui-col>
				<fui-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
					<view class="fui-col__item fui-color__black"></view>
				</fui-col>
				<fui-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
					<view class="fui-col__item fui-color__yellow"></view>
				</fui-col>
			</fui-row>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gutter: 0
			}
		},
		methods: {

		}
	}
</script>

<style>
	.fui-section__title {
		margin-left: 32rpx;
	}

	.fui-col__item {
		height: 84rpx;
		border-radius: 16rpx;
	}

	.fui-color__black {
		background-color: #333333;
	}

	.fui-color__yellow {
		background-color: #FFB703;
	}
</style>
