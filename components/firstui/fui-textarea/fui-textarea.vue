<template>
	<view class="fui-textarea__wrap"
		:class="{'fui-textarea__flex-start':flexStart,'fui-textarea__border-nvue':textareaBorder}"
		:style="{paddingTop:padding[0] || 0,paddingRight:padding[1] || 0,paddingBottom:padding[2] || padding[0] || 0,paddingLeft:padding[3] || padding[1] || 0,background:backgroundColor,borderRadius:radius+'rpx',borderColor:borderColor,marginTop:marginTop+'rpx'}"
		@tap="fieldClick">
		<view v-if="borderTop && !textareaBorder"
			:style="{background:borderColor,left:topLeft+'rpx',right:topRight+'rpx'}" class="fui-textarea__border-top"
			:class="{'fui-textarea__background':!borderColor}">
		</view>
		<!-- #ifndef APP-NVUE -->
		<view class="fui-textarea__border" :class="{'fui-textarea__bordercolor':!borderColor}"
			:style="{borderRadius:getRadius,borderColor:borderColor}" v-if="textareaBorder"></view>
		<!-- #endif -->
		<!-- #ifdef APP-NVUE -->
		<view class="fui-textarea__required" v-if="required && !flexStart">
			<text class="fui-form__asterisk-text" :style="{color:getRequiredColor,paddingTop:'2rpx'}">*</text>
		</view>
		<text class="fui-textarea__required" :style="{color:getRequiredColor,top:requiredTop}"
			v-if="required && flexStart">*</text>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<view class="fui-textarea__required" :class="{'fui-required__flex-start':flexStart}"
			:style="{color:getRequiredColor,top:flexStart?requiredTop:'50%'}" v-if="required">*</view>
		<!-- #endif -->
		<view class="fui-textarea__label" :style="{minWidth:labelWidth+'rpx'}" v-if="label">
			<text :style="{fontSize:labelSize+'rpx',color:labelColor}">{{label}}</text>
		</view>
		<slot name="left"></slot>
		<view class="fui-textarea__flex-1">
			<textarea ref="fuiTextarea" class="fui-textarea__self"
				:class="{'fui-text__right':textRight,'fui-textarea__disabled-styl':disabled && disabledStyle}"
				:style="{height:height,minHeight:minHeight,fontSize:size+'rpx',color:color}"
				placeholder-class="fui-textarea-placeholder" :name="name" :value="val" :placeholder="val?'':placeholder"
				:placeholderStyle="placeholderStyl" :disabled="disabled" :cursor-spacing="cursorSpacing"
				:maxlength="maxlength" :focus="focused" :auto-height="autoHeight" :fixed="fixed"
				:show-confirm-bar="showConfirmBar" :cursor="cursor" :selection-start="selectionStart"
				:selection-end="selectionEnd" :adjust-position="adjustPosition" :hold-keyboard="holdKeyboard"
				:disable-default-padding="disableDefaultPadding" :enableNative="false" :show-count="false"
				@focus="onFocus" @blur="onBlur" @input="onInput" @confirm="onConfirm" @linechange="onLinechange"
				@keyboardheightchange="onKeyboardheightchange"></textarea>
			<view class="fui-textarea__counter" v-if="isCounter">
				<text
					:style="{fontSize:counterSize+'rpx',color:counterColor}">{{maxlength!=-1?`${count}/${maxlength}`:count}}</text>
			</view>
		</view>
		<slot></slot>
		<view v-if="borderBottom  && !textareaBorder"
			:style="{background:borderColor,left:bottomLeft+'rpx',right:bottomRight+'rpx'}"
			class="fui-textarea__border-bottom" :class="{'fui-textarea__background':!borderColor}"></view>
	</view>
</template>

<script>
	export default {
		name: "fui-textarea",
		emits: ['input', 'update:modelValue', 'focus', 'blur', 'confirm', 'click', 'linechange', 'keyboardheightchange'],
		// #ifdef MP-WEIXIN
		//加group是为了避免在表单中使用时给组件加value属性
		behaviors: ['wx://form-field-group'],
		// #endif
		// #ifdef MP-BAIDU || MP-QQ || H5
		//如果在这些平台不需要也能识别，则删除
		behaviors: ['uni://form-field'],
		// #endif
		// #ifdef MP-WEIXIN
		options: {
			addGlobalClass: true,
			virtualHost: true
		},
		// #endif
		props: {
			//是否为必填项
			required: {
				type: Boolean,
				default: false
			},
			requiredColor: {
				type: String,
				default: ''
			},
			requiredTop: {
				type: String,
				default: '34rpx'
			},
			//左侧标题
			label: {
				type: String,
				default: ''
			},
			//标题字体大小
			labelSize: {
				type: [Number, String],
				default: 32
			},
			labelColor: {
				type: String,
				default: '#333'
			},
			//label 最小宽度 rpx
			labelWidth: {
				type: [Number, String],
				default: 140
			},
			//获取焦点
			focus: {
				type: Boolean,
				default: false
			},
			autoHeight: {
				type: Boolean,
				default: false
			},
			fixed: {
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default: ''
			},
			placeholderStyle: {
				type: String,
				default: ''
			},
			//输入框名称
			name: {
				type: String,
				default: ''
			},
			//输入框值
			value: {
				type: [Number, String],
				default: ''
			},
			// #ifdef VUE3
			//输入框值
			modelValue: {
				type: [Number, String],
				default: ''
			},
			// #endif
			disabled: {
				type: Boolean,
				default: false
			},
			//V2.1.0+
			disabledStyle: {
				type: Boolean,
				default: false
			},
			maxlength: {
				type: [Number, String],
				default: 140
			},
			cursorSpacing: {
				type: Number,
				default: 0,
			},
			showConfirmBar: {
				type: Boolean,
				default: true
			},
			cursor: {
				type: Number,
				default: -1
			},
			selectionStart: {
				type: Number,
				default: -1
			},
			selectionEnd: {
				type: Number,
				default: -1
			},
			adjustPosition: {
				type: Boolean,
				default: true
			},
			disableDefaultPadding: {
				type: Boolean,
				default: true
			},
			holdKeyboard: {
				type: Boolean,
				default: false
			},
			height: {
				type: String,
				default: '200rpx'
			},
			minHeight: {
				type: String,
				default: '30rpx'
			},
			//标题与输入框是否顶端对齐
			flexStart: {
				type: Boolean,
				default: false
			},
			//输入框字体大小 rpx
			size: {
				type: [Number, String],
				default: 32
			},
			//输入框字体颜色
			color: {
				type: String,
				default: '#333'
			},
			// 是否显示 textarea 边框
			textareaBorder: {
				type: Boolean,
				default: false
			},
			// 是否显示上边框
			borderTop: {
				type: Boolean,
				default: true
			},
			//上边框left值，单位rpx
			topLeft: {
				type: [Number, String],
				default: 0
			},
			//上边框right值，单位rpx
			topRight: {
				type: [Number, String],
				default: 0
			},
			// 是否显示下边框
			borderBottom: {
				type: Boolean,
				default: true
			},
			//下边框left值，单位rpx
			bottomLeft: {
				type: [Number, String],
				default: 0
			},
			//下边框right值，单位rpx
			bottomRight: {
				type: [Number, String],
				default: 0
			},
			//边框颜色
			// #ifdef APP-NVUE
			borderColor: {
				type: String,
				default: '#EEEEEE'
			},
			// #endif
			// #ifndef APP-NVUE
			borderColor: {
				type: String,
				default: ''
			},
			// #endif
			radius: {
				type: [String, Number],
				default: 0
			},
			// 是否自动去除两端的空格
			trim: {
				type: Boolean,
				default: true
			},
			textRight: {
				type: Boolean,
				default: false
			},
			//输入框padding值：[上，右，下，左]
			padding: {
				type: Array,
				default () {
					return ['32rpx', '32rpx']
				}
			},
			//输入框背景颜色
			backgroundColor: {
				type: String,
				default: '#FFFFFE'
			},
			//输入框margin-top值 rpx
			marginTop: {
				type: Number,
				default: 0
			},
			//是否显示底部输入长度计数
			isCounter: {
				type: Boolean,
				default: false
			},
			//计数文本颜色
			counterColor: {
				type: String,
				default: '#B2B2B2'
			},
			//计数文本大小 rpx
			counterSize: {
				type: [Number, String],
				default: 28
			}
		},
		computed: {
			getRadius() {
				return Number(this.radius) * 2 + 'rpx'
			},
			getRequiredColor() {
				let color = this.requiredColor;
				if (!color || color === true) {
					const app = uni && uni.$fui && uni.$fui.color;
					color = (app && app.danger) || '#FF2B2B';
				}
				return color;
			}
		},
		data() {
			return {
				placeholderStyl: '',
				count: 0,
				focused: false,
				val: ''
			};
		},
		watch: {
			focus(val) {
				this.$nextTick(() => {
					setTimeout(() => {
						this.focused = val
					}, 20)
				})
			},
			// #ifdef APP-NVUE
			focused(val) {
				if (!this.$refs.fuiTextarea) return;
				this.$nextTick(() => {
					setTimeout(() => {
						if (val) {
							this.$refs.fuiTextarea.focus()
						} else {
							this.$refs.fuiTextarea.blur()
						}
					}, 50)
				})
			},
			// #endif
			placeholderStyle() {
				this.fieldPlaceholderStyle()
			},
			// #ifdef VUE3
			modelValue(newVal) {
				this.val = this.getVal(newVal)
				this.count = this.getCount(String(this.val).length)
			},
			// #endif
			value(newVal) {
				this.val = this.getVal(newVal)
				this.count = this.getCount(String(this.val).length)
			}
		},
		created() {
			this.fieldPlaceholderStyle()
			setTimeout(() => {
				// #ifndef VUE3
				this.val = this.getVal(this.value)
				// #endif

				// #ifdef VUE3
				if (this.value && !this.modelValue) {
					this.val = this.getVal(this.value)
				} else {
					this.val = this.getVal(this.modelValue)
				}
				// #endif
				this.count = this.getCount(String(this.val).length)
			}, 50)
		},
		mounted() {
			this.$nextTick(() => {
				setTimeout(() => {
					this.focused = this.focus
				}, 300)
			})
		},
		methods: {
			getVal(val) {
				return !val && val !== 0 ? '' : val
			},
			fieldPlaceholderStyle() {
				if (this.placeholderStyle) {
					this.placeholderStyl = this.placeholderStyle
				} else {
					const size = uni.upx2px(this.size)
					this.placeholderStyl = `fontSize:${size}px;`
				}
			},
			getCount(len) {
				const max = Number(this.maxlength)
				return len > max && max !== -1 ? max : len
			},
			onInput(event) {
				let value = event.detail.value;
				if (this.trim) value = this.trimStr(value);
				let len = value.length;
				const max = Number(this.maxlength)
				if (len > max && max !== -1) {
					len = max;
					value = value.substring(0, max - 1)
				}
				this.count = len;
				this.val = value;
				// TODO　兼容　vue2
				this.$emit('input', value);
				// TODO　兼容　vue3
				// #ifdef VUE3
				this.$emit('update:modelValue', value)
				// #endif
			},
			onFocus(event) {
				this.$emit('focus', event);
			},
			onBlur(event) {
				this.$emit('blur', event);
			},
			onConfirm(e) {
				this.$emit('confirm', e);
			},
			fieldClick() {
				this.$emit('click', {
					name: this.name
				});
			},
			onLinechange(e) {
				this.$emit('linechange', e)
			},
			onKeyboardheightchange(e) {
				this.$emit('keyboardheightchange', e)
			},
			trimStr(str) {
				return str.replace(/^\s+|\s+$/g, '');
			}
		}
	}
</script>

<style scoped>
	.fui-textarea__wrap {
		/* #ifndef APP-NVUE */
		width: 100%;
		box-sizing: border-box;
		display: flex;
		/* #endif */
		flex-direction: row;
		flex: 1;
		align-items: center;
		position: relative;
		border-width: 0;
	}

	.fui-textarea__flex-start {
		align-items: flex-start !important;
	}

	.fui-textarea__border-top {
		position: absolute;
		top: 0;
		/* #ifdef APP-NVUE */
		height: 0.5px;
		z-index: -1;
		/* #endif */

		/* #ifndef APP-NVUE */
		height: 1px;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		transform-origin: 0 0;
		z-index: 1;
		/* #endif */
	}

	.fui-textarea__border-bottom {
		position: absolute;
		bottom: 0;
		/* #ifdef APP-NVUE */
		height: 0.5px;
		z-index: -1;
		/* #endif */
		/* #ifndef APP-NVUE */
		height: 1px;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		transform-origin: 0 100%;
		z-index: 1;
		/* #endif */
	}


	.fui-textarea__required {
		position: absolute;
		left: 12rpx;
		/* #ifndef APP-NVUE */
		height: 30rpx;
		top: 50%;
		transform: translateY(-50%);
		line-height: 1.15;
		/* #endif */

		/* #ifdef APP-NVUE */
		flex: 1;
		top: 28rpx;
		bottom: 28rpx;
		align-items: center;
		justify-content: center;
		/* #endif */
	}

	/* #ifdef APP-NVUE */
	.fui-form__asterisk-text {
		font-size: 32rpx;
		height: 32rpx;
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	.fui-required__flex-start {
		transform: translateY(0);
	}

	/* #endif */

	.fui-textarea__label {
		padding-right: 12rpx;
		/* #ifndef APP-NVUE */
		flex-shrink: 0;
		/* #endif */
	}

	.fui-textarea__self {
		flex: 1;
		/* #ifndef APP-NVUE */
		width: 100%;
		overflow: visible;
		box-sizing: border-box;
		/* #endif */

		/* #ifdef APP-NVUE */
		padding-top: 6px;
		padding-bottom: 10px;
		/* #endif */

		/* #ifdef MP-ALIPAY || MP-TOUTIAO*/
		padding-top: 0 !important;
		padding-bottom: 0;
		/* #endif */

		/* #ifdef MP-TOUTIAO */
		background-color: rgba(255, 255, 255, 0) !important;
		/* #endif */
	}

	.fui-textarea-placeholder {
		/* #ifndef APP-NVUE */
		color: var(--fui-color-minor, #ccc);
		overflow: visible;
		/* #endif */
		/* #ifdef APP-NVUE */
		color: #ccc;
		/* #endif */

		/* #ifdef MP-TOUTIAO */
		padding-top: 0 !important;
		/* #endif */
	}

	/* #ifdef MP */
	::v-deep .fui-textarea-placeholder {
		color: var(--fui-color-minor, #ccc);
		overflow: visible;
	}

	/* #endif */

	/* #ifdef APP-NVUE */
	.fui-textarea__border-nvue {
		border-style: solid;
		border-width: 0.5px;
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	.fui-textarea__border {
		border-radius: 4rpx;
		position: relative;
		position: absolute;
		height: 200%;
		width: 200%;
		border: 1px solid var(--fui-color-border, #EEEEEE);
		transform-origin: 0 0;
		transform: scale(0.5);
		left: 0;
		top: 0;
		border-radius: 8rpx;
		pointer-events: none;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		user-select: none;
	}

	.fui-textarea__bordercolor {
		border-color: var(--fui-color-border, #EEEEEE) !important;
	}

	.fui-textarea__background {
		background: var(--fui-color-border, #EEEEEE) !important;
	}

	/* #endif */

	.fui-textarea__flex-1 {
		flex: 1;
	}

	.fui-textarea__counter {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		padding-top: 8rpx;
		text-align: right;
		/* #ifdef APP-NVUE */
		flex-direction: row;
		flex: 1;
		justify-content: flex-end;
		/* #endif */
	}

	.fui-text__right {
		text-align: right;
	}

	.fui-textarea__disabled-styl {
		opacity: .6;
	}
</style>