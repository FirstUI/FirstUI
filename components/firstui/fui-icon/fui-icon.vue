<template>
	<!-- #ifndef APP-NVUE -->
	<text :style="{ color:getColor, fontSize: getSize, fontWeight: fontWeight}" class="fui-icon"
		:class="[!getColor && !primary?'fui-icon__color':'',primary && (!color || color===true)?'fui-icon__active-color':'',disabled?'fui-icon__not-allowed':'',customPrefix,customPrefix?name:'']"
		@click="handleClick">{{ icons[name] || '' }}</text>
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<text
		:style="{ color: primary && (!color || color===true)?primaryColor:getColor, fontSize: getSize,lineHeight:getSize, fontWeight: fontWeight}"
		class="fui-icon" :class="[customPrefix]" @click="handleClick">{{ customPrefix?name:icons[name] }}</text>
	<!-- #endif -->
</template>

<script>
	import icons from './fui-icon.js';
	// #ifdef APP-NVUE
	var domModule = weex.requireModule('dom');
	import fuiicons from './fui-icon.ttf'
	domModule.addRule('fontFace', {
		'fontFamily': 'fuiFont',
		'src': "url('" + fuiicons + "')"
	});
	// #endif

	export default {
		name: "fui-icon",
		emits: ['click'],
		// #ifdef MP-WEIXIN
		options: {
			addGlobalClass: true
		},
		// #endif
		props: {
			name: {
				type: String,
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
				default: ''
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
			params: {
				type: [Number, String],
				default: 0
			},
			customPrefix: {
				type: String,
				default: ''
			},
			//是否显示为主色调，color为空时有效。【内部使用】
			primary: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			getSize() {
				const size = (uni.$fui && uni.$fui.fuiIcon && uni.$fui.fuiIcon.size) || 64
				const unit = (uni.$fui && uni.$fui.fuiIcon && uni.$fui.fuiIcon.unit) || 'rpx'
				return (this.size || size) + (this.unit || unit)
			},
			primaryColor() {
				const app = uni && uni.$fui && uni.$fui.color;
				return (app && app.primary) || '#465CFF';
			},
			getColor() {
				const app = uni && uni.$fui && uni.$fui.fuiIcon;
				let color = this.color || (app && app.color)

				// #ifdef APP-NVUE
				if (!color || color === true) {
					color = '#333333'
				}
				// #endif
				return color;
			}
		},
		data() {
			return {
				icons: icons
			};
		},
		methods: {
			handleClick() {
				if (this.disabled) return;
				this.$emit('click', {
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
		font-family: fuiFont;
		src: url("./fui-icon.ttf") format("truetype");
	}

	/* #endif */
	.fui-icon {
		font-family: fuiFont;
		text-decoration: none;
		text-align: center;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	.fui-icon__color {
		color: var(--fui-color-section, #333333) !important;
	}

	.fui-icon__active-color {
		color: var(--fui-color-primary, #465CFF) !important;
	}

	/* #endif */

	.fui-icon__not-allowed {
		/* #ifdef H5 */
		cursor: not-allowed !important;
		/* #endif */
	}
</style>