<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">DropdownMenu</view>
			<view class="fui-page__desc">DropdownMenu 下拉菜单，用于弹出一个下拉菜单给用户选择操作。</view>
		</view>
		<view class="fui-page__bd">
			<view class="fui-section__title">选择框位置、样式改变</view>
			<view class="fui-filter__bar">
				<view class="fui-flex__1">
					<fui-dropdown-menu :size="28" selectedColor="#465CFF" :options="options" @click="rangeItemClick"
						@close="rangeClose" ref="ddmRange">
						<view class="fui-filter__item" @tap="filterTap(1)">
							<text>{{range}}</text>
							<view class="fui-filter__icon" :class="{'fui-icon__ani':rangeShow}">
								<fui-icon name="turningdown" :size="32"></fui-icon>
							</view>
						</view>
					</fui-dropdown-menu>
				</view>
				<view class="fui-flex__1">
					<fui-dropdown-menu :minWidth="300" right="0" :size="28" selectedColor="#465CFF" isCheckMark
						checkmarkColor="#465CFF" isReverse :options="options1" @click="sortItemClick" @close="sortClose"
						ref="ddmSort">
						<view class="fui-filter__item" @tap="filterTap(2)">
							<text>{{sort}}</text>
							<view class="fui-filter__icon" :class="{'fui-icon__ani':sortShow}">
								<fui-icon name="turningdown" :size="32"></fui-icon>
							</view>
						</view>
					</fui-dropdown-menu>
				</view>
			</view>
			<view class="fui-section__title">可滚动、改变选择框颜色</view>
			<fui-list-cell :highlight="false">
				<view class="fui-list__cell fui-flex__center">
					<text>问题分类：</text>
					<view class="fui-flex__1">
						<fui-dropdown-menu checkboxColor="#FFB703" :minWidth="400" splitLine :options="options2"
							ref="ddmQues" @click="quesItemClick" @close="quesClose">
							<view class="fui-select fui-flex__between" @tap="quesTap">
								<input placeholder="请选择" :value="question" class="fui-input" disabled />
								<view class="fui-filter__icon" :class="{'fui-icon__ani':quesShow}">
									<fui-icon name="turningdown" :size="32"></fui-icon>
								</view>
							</view>
						</fui-dropdown-menu>
					</view>
				</view>
			</fui-list-cell>
			<view class="fui-section__title">向上展开、不显示选择框</view>
			<fui-list-cell :highlight="false">
				<view class="fui-list__cell fui-flex__center">
					<text>选择标签：</text>
					<view class="fui-flex__1">
						<fui-dropdown-menu :isCheckbox="false" selectedColor="#FF2B2B" splitLine :options="options3"
							ref="ddmTag" direction="up" @click="tagItemClick" @close="tagClose">
							<view class="fui-select fui-flex__between" @tap="tagTap">
								<input placeholder="请选择" :value="tag" class="fui-input" disabled />
								<view class="fui-filter__icon" :class="{'fui-icon__ani':tagShow}">
									<fui-icon name="turningdown" :size="32"></fui-icon>
								</view>
							</view>
						</fui-dropdown-menu>
					</view>
				</view>
			</fui-list-cell>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: [{
					text: '综合推荐',
					value: 1,
					checked: true
				}, {
					text: '新品优先',
					value: 2
				}, {
					text: '评论数从高到低',
					value: 3
				}],
				options1: [{
					text: '默认排序',
					value: 11,
					checked: true
				}, {
					text: '销量排序',
					value: 12
				}, {
					text: '价格排序',
					value: 13
				}],
				range: '综合推荐',
				rangeShow: false,
				sort: '默认排序',
				sortShow: false,
				//数据格式二
				options2: ['注册激活', '站长工具', '投递文章', '媒体合作', '素材相关', '报告错误', '论坛事务', '发布软件', '网站排行榜', '其他事务'],
				question: '',
				quesShow: false,
				options3: ['最新车讯', '降价排行', 'SUV', '违章罚单', '提车试驾', '测评体验', '选车指南', '美女车模', '加油优惠卡', '维修保养'],
				tag: '',
				tagShow: false
			}
		},
		methods: {
			filterTap(type) {
				if (type === 1) {
					this.$refs.ddmRange.show()
					this.rangeShow = true;
				} else {
					this.$refs.ddmSort.show()
					this.sortShow = true;
				}
			},
			rangeItemClick(e) {
				console.log(e)
				this.range = e.text
				this.rangeClose()
			},
			rangeClose() {
				this.rangeShow = false;
			},
			sortItemClick(e) {
				console.log(e)
				this.sort = e.text
				this.sortClose()
			},
			sortClose() {
				this.sortShow = false;
			},
			quesTap() {
				this.$refs.ddmQues.show()
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
				this.$refs.ddmTag.show()
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

	.fui-filter__bar {
		width: 100%;
		height: 88rpx;
		display: flex;
		align-items: center;
		background-color: #fff;
		margin-bottom: 40rpx;
	}

	.fui-filter__item {
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.fui-filter__icon {
		transition: all .15s linear;
	}

	.fui-icon__ani {
		transform: rotate(180deg);
	}

	.fui-list__cell {
		width: 100%;
	}

	.fui-select {
		flex: 1;
		height: 80rpx;
		padding: 32rpx;
		box-sizing: border-box;
		position: relative;
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

	.fui-input {
		font-size: 32rpx;
		flex: 1;
		padding-right: 8rpx;
		color: #181818;
	}
</style>
