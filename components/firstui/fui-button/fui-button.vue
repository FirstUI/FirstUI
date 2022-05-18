<template>
	<view class="fui-button__wrap"
		:style="{width: width,height: height,marginTop:margin[0] || 0,	marginRight:margin[1]||0,marginBottom:margin[2] || margin[0]||0,marginLeft:margin[3] || margin[1]||0,borderRadius: radius,background:getBackground}"
		@touchstart="handleStart" @touchend="handleClick" @touchcancel="handleEnd">
		<button class="fui-button" :class="[
				bold ? 'fui-text__bold' : '',
				time && (plain || type==='link') ? 'fui-button__opacity' : '',
				disabled && !disabledBackground ? 'fui-button__opacity' : '',
				!background && !disabledBackground && !plain?('fui-button__'+type):'',
				!width || width==='100%' || width===true?'fui-button__flex-1':'',
				time && !plain && type!=='link' ? 'fui-button__active' : '',
				disabled?'':'fui-button__nvue',
				pc && !disabled?(plain || type==='link'?'fui-button__opacity-pc':'fui-button__active-pc'):''
			]" :style="{
				width: width,
				height: height,
				lineHeight: height,
				background: disabled && disabledBackground ? disabledBackground : (plain ? 'transparent' : background),
				borderWidth:!borderColor?'0':borderWidth,
				borderColor: borderColor ? borderColor : disabled && disabledBackground ? disabledBackground : (background || 'transparent'),
				borderRadius: radius,
				fontSize: size + 'rpx',
				color: getColor
			}" :loading="loading" :form-type="formType" :open-type="openType" @getuserinfo="bindgetuserinfo"
			@getphonenumber="bindgetphonenumber" @contact="bindcontact" @error="binderror"
			@opensetting="bindopensetting" :disabled="disabled" :scope="scope" @tap.stop="handleTap">
			<text class="fui-button__text"
				:class="{'fui-btn__gray-color':!background && !disabledBackground && !plain && type==='gray' && color==='#fff','fui-text__bold':bold}"
				v-if="text"
				:style="{fontSize: size + 'rpx',lineHeight:size + 'rpx',color:color? (disabled && disabledBackground ? disabledColor : color):(type==='gray'?'#465CFF':'#FFFFFF')}">{{text}}</text>
			<slot></slot>
		</button>
	</view>
</template>

<script>
	export default {
		name: 'fui-button',
		emits: ['click', 'getuserinfo', 'contact', 'getphonenumber', 'error', 'opensetting'],
		// #ifndef VUE3
		// #ifdef MP-WEIXIN
		behaviors: ['wx://form-field-button'],
		// #endif
		// #endif
		props: {
			//样式类型：primary，success， warning，danger，link，purple，gray
			type: {
				type: String,
				default: 'primary'
			},
			//按钮背景色，当传入值时type失效
			background: {
				type: String,
				default: ''
			},
			//按钮显示文本
			text: {
				type: String,
				default: ''
			},
			//按钮字体颜色
			color: {
				type: String,
				default: ''
			},
			//按钮禁用背景色
			disabledBackground: {
				type: String,
				default: ''
			},
			//按钮禁用字体颜色
			disabledColor: {
				type: String,
				default: ''
			},
			// #ifdef APP-NVUE
			borderWidth: {
				type: String,
				default: '0.5px'
			},
			// #endif
			// #ifndef APP-NVUE
			borderWidth: {
				type: String,
				default: '1rpx'
			},
			// #endif
			borderColor: {
				type: String,
				default: ''
			},
			//宽度
			width: {
				type: String,
				default: '100%'
			},
			//高度
			height: {
				type: String,
				default: '96rpx'
			},
			//字体大小，单位rpx
			size: {
				type: [Number, String],
				default: 32
			},
			bold: {
				type: Boolean,
				default: false
			},
			//['20rpx','30rpx','20rpx','30rpx']->[上，右，下，左]
			margin: {
				type: Array,
				default () {
					return ['0', '0']
				}
			},
			//圆角
			radius: {
				type: String,
				default: '16rpx'
			},
			plain: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			},
			formType: {
				type: String,
				default: ''
			},
			openType: {
				type: String,
				default: ''
			},
			//支付宝小程序 
			//当 open-type 为 getAuthorize 时，可以设置 scope 为：phoneNumber、userInfo
			scope: {
				type: String,
				default: ''
			},
			index: {
				type: [Number, String],
				default: 0
			}
		},
		computed: {
			getBackground() {
				// #ifndef APP-NVUE
				return 'transparent'
				// #endif
				// #ifdef APP-NVUE
				let colors = {
					primary: '#465CFF',
					success: '#09BE4F',
					warning: '#FFB703',
					danger: '#FF2B2B',
					link: 'transparent',
					purple: '#6831FF',
					gray: '#F8F8F8'
				}
				let color = colors[this.type] || 'transparent'
				if (this.disabled || this.plain) {
					color = 'transparent';
				}
				if (!this.disabled && !this.plain && this.background) {
					color = this.background
				}
				return color
				// #endif
			},
			getColor() {
				let color = '#fff'
				if (this.color) {
					color = this.disabled && this.disabledBackground ? this.disabledColor : this.color
				} else {
					if (this.disabled && this.disabledBackground) {
						color = this.disabledColor || '#FFFFFF'
					} else {
						color = this.type === 'gray' ? '#465CFF' : '#FFFFFF'
					}
				}
				return color;
			}
		},
		data() {
			return {
				time: 0,
				trigger: false,
				pc: false
			};
		},
		created() {
			// #ifdef H5
			this.pc = this.isPC()
			// #endif
		},
		methods: {
			handleStart(e) {
				// #ifndef APP-NVUE
				if (this.disabled) return;
				this.trigger = false;
				if (new Date().getTime() - this.time <= 150) return;
				this.trigger = true;
				this.time = new Date().getTime();
				// #endif
			},
			handleClick() {
				if (this.disabled || !this.trigger) return;
				this.time = 0;
			},
			// #ifdef H5
			isPC() {
				if (typeof navigator !== 'object') return false;
				var userAgentInfo = navigator.userAgent;
				var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
				var flag = true;
				for (var v = 0; v < Agents.length - 1; v++) {
					if (userAgentInfo.indexOf(Agents[v]) > 0) {
						flag = false;
						break;
					}
				}
				return flag;
			},
			// #endif
			handleTap() {
				if (this.disabled) return;
				this.$emit('click', {
					index: Number(this.index)
				});
			},
			handleEnd(e) {
				// #ifndef APP-NVUE
				if (this.disabled) return;
				setTimeout(() => {
					this.time = 0;
				}, 150);
				// #endif
			},
			bindgetuserinfo({
				detail = {}
			} = {}) {
				this.$emit('getuserinfo', detail);
			},
			bindcontact({
				detail = {}
			} = {}) {
				this.$emit('contact', detail);
			},
			bindgetphonenumber({
				detail = {}
			} = {}) {
				this.$emit('getphonenumber', detail);
			},
			binderror({
				detail = {}
			} = {}) {
				this.$emit('error', detail);
			},
			bindopensetting({
				detail = {}
			} = {}) {
				this.$emit('opensetting', detail);
			}
		}
	};
</script>

<style scoped>
	.fui-button__wrap {
		position: relative;
	}

	.fui-button {
		border-width: 0;
		/* #ifndef APP-NVUE */
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		/* #endif */
		border-style: solid;
		position: relative;
		padding-left: 0;
		padding-right: 0;
		/* #ifndef APP-NVUE */
		overflow: hidden;
		transform: translateZ(0);
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		user-select: none;
		/* #endif */

	}

	/* #ifdef APP-NVUE */
	.fui-button__nvue {
		opacity: 1 !important;
	}

	/* #endif */

	.fui-button__flex-1 {
		flex: 1;
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
	}

	.fui-button::after {
		border: 0;
	}

	/* #ifdef H5 */
	.fui-button__active-pc {
		position: relative;
	}

	.fui-button__opacity-pc:active {
		opacity: 0.5;
	}

	.fui-button__active-pc:active::after {
		content: ' ';
		background-color: var(--fui-bg-color-hover, rgba(0, 0, 0, 0.2));
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		right: 0;
		top: 0;
		transform: none;
		z-index: 1;
		border-radius: 0;
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	.fui-button__active {
		overflow: hidden !important;
	}

	.fui-button__active::after {
		content: ' ';
		background-color: var(--fui-bg-color-hover, rgba(0, 0, 0, 0.2));
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		right: 0;
		top: 0;
		transform: none;
		z-index: 1;
		border-radius: 0;
	}

	/* #endif */
	.fui-button__text {
		text-align: center;
		flex-direction: row;
		align-items: center;
		justify-content: center !important;
		padding-left: 0 !important;
	}

	.fui-button__opacity {
		opacity: 0.5;
	}

	.fui-text__bold {
		font-weight: bold;
	}

	.fui-button__link {
		border-color: transparent !important;
		background: transparent !important;
	}

	.fui-button__primary {
		/* #ifdef APP-NVUE */
		border-color: #465CFF !important;
		background: #465CFF !important;
		/* #endif */

		/* #ifndef APP-NVUE */
		border-color: var(--fui-color-primary, #465CFF) !important;
		background: var(--fui-color-primary, #465CFF) !important;
		/* #endif */
	}

	.fui-button__success {
		/* #ifdef APP-NVUE */
		border-color: #09BE4F !important;
		background: #09BE4F !important;
		/* #endif */

		/* #ifndef APP-NVUE */
		border-color: var(--fui-color-success, #09BE4F) !important;
		background: var(--fui-color-success, #09BE4F) !important;
		/* #endif */
	}

	.fui-button__warning {
		/* #ifdef APP-NVUE */
		border-color: #FFB703 !important;
		background: #FFB703 !important;
		/* #endif */

		/* #ifndef APP-NVUE */
		border-color: var(--fui-color-warning, #FFB703) !important;
		background: var(--fui-color-warning, #FFB703) !important;
		/* #endif */
	}

	.fui-button__danger {
		/* #ifdef APP-NVUE */
		border-color: #FF2B2B !important;
		background: #FF2B2B !important;
		/* #endif */

		/* #ifndef APP-NVUE */
		border-color: var(--fui-color-danger, #FF2B2B) !important;
		background: var(--fui-color-danger, #FF2B2B) !important;
		/* #endif */
	}

	.fui-button__purple {
		/* #ifdef APP-NVUE */
		border-color: #6831FF !important;
		background: #6831FF !important;
		/* #endif */

		/* #ifndef APP-NVUE */
		border-color: var(--fui-color-purple, #6831FF) !important;
		background: var(--fui-color-purple, #6831FF) !important;
		/* #endif */
	}

	.fui-button__gray {
		/* #ifdef APP-NVUE */
		border-color: #F8F8F8 !important;
		background: #F8F8F8 !important;
		/* #endif */

		/* #ifndef APP-NVUE */
		border-color: var(--fui-bg-color-content, #F8F8F8) !important;
		background: var(--fui-bg-color-content, #F8F8F8) !important;
		color: var(--fui-color-primary, #465CFF) !important;
		/* #endif */
	}

	.fui-btn__gray-color {
		/* #ifdef APP-NVUE */
		color: #465CFF !important;
		/* #endif */
		/* #ifndef APP-NVUE */
		color: var(--fui-color-primary, #465CFF) !important;
		/* #endif */
	}
</style>
