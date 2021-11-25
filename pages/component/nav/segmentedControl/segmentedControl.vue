<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">SegmentedControl</view>
			<view class="fui-page__desc">SegmentedControl 分段器。</view>
		</view>
		<view class="fui-page__bd fui-page__spacing">
			<view class="fui-section__title">基础使用</view>
			<fui-segmented-control :values="values" @click="itemClick"></fui-segmented-control>
			<view class="fui-section__title">自定义颜色</view>
			<fui-segmented-control :values="values" marginTop="24" color="#FF2B2B"></fui-segmented-control>
			<fui-segmented-control :values="values" marginTop="24" color="#FFB703"></fui-segmented-control>
			<fui-segmented-control :values="values" marginTop="24" color="#09BE4F"></fui-segmented-control>
			<fui-segmented-control :values="values" marginTop="24" color="#6831FF"></fui-segmented-control>
			<fui-segmented-control :values="values" marginTop="24" color="#333333"></fui-segmented-control>
			<view class="fui-section__title">text类型</view>
			<fui-segmented-control :values="values" marginTop="24" color="#333" activeColor="#FFB703" type="text" height="100" size="32"></fui-segmented-control>
			<view class="fui-section__title">不同数据格式</view>
			<fui-segmented-control :values="values2" @click="itemClick"></fui-segmented-control>
			<view class="fui-section__title">禁用状态</view>
			<fui-segmented-control :values="values2" disabled></fui-segmented-control>
			<view class="fui-section__title">默认选中</view>
			<fui-segmented-control :values="values2" :current="1"></fui-segmented-control>
			<view class="fui-section__title">改变圆角值</view>
			<fui-segmented-control :values="values2" :radius="100"></fui-segmented-control>
			<view class="fui-section__title">单项禁用</view>
			<fui-segmented-control :values="values3"></fui-segmented-control>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				values: ['segmented1', 'segmented2'],
				//name为约定属性，其他可自定义
				values2: [{
					id: 1,
					name: 'segmented1'
				}, {
					id: 2,
					name: 'segmented2'
				}, {
					id: 3,
					name: 'segmented3'
				}],
				values3: [{
					name: 'segmented1'
				}, {
					name: 'segmented2',
					disabled: true
				}, {
					name: 'segmented3'
				}]
			}
		},
		methods: {
			itemClick(e) {
				console.log(e)
			}
		}
	}
</script>

<style>
	page {
		font-weight: normal;
	}
</style>
