<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Switch</view>
			<view class="fui-page__desc">Switch 开关选择器，原生组件增强。</view>
		</view>
		<view class="fui-page__bd">
			<view class="fui-section__title">基础使用</view>
			<fui-list-cell :highlight="false" :padding="['28rpx','32rpx']">
				<view class="fui-cells">
					<text>状态：{{status?'ON':'OFF'}}</text>
					<fui-switch @change="change"></fui-switch>
				</view>
			</fui-list-cell>
			<view class="fui-section__title">默认打开</view>
			<fui-list-cell :highlight="false" :padding="['28rpx','32rpx']">
				<view class="fui-cells">
					<text>checked</text>
					<fui-switch checked></fui-switch>
				</view>
			</fui-list-cell>
			<view class="fui-section__title">禁用状态</view>
			<fui-list-cell :highlight="false" :padding="['28rpx','32rpx']">
				<view class="fui-cells">
					<text>checked/disabled</text>
					<fui-switch checked disabled></fui-switch>
				</view>
			</fui-list-cell>
			<view class="fui-section__title">改变大小、颜色</view>
			<fui-label>
				<fui-list-cell>
					<view class="fui-cells">
						<text>scaleRatio</text>
						<fui-switch :scaleRatio="0.8" color="#FFB703"></fui-switch>
					</view>
				</fui-list-cell>
			</fui-label>
			<view class="fui-section__title">展示为checkbox</view>
			<fui-label>
				<fui-list-cell>
					<view class="fui-cells">
						<text>type=checkbox</text>
						<fui-switch type="checkbox" color="#FFB703" :scaleRatio="1.1">
						</fui-switch>
					</view>
				</fui-list-cell>
			</fui-label>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: false
			}
		},
		methods: {
			change(e) {
				this.status = e.detail.value
			}
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

	.fui-cells {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
