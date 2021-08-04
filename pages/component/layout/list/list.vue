<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">List</view>
			<view class="fui-page__desc">List 列表，常用的布局组件。</view>
		</view>
		<view class="fui-page__bd">
			<view class="fui-section__title">基础使用</view>
			<fui-list>
				<fui-list-cell>标题文字</fui-list-cell>
				<fui-list-cell>
					<text>标题文字</text>
					<text class="fui-text__explain">说明文字</text>
				</fui-list-cell>
				<fui-list-cell arrow>
					<text>标题文字</text>
				</fui-list-cell>
				<fui-list-cell arrow>
					<view class="fui-list__item">
						<text>标题文字</text>
						<text class="fui-text__explain">说明文字</text>
					</view>
				</fui-list-cell>
				<fui-list-cell arrow :bottomLeft="0">
					<view class="fui-list__item">
						<text>标题文字</text>
						<fui-badge value="1" type="danger"></fui-badge>
					</view>
				</fui-list-cell>
			</fui-list>
			<view class="fui-section__title" style="margin-bottom: 0;">无点击效果、带标题</view>
			<fui-list bottomBorder title="带标题的列表">
				<fui-list-cell :highlight="false">标题文字</fui-list-cell>
				<fui-list-cell :bottomBorder="false" :highlight="false" arrow>标题文字</fui-list-cell>
			</fui-list>
			<view class="fui-section__title">带图标的列表</view>
			<fui-list-cell topBorder>
				<view class="fui-align__center">
					<image class="fui-list__icon" src="/static/images/common/icon_tabbar.png" mode="widthFix">
					</image>
					<text>标题文字</text>
				</view>
			</fui-list-cell>
			<fui-list-cell>
				<view class="fui-align__center">
					<image class="fui-list__icon" src="/static/images/common/icon_tabbar.png" mode="widthFix">
					</image>
					<text>标题文字</text>
				</view>
				<text class="fui-text__explain">说明文字</text>
			</fui-list-cell>
			<fui-list-cell arrow>
				<view class="fui-align__center">
					<image class="fui-list__icon" src="/static/images/common/icon_tabbar.png" mode="widthFix">
					</image>
					<text>标题文字</text>
				</view>
			</fui-list-cell>
			<fui-list-cell arrow :bottomLeft="0">
				<view class="fui-list__item">
					<view class="fui-align__center">
						<image class="fui-list__icon" src="/static/images/common/icon_tabbar.png" mode="widthFix">
						</image>
						<text>标题文字</text>
					</view>
					<text class="fui-text__explain">说明文字</text>
				</view>
			</fui-list-cell>

			<view class="fui-section__title">改变底部线条左侧偏移距离</view>
			<fui-list-cell topBorder :bottomLeft="104">
				<view class="fui-align__center">
					<image class="fui-list__icon" src="/static/images/common/icon_tabbar.png" mode="widthFix">
					</image>
					<text>标题文字</text>
				</view>
			</fui-list-cell>
			<fui-list-cell :bottomLeft="0">
				<view class="fui-align__center">
					<image class="fui-list__icon" src="/static/images/common/icon_tabbar.png" mode="widthFix">
					</image>
					<text>标题文字</text>
				</view>
			</fui-list-cell>
			<view class="fui-section__title">改变底部线条右侧偏移距离</view>
			<fui-list-cell :bottomRight="32">
				<view class="fui-align__center">
					<image class="fui-list__icon" src="/static/images/common/icon_tabbar.png" mode="widthFix">
					</image>
					<text>标题文字</text>
				</view>
			</fui-list-cell>
			<fui-list-cell :bottomBorder="false">
				<view class="fui-align__center">
					<image class="fui-list__icon" src="/static/images/common/icon_tabbar.png" mode="widthFix">
					</image>
					<text>标题文字</text>
				</view>
			</fui-list-cell>
			<view class="fui-section__title">无线条</view>
			<fui-list-cell :bottomBorder="false" arrow>
				<view class="fui-align__center">
					<image class="fui-list__icon" src="/static/images/common/icon_tabbar.png" mode="widthFix">
					</image>
					<text>标题文字</text>
				</view>
			</fui-list-cell>
			<fui-list-cell :bottomBorder="false" arrow>
				<view class="fui-align__center">
					<image class="fui-list__icon" src="/static/images/common/icon_tabbar.png" mode="widthFix">
					</image>
					<text>标题文字</text>
				</view>
			</fui-list-cell>
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
		font-weight: normal;
		/* 非nvue端使用此变量改变list线条颜色，nvue端请查看文档 */
		/* --fui-color-border:#B2B2B2; */
	}

	.fui-section__title {
		margin-left: 32rpx;
	}

	.fui-list__item {
		flex: 1;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.fui-text__explain {
		font-size: 28rpx;
		color: #7F7F7F;
		flex-shrink: 0;
	}

	.fui-list__icon {
		width: 48rpx;
		height: 48rpx;
		margin-right: 24rpx;
	}
</style>
