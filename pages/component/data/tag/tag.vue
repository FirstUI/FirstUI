<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Tag</view>
			<view class="fui-page__desc">Tag 标签，用于标记或分类。</view>
		</view>
		<view class="fui-page__bd fui-page__spacing">
			<view class="fui-section__title">基础使用</view>
			<view class="fui-align__center">
				<fui-tag text="标签一" margin-bottom="24" margin-right="24"></fui-tag>
				<fui-tag text="标签二" type="danger" margin-bottom="24" margin-right="24"></fui-tag>
				<fui-tag text="标签三" type="success" margin-bottom="24" margin-right="24"></fui-tag>
				<fui-tag text="标签四" type="warning" margin-bottom="24" margin-right="24"></fui-tag>
				<fui-tag text="标签五" type="purple" margin-bottom="24"></fui-tag>
			</view>
			<view class="fui-section__title">浅色调</view>
			<view class="fui-align__center">
				<fui-tag text="标签一" margin-bottom="24" theme="light" margin-right="24"></fui-tag>
				<fui-tag text="标签二" type="danger" theme="light" margin-bottom="24" margin-right="24"></fui-tag>
				<fui-tag text="标签三" type="success" theme="light" margin-bottom="24" margin-right="24"></fui-tag>
				<fui-tag text="标签四" type="warning" theme="light" margin-bottom="24" margin-right="24"></fui-tag>
				<fui-tag text="标签五" type="purple" theme="light" margin-bottom="24" margin-right="24"></fui-tag>
			</view>
			<view class="fui-section__title">空心</view>
			<view class="fui-align__center">
				<fui-tag text="标签一" margin-bottom="24" theme="plain" margin-right="24"></fui-tag>
				<fui-tag text="标签二" type="danger" theme="plain" margin-bottom="24" margin-right="24"></fui-tag>
				<fui-tag text="标签三" type="success" theme="plain" margin-bottom="24" margin-right="24"></fui-tag>
				<fui-tag text="标签四" type="warning" theme="plain" margin-bottom="24" margin-right="24"></fui-tag>
				<fui-tag text="标签五" type="purple" theme="plain" margin-bottom="24"></fui-tag>
			</view>
			<view class="fui-section__title">带关闭按钮</view>
			<view class="fui-align__center">
				<fui-tag text="标签一" theme="light" margin-right="24" :padding="['12rpx','20rpx']">
					<view class="fui-close__icon">
						<fui-icon name="close" color="#465CFF" :size="32"></fui-icon>
					</view>
				</fui-tag>
				<fui-tag text="标签二" type="danger" theme="light" margin-right="24" :padding="['12rpx','20rpx']">
					<view class="fui-close__icon">
						<fui-icon name="clear" color="#FF2B2B" :size="32"></fui-icon>
					</view>
				</fui-tag>
				<fui-tag text="标签三" type="success" theme="light" margin-right="24" :padding="['12rpx','20rpx']">
					<view class="fui-close__icon">
						<fui-icon name="clear-fill" color="#09BE4F" :size="32"></fui-icon>
					</view>
				</fui-tag>
			</view>
			<view class="fui-section__title">自定义颜色、大小</view>
			<view class="fui-align__center">
				<fui-tag text="标签一" background="rgba(255, 43, 43, .05)" color="#333" margin-bottom="24"
					margin-right="24"></fui-tag>
				<fui-tag text="标签二" background="#CCCCCC" color="#fff" margin-bottom="24" margin-right="24"></fui-tag>
				<fui-tag text="标签三" background="rgba(255, 183, 3, .1)" color="#FF2B2B" margin-bottom="24"
					:scaleRatio="0.8" margin-right="24"></fui-tag>
				<fui-tag text="标签四" background="rgba(104, 49, 255, .05)" color="#181818" margin-bottom="24"
					:padding="['20rpx','40rpx']" margin-right="24"></fui-tag>
				<fui-tag text="标签五" background="rgba(9, 190, 79, .05)" color="#181818" margin-bottom="24"
					:padding="['12rpx','24rpx']"></fui-tag>
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
	page {
		background-color: #fff;
	}

	.fui-align__center {
		flex-wrap: wrap;
	}

	.fui-close__icon {
		display: flex;
		align-items: center;
		padding: 6rpx 0 4rpx 24rpx;
	}
</style>
