<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Dialog</view>
			<view class="fui-page__desc">Dialog 对话框，在浮层中显示，引导用户进行相关操作。</view>
		</view>
		<view class="fui-page__bd fui-page__spacing">
			<fui-button type="gray" width="400rpx" height="84rpx" text="基础使用" bold :margin="['24rpx']"
				@click="showDialog(1)"></fui-button>
			<fui-button type="gray" width="400rpx" height="84rpx" text="自定义按钮" bold @click="showDialog(2)">
			</fui-button>
		</view>
		<fui-dialog :show="show" content="弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内" maskClosable @click="onClick"
			@close="onClose"></fui-dialog>

		<fui-dialog :show="visible" title="我是标题" content="我是自定义的对话框！" :buttons="buttons" @click="onTap"></fui-dialog>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				visible: false,
				buttons: [{
					text: '确定',
					color: '#FF2B2B'
				}]
			}
		},
		methods: {
			showDialog(type) {
				if (type === 1) {
					this.show = true
				} else {
					this.visible = true
				}
			},
			onClick(e) {
				console.log(e)
				this.onClose()
			},
			//设置maskClosable为true时（点击遮罩可关闭），需要配合@close事件一起使用，通过控制show来达到关闭效果
			onClose(e) {
				this.show = false
			},
			onTap(e) {
				console.log(e)
				this.visible = false
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
