<template>
	<view class="fui-card__wrap"
		:class="{'fui-card__full':full,'fui-card__border':showBorder,'fui-card__border-radius':showBorder && !isNvue && !full}"
		:style="{marginTop:margin[0] || 0,marginRight:full?0: (margin[1] || 0),marginBottom:margin[2] || margin[0] || 0,marginLeft:full?0:(margin[3] || margin[1] || 0),background:background,borderRadius:full?0:radius,'box-shadow':showBorder?'none':shadow,borderColor:isNvue?borderColor:'transparent'}"
		@tap="handleClick">
		<view class="fui-card__header" v-if="tag || title || src" :class="{'fui-card__header-line':headerLine}"
			:style="{'border-top-left-radius':full?0:radius,'border-top-right-radius':full?0:radius,'border-bottom-color':isNvue && headerLine?lineColor:'transparent',paddingTop:padding[0] || 0,paddingRight:padding[1]||0,paddingBottom:padding[2] || padding[0] || 0,paddingLeft:padding[3] || padding[1] || 0}">
			<view class="fui-card__header-left">
				<image :src="src" class="fui-card__header-thumb" v-if="src"
					:style="{height:height+'rpx',width:width+'rpx',borderRadius:imageRadius}"></image>
				<text class="fui-card__header-title" :style="{fontSize:size+'rpx',color:color}"
					v-if="title">{{title}}</text>
			</view>
			<view class="fui-card__header-right" v-if="tag">
				<text :style="{fontSize:tagSize+'rpx',color:tagColor}">{{tag}}</text>
			</view>
		</view>
		<view class="fui-card__body" :class="{'fui-card__header-line':footerLine}">
			<slot></slot>
		</view>
		<view class="fui-card__footer"
			:style="{'border-bottom-left-radius':full?0:radius,'border-bottom-right-radius':full?0:radius}">
			<slot name="footer"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "fui-card",
		emits: ['click'],
		props: {
			//card margin值：[上、右、下、左]
			margin: {
				type: Array,
				default () {
					return ['0', '32rpx']
				}
			},
			//是否通栏，为true时margin-left，margin-right失效
			full: {
				type: Boolean,
				default: false
			},
			//card 背景色
			background: {
				type: String,
				default: '#fff'
			},
			//card 圆角，非nvue下showBorder为false时生效
			radius: {
				type: String,
				default: '16rpx'
			},
			//阴影：nvue下，android无效
			shadow: {
				type: String,
				default: '0 2rpx 4rpx 0 rgba(2, 4, 38, 0.05)'
			},
			//仅android且nvue下有效，box-shadow失效
			elevation: {
				type: String,
				default: '5px'
			},
			//是否显示card 边框，为true时box-shadow失效
			showBorder: {
				type: Boolean,
				default: false
			},
			//边框颜色，仅nvue下生效
			borderColor: {
				type: String,
				default: '#EEEEEE'
			},
			headerBackground: {
				type: String,
				default: '#fff'
			},
			//是否需要header底部线条
			headerLine: {
				type: Boolean,
				default: true
			},
			//是否需要内容与footer之间线条
			footerLine: {
				type: Boolean,
				default: false
			},
			//header 底部线条颜色，仅nvue有效，非nvue改变颜色使用css变量
			lineColor: {
				type: String,
				default: '#EEEEEE'
			},
			//header padding值：[上、右、下、左]
			padding: {
				type: Array,
				default () {
					return ['20rpx', '20rpx']
				}
			},
			//头像，图标图片地址
			src: {
				type: String,
				default: ''
			},
			//图片宽度，单位rpx
			width: {
				type: [Number, String],
				default: 64
			},
			//图片高度，单位rpx
			height: {
				type: [Number, String],
				default: 64
			},
			//图片圆角
			imageRadius: {
				type: String,
				default: '8rpx'
			},
			title: {
				type: String,
				default: ''
			},
			size: {
				type: [Number, String],
				default: 30
			},
			color: {
				type: String,
				default: '#7F7F7F'
			},
			tag: {
				type: String,
				default: ''
			},
			tagSize: {
				type: [Number, String],
				default: 24
			},
			tagColor: {
				type: String,
				default: '#b2b2b2'
			},
			index: {
				type: Number,
				default: 0
			}
		},
		data() {
			let isNvue = false;
			// #ifdef APP-NVUE
			isNvue = true;
			// #endif
			return {
				isNvue
			};
		},
		methods: {
			handleClick() {
				this.$emit('click', {
					index: this.index
				})
			}
		}
	}
</script>

<style scoped>
	.fui-card__wrap {
		/* #ifndef APP-NVUE */
		overflow: hidden;
		flex: 1;
		box-sizing: border-box;
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	.fui-card__full {
		margin-left: 0 !important;
		margin-right: 0 !important;
		border-radius: 0 !important;
	}
	/* #endif */

	/* #ifndef APP-NVUE */
	.fui-card__full::after {
		border-radius: 0 !important;
	}

	/* #endif */

	.fui-card__border {
		position: relative;
		box-shadow: none !important;
		/* #ifdef APP-NVUE */
		border-width: 0.5px;
		border-style: solid;
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	.fui-card__border-radius {
		border-radius: 16rpx !important;
	}

	.fui-card__border::after {
		content: ' ';
		position: absolute;
		height: 200%;
		width: 200%;
		border: 1px solid var(--fui-color-border, #EEEEEE);
		transform-origin: 0 0;
		-webkit-transform-origin: 0 0;
		-webkit-transform: scale(0.5);
		transform: scale(0.5);
		left: 0;
		top: 0;
		border-radius: 32rpx;
		box-sizing: border-box;
		pointer-events: none;
	}

	/* #endif */

	.fui-card__header {
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		box-sizing: border-box;
		overflow: hidden;
		/* #endif */
		flex: 1;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		position: relative;
	}

	.fui-card__header-left {
		/* #ifndef APP-NVUE */
		display: flex;
		white-space: nowrap;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.fui-card__header-line {
		position: relative;
		/* #ifdef APP-NVUE */
		border-bottom-width: 0.5px;
		border-bottom-style: solid;
		border-bottom-color: #EEEEEE;
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	.fui-card__header-line::after {
		content: '';
		position: absolute;
		border-bottom: 1px solid var(--fui-color-border, #EEEEEE);
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		transform-origin: 0 100%;
		bottom: 0;
		right: 0;
		left: 0;
		pointer-events: none;
	}

	/* #endif */

	.fui-card__header-thumb {
		/* #ifndef APP-NVUE */
		vertical-align: middle;
		/* #endif */
		margin-right: 20rpx;
		/* #ifndef APP-NVUE */
		flex-shrink: 0;
		/* #endif */
	}

	.fui-card__header-title {
		/* #ifndef APP-NVUE */
		display: inline-block;
		vertical-align: middle;
		max-width: 380rpx;
		/* #endif */
		/* #ifndef APP-NVUE */
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		/* #endif */

		/* #ifdef APP-NVUE */
		lines: 1;
		/* #endif */
	}

	.fui-card__header-right {
		text-align: right;
		/* #ifndef APP-NVUE */
		flex-shrink: 0;
		/* #endif */
	}

	.fui-card__body {
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
	}

	.fui-card__footer {
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
	}
</style>