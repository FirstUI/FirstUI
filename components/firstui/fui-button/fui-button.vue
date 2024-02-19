<template>
	<view class="fui-button__wrap"
		:class="[!getWidth || getWidth==='100%' || getWidth===true?'fui-button__flex-1':'',disabled && !disabledBackground ? 'fui-button__opacity' : '']"
		:style="{width: getWidth,height: getHeight,marginTop:margin[0] || 0,	marginRight:margin[1]||0,marginBottom:margin[2] || margin[0]||0,marginLeft:margin[3] || margin[1]||0,borderRadius: getRadius,background:getBackground}"
		@touchstart="handleStart" @touchend="handleClick" @touchcancel="handleEnd">
		<button class="fui-button" :class="[
				bold ? 'fui-text__bold' : '',
				time && (plain || type==='link') ? 'fui-button__opacity' : '',
				!background && !disabledBackground && !plain?('fui-button__'+type):'',
				!getWidth || getWidth==='100%' || getWidth===true?'fui-button__flex-1':'',
				time && !plain && type!=='link' ? 'fui-button__active' : '',
				pc && !disabled?(plain || type==='link'?'fui-button__opacity-pc':'fui-button__active-pc'):'',
				
			]" :style="{
				width: getWidth,
				height: getHeight,
				lineHeight: getHeight,
				background: disabled ? (disabledBackground || getTypeColor) : (plain ? 'transparent' : getBackground), 
				borderWidth:!borderColor || !isNvue?'0':borderWidth,
				borderColor: borderColor ? borderColor : disabled && disabledBackground ? disabledBackground : (background || 'transparent'),
				borderRadius: getRadius,
				fontSize: getSize,
				color: getColor
			}" :loading="loading" :form-type="formType" :open-type="openType" :app-parameter="appParameter"
			:hoverStopPropagation="hoverStopPropagation" :lang="lang" :sessionFrom="sessionFrom"
			:sendMessageTitle="sendMessageTitle" :sendMessagePath="sendMessagePath" :sendMessageImg="sendMessageImg"
			:showMessageCard="showMessageCard" :groupId="groupId" :guildId="guildId" :publicId="publicId"
			:dataImId="dataImId" :dataImType="dataImType" :dataGoodsId="dataGoodsId" :dataOrderId="dataOrderId"
			:dataBizLine="dataBizLine" :phoneNumberNoQuotaToast="phoneNumberNoQuotaToast" @getuserinfo="bindgetuserinfo"
			@getphonenumber="bindgetphonenumber" @contact="bindcontact" @error="binderror"
			@opensetting="bindopensetting" @chooseavatar="bindchooseavatar" @launchapp="bindlaunchapp"
			@agreeprivacyauthorization="agreeprivacyauthorization" @addgroupapp="addgroupapp"
			@chooseaddress="chooseaddress" @chooseinvoicetitle="chooseinvoicetitle" @subscribe="bindsubscribe"
			@login="bindlogin" @im="bindim" :disabled="disabled" :scope="scope" @tap.stop="handleTap">
			<text class="fui-button__text"
				:class="{'fui-btn__gray-color':!background && !disabledBackground && !plain && type==='gray' && color==='#fff','fui-text__bold':bold}"
				v-if="text" :style="{fontSize: getSize,lineHeight:getSize,color:getColor}">{{text}}</text>
			<slot></slot>
		</button>
		<!-- #ifndef APP-NVUE -->
		<view v-if="borderColor" class="fui-button__thin-border"
			:class="[time && (plain || type==='link') && !disabled ? 'fui-button__opacity' : '',disabled && !disabledBackground ? 'fui-button__opacity' : '']"
			:style="{borderWidth:borderWidth,borderColor:borderColor ? borderColor : disabled && disabledBackground ? disabledBackground : (background || 'transparent'),borderRadius: getBorderRadius}">
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		name: 'fui-button',
		emits: ['click', 'getuserinfo', 'contact', 'getphonenumber', 'error', 'opensetting', 'chooseavatar', 'launchapp',
			'agreeprivacyauthorization', 'addgroupapp', 'chooseaddress', 'chooseinvoicetitle', 'subscribe', 'login',
			'im'
		],
		// #ifdef MP-WEIXIN
		behaviors: ['wx://form-field-button'],
		// #endif
		// #ifdef MP-BAIDU || MP-QQ
		behaviors: ['uni://form-field'],
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
				default: '1px'
			},
			// #endif
			borderColor: {
				type: String,
				default: ''
			},
			//V1.9.8+ 按钮大小，优先级高于width和height，medium、small、mini
			btnSize: {
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
				default: ''
			},
			//字体大小，单位rpx
			size: {
				type: [Number, String],
				default: 0
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
				default: ''
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
			appParameter: {
				type: String,
				default: ''
			},
			//v2.3.0+
			hoverStopPropagation: {
				type: Boolean,
				default: false
			},
			lang: {
				type: String,
				default: 'en'
			},
			sessionFrom: {
				type: String,
				default: ''
			},
			sendMessageTitle: {
				type: String,
				default: ''
			},
			sendMessagePath: {
				type: String,
				default: ''
			},
			sendMessageImg: {
				type: String,
				default: ''
			},
			showMessageCard: {
				type: Boolean,
				default: false
			},
			phoneNumberNoQuotaToast: {
				type: Boolean,
				default: true
			},
			groupId: {
				type: String,
				default: ''
			},
			guildId: {
				type: String,
				default: ''
			},
			publicId: {
				type: String,
				default: ''
			},
			dataImId: {
				type: String,
				default: ''
			},
			dataImType: {
				type: String,
				default: ''
			},
			dataGoodsId: {
				type: String,
				default: ''
			},
			dataOrderId: {
				type: String,
				default: ''
			},
			dataBizLine: {
				type: String,
				default: ''
			},
			index: {
				type: [Number, String],
				default: 0
			}
		},
		computed: {
			getTypeColor() {
				// #ifndef APP-NVUE
				return '';
				// #endif
				const app = uni && uni.$fui && uni.$fui.color
				let colors = {
					primary: (app && app.primary) || '#465CFF',
					success: (app && app.success) || '#09BE4F',
					warning: (app && app.warning) || '#FFB703',
					danger: (app && app.danger) || '#FF2B2B',
					link: 'transparent',
					purple: (app && app.purple) || '#6831FF',
					gray: '#F8F8F8'
				}
				return colors[this.type] || 'transparent'
			},
			getBackground() {
				let color = this.getTypeColor
				if (this.disabled || this.plain) {
					color = 'transparent';
				}
				if (!this.disabled && !this.plain && this.background) {
					color = this.background
				}
				return color
			},
			getColor() {
				let color = '#fff'
				if (this.color) {
					color = this.disabled && this.disabledBackground ? this.disabledColor : this.color
				} else {
					if (this.disabled && this.disabledBackground) {
						color = this.disabledColor || '#FFFFFF'
					} else {
						const app = uni && uni.$fui && uni.$fui.color;
						const primary = (app && app.primary) || '#465CFF';
						color = this.type === 'gray' ? primary : '#FFFFFF'
					}
				}
				return color;
			},
			getSize() {
				let size = this.size || (uni && uni.$fui && uni.$fui.fuiButton && uni.$fui.fuiButton.size) || 32
				if (this.btnSize === 'small') {
					size = size > 28 ? 28 : size;
				} else if (this.btnSize === 'mini') {
					size = size > 28 ? 24 : size;
				}
				return `${size}rpx`
			},
			getWidth() {
				//medium 400*84 / small 200*84/ mini 120 * 64
				let width = this.width;
				if (this.btnSize && this.btnSize !== true) {
					width = {
						'medium': '400rpx',
						'small': '200rpx',
						'mini': '120rpx'
					} [this.btnSize] || width
				}
				return width
			},
			getHeight() {
				let height = this.height || (uni && uni.$fui && uni.$fui.fuiButton && uni.$fui.fuiButton.height) || '96rpx'
				if (this.btnSize && this.btnSize !== true) {
					height = {
						'medium': '84rpx',
						'small': '72rpx',
						'mini': '64rpx'
					} [this.btnSize] || height
				}
				return height
			},
			// #ifndef APP-NVUE
			getBorderRadius() {
				let radius = (uni && uni.$fui && uni.$fui.fuiButton && uni.$fui.fuiButton.radius) || '16rpx'
				radius = this.radius || radius || '0'
				if (~radius.indexOf('rpx')) {
					radius = (Number(radius.replace('rpx', '')) * 2) + 'rpx'
				} else if (~radius.indexOf('px')) {
					radius = (Number(radius.replace('px', '')) * 2) + 'px'
				} else if (~radius.indexOf('%')) {
					radius = (Number(radius.replace('%', '')) * 2) + '%'
				}
				return radius
			},
			// #endif
			getRadius() {
				const radius = (uni && uni.$fui && uni.$fui.fuiButton && uni.$fui.fuiButton.radius) || '16rpx'
				return this.radius || radius
			}
		},
		data() {
			let isNvue = false
			// #ifdef APP-NVUE
			isNvue = true
			// #endif
			return {
				isNvue: isNvue,
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
			},
			bindchooseavatar({
				detail = {}
			} = {}) {
				this.$emit('chooseavatar', detail);
			},
			bindlaunchapp({
				detail = {}
			} = {}) {
				this.$emit('launchapp', detail);
			},
			//v2.3.0+
			agreeprivacyauthorization(e) {
				this.$emit('agreeprivacyauthorization', e);
			},
			addgroupapp(e) {
				this.$emit('addgroupapp', e);
			},
			chooseaddress(e) {
				this.$emit('chooseaddress', e);
			},
			chooseinvoicetitle(e) {
				this.$emit('chooseinvoicetitle', e);
			},
			bindsubscribe(e) {
				this.$emit('subscribe', e);
			},
			bindlogin(e) {
				this.$emit('login', e);
			},
			bindim(e) {
				this.$emit('im', e);
			}
		}
	};
</script>

<style scoped>
	.fui-button__wrap {
		position: relative;
		/* #ifndef APP-NVUE */
		background: transparent !important;
		flex-direction: row;
		/* #endif */
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

	/* #ifndef APP-NVUE */
	.fui-button__thin-border {
		position: absolute;
		width: 200%;
		height: 200%;
		transform-origin: 0 0;
		transform: scale(0.5, 0.5) translateZ(0);
		box-sizing: border-box;
		left: 0;
		top: 0;
		border-radius: 32rpx;
		border-style: solid;
		pointer-events: none;
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
		z-index: 2;
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
		z-index: 2;
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
		background-color: transparent !important;
	}

	/* #ifndef APP-NVUE */
	.fui-button__primary {
		border-color: var(--fui-color-primary, #465CFF) !important;
		background: var(--fui-color-primary, #465CFF) !important;
	}


	.fui-button__success {
		border-color: var(--fui-color-success, #09BE4F) !important;
		background: var(--fui-color-success, #09BE4F) !important;
	}

	.fui-button__warning {
		border-color: var(--fui-color-warning, #FFB703) !important;
		background: var(--fui-color-warning, #FFB703) !important;
	}

	.fui-button__danger {
		border-color: var(--fui-color-danger, #FF2B2B) !important;
		background: var(--fui-color-danger, #FF2B2B) !important;
	}

	.fui-button__purple {
		border-color: var(--fui-color-purple, #6831FF) !important;
		background: var(--fui-color-purple, #6831FF) !important;
	}

	.fui-button__gray {
		border-color: var(--fui-bg-color-content, #F8F8F8) !important;
		background: var(--fui-bg-color-content, #F8F8F8) !important;
		color: var(--fui-color-primary, #465CFF) !important;
	}

	.fui-btn__gray-color {
		color: var(--fui-color-primary, #465CFF) !important;
	}

	/* #endif */
</style>