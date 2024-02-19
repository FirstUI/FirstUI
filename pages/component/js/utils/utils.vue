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
				<fui-button type="gray" btn-size="medium" text="首字母转大写" bold :margin="['24rpx']"
					@click="titleCase"></fui-button>
			</view>
			<view class="fui-section__title">压缩连续的字母字符串</view>
			<view class="fui-btn__flex-center">
				<view class="fui-page__desc">压缩：aabbbcddddddddd</view>
				<fui-button type="gray" btn-size="medium" text="压缩" bold :margin="['24rpx']"
					@click="compressLetter"></fui-button>
			</view>
			<view class="fui-section__title">等待多少毫秒再执行 ，同步阻塞</view>
			<view class="fui-btn__flex-center">
				<fui-button type="gray" btn-size="medium" text="等待 1000毫秒" bold :margin="['24rpx']"
					@click="sleep"></fui-button>
			</view>
			<view class="fui-section__title">去字符串左右空格</view>
			<view class="fui-btn__flex-center">
				<view class="fui-page__desc">字符串 abcd </view>
				<fui-button type="gray" btn-size="medium" text="去左右空格" bold :margin="['24rpx']"
					@click="trim"></fui-button>
			</view>
			<view class="fui-section__title">去字符串所有空格</view>
			<view class="fui-btn__flex-center">
				<view class="fui-page__desc">字符串 a b c d </view>
				<fui-button type="gray" btn-size="medium" text="去所有空格" bold :margin="['24rpx']"
					@click="trimAll"></fui-button>
			</view>
			<view class="fui-section__title">替换所有相同字符串</view>
			<view class="fui-btn__flex-center">
				<view class="fui-page__desc">将字符串：##a###b#######c# 中#替换为空</view>
				<fui-button type="gray" btn-size="medium" text="替换" bold :margin="['24rpx']"
					@click="replaceAll"></fui-button>
			</view>
			<view class="fui-section__title">格式化手机号码</view>
			<view class="fui-btn__flex-center">
				<view class="fui-page__desc">手机号：15715600012</view>
				<fui-button type="gray" btn-size="medium" text="格式化" bold :margin="['24rpx']"
					@click="numberFormatter"></fui-button>
			</view>
			<view class="fui-section__title">格式化金额，保留两位小数</view>
			<view class="fui-btn__flex-center">
				<view class="fui-page__desc">金额：2021</view>
				<fui-button type="gray" btn-size="medium" text="格式化" bold :margin="['24rpx']"
					@click="moneyFormatter"></fui-button>
			</view>
			<view class="fui-section__title">格式化日期</view>
			<view class="fui-btn__flex-center">
				<view class="fui-page__desc">日期原数据：2023-10-30 22:36:15</view>
				<fui-button type="gray" btn-size="medium" text="年-月-日 时:分" bold :margin="['24rpx']"
					@click="dateFormatter(1)"></fui-button>
				<fui-button type="gray" btn-size="medium" text="年/月/日" bold @click="dateFormatter(2)"></fui-button>
				<fui-button type="gray" btn-size="medium" text="月-日" bold :margin="['24rpx']"
					@click="dateFormatter(3)"></fui-button>
				<fui-button type="gray" btn-size="medium" text="时:分" bold @click="dateFormatter(4)"></fui-button>
				<fui-button type="gray" btn-size="medium" text="分:秒" bold :margin="['24rpx']"
					@click="dateFormatter(5)"></fui-button>
				<fui-button type="gray" btn-size="medium" text="*年*月*日 *时*分*秒" bold
					@click="dateFormatter(6)"></fui-button>
			</view>
			<view class="fui-section__title">日期格式化为多久之前</view>
			<view class="fui-btn__flex-center">
				<view class="fui-page__desc">之前日期：2023-10-15 22:56:15</view>
				<fui-button type="gray" btn-size="medium" text="格式化" bold :margin="['24rpx']"
					@click="dateFormatAgo"></fui-button>
			</view>

			<view class="fui-section__title">函数节流，连续触发事件</view>
			<view class="fui-btn__flex-center">
				<view class="fui-page__desc">3s执行一次，6s执行2次...：{{num}}</view>
				<fui-button type="gray" btn-size="medium" text="执行 +1" bold :margin="['24rpx']"
					@click="btnThrottle"></fui-button>
			</view>
			<view class="fui-section__title">生成随机颜色</view>
			<view class="fui-btn__flex-center">
				<text class="fui-page__desc" :style="{color:color}">随机颜色</text>
				<fui-button type="gray" btn-size="medium" text="获取颜色" :bold="true" :margin="['24rpx']"
					@click="getRandomHexColor"></fui-button>
			</view>
			<view class="fui-section__title">金额转大写</view>
			<view class="fui-btn__flex-center">
				<fui-button type="gray" btn-size="medium" text="￥20.00" :bold="true" :margin="['24rpx']"
					@click="convertCurrency('￥20.00')"></fui-button>
				<fui-button type="gray" btn-size="medium" text="￥1,020.52" :bold="true"
					@click="convertCurrency('￥1,020.52')"></fui-button>
				<fui-button type="gray" btn-size="medium" text="1314521" :bold="true" :margin="['24rpx']"
					@click="convertCurrency('1314521')"></fui-button>
			</view>
			<view class="fui-section__title">其他功能</view>
			<view class="fui-page__desc">
				除以上功能以外，还有：日期时间格式化【更多使用】，RGB颜色转十六进制颜色，十六进制颜色转RGB颜色，获取唯一标识，获取uuid，简单数组合并去重，获取日期时间段，获取Url参数，函数防抖，函数节流等功能，具体使用请查看文档。
			</view>
		</view>
	</view>
</template>

<script>
	import utils from '@/components/firstui/fui-utils';
	export default {
		data() {
			return {
				num: 0,
				color:''
			}
		},
		onLoad() {
			this.throttle = utils.throttle(() => {
				this.num++
			}, 3000)
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
			},
			dateFormatter(type) {
				const date = '2023-10-30 22:36:15'
				// y-m-d h:i:s
				const format = ['y-m-d h:i', 'y/m/d', 'm-d', 'h:i', 'i:s', 'y年m月d日 h时i分s秒'][type - 1]
				const val = utils.dateFormatter(date, format);
				console.log(val)
				this.fui.toast(val)
			},
			dateFormatAgo() {
				const date = '2023-10-15 22:56:15'
				const val = utils.formatTimeAgo(date)
				console.log(val)
				this.fui.toast(val)
			},
			btnThrottle() {
				this.throttle()
			},
			getRandomHexColor() {
				const val = utils.getRandomHexColor()
				console.log(val)
				this.color = val
				this.fui.toast(val)
			},
			convertCurrency(money) {
				const val = utils.convertCurrency(money)
				console.log(val)
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