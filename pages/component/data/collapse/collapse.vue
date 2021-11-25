<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Collapse</view>
			<view class="fui-page__desc">Collapse 折叠面板，可以折叠/展开的内容区域。</view>
		</view>
		<view class="fui-page__bd">
			<view class="fui-section__title">基础使用</view>
			<!--fui-collapse-item可单独使用 @change事件仅无父组件fui-collapse时生效-->
			<fui-collapse-item @change="change">
				<view class="fui-item__box">
					<image src="/static/images/common/logo.png" class="fui-logo"></image>
					<text>First UI</text>
				</view>
				<template v-slot:content>
					<view class="fui-descr">First UI 是一套基于uni-app开发的组件化、可复用、易扩展、低耦合的跨平台移动端UI 组件库。</view>
				</template>
			</fui-collapse-item>
			<view class="fui-section__title">默认展开</view>
			<fui-collapse @change="change">
				<fui-collapse-item :index="index" :open="item.isOpen" v-for="(item,index) in items" :key="index">
					<view class="fui-item__box">
						<image :src="item.src" class="fui-logo"></image>
						<text>{{item.title}}</text>
					</view>
					<template v-slot:content>
						<view class="fui-descr" style="background-color: rgba(255, 183, 3, .1);">{{item.descr}}</view>
					</template>
				</fui-collapse-item>
			</fui-collapse>
			<view class="fui-section__title">手风琴效果</view>
			<fui-collapse accordion @change="change">
				<fui-collapse-item :index="index" v-for="(item,index) in items" :key="index">
					<view class="fui-item__box">
						<image :src="item.src" class="fui-logo"></image>
						<text>{{item.title}}</text>
					</view>
					<template v-slot:content>
						<view class="fui-descr" style="background-color: rgba(255, 183, 3, .1);">{{item.descr}}</view>
					</template>
				</fui-collapse-item>
			</fui-collapse>
			<view class="fui-section__title">无动画效果</view>
			<fui-collapse @change="change">
				<fui-collapse-item :animation="false" arrowColor="#333" :index="index" v-for="(item,index) in items"
					:key="index">
					<view class="fui-item__box">
						<image :src="item.src" class="fui-logo"></image>
						<text>{{item.title}}</text>
					</view>
					<template v-slot:content>
						<view class="fui-descr" style="background-color: rgba(255, 183, 3, .1);">{{item.descr}}</view>
					</template>
				</fui-collapse-item>
			</fui-collapse>
			<view class="fui-section__title">禁用不可点击</view>
			<fui-collapse @change="change">
				<fui-collapse-item :disabled="index===1" arrowColor="#333" :index="index" v-for="(item,index) in items"
					:key="index">
					<view class="fui-item__box">
						<image :src="item.src" class="fui-logo"></image>
						<text>{{item.title}}</text>
					</view>
					<template v-slot:content>
						<view class="fui-descr" style="background-color: rgba(255, 183, 3, .1);">{{item.descr}}</view>
					</template>
				</fui-collapse-item>
			</fui-collapse>
			<view class="fui-section__title">不显示箭头</view>
			<fui-collapse accordion @change="change">
				<fui-collapse-item :arrow="false" :index="index" v-for="(item,index) in list" :key="index">
					<fui-list-cell :padding="[]">
						<view class="fui-item__box">
							<text style="font-size: 28rpx;">{{item.question}}</text>
						</view>
					</fui-list-cell>
					<template v-slot:content>
						<view class="fui-descr" style="color: #09BE4F;">{{item.answer}}</view>
					</template>
				</fui-collapse-item>
			</fui-collapse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [{
					src: '/static/images/common/logo.png',
					title: 'First UI',
					descr: 'First UI 是一套基于uni-app开发的组件化、可复用、易扩展、低耦合的跨平台移动端UI 组件库。',
					isOpen: true
				}, {
					src: '/static/images/common/icon_tabbar_2x.png',
					title: '标题内容',
					descr: '自定义折叠内容主体，这是一段比较长内容。默认折叠主要内容，只显示当前项标题。点击标题展开。再次点击标题，折叠内容。'
				}],
				list: [{
					question: '我只想用某个组件可以吗？',
					answer: '可以，组件支持按需引入，详见 First UI 文档 “快速上手”，使用组件前请先仔细阅读组件文档。'
				}, {
					question: '为什么文档或示例中有些组件在GitHub或npm下载的包中无法找到？',
					answer: 'First UI 分为 “开源版” 和 “商业版”，所有示例或文档中加 “V” 的表示需要开通会员才可获取源码使用，会员内容不会发布到任何公开渠道。'
				}, {
					question: '组件支持Nvue、支付宝小程序...吗？',
					answer: '支持。组件支持哪些平台请参考组件具体文档，每个组件文档中都有支持平台的说明。'
				}]

			}
		},
		methods: {
			change(e) {
				console.log(e)
			}
		}
	}
</script>

<style>
	page {
		font-weight: normal;
	}

	.fui-wrap {
		padding-bottom: 64rpx;
	}

	.fui-section__title {
		margin-left: 32rpx;
	}

	.fui-item__box {
		width: 100%;
		padding: 26rpx 32rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.fui-logo {
		width: 48rpx;
		height: 48rpx;
		margin-right: 24rpx;
		display: block;
	}

	.fui-descr {
		width: 100%;
		padding: 32rpx;
		font-size: 28rpx;
		line-height: 52rpx;
		color: #7F7F7F;
		word-break: break-all;
		box-sizing: border-box;
	}
</style>
