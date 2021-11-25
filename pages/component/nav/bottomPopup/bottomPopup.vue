<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">BottomPopup</view>
			<view class="fui-page__desc">BottomPopup 底部弹出层，从底部弹出的浮层，引导用户进行相关操作。</view>
		</view>
		<view class="fui-page__bd">
			<fui-button type="gray" width="400rpx" height="84rpx" text="基础使用" bold :margin="['24rpx']"
				@click="showPopup(1)"></fui-button>
			<fui-button type="gray" width="400rpx" height="84rpx" text="案例一" bold @click="showPopup(2)">
			</fui-button>
			<fui-button type="gray" width="400rpx" height="84rpx" text="内容可滚动" :margin="['24rpx']" bold
				@click="showPopup(3)">
			</fui-button>
		</view>

		<fui-bottom-popup :show="show" @close="closePopup(1)">
			<view class="fui-custom__wrap">
				这是自定义内容区
			</view>
		</fui-bottom-popup>

		<!--案例一-->
		<fui-bottom-popup :show="show2" :maskClosable="false">
			<view class="fui-popup__container">
				<text class="fui-title">测试标题一</text>
				<text class="fui-sub__title">测试标题一的副标题</text>
				<text class="fui-descr">辅助描述内容，可根据实际需要安排</text>
				<text class="fui-sub__descr">辅助提示内容，可根据实际需要安排</text>
				<view class="fui-btn__box">
					<fui-button type="gray" width="240rpx" height="80rpx" text="辅助操作" :margin="['0','16rpx']">
					</fui-button>
					<fui-button width="240rpx" height="80rpx" text="主操作" :margin="['0','16rpx']"></fui-button>
				</view>

				<view class="fui-icon__close" @tap="closePopup(2)">
					<fui-icon name="close" :size="48"></fui-icon>
				</view>
			</view>
		</fui-bottom-popup>

		<fui-bottom-popup :show="show3" @close="closePopup(3)">
			<view class="fui-scroll__wrap">
				<view class="fui-title fui-title__pb">测试标题二</view>
				<scroll-view scroll-y class="fui-scroll__view">
					<fui-list-cell v-for="(item,index) in itemList" :key="index">item{{index+1}}</fui-list-cell>
				</scroll-view>
				<view class="fui-icon__close" @tap="closePopup(3)">
					<fui-icon name="close" :size="48"></fui-icon>
				</view>
			</view>
		</fui-bottom-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				show2: false,
				show3: false,
				itemList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
			}
		},
		methods: {
			showPopup(type) {
				if (type === 1) {
					this.show = true
				} else if (type === 2) {
					this.show2 = true
				} else {
					this.show3 = true
				}
			},
			closePopup(type) {
				if (type === 1) {
					this.show = false
				} else if (type === 2) {
					this.show2 = false
				} else {
					this.show3 = false
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

	.fui-custom__wrap {
		width: 100%;
		height: 520rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* 案例一 start*/
	.fui-popup__container {
		width: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: 24rpx 32rpx;
		box-sizing: border-box;
	}

	.fui-title {
		font-size: 30rpx;
		font-weight: bold;
		text-align: center;
	}

	.fui-sub__title {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		text-align: center;
		font-size: 24rpx;
		color: #7F7F7F;
		transform: scale(.9);
	}

	.fui-descr {
		font-weight: bold;
		padding-top: 64rpx;
	}

	.fui-sub__descr {
		font-size: 26rpx;
		color: #B2B2B2;
		padding: 32rpx 0;
	}

	.fui-btn__box {
		display: flex;
		justify-content: center;
		padding: 32rpx 0;
		box-sizing: border-box;
	}

	.fui-icon__close {
		position: absolute;
		top: 24rpx;
		left: 24rpx;
	}

	/* 案例一 end*/
	.fui-scroll__wrap {
		padding-top: 30rpx;
		position: relative;
	}

	.fui-scroll__view {
		width: 100%;
		height: 600rpx;
	}

	.fui-title__pb {
		padding-bottom: 24rpx;
	}
</style>
