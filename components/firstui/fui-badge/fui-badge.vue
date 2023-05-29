<template>
	<text
		:class="[dot?'fui-badge__dot':'fui-badge__wrap',background?'':('fui-badge__bg-'+type),absolute?'fui-badge__absolute':'',scaleRatio!=1 && isNvue?'fui-badge__trans-origin':'',!background && type==='white'?'fui-badge__text-color':'']"
		:style="{top:absolute?top:'auto',right:absolute?right:'auto',zoom:scaleRatio,transform:isNvue?`scale(${scaleRatio})`:'scale(1)',marginTop:marginTop+'rpx',marginLeft:marginLeft+'rpx',marginRight:marginRight+'rpx',width:width,color:color,background:getBgColor}"
		@tap="handleClick" v-if="showValue || dot">{{dot?'':showValue}}</text>
</template>

<script>
	export default {
		name: "fui-badge",
		emits: ['click'],
		props: {
			value: {
				type: [Number, String],
				default: ''
			},
			max: {
				type: [Number, String],
				default: -1
			},
			//类型：primary，success，warning，danger，purple，white
			type: {
				type: String,
				default: 'primary'
			},
			//背景色，如果设置背景则type失效
			background: {
				type: String,
				default: ''
			},
			//字体颜色
			color: {
				type: String,
				default: '#FFFFFF'
			},
			//是否显示为圆点
			dot: {
				type: Boolean,
				default: false
			},
			//margin-top值，单位rpx
			marginTop: {
				type: [Number, String],
				default: 0
			},
			//margin-left值，单位rpx
			marginLeft: {
				type: [Number, String],
				default: 0
			},
			//margin-right值，单位rpx
			marginRight: {
				type: [Number, String],
				default: 0
			},
			//是否绝对定位
			absolute: {
				type: Boolean,
				default: false
			},
			top: {
				type: String,
				default: '-8rpx'
			},
			right: {
				type: String,
				default: '-18rpx'
			},
			//缩放比例
			scaleRatio: {
				type: Number,
				default: 1
			}
		},
		data() {
			let isNvue = false;
			// #ifdef APP-NVUE
			isNvue = true;
			// #endif
			return {
				isNvue: isNvue,
				width: 0,
				showValue: ''
			};
		},
		computed: {
			getBgColor() {
				let color = this.background
				// #ifdef APP-NVUE
				if (!color && this.type) {
					//primary，success，warning，danger，purple，white
					const app = uni && uni.$fui && uni.$fui.color
					const colors = {
						primary: (app && app.primary) || '#465CFF',
						success: (app && app.success) || '#09BE4F',
						warning: (app && app.warning) || '#FFB703',
						danger: (app && app.danger) || '#FF2B2B',
						purple: (app && app.purple) || '#6831FF',
						white: '#FFFFFF'
					}
					color = colors[this.type] || colors.primary
				}
				// #endif
				return color
			}
		},
		watch: {
			value(val) {
				this.getWidth()
			}
		},
		mounted() {
			this.getWidth()
		},
		methods: {
			getWidth() {
				let max = Number(this.max)
				let val = Number(this.value)
				let value = ''
				if (isNaN(val) || max === -1) {
					value = this.value
				} else {
					value = val > max ? `${max}+` : val
				}
				this.showValue = value;
				this.width = this.dot ? '8px' : ((String(value).length * 16 + 21) + 'rpx')
			},
			handleClick() {
				this.$emit('click');
			}
		}
	}
</script>

<style scoped>
	.fui-badge__wrap {
		height: 36rpx;
		padding: 0 12rpx;
		color: #FFFFFF;
		font-size: 24rpx;
		line-height: 36rpx;
		border-radius: 100px;
		/* #ifndef APP-NVUE */
		min-width: 36rpx !important;
		display: flex;
		box-sizing: border-box;
		white-space: nowrap;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.fui-badge__dot {
		height: 8px !important;
		width: 8px !important;
		/* #ifdef APP-NVUE */
		border-radius: 100px;
		/* #endif */

		/* #ifndef APP-NVUE */
		display: inline-block;
		/* #endif */

		/* #ifndef APP-NVUE */
		border-radius: 50%;
		/* #endif */
		z-index: 10;
	}

	/* #ifndef APP-NVUE */
	.fui-badge__bg-primary {
		background-color: var(--fui-color-primary, #465CFF) !important;
	}

	.fui-badge__bg-success {
		background-color: var(--fui-color-success, #09BE4F) !important;
	}

	.fui-badge__bg-warning {
		background-color: var(--fui-color-warning, #FFB703) !important;
	}

	.fui-badge__bg-danger {
		background-color: var(--fui-color-danger, #FF2B2B) !important;
	}

	.fui-badge__bg-purple {
		background-color: var(--fui-color-purple, #6831FF) !important;
	}

	.fui-badge__bg-white {
		background-color: var(--fui-color-white, #FFFFFF) !important;
	}

	.fui-badge__text-color {
		color: var(--fui-color-danger, #FF2B2B) !important;
	}

	/* #endif */

	/* #ifdef APP-NVUE */
	.fui-badge__text-color {
		color: #FF2B2B !important;
	}

	.fui-badge__trans-origin {
		transform-origin: center center;
	}

	/* #endif */
	.fui-badge__absolute {
		position: absolute;
	}
</style>