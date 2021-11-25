<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Tabs</view>
			<view class="fui-page__desc">Tabs 标签页，分隔内容上有关联但属于不同类别的数据集合。</view>
		</view>
		<view class="fui-page__bd">
			<view class="fui-section__title">基础使用</view>
			<fui-tabs :tabs="tabs" @change="change"></fui-tabs>
			<view class="fui-section__title">改变颜色</view>
			<fui-tabs :tabs="tabs" selectedColor="#FFB703" sliderBackground="#FFB703"></fui-tabs>
			<view class="fui-section__title">滑块与内容同宽</view>
			<fui-tabs :tabs="tabs" :short="false"></fui-tabs>
			<view class="fui-section__title">超出一屏，禁用（标签八）
			</view>
			<!--nvue端，超出一屏滚动时scroll和alignLeft必须同为true-->
			<fui-tabs :tabs="tabs2" isDot scroll alignLeft></fui-tabs>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//数据格式一
				tabs: ['热门推荐', '新时代', '懂球帝'],
				//数据格式二：name（必选）、badge（可选）、disabled（可选）为约定属性，其他属性可自行定义
				tabs2: [{
					name: '标签一'
				}, {
					name: '标签二'
				}, {
					name: '标签三',
					badge: 1
				}, {
					name: '标签四'
				}, {
					name: '标签五'
				}, {
					name: '标签六'
				}, {
					name: '标签七'
				}, {
					name: '标签八',
					disabled: true
				}, {
					name: '标签九'
				}]
			}
		},
		onLoad() {

		},
		methods: {
			change(e) {
				console.log(e)
			}
		}
	}
</script>

<style>
	.fui-wrap {
		padding-bottom: 64rpx;
	}

	.fui-section__title {
		margin-left: 32rpx;
	}
</style>
