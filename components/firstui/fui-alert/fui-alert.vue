<template>
	<view class="fui-alert__wrap" :class="[background?'':('fui-alert__'+type)]"
		:style="{background:background || getColor(type),borderRadius:radius,paddingTop:padding[0] || 0,paddingRight:padding[1]||0,paddingBottom:padding[2] || padding[0]||0,paddingLeft:padding[3] || padding[1]||0,marginTop:marginTop+'rpx',marginBottom:marginBottom+'rpx'}">
		<view class="fui-alert__shrink" @tap.stop="leftClick">
			<slot></slot>
			<icon :type="type" :size="iconSize" :color="iconColor" v-if="!isLeft && type && type!=='true'"></icon>
		</view>
		<view class="fui-alert__content"
			:class="{'fui-text__p-left':(!isLeft && type && type!=='true') || (spacing && isLeft),'fui-text__p-right':closable}"
			@tap.stop="onClick">
			<text class="fui-alert__text" :style="{fontSize:size,color:color}" v-if="title">{{title}}</text>
			<text class="fui-alert__text fui-desc__padding" :class="{'fui-alert__single':single}"
				:style="{fontSize:descSize,color:descColor}" v-if="desc">{{desc}}</text>
			<slot name="content"></slot>
		</view>
		<view class="fui-alert__shrink">
			<slot name="right"></slot>
		</view>
		<icon @tap.stop="close" type="cancel" :size="closeSize" :color="closeColor" v-if="closable"
			:class="{'fui-alert__icon-close':desc}">
		</icon>
	</view>
</template>

<script>
	export default {
		name: "fui-alert",
		emits: ['leftClick', 'click', 'close'],
		props: {
			//info, success, warn, waiting,clear
			type: {
				type: String,
				default: ''
			},
			//背景色，如果设置type对应颜色失效
			background: {
				type: String,
				default: ''
			},
			//padding值：[上，右，下，左]
			padding: {
				type: Array,
				default () {
					return ['20rpx', '32rpx']
				}
			},
			//margin-top值，单位rpx
			marginTop: {
				type: [Number, String],
				default: 0
			},
			//margin-bottom值，单位rpx
			marginBottom: {
				type: [Number, String],
				default: 0
			},
			//圆角
			radius: {
				type: String,
				default: '16rpx'
			},
			//icon颜色
			iconColor: {
				type: String,
				default: '#fff'
			},
			//icon字体大小，px
			iconSize: {
				type: Number,
				default: 22
			},
			closable: {
				type: Boolean,
				default: false
			},
			closeColor: {
				type: String,
				default: '#fff'
			},
			//关闭icon字体大小，px
			closeSize: {
				type: Number,
				default: 22
			},
			//是否自定义左侧内容,默认图标失效
			isLeft: {
				type: Boolean,
				default: false
			},
			//内容是否与图标之间有间隔，isLeft为true时生效
			spacing: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: '#fff'
			},
			size: {
				type: String,
				default: '14px'
			},
			desc: {
				type: String,
				default: ''
			},
			descColor: {
				type: String,
				default: '#fff'
			},
			descSize: {
				type: String,
				default: '12px'
			},
			//描述文字单行展示，超出隐藏
			single: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			getColor(type) {
				const app = uni && uni.$fui && uni.$fui.color
				const color = (app && app.primary) || "#465CFF"
				const colors = {
					'success': (app && app.success) || '#09BE4F',
					'warn': (app && app.warning) || '#FFB703',
					'clear': (app && app.danger) || '#FF2B2B'
				}
				return colors[type] ? colors[type] : color;
			},
			leftClick() {
				this.$emit('leftClick', {})
			},
			onClick() {
				this.$emit('click', {})
			},
			close() {
				this.$emit('close', {})
			}
		}
	}
</script>

<style scoped>
	.fui-alert__wrap {
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
		/* #ifndef APP-NVUE */
		display: flex;
		width: 100%;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		align-items: center;
		position: relative;
	}

	/* #ifndef APP-NVUE */
	.fui-alert__info,
	.fui-alert__waiting {
		background-color: var(--fui-color-primary, #465CFF) !important;
	}

	.fui-alert__success {
		background-color: var(--fui-color-success, #09BE4F) !important;
	}

	.fui-alert__warn {
		background-color: var(--fui-color-warning, #FFB703) !important;
	}

	.fui-alert__clear {
		background-color: var(--fui-color-danger, #FF2B2B) !important;
	}

	/* #endif */

	.fui-alert__shrink {
		/* #ifndef APP-NVUE */
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		/* #endif */
	}

	.fui-alert__content {
		flex: 1;
		flex-direction: column;
		/* #ifndef APP-NVUE */
		overflow: hidden;
		/* #endif */
	}

	.fui-alert__text {
		/* #ifndef APP-NVUE */
		word-break: break-all;
		display: block;
		box-sizing: border-box;
		/* #endif */
	}

	.fui-desc__padding {
		padding-top: 3px;
	}

	.fui-text__p-left {
		padding-left: 20rpx;
	}

	.fui-text__p-right {
		padding-right: 60rpx;
	}

	.fui-alert__single {
		/* #ifdef APP-NVUE */
		lines: 1;
		/* #endif */
		/* #ifndef APP-NVUE */
		display: block;
		width: 100%;
		white-space: nowrap;
		/* #endif */
		flex-direction: row;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.fui-alert__icon-close {
		position: absolute;
		right: 30rpx;
		top: 16rpx;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}
</style>