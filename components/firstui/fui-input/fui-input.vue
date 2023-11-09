<template>
	<view class="fui-input__wrap" :class="{'fui-input__border-nvue':inputBorder}"
		:style="{paddingTop:padding[0] || 0,paddingRight:padding[1] || 0,paddingBottom:padding[2] || padding[0] || 0,paddingLeft:padding[3] || padding[1] || 0,background:backgroundColor,marginTop:marginTop+'rpx',borderRadius:getRadius,borderColor:borderColor}"
		@tap="fieldClick">
		<view v-if="borderTop && !inputBorder" :style="{background:borderColor,left:topLeft+'rpx',right:topRight+'rpx'}"
			class="fui-input__border-top" :class="{'fui-input__background':!borderColor}">
		</view>
		<!-- #ifndef APP-NVUE -->
		<view class="fui-input__border" :class="{'fui-input__bordercolor':!borderColor}"
			:style="{borderRadius:getBorderRadius,borderColor:borderColor}" v-if="inputBorder"></view>
		<!-- #endif -->
		<!-- #ifdef APP-NVUE -->
		<view class="fui-input__required" v-if="required">
			<text :style="{color:requiredColor || dangerColor}" class="fui-form__asterisk-text">*</text>
		</view>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<view class="fui-input__required" :style="{color:requiredColor || dangerColor}" v-if="required">*</view>
		<!-- #endif -->
		<view class="fui-input__label" :style="{minWidth:labelWidth+'rpx'}" v-if="label">
			<text :style="{fontSize:getLabelSize,color:labelColor}">{{label}}</text>
		</view>
		<slot name="left"></slot>
		<!-- #ifndef APP-NVUE -->
		<input class="fui-input__self"
			:class="{'fui-input__text-right':textRight,'fui-input__disabled-styl':disabled && disabledStyle,'fui-input__disabled':disabled}"
			:style="{fontSize:getSize,color:color,textAlign:textRight?'right':textAlign}"
			placeholder-class="fui-input__placeholder" :type="type" :name="name" :value="val"
			:placeholder="val?'':placeholder" :password="password || type === 'password' || null"
			:placeholder-style="placeholderStyl" :disabled="disabled || readonly" :cursor-spacing="cursorSpacing"
			:maxlength="maxlength" :focus="focused" :confirm-type="confirmType" :confirm-hold="confirmHold"
			:cursor="cursor" :selection-start="selectionStart" :selection-end="selectionEnd"
			:adjust-position="adjustPosition" :hold-keyboard="holdKeyboard" :auto-blur="autoBlur" :enableNative="false"
			:always-embed="alwaysEmbed" @focus="onFocus" @blur="onBlur" @input="onInput" @confirm="onConfirm"
			@keyboardheightchange="onKeyboardheightchange" />
		<!-- #endif -->
		<!-- #ifdef APP-NVUE -->
		<view class="fui-input__self-wrap">
			<input ref="fuiInput" class="fui-input__self" :class="{'fui-input__text-right':textRight}"
				:style="{fontSize:getSize,color:color,textAlign:textRight?'right':textAlign}"
				placeholder-class="fui-input__placeholder" :type="type" :name="name" :value="val"
				:placeholder="placeholder" :password="password || type === 'password'"
				:placeholder-style="placeholderStyl" :disabled="disabled || readonly" :cursor-spacing="cursorSpacing"
				:maxlength="maxlength" :focus="focused" :confirm-type="confirmType" :confirm-hold="confirmHold"
				:cursor="cursor" :selection-start="selectionStart" :selection-end="selectionEnd"
				:adjust-position="adjustPosition" :hold-keyboard="holdKeyboard" :auto-blur="autoBlur"
				:enableNative="false" :always-embed="alwaysEmbed" @focus="onFocus" @blur="onBlur" @input="onInput"
				@confirm="onConfirm" @keyboardheightchange="onKeyboardheightchange" />
			<view class="fui-input__cover" v-if="disabled || readonly" @tap="fieldClickAndroid"></view>
		</view>
		<!-- #endif -->
		<view class="fui-input__clear-wrap" :style="{background:clearColor}" v-if="clearable && val != ''"
			@tap.stop="onClear">
			<view class="fui-input__clear">
				<view class="fui-input__clear-a"></view>
			</view>
			<view class="fui-input__clear">
				<view class="fui-input__clear-b"></view>
			</view>
		</view>
		<slot></slot>
		<view v-if="borderBottom  && !inputBorder"
			:style="{background:borderColor,left:bottomLeft+'rpx',right:bottomRight+'rpx'}"
			class="fui-input__border-bottom" :class="{'fui-input__background':!borderColor}"></view>
	</view>
</template>

<script>
	export default {
		name: "fui-input",
		emits: ['input', 'update:modelValue', 'focus', 'blur', 'confirm', 'click', 'keyboardheightchange'],
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
			//左侧标题
			label: {
				type: String,
				default: ''
			},
			//标题字体大小
			labelSize: {
				type: [Number, String],
				default: 0
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
			clearable: {
				type: Boolean,
				default: false
			},
			clearColor: {
				type: String,
				default: '#CCCCCC'
			},
			//获取焦点
			focus: {
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
			//输入框值 vue2
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
			//vue3
			modelModifiers: {
				default: () => ({})
			},
			//兼容写法，type为text时也做Number处理，NaN时返回原值
			number: {
				type: Boolean,
				default: false
			},
			//与官方input type属性一致
			type: {
				type: String,
				default: 'text'
			},
			password: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			//V2.1.0+
			disabledStyle: {
				type: Boolean,
				default: false
			},
			readonly: {
				type: Boolean,
				default: false
			},
			maxlength: {
				type: [Number, String],
				default: 140
			},
			min: {
				type: [Number, String],
				default: 'NaN'
			},
			max: {
				type: [Number, String],
				default: 'NaN'
			},
			cursorSpacing: {
				type: Number,
				default: 0,
			},
			confirmType: {
				type: String,
				default: 'done'
			},
			confirmHold: {
				type: Boolean,
				default: false,
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
			holdKeyboard: {
				type: Boolean,
				default: false
			},
			autoBlur: {
				type: Boolean,
				default: false
			},
			alwaysEmbed: {
				type: Boolean,
				default: false
			},
			size: {
				type: [Number, String],
				default: 0
			},
			color: {
				type: String,
				default: '#333'
			},
			inputBorder: {
				type: Boolean,
				default: false
			},
			isFillet: {
				type: Boolean,
				default: false
			},
			radius: {
				type: [Number, String],
				default: 8
			},
			borderTop: {
				type: Boolean,
				default: false
			},
			topLeft: {
				type: [Number, String],
				default: 0
			},
			topRight: {
				type: [Number, String],
				default: 0
			},
			borderBottom: {
				type: Boolean,
				default: true
			},
			bottomLeft: {
				type: [Number, String],
				default: 32
			},
			bottomRight: {
				type: [Number, String],
				default: 0
			},
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
			trim: {
				type: Boolean,
				default: true
			},
			//即将废弃，请使用textAlign属性
			textRight: {
				type: Boolean,
				default: false
			},
			//V2.2.0+ 可选值：left/center/right
			textAlign: {
				type: String,
				default: 'left'
			},
			padding: {
				type: Array,
				default () {
					return ['28rpx', '32rpx']
				}
			},
			backgroundColor: {
				type: String,
				default: '#FFFFFF'
			},
			marginTop: {
				type: [Number, String],
				default: 0
			}
		},
		data() {
			return {
				placeholderStyl: '',
				focused: false,
				val: ''
			}
		},
		computed: {
			getRadius() {
				let radius = this.radius + 'rpx'
				if (this.isFillet) {
					radius = '120px'
				}
				return radius;
			},
			getBorderRadius() {
				let radius = Number(this.radius) * 2 + 'rpx'
				if (this.isFillet) {
					radius = '240px'
				}
				return radius;
			},
			getSize() {
				const size = (uni.$fui && uni.$fui.fuiInput && uni.$fui.fuiInput.size) || 32
				return `${this.size || size}rpx`
			},
			getLabelSize() {
				const labelSize = (uni.$fui && uni.$fui.fuiInput && uni.$fui.fuiInput.labelSize) || 32
				return `${this.labelSize || labelSize}rpx`
			},
			dangerColor() {
				const app = uni && uni.$fui && uni.$fui.color;
				return (app && app.danger) || '#FF2B2B';
			}
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
				if (!this.$refs.fuiInput) return;
				this.$nextTick(() => {
					setTimeout(() => {
						if (val) {
							this.$refs.fuiInput.focus()
						} else {
							this.$refs.fuiInput.blur()
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
				this.val = newVal
			},
			// #endif
			value(newVal) {
				this.val = newVal
			}
		},
		created() {
			this.fieldPlaceholderStyle()
			setTimeout(() => {
				// #ifndef VUE3
				this.val = this.value
				// #endif

				// #ifdef VUE3
				if (this.value && !this.modelValue) {
					this.val = this.value
				} else {
					this.val = this.modelValue
				}
				// #endif
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
			fieldPlaceholderStyle() {
				if (this.placeholderStyle) {
					this.placeholderStyl = this.placeholderStyle
				} else {
					const _size = (uni.$fui && uni.$fui.fuiInput && uni.$fui.fuiInput.size) || 32
					const size = uni.upx2px(this.size || _size)
					this.placeholderStyl = `fontSize:${size}px;`
				}
			},
			onInput(event) {
				let value = event.detail.value;
				if (this.trim) value = this.trimStr(value);
				this.val = value;
				const currentVal = Number(value)
				if ((this.modelModifiers.number || this.number || this.type === 'digit' || this.type === 'number') && !
					isNaN(currentVal) && Number.isSafeInteger(currentVal)) {
					let eVal = this.type === 'digit' ? value : currentVal
					if (typeof currentVal === 'number') {
						const min = Number(this.min)
						const max = Number(this.max)
						if (typeof min === 'number' && currentVal < min) {
							eVal = min
						} else if (typeof max === 'number' && max < currentVal) {
							eVal = max
						}
					}
					value = isNaN(eVal) ? value : eVal
				}
				this.$nextTick(() => {
					//当输入框为空时，输入框显示不赋值为0
					event.detail.value !== '' && (this.val = String(value));
				})
				//如果为空时返回0 ，当双向绑定会将输入框赋值0
				const inputValue = event.detail.value !== '' ? value : ''
				// TODO　兼容　vue2
				this.$emit('input', inputValue);
				// TODO　兼容　vue3
				// #ifdef VUE3
				this.$emit('update:modelValue', inputValue)
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
			onClear(event) {
				if (this.disabled && !this.readonly) return;
				uni.hideKeyboard()
				this.val = '';
				this.$emit('input', '');
				// #ifdef VUE3
				this.$emit('update:modelValue', '')
				// #endif
			},
			fieldClick() {
				this.$emit('click', {
					name: this.name,
					target: 'wrap'
				});
			},
			/**
			 * 在安卓nvue上，事件无法冒泡 
			 * 外层容器点击事件无法触发，需要单独处理
			 */
			fieldClickAndroid(e) {
				//仅添加事件好像就可以实现冒泡？以下代码无需执行？
				// const sys = uni.getSystemInfoSync()
				// if (sys.platform.toLocaleLowerCase() == "android") {
				// 	const formItem = this.getParent();
				// 	//手动触发 formItem 点击事件
				// 	formItem && formItem.handleClick();
				// 	this.$emit('click', {
				// 		name: this.name,
				// 		target: 'input'
				// 	});
				// }
			},
			getParent(name = 'fui-form-item') {
				let parent = this.$parent;
				let parentName = parent.$options.name;
				while (parentName !== name) {
					parent = parent.$parent;
					if (!parent) return false;
					parentName = parent.$options.name;
				}
				return parent;
			},
			onKeyboardheightchange(e) {
				this.$emit('keyboardheightchange', e.detail)
			},
			trimStr(str) {
				return str.replace(/^\s+|\s+$/g, '');
			}
		}
	}
</script>

<style scoped>
	.fui-input__wrap {
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

	.fui-input__border-top {
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

	.fui-input__border-bottom {
		position: absolute;
		bottom: 0;
		/* #ifdef APP-NVUE */
		height: 0.5px;
		z-index: -1;
		/* #endif */
		/* #ifndef APP-NVUE */
		height: 1px;
		-webkit-transform: scaleY(0.5) translateZ(0);
		transform: scaleY(0.5) translateZ(0);
		transform-origin: 0 100%;
		z-index: 1;
		/* #endif */
	}


	.fui-input__required {
		position: absolute;
		left: 12rpx;
		/* #ifndef APP-NVUE */
		height: 30rpx;
		top: 50%;
		transform: translateY(-50%);
		line-height: 1.15;
		/* #endif */

		/* #ifdef APP-NVUE */
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
	.fui-input__label {
		padding-right: 12rpx;
		/* #ifndef APP-NVUE */
		flex-shrink: 0;
		/* #endif */
	}

	/* #ifdef APP-NVUE */
	.fui-input__self-wrap {
		flex: 1;
		flex-direction: row;
		position: relative;
	}

	.fui-input__cover {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}

	/* #endif */

	.fui-input__self {
		flex: 1;
		padding-right: 12rpx;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		overflow: visible;
		/* #endif */
		background-color: transparent;
	}

	.fui-input__clear-wrap {
		width: 32rpx;
		height: 32rpx;
		transform: rotate(45deg) scale(1.1);
		position: relative;
		/* #ifndef APP-NVUE */
		border-radius: 50%;
		flex-shrink: 0;
		/* #endif */

		/* #ifdef APP-NVUE */
		border-radius: 32rpx;
		/* #endif */

		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */

	}

	.fui-input__clear {
		width: 32rpx;
		height: 32rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		position: absolute;
		left: 0;
		top: 0;
		transform: scale(0.5) translateZ(0);
	}

	.fui-input__clear-a {
		width: 32rpx;
		border: 2rpx solid #fff;
		background-color: #fff;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
	}

	.fui-input__clear-b {
		height: 32rpx;
		border: 2rpx solid #fff;
		background-color: #fff;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
	}

	.fui-input__placeholder {
		/* #ifndef APP-NVUE */
		color: var(--fui-color-minor, #ccc);
		overflow: visible;
		/* #endif */
		/* #ifdef APP-NVUE */
		color: #ccc;
		font-size: 32rpx;
		/* #endif */
	}

	/* #ifdef MP */
	::v-deep .fui-input__placeholder {
		color: var(--fui-color-minor, #ccc);
		overflow: visible;
	}

	/* #endif */

	/* #ifdef APP-NVUE */
	.fui-input__border-nvue {
		border-width: 0.5px;
		border-style: solid;
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	.fui-input__disabled {
		pointer-events: none;
	}

	.fui-input__border {
		position: absolute;
		height: 200%;
		width: 200%;
		border: 1px solid var(--fui-color-border, #EEEEEE);
		transform-origin: 0 0;
		transform: scale(0.5);
		left: 0;
		top: 0;
		border-radius: 16rpx;
		pointer-events: none;
	}

	.fui-input__bordercolor {
		border-color: var(--fui-color-border, #EEEEEE) !important;
	}

	.fui-input__background {
		background: var(--fui-color-border, #EEEEEE) !important;
	}

	/* #endif */

	.fui-input__text-left {
		text-align: left;
	}

	.fui-input__text-right {
		text-align: right;
	}

	.fui-input__text-center {
		text-align: center;
	}

	.fui-input__disabled-styl {
		opacity: .6;
	}
</style>