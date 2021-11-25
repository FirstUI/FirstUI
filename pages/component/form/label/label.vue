<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Label</view>
			<view class="fui-page__desc">Label 标签，用来改进表单组件的可用性，将控件放在该标签下，当点击时，就会触发对应的控件。</view>
		</view>
		<view class="fui-page__bd">
			<view class="fui-section__title">Radio 单项选择器</view>
			<fui-radio-group>
				<fui-label v-for="(item,index) in radioItems" :key="index">
					<fui-list-cell>
						<view class="fui-align__center">
							<fui-radio :checked="item.checked" :value="item.value">
							</fui-radio>
							<text class="fui-text">{{item.name}}</text>
						</view>
					</fui-list-cell>
				</fui-label>
			</fui-radio-group>
			<view class="fui-section__title">Checkbox 多项选择器</view>
			<fui-checkbox-group>
				<fui-label v-for="(item,index) in checkboxItems" :key="index">
					<fui-list-cell>
						<view class="fui-list__cell">
							<text>{{item.name}}</text>
							<fui-checkbox isCheckMark checkMarkColor="#FFB703" :scaleRatio="1.3" :checked="item.checked"
								:value="item.value">
							</fui-checkbox>
						</view>
					</fui-list-cell>
				</fui-label>
			</fui-checkbox-group>
			<view class="fui-section__title">Switch 开关选择器</view>
			<fui-label>
				<fui-list-cell>
					<view class="fui-list__cell">
						<text>scaleRatio</text>
						<fui-switch :scaleRatio="0.8" color="#FFB703"></fui-switch>
					</view>
				</fui-list-cell>
			</fui-label>
			<fui-label>
				<fui-list-cell>
					<view class="fui-list__cell">
						<text>type=checkbox</text>
						<fui-switch type="checkbox" color="#09BE4F" :scaleRatio="1.1"></fui-switch>
					</view>
				</fui-list-cell>
			</fui-label>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
				],
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
