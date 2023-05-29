<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Button</view>
			<view class="fui-page__desc">Button 按钮，支持自定义大小、颜色等。</view>
		</view>
		<view class="fui-page__bd fui-page__spacing">
			<view class="fui-section__title">按钮类型</view>
			<fui-button text="默认按钮" @click="btnClick"></fui-button>
			<fui-button :margin="['24rpx']" type="success">success</fui-button>
			<fui-button type="warning">warning</fui-button>
			<fui-button :margin="['24rpx']" type="danger">danger</fui-button>
			<fui-button type="purple">purple</fui-button>
			<fui-button :margin="['24rpx']" type="link" color="#465CFF">链接 link</fui-button>
			<view class="fui-section__title">禁用状态</view>
			<fui-button disabled>禁用按钮</fui-button>
			<fui-button :margin="['24rpx']" disabled loading>禁用按钮</fui-button>
			<fui-button disabled disabledBackground="#F8F8F8" disabledColor="#CCCCCC">禁用按钮
			</fui-button>
			<view class="fui-section__title">按钮形状</view>
			<fui-button radius="0">方形按钮</fui-button>
			<fui-button radius="96rpx" :margin="['24rpx']">圆形按钮</fui-button>
			<view class="fui-section__title">按钮大小</view>
			<fui-button btn-size="medium">medium</fui-button>
			<fui-button type="warning" :margin="['24rpx']" btn-size="small">small</fui-button>
			<fui-button type="danger" btn-size="mini">mini</fui-button>
			<view class="fui-section__title">自定义按钮大小</view>
			<fui-button plain color="#465CFF" borderColor="#465CFF">默认大小</fui-button>
			<fui-button type="purple" :margin="['24rpx']" width="224rpx" height="84rpx" :size="28">小型按钮</fui-button>
			<fui-button type="danger" width="200rpx" height="72rpx" :size="28">小型按钮</fui-button>
			<view class="fui-section__title">自定义颜色</view>
			<fui-button background="#fff" color="#465CFF" borderColor="#465CFF">朴素按钮</fui-button>
			<fui-button :margin="['24rpx']" background="#fff" color="#6831FF" borderColor="#6831FF">朴素按钮</fui-button>
			<fui-button background="linear-gradient(300deg, #6831FF 0%, #465CFF 100%)" border-width="0">渐变按钮
			</fui-button>
			<fui-button :margin="['24rpx']" background="linear-gradient(127deg, #FF416C 0%, #FF2B2B 100%)"
				border-width="0">渐变按钮
			</fui-button>
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
			btnClick() {
				this.fui.toast('click~')
				// console.log('click~')
			}
		}
	}
</script>

<style></style>