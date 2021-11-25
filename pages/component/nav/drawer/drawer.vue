<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Drawer</view>
			<view class="fui-page__desc">Drawer 抽屉，抽屉式导航，用于展示侧滑菜单，侧滑导航。</view>
		</view>
		<view class="fui-page__bd">
			<fui-button type="gray" width="400rpx" height="84rpx" text="从右往左开" bold :margin="['24rpx']"
				@click="showDrawer(1)"></fui-button>
			<fui-button type="gray" width="400rpx" height="84rpx" text="从左往右开" bold @click="showDrawer(2)">
			</fui-button>
		</view>
		<fui-drawer :show="show" @close="closeDrawer(1)">
			<scroll-view scroll-y class="fui-scroll__view">
				<view>
					<fui-list-cell arrow v-for="(item,index) in itemList" :key="index">
						item{{index+1}}
					</fui-list-cell>
				</view>
			</scroll-view>
		</fui-drawer>

		<fui-drawer :show="show2" direction="left" :maskClosable="false">
			<view class="fui-scroll__view">
				<view class="fui-title">左侧菜单栏</view>
				<scroll-view scroll-y style="height: 720rpx;">
					<view>
						<fui-list-cell v-for="(item,index) in itemList" :key="index">
							item{{index+1}}
						</fui-list-cell>
					</view>
				</scroll-view>
				<view class="fui-btn__box">
					<fui-button type="warning" width="400rpx" height="84rpx" text="关闭菜单栏" bold @click="closeDrawer(2)">
					</fui-button>
				</view>
			</view>
		</fui-drawer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				show2: false,
				itemList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
			}
		},
		methods: {
			showDrawer(type) {
				if (type === 1) {
					this.show = true
				} else {
					this.show2 = true
				}
			},
			closeDrawer(type) {
				if (type === 1) {
					this.show = false
				} else {
					this.show2 = false
				}
			}
		}
	}
</script>

<style>
	page {
		font-weight: normal;
	}

	.fui-page__bd {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.fui-scroll__view {
		width: 520rpx;
		flex: 1;
		overflow: hidden;
	}

	.fui-title {
		padding: 64rpx 32rpx 32rpx;
		box-sizing: border-box;
		font-weight: bold;
	}

	.fui-btn__box {
		padding: 40rpx 0;
		display: flex;
		justify-content: center;
	}
</style>
