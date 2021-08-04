<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Checkbox</view>
			<view class="fui-page__desc">Checkbox 多项选择器。</view>
		</view>
		<view class="fui-page__bd">
			<view class="fui-section__title">基本使用</view>
			<!--ref、groupRef、labelRef等仅为兼容头条小程序，如果不需要兼容可删除-->
			<fui-checkbox-group ref="c_1" name="checkbox" v-model="vals" @change="change">
				<view class="fui-list__item">
					<fui-label ref="l_1">
						<view class="fui-align__center">
							<fui-checkbox groupRef="c_1" labelRef="l_1" value="1" checked></fui-checkbox>
							<text class="fui-text">选中</text>
						</view>
					</fui-label>
					<fui-label ref="l_2" :margin="['0','0','0','40rpx']">
						<view class="fui-align__center">
							<fui-checkbox groupRef="c_1" labelRef="l_2" value="2"></fui-checkbox>
							<text class="fui-text">未选中</text>
						</view>
					</fui-label>
				</view>
			</fui-checkbox-group>
			<view class="fui-section__title">推荐布局</view>
			<fui-checkbox-group ref="ck_1">
				<fui-label :ref="'fl'+index" v-for="(item,index) in checkboxItems" :key="index">
					<fui-list-cell>
						<view class="fui-align__center">
							<fui-checkbox groupRef="ck_1" :labelRef="'fl'+index" :checked="item.checked"
								:value="item.value" color="#FFB703" borderColor="#B2B2B2">
							</fui-checkbox>
							<text class="fui-text">{{item.name}}</text>
						</view>
					</fui-list-cell>
				</fui-label>
			</fui-checkbox-group>
			<view class="fui-section__title">推荐布局</view>
			<fui-checkbox-group ref="ck_2">
				<fui-label :ref="'fui_'+index" v-for="(item,index) in checkboxItems" :key="index">
					<fui-list-cell>
						<view class="fui-list__cell">
							<text>{{item.name}}</text>
							<fui-checkbox groupRef="ck_2" :labelRef="'fui_'+index" :checked="item.checked"
								:value="item.value">
							</fui-checkbox>
						</view>
					</fui-list-cell>
				</fui-label>
			</fui-checkbox-group>
			<view class="fui-section__title">推荐布局</view>
			<fui-checkbox-group ref="ck_3">
				<fui-label :ref="'fui_label'+index" v-for="(item,index) in checkboxItems" :key="index">
					<fui-list-cell>
						<view class="fui-list__cell">
							<text>{{item.name}}</text>
							<fui-checkbox groupRef="ck_3" :labelRef="'fui_label'+index" isCheckMark checkMarkColor="#FF2B2B" :scaleRatio="1.3" :checked="item.checked"
								:value="item.value">
							</fui-checkbox>
						</view>
					</fui-list-cell>
				</fui-label>
			</fui-checkbox-group>
			<view class="fui-section__title">修改圆角值</view>
			<fui-checkbox-group ref="ck_4">
				<fui-label :ref="'label'+index" v-for="(item,index) in checkboxItems" :key="index">
					<fui-list-cell>
						<view class="fui-align__center">
							<fui-checkbox groupRef="ck_34" :labelRef="'label'+index" :checked="item.checked" :value="item.value" color="#FFB703"
								borderColor="#B2B2B2" borderRadius="8rpx">
							</fui-checkbox>
							<text class="fui-text">{{item.name}}</text>
						</view>
					</fui-list-cell>
				</fui-label>
			</fui-checkbox-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				vals: [],
				checkboxItems: [{
						name: '篮球',
						value: '1',
						checked: true
					},
					{
						name: '羽毛球',
						value: '2',
						checked: false
					},
					{
						name: '乒乓球',
						value: '3',
						checked: false
					}
				]
			}
		},
		methods: {
			change(e) {
				console.log('change:' + JSON.stringify(e.detail.value))
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
