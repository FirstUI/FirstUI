<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">ActionSheet</view>
			<view class="fui-page__desc">ActionSheet 上拉菜单，从底部弹出的模态框，提供和当前场景相关的操作菜单。</view>
		</view>
		<view class="fui-page__bd fui-page__spacing">
			<fui-button type="gray" width="400rpx" height="84rpx" text="带提示" bold :margin="['24rpx']"
				@click="showActionSheet(1)"></fui-button>
			<fui-button type="gray" width="400rpx" height="84rpx" text="无提示操作" bold @click="showActionSheet(2)">
			</fui-button>
			<fui-button type="gray" width="400rpx" height="84rpx" text="暗黑模式" :margin="['24rpx']" bold
				@click="showActionSheet(3)">
			</fui-button>
			<fui-button type="gray" width="400rpx" height="84rpx" text="无取消按钮" bold @click="showActionSheet(4)">
			</fui-button>
		</view>
		<fui-actionsheet :show="show" :tips="tips" :itemList="itemList" :isCancel="isCancel" :theme="theme"
			@click="itemClick" @cancel="cancel"></fui-actionsheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				tips: '',
				itemList: [],
				isCancel: true,
				theme: 'light'
			}
		},
		methods: {
			showActionSheet(type) {
				this.tips = '';
				this.isCancel = true;
				this.theme = 'light';
				switch (type) {
					case 1:
						this.tips = '退出后不会删除任何历史数据，下次登录依然可以使用本账号。';
						this.itemList = [{
							text: '退出登录',
							color: '#FF2B2B'
						}]
						break;
					case 2:
						this.itemList = ['点赞', '评论', '收藏']
						break;
					case 3:
						this.itemList = ['点赞', '评论', '收藏']
						this.theme = 'dark'
						break;
					case 4:
						this.tips = '请选择性别';
						this.itemList = ['男', '女', '未知']
						this.isCancel = false;
						break;
					default:
						break;
				}
				setTimeout(() => {
					this.show = true
				}, 50)
			},
			itemClick(e) {
				console.log(e)
				this.fui.toast(e.text)
				this.cancel()
			},
			cancel() {
				this.show = false
			}
		}
	}
</script>

<style>
	.fui-page__bd {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
</style>
