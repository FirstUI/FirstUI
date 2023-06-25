<template>
	<view class="fui-sections__wrap"
		:style="{marginTop:marginTop+'rpx',marginBottom:marginBottom+'rpx',background:background,paddingTop:padding[0] || 0,paddingRight:padding[1]||0,paddingBottom:padding[2] || padding[0]||0,paddingLeft:padding[3] || padding[1]||0}">
		<view class="fui-sections__title" @tap="handleClick">
			<view class="fui-sections__line" :class="{'fui-sections__line-color':!getLineColor}"
				:style="{background:getLineColor,width:lineWidth,top:lineGap+'rpx',bottom:lineGap+'rpx',borderRadius:lineCap==='circle'?lineWidth:0,left:getLeft}"
				v-if="isLine">
			</view>
			<slot></slot>
			<text class="fui-sections__title-text" :style="getTitleStyle" v-if="title">{{title}}</text>
			<slot name="right"></slot>
		</view>
		<view class="fui-sections__descr" :style="getDescrTop" v-if="descr">
			<text class="fui-sections__descr-text" :style="getDescrStyle">{{descr}}</text>
		</view>
		<slot name="descr"></slot>
	</view>
</template>

<script>
	export default {
		name: "fui-section",
		emits: ['click'],
		props: {
			title: {
				type: String,
				default: ''
			},
			//默认使用全局配置值
			size: {
				type: [Number, String],
				default: 0
			},
			lineHeight: {
				type: [Number, String],
				default: 0
			},
			color: {
				type: String,
				default: ''
			},
			fontWeight: {
				type: [Number, String],
				default: 0
			},
			descr: {
				type: String,
				default: ''
			},
			descrSize: {
				type: [Number, String],
				default: 0
			},
			descrColor: {
				type: String,
				default: ''
			},
			descrTop: {
				type: [Number, String],
				default: 0
			},
			isLine: {
				type: Boolean,
				default: false
			},
			lineWidth: {
				type: String,
				default: '2px'
			},
			lineColor: {
				type: String,
				default: ''
			},
			//square、circle
			lineCap: {
				type: String,
				default: 'circle'
			},
			//nvue android端不支持负数
			lineRight: {
				type: [Number, String],
				default: 16
			},
			lineGap: {
				type: [Number, String],
				default: 0
			},
			background: {
				type: String,
				default: 'transparent'
			},
			padding: {
				type: Array,
				default () {
					return ['0', '32rpx']
				}
			},
			marginTop: {
				type: [Number, String],
				default: 0
			},
			marginBottom: {
				type: [Number, String],
				default: 0
			}
		},
		computed: {
			getLineColor() {
				let color = this.lineColor;
				// #ifdef APP-NVUE
				if (!color || color === true) {
					color = (uni && uni.$fui && uni.$fui.color.primary) || '#465CFF';
				}
				// #endif
				return color;
			},
			getLeft() {
				const left = Number(this.lineRight || 0)
				return `${left >0 ? 0 :left}rpx`

			},
			getTitleStyle() {
				const app = uni && uni.$fui && uni.$fui.fuiSection;
				const size = this.size || (app && app.size) || 32;
				const color = this.color || (app && app.color) || '#181818';
				const weight = this.fontWeight || (app && app.fontWeight) || 600;
				const left = Number(this.lineRight || 0)
				let style =
					`font-size:${size}rpx;color:${color};font-weight:${weight};padding-left:${left<=0 || !this.isLine ? 0 :left}rpx;`
				style += `line-height:${this.lineHeight == 0?size:this.lineHeight}rpx`
				return style;
			},
			getDescrStyle() {
				const app = uni && uni.$fui && uni.$fui.fuiSection;
				const size = this.descrSize || (app && app.descrSize) || 28;
				const color = this.descrColor || (app && app.descrColor) || '#B2B2B2';
				return `font-size:${size}rpx;color:${color};`
			},
			getDescrTop() {
				const app = uni && uni.$fui && uni.$fui.fuiSection;
				return 'padding-top:' + (this.descrTop || (app && app.descrTop) || 8) + 'rpx;'
			}
		},
		methods: {
			handleClick() {
				this.$emit('click', {
					title: this.title
				})
			}
		}
	}
</script>

<style scoped>
	/* 全局样式中包含 fui-section 避免影响*/
	.fui-sections__wrap {
		/* #ifndef APP-NVUE */
		width: 100%;
		box-sizing: border-box;
		/* #endif */
	}

	.fui-sections__title {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		word-break: break-all;
		flex-shrink: 0;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.fui-sections__title-text {
		/* #ifndef APP-NVUE */
		word-break: break-all;
		/* #endif */
	}

	.fui-sections__line {
		position: absolute;
		left: 0;
	}

	.fui-sections__descr {
		/* #ifndef APP-NVUE */
		word-break: break-all;
		/* #endif */
	}

	.fui-sections__descr-text {
		/* #ifndef APP-NVUE */
		word-break: break-all;
		/* #endif */
		font-weight: 400;
	}

	/* #ifndef APP-NVUE */
	.fui-sections__line-color {
		background: var(--fui-color-primary, #465CFF) !important;
	}

	/* #endif */
</style>