<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Utils</view>
			<view class="fui-page__desc">Utils 工具类，更多使用请查看文档。</view>
		</view>
		<view class="fui-page__bd fui-page__spacing">
			<view class="fui-section__title">英文首字母大写</view>
			<view class="fui-btn__flex-center">
				<view class="fui-page__desc">转换：english</view>
				<fui-button type="gray" width="400rpx" height="84rpx" text="首字母转大写" bold :margin="['24rpx']"
					@click="titleCase"></fui-button>
			</view>
			<view class="fui-section__title">压缩连续的字母字符串</view>
			<view class="fui-btn__flex-center">
				<view class="fui-page__desc">压缩：aabbbcddddddddd</view>
				<fui-button type="gray" width="400rpx" height="84rpx" text="压缩" bold :margin="['24rpx']"
					@click="compressLetter"></fui-button>
			</view>
			<view class="fui-section__title">等待多少毫秒再执行 ，同步阻塞</view>
			<view class="fui-btn__flex-center">
				<fui-button type="gray" width="400rpx" height="84rpx" text="等待 1000毫秒" bold :margin="['24rpx']"
					@click="sleep"></fui-button>
			</view>
			<view class="fui-section__title">去字符串左右空格</view>
			<view class="fui-btn__flex-center">
				<view class="fui-page__desc">字符串 abcd </view>
				<fui-button type="gray" width="400rpx" height="84rpx" text="去左右空格" bold :margin="['24rpx']"
					@click="trim"></fui-button>
			</view>
			<view class="fui-section__title">去字符串所有空格</view>
			<view class="fui-btn__flex-center">
				<view class="fui-page__desc">字符串 a b c d </view>
				<fui-button type="gray" width="400rpx" height="84rpx" text="去所有空格" bold :margin="['24rpx']"
					@click="trimAll"></fui-button>
			</view>
			<view class="fui-section__title">替换所有相同字符串</view>
			<view class="fui-btn__flex-center">
				<view class="fui-page__desc">将字符串：##a###b#######c# 中#替换为空</view>
				<fui-button type="gray" width="400rpx" height="84rpx" text="替换" bold :margin="['24rpx']"
					@click="replaceAll"></fui-button>
			</view>
			<view class="fui-section__title">格式化手机号码</view>
			<view class="fui-btn__flex-center">
				<view class="fui-page__desc">手机号：15715600012</view>
				<fui-button type="gray" width="400rpx" height="84rpx" text="格式化" bold :margin="['24rpx']"
					@click="numberFormatter"></fui-button>
			</view>
			<view class="fui-section__title">格式化金额，保留两位小数</view>
			<view class="fui-btn__flex-center">
				<view class="fui-page__desc">金额：2021</view>
				<fui-button type="gray" width="400rpx" height="84rpx" text="格式化" bold :margin="['24rpx']"
					@click="moneyFormatter"></fui-button>
			</view>
			<view class="fui-section__title">其他功能</view>
			<view class="fui-page__desc">除以上功能以外，还有：日期时间格式化，RGB颜色转十六进制颜色，十六进制颜色转RGB颜色，获取唯一标识，获取uuid，简单数组合并去重，获取日期时间段，获取Url参数，函数防抖，函数节流等功能，具体使用请查看文档。</view>
		</view>
	</view>
</template>

<script>
	const utils = require('@/components/firstui/fui-utils');
	export default {
		data() {
			return {

			}
		},
		methods: {
			titleCase() {
				const text = 'english';
				const val = utils.titleCase(text);
				console.log(val);
				this.fui.toast(val)
			},
			compressLetter() {
				const text = 'aabbbcddddddddd';
				const val = utils.compressLetter(text);
				console.log(val);
				this.fui.toast(val)
			},
			sleep() {
				utils.sleep(1000)
				this.fui.toast('1000ms后执行！')
			},
			trim() {
				const text = ' abcd ';
				const val = utils.trim(text);
				console.log(val);
				this.fui.toast(`字符串${val}`)
			},
			trimAll() {
				const text = ' a b c d ';
				const val = utils.trimAll(text);
				console.log(val);
				this.fui.toast(`字符串${val}`)
			},
			replaceAll() {
				const text = '##a###b#######c#';
				const val = utils.replaceAll(text, '#', '');
				console.log(val);
				this.fui.toast(val)
			},
			numberFormatter() {
				const text = '15715600012';
				const val = utils.numberFormatter(text);
				console.log(val);
				this.fui.toast(val)
			},
			moneyFormatter() {
				const text = '2021';
				const val = utils.moneyFormatter(text);
				console.log(val);
				this.fui.toast(val)
			}
		}
	}
</script>

<style>
	.fui-btn__flex-center {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.fui-section__title:not(:first-child) {
		margin-top: 72rpx;
	}
</style>
