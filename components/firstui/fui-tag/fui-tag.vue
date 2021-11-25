<template>
	<view class="fui-tag__wrap"
		:class="[highlight?'fui-tag__opacity':'',originLeft?'fui-tag__origin-left':'',originRight?'fui-tag__origin-right':'',!background?`fui-tag__${type}-${theme}`:'']"
		:style="{backgroundColor:getBackground,fontSize:size+'rpx',lineHeight:size+'rpx',color:color,borderColor:getBorderColor,zoom:isNvue?1:scaleRatio,transform: `scale(${isNvue?scaleRatio:1})`,borderRadius:radius+'rpx',paddingTop:padding[0] || 0,paddingRight:padding[1]|| 0,paddingBottom:padding[2] || padding[0] || 0,paddingLeft:padding[3] || padding[1] || 0,marginTop:marginTop+'rpx',marginRight:marginRight+'rpx',marginBottom:marginBottom+'rpx',marginLeft:marginLeft+'rpx'}"
		@tap="handleClick">
		<text v-if="text" class="fui-tag__text" :class="[!background?`fui-tag_${type}-${theme}`:'']"
			:style="{fontSize:size+'rpx',lineHeight:size+'rpx',color:getColor}">{{text}}</text>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "fui-tag",
		emits: ['click'],
		props: {
			text: {
				type: String,
				default: ''
			},
			//类型：primary，success，warning，danger，purple
			type: {
				type: String,
				default: 'primary'
			},
			//三种主题：dark、light、plain。background为空时生效
			theme: {
				type: String,
				default: 'dark'
			},
			//背景色，如果设置背景则type失效
			background: {
				type: String,
				default: ''
			},
			borderColor: {
				type: String,
				default: ''
			},
			//字体颜色
			color: {
				type: String,
				default: ''
			},
			//字体大小 rpx
			size: {
				type: [Number, String],
				default: 24
			},
			//缩放比例
			scaleRatio: {
				type: Number,
				default: 1
			},
			originLeft: {
				type: Boolean,
				default: false
			},
			originRight: {
				type: Boolean,
				default: false
			},
			//是否有点击效果
			highlight: {
				type: Boolean,
				default: false
			},
			radius: {
				type: [Number, String],
				default: 8
			},
			//padding值，上右下左，同css顺序
			padding: {
				type: Array,
				default () {
					return ['16rpx', '32rpx']
				}
			},
			//margin-top值 
			marginTop: {
				type: [Number, String],
				default: 0
			},
			marginBottom: {
				type: [Number, String],
				default: 0
			},
			marginLeft: {
				type: [Number, String],
				default: 0
			},
			marginRight: {
				type: [Number, String],
				default: 0
			},
			index: {
				type: Number,
				default: 0
			}
		},
		data() {
			let isNvue = false
			// #ifdef APP-NVUE
			isNvue = true
			// #endif
			return {
				isNvue: isNvue,
				// #ifdef APP-NVUE
				dark: {
					'primary': '#465CFF',
					'success': '#09BE4F',
					'warning': '#FFB703',
					'danger': '#FF2B2B',
					'purple': '#6831FF'
				},
				light: {
					'primary': '#F1F4FA',
					'success': 'rgba(9, 190, 79, .05)',
					'warning': 'rgba(255, 183, 3, .1)',
					'danger': 'rgba(255, 43, 43, .05)',
					'purple': 'rgba(104, 49, 255, .05)'
				}
				// #endif
			}
		},
		computed: {
			getBackground() {
				let background = this.background
				// #ifdef APP-NVUE
				if (!background) {
					switch (this.theme) {
						case 'light':
							background = this.light[this.type]
							break;
						case 'dark':
							background = this.dark[this.type]
							break;
						default:
							background = "rgba(0,0,0,0)"
							break;
					}
				}
				// #endif
				return background;
			},
			getColor() {
				let color = this.color
				// #ifdef APP-NVUE
				if (!color) {
					if (this.theme === 'dark') {
						color = '#fff'
					} else {
						color = this.dark[this.type]
					}
				}
				// #endif
				return color;
			},
			getBorderColor() {
				let borderColor = this.borderColor
				// #ifdef APP-NVUE
				if (!borderColor) {
					if (this.theme === 'light') {
						borderColor = this.light[this.type]
					} else {
						borderColor = this.dark[this.type]
					}
				}
				// #endif
				return borderColor;
			}
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
	.fui-tag__wrap {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		box-sizing: border-box;
		flex-shrink: 0;
		max-width: 100%;
		white-space: nowrap;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		position: relative;
		/* #ifdef APP-NVUE */
		border-width: 0.5px;
		/* #endif */
		/* #ifndef APP-NVUE */
		border-width: 1rpx;
		/* #endif */
		border-style: solid;
		border-color: transparent;
		font-weight: normal;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.fui-tag__text {
		/* #ifdef APP-NVUE */
		lines: 1;
		/* #endif */
		/* #ifndef APP-NVUE */
		white-space: nowrap;
		/* #endif */
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* #ifndef APP-NVUE */
	.fui-tag__primary-dark {
		background-color: var(--fui-color-primary, #465CFF) !important;
		border-color: var(--fui-color-primary, #465CFF) !important;
		color: #FFFFFF !important;
	}

	.fui-tag_primary-dark,
	.fui-tag_success-dark,
	.fui-tag_warning-dark,
	.fui-tag_danger-dark,
	.fui-tag_purple-dark {
		color: #FFFFFF !important;
	}

	.fui-tag__success-dark {
		background-color: var(--fui-color-success, #09BE4F) !important;
		border-color: var(--fui-color-success, #09BE4F) !important;
		color: #FFFFFF !important;
	}


	.fui-tag__warning-dark {
		background-color: var(--fui-color-warning, #FFB703) !important;
		border-color: var(--fui-color-warning, #FFB703) !important;
		color: #FFFFFF !important;
	}

	.fui-tag__danger-dark {
		background-color: var(--fui-color-danger, #FF2B2B) !important;
		border-color: var(--fui-color-danger, #FF2B2B) !important;
		color: #FFFFFF !important;
	}

	.fui-tag__purple-dark {
		background-color: var(--fui-color-purple, #6831FF) !important;
		border-color: var(--fui-color-purple, #6831FF) !important;
		color: #FFFFFF !important;
	}

	.fui-tag__primary-light {
		background-color: var(--fui-bg-color-grey, #F1F4FA) !important;
		border-color: var(--fui-bg-color-grey, #F1F4FA) !important;
		color: var(--fui-color-primary, #465CFF) !important;
	}

	.fui-tag_primary-light,
	.fui-tag_primary-plain {
		color: var(--fui-color-primary, #465CFF) !important;
	}

	.fui-tag__success-light {
		background-color: var(--fui-bg-color-green, rgba(9, 190, 79, .05)) !important;
		border-color: var(--fui-bg-color-green, rgba(9, 190, 79, .05)) !important;
		color: var(--fui-color-success, #09BE4F) !important;
	}

	.fui-tag_success-light,
	.fui-tag_success-plain {
		color: var(--fui-color-success, #09BE4F) !important;
	}

	.fui-tag__warning-light {
		background-color: var(--fui-bg-color-yellow, rgba(255, 183, 3, .1)) !important;
		border-color: var(--fui-bg-color-yellow, rgba(255, 183, 3, .1)) !important;
		color: var(--fui-color-warning, #FFB703) !important;

	}

	.fui-tag_warning-light,
	.fui-tag_warning-plain {
		color: var(--fui-color-warning, #FFB703) !important;

	}

	.fui-tag__danger-light {
		background-color: var(--fui-bg-color-red, rgba(255, 43, 43, .05)) !important;
		border-color: var(--fui-bg-color-red, rgba(255, 43, 43, .05)) !important;
		color: var(--fui-color-danger, #FF2B2B) !important;
	}

	.fui-tag__danger-light,
	.fui-tag__danger-plain {
		color: var(--fui-color-danger, #FF2B2B) !important;
	}

	.fui-tag__purple-light {
		background-color: var(--fui-bg-color-purple, rgba(104, 49, 255, .05)) !important;
		border-color: var(--fui-bg-color-purple, rgba(104, 49, 255, .05)) !important;
		color: var(--fui-color-purple, #6831FF) !important;
	}

	.fui-tag_purple-light,
	.fui-tag_purple-plain {
		color: var(--fui-color-purple, #6831FF) !important;
	}

	.fui-tag__primary-plain {
		background-color: rgba(0, 0, 0, 0) !important;
		border-color: var(--fui-color-primary, #465CFF) !important;
		color: var(--fui-color-primary, #465CFF) !important;
	}

	.fui-tag__success-plain {
		background-color: rgba(0, 0, 0, 0) !important;
		border-color: var(--fui-color-success, #09BE4F) !important;
		color: var(--fui-color-success, #09BE4F) !important;
	}

	.fui-tag__warning-plain {
		background-color: rgba(0, 0, 0, 0) !important;
		border-color: var(--fui-color-warning, #FFB703) !important;
		color: var(--fui-color-warning, #FFB703) !important;
	}

	.fui-tag__danger-plain {
		background-color: rgba(0, 0, 0, 0) !important;
		border-color: var(--fui-color-danger, #FF2B2B) !important;
		color: var(--fui-color-danger, #FF2B2B) !important;
	}

	.fui-tag__purple-plain {
		background-color: rgba(0, 0, 0, 0) !important;
		border-color: var(--fui-color-purple, #6831FF) !important;
		color: var(--fui-color-purple, #6831FF) !important;

	}

	/* #endif */

	.fui-tag__origin-left {
		transform-origin: 0 center;
	}

	.fui-tag__origin-right {
		transform-origin: 100% center;
	}

	.fui-tag__opacity:active {
		opacity: 0.5;
	}
</style>
