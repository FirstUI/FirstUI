<template>
	<text class="fui-digitalnumbers"
		:class="{'fui-number__highlight':!disabled && highlight,'fui-number__color':!color || color===true}"
		:style="{color:getColor, fontSize: getSize, fontWeight: fontWeight,lineHeight:lineHeight?getSize:'auto',textDecoration:decoration}"
		@click="handleClick">{{text}}</text>
</template>

<script>
	// #ifdef APP-NVUE
	var domModule = weex.requireModule('dom');
	import fuinumbers from './numbers.ttf'
	domModule.addRule('fontFace', {
		'fontFamily': 'DigitalNumbers',
		'src': "url('" + fuinumbers + "')"
	});
	// #endif
	export default {
		emits: ['click'],
		name: "fui-number",
		// #ifdef MP-WEIXIN
		options: {
			virtualHost: true,
			addGlobalClass: true
		},
		// #endif
		props: {
			//数字值
			text: {
				type: [Number, String],
				default: ''
			},
			size: {
				type: [Number, String],
				default: 0
			},
			//rpx | px
			unit: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: '#333'
			},
			//字重
			fontWeight: {
				type: [Number, String],
				default: 'normal'
			},
			//是否禁用点击
			disabled: {
				type: Boolean,
				default: false
			},
			//是否有点击效果
			highlight: {
				type: Boolean,
				default: false
			},
			//none、 underline、line-through
			decoration: {
				type: String,
				default: 'none'
			},
			//是否将行高设置与字体大小一致
			lineHeight: {
				type: Boolean,
				default: false
			},
			params: {
				type: [Number, String],
				default: 0
			}
		},
		computed: {
			getSize() {
				const size = (uni.$fui && uni.$fui.fuiNumber && uni.$fui.fuiNumber.size) || 32
				const unit = (uni.$fui && uni.$fui.fuiNumber && uni.$fui.fuiNumber.unit) || 'rpx'
				return (this.size || size) + (this.unit || unit)
			},
			getColor() {
				let color = this.color;
				// #ifdef APP-NVUE
				if (!color && color !== true) {
					color = '#333333'
				}
				// #endif
				return color;
			}
		},
		methods: {
			handleClick() {
				if (this.disabled) return;
				this.$emit('click', {
					text: this.text,
					params: this.params
				});
			}
		}
	}
</script>

<style scoped>
	/* #ifndef APP-NVUE */
	/* 头条小程序组件内不能引入字体，需要在父级页面引入字体文件*/
	@font-face {
		font-family: DigitalNumbers;
		src: url("./numbers.ttf") format("truetype");
		font-weight: normal;
		font-style: normal;
	}

	.fui-number__color {
		color: var(--fui-color-section, #333333) !important;
	}

	/* #endif */

	.fui-digitalnumbers {
		font-family: DigitalNumbers;
		text-decoration: none;
	}

	.fui-number__highlight {
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
		opacity: 1;
	}

	.fui-number__highlight:active {
		opacity: .5;
	}
</style>