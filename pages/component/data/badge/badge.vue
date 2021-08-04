<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Badge</view>
			<view class="fui-page__desc">Badge 徽章，可自定义颜色。</view>
		</view>
		<view class="fui-page__bd">
			<view class="fui-section__title">基础使用</view>
			<fui-list-cell :highlight="false">
				<fui-badge value="1"></fui-badge>
				<fui-badge type="success" value="2"></fui-badge>
				<fui-badge type="warning" value="3"></fui-badge>
				<fui-badge type="danger" value="4"></fui-badge>
				<fui-badge type="purple" value="5"></fui-badge>
				<fui-badge value="6" background="#eee" color="#333"></fui-badge>
				<fui-badge dot></fui-badge>
				<fui-badge type="success" dot></fui-badge>
				<fui-badge type="warning" dot></fui-badge>
				<fui-badge type="danger" dot></fui-badge>
				<fui-badge type="purple" dot></fui-badge>
			</fui-list-cell>
			<view class="fui-section__title">新消息</view>
			<fui-list-cell arrow topBorder>
				<view class="fui-list__item">
					<text>单行列表</text>
					<fui-badge value="1" type="danger"></fui-badge>
				</view>
			</fui-list-cell>
			<fui-list-cell arrow>
				<view class="fui-list__item">
					<text>单行列表</text>
					<fui-badge dot type="danger"></fui-badge>
				</view>
			</fui-list-cell>
			<fui-list-cell arrow>
				<view class="fui-align__center">
					<text>单行列表</text>
					<fui-badge type="danger" :marginLeft="16" value="8"></fui-badge>
				</view>
			</fui-list-cell>
			<fui-list-cell arrow :bottomLeft="0">
				<view class="fui-align__center">
					<text>单行列表</text>
					<fui-badge type="danger" :marginLeft="16" value="new"></fui-badge>
				</view>
			</fui-list-cell>
			<view class="fui-section__title">新消息、绝对定位</view>
			<fui-list-cell topBorder>
				<view class="fui-align__center">
					<view class="fui-item__img-box">
						<image class="fui-item__img" src="/static/images/common/icon_tabbar_3x.png" mode="widthFix">
						</image>
						<fui-badge absolute type="danger" value="99+"></fui-badge>
					</view>
					<view>
						<view>联系人名称</view>
						<text class="fui-page__desc">摘要信息</text>
					</view>
				</view>
			</fui-list-cell>
			<fui-list-cell :bottomLeft="0">
				<view class="fui-align__center">
					<view class="fui-item__img-box">
						<image class="fui-item__img" src="/static/images/common/icon_tabbar_3x.png" mode="widthFix">
						</image>
						<fui-badge absolute type="danger" dot></fui-badge>
					</view>
					<view>
						<view>联系人名称</view>
						<text class="fui-page__desc">摘要信息</text>
					</view>
				</view>
			</fui-list-cell>
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

	.fui-section__title {
		margin-left: 32rpx;
	}

	.fui-list__item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.fui-item__img-box {
		position: relative;
		margin-right: 24rpx;
	}

	.fui-item__img {
		width: 96rpx;
		height: 96rpx;
		display: block;
	}
</style>
