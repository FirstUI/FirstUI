<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">DropdownList</view>
			<view class="fui-page__desc">DropdownList 下拉菜单，用于弹出一个菜单给用户选择操作，此组件为兼容Nvue端而写，居中弹出。</view>
		</view>
		<view class="fui-page__bd">
			<view class="fui-section__title">基础使用</view>
			<fui-list-cell :highlight="false">
				<view class="fui-list__cell fui-flex__center">
					<text>资产类别：</text>
					<view class="fui-select fui-flex__between" @tap="assetsTap">
						<input placeholder="请选择" :value="assets" class="fui-input" disabled />
						<view class="fui-filter__icon" :class="{'fui-icon__ani':assetsShow}">
							<fui-icon name="turningdown" :size="32"></fui-icon>
						</view>
					</view>
				</view>
			</fui-list-cell>
			<view class="fui-section__title">固定高度、宽度 / 可滚动</view>
			<fui-list-cell :highlight="false">
				<view class="fui-list__cell fui-flex__center">
					<text>问题分类：</text>
					<view class="fui-select fui-flex__between" @tap="quesTap">
						<input placeholder="请选择" :value="question" class="fui-input" disabled />
						<view class="fui-filter__icon" :class="{'fui-icon__ani':quesShow}">
							<fui-icon name="turningdown" :size="32"></fui-icon>
						</view>
					</view>
				</view>
			</fui-list-cell>
			<view class="fui-section__title">不显示选择框</view>
			<fui-list-cell :highlight="false">
				<view class="fui-list__cell fui-flex__center">
					<text>问题分类：</text>
					<view class="fui-select fui-flex__between" @tap="tagTap">
						<input placeholder="请选择" :value="tag" class="fui-input" disabled />
						<view class="fui-filter__icon" :class="{'fui-icon__ani':tagShow}">
							<fui-icon name="turningdown" :size="32"></fui-icon>
						</view>
					</view>
				</view>
			</fui-list-cell>
		</view>

		<fui-dropdown-list :options="options" ref="ddlAssets" @click="assetsItemClick" @close="assetsClose">
		</fui-dropdown-list>
		<fui-dropdown-list :height="600" :width="480" checkboxColor="#FFB703" :options="options2" ref="ddlQues"
			@click="quesItemClick" @close="quesClose"></fui-dropdown-list>
		<fui-dropdown-list :isCheckbox="false" selectedColor="#FFB703" splitLine :height="600" :width="400"
			:options="options3" ref="ddlTag" @click="tagItemClick" @close="tagClose"></fui-dropdown-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: [{
					text: '机架式服务器',
					value: 1
				}, {
					text: '笔记本',
					value: 2
				}, {
					text: '平板电脑',
					value: 3
				}, {
					text: '台式机+显示器',
					value: 3
				}],
				assets: '',
				assetsShow: false,
				options2: ['注册激活', '站长工具', '投递文章', '媒体合作', '素材相关', '报告错误', '论坛事务', '发布软件', '网站排行榜', '其他事务'],
				question: '',
				quesShow: false,
				options3: ['最新车讯', '降价排行', 'SUV', '违章罚单', '提车试驾', '测评体验', '选车指南', '美女车模', '加油优惠卡', '维修保养'],
				tag: '',
				tagShow: false
			}
		},
		methods: {
			assetsTap() {
				this.$refs.ddlAssets.show()
				this.assetsShow = true;
			},
			assetsItemClick(e) {
				console.log(e)
				this.assets = e.text
				this.assetsClose()
			},
			assetsClose() {
				this.assetsShow = false;
			},
			quesTap() {
				this.$refs.ddlQues.show()
				this.quesShow = true;
			},
			quesItemClick(e) {
				console.log(e)
				this.question = e.text
				this.quesClose()
			},
			quesClose() {
				this.quesShow = false;
			},
			tagTap() {
				this.$refs.ddlTag.show()
				this.tagShow = true;
			},
			tagItemClick(e) {
				console.log(e)
				this.tag = e.text
				this.tagClose()
			},
			tagClose() {
				this.tagShow = false;
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


	.fui-filter__icon {
		flex-shrink: 0;
		transition: all .15s linear;
	}

	.fui-icon__ani {
		transform: rotate(180deg);
	}

	.fui-list__cell {
		width: 100%;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.fui-select {
		flex: 1;
		height: 80rpx;
		padding: 32rpx;
		box-sizing: border-box;
		position: relative;
	}

	.fui-input {
		font-size: 32rpx;
		flex: 1;
		padding-right: 8rpx;
	}

	.fui-select::after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 200%;
		height: 200%;
		border: 1px solid #eee;
		transform: scale(.5);
		transform-origin: 0 0;
		pointer-events: none;
	}
</style>
