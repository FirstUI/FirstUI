<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Radio</view>
			<view class="fui-page__desc">Radio 单项选择器。</view>
		</view>
		<view class="fui-page__bd">
			<view class="fui-section__title">基本使用</view>
			<!--ref、groupRef、labelRef等仅为兼容头条小程序，如果不需要兼容可删除-->
			<fui-radio-group ref="fui_r_1" name="radio" v-model="val" @change="change">
				<view class="fui-list__item">
					<fui-label ref="fui_l_1">
						<view class="fui-align__center">
							<fui-radio groupRef="fui_r_1" labelRef="fui_l_1" value="1" checked></fui-radio>
							<text class="fui-text">选中</text>
						</view>
					</fui-label>
					<fui-label ref="fui_l_2" :margin="['0','0','0','40rpx']">
						<view class="fui-align__center">
							<fui-radio groupRef="fui_r_1" labelRef="fui_l_2" value="2"></fui-radio>
							<text class="fui-text">未选中</text>
						</view>
					</fui-label>
				</view>
			</fui-radio-group>
			<view class="fui-section__title">推荐布局</view>
			<fui-radio-group ref="fui_r_2">
				<fui-label :ref="'f_label_'+index" v-for="(item,index) in radioItems" :key="index">
					<fui-list-cell>
						<view class="fui-align__center">
							<fui-radio groupRef="fui_r_2" :labelRef="'f_label_'+index" :checked="item.checked" :value="item.value" color="#FFB703"
								borderColor="#B2B2B2">
							</fui-radio>
							<text class="fui-text">{{item.name}}</text>
						</view>
					</fui-list-cell>
				</fui-label>
			</fui-radio-group>
			<view class="fui-section__title">推荐布局</view>
			<fui-radio-group ref="fui_r_3">
				<fui-label :ref="'fui_label_'+index" v-for="(item,index) in radioItems" :key="index">
					<fui-list-cell>
						<view class="fui-list__cell">
							<text>{{item.name}}</text>
							<fui-radio groupRef="fui_r_3" :labelRef="'fui_label_'+index" :checked="item.checked" :value="item.value">
							</fui-radio>
						</view>
					</fui-list-cell>
				</fui-label>
			</fui-radio-group>
			<view class="fui-section__title">推荐布局</view>
			<fui-radio-group ref="fui_r_4">
				<fui-label :ref="'label_'+index" v-for="(item,index) in radioItems" :key="index">
					<fui-list-cell>
						<view class="fui-list__cell">
							<text>{{item.name}}</text>
							<fui-radio groupRef="fui_r_4" :labelRef="'label_'+index" isCheckMark checkMarkColor="#FF2B2B" :scaleRatio="1.3" :checked="item.checked"
								:value="item.value">
							</fui-radio>
						</view>
					</fui-list-cell>
				</fui-label>
			</fui-radio-group>
			<view class="fui-section__title">修改圆角值</view>
			<fui-radio-group ref="fui_r_5">
				<fui-label :ref="'l_'+index" v-for="(item,index) in radioItems" :key="index">
					<fui-list-cell>
						<view class="fui-align__center">
							<fui-radio groupRef="fui_r_5" :labelRef="'l_'+index" :checked="item.checked" :value="item.value" color="#FFB703"
								borderColor="#B2B2B2" borderRadius="8rpx">
							</fui-radio>
							<text class="fui-text">{{item.name}}</text>
						</view>
					</fui-list-cell>
				</fui-label>
			</fui-radio-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				val: '',
				radioItems: [{
						name: '小于18岁',
						value: '1',
						checked: true
					},
					{
						name: '18~28岁',
						value: '2',
						checked: false
					},
					{
						name: '29~40岁',
						value: '3',
						checked: false
					}
				]
			}
		},
		methods: {
			change(e) {
				console.log('change:' + e.detail.value)
			}
		}
	}
</script>

<style>
	page {
		font-weight: normal;
	}

	.fui-section__title {
		margin-left: 32rpx;
	}

	.fui-list__item {
		width: 100%;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		padding: 28rpx 32rpx;
		box-sizing: border-box;
	}

	.fui-text {
		font-size: 30rpx;
		padding-left: 16rpx;
	}

	.fui-list__cell {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
