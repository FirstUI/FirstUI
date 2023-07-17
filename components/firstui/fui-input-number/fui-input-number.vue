<template>
	<view class="fui-input__number">
		<view class="fui-number__minus" :class="[disabled || min >= inputValue ? 'fui-number__disabled' : '']"
			@tap="minus" :style="{ minHeight:getMinHeight }">
			<view class="fui-minus__sign" :style="{backgroundColor:signColor,width:signWidth+'rpx'}" v-if="!custom">
			</view>
			<slot></slot>
		</view>
		<input :type="type" v-model="inputValue" :disabled="disabled" @blur="blur" class="fui-number__input"
			:style="{ color: color, fontSize: size + 'rpx', backgroundColor: backgroundColor, height: height + 'rpx', minHeight: height + 'rpx', width: width + 'rpx',borderRadius:radius+'rpx',marginLeft:margin+'rpx',marginRight:margin+'rpx' }" />
		<view class="fui-number__plus" :style="{minWidth:signWidth+'rpx',minHeight:signWidth+'rpx'}"
			:class="[disabled || inputValue >= max ? 'fui-number__disabled' : '']" @tap="plus">
			<view class="fui-plus__sign-col"
				:style="{height:signWidth+'rpx',backgroundColor:signColor,left:isNvue?(signWidth/2+'rpx'):'50%'}"
				v-if="!custom">
			</view>
			<view class="fui-plus__sign-row" :style="{width:signWidth+'rpx',backgroundColor:signColor}" v-if="!custom">
			</view>
			<slot name="plus"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'fui-input-number',
		emits: ['change', 'update:modelValue', 'input', 'blur'],
		props: {
			// #ifndef VUE3
			value: {
				type: [Number, String],
				default: 1
			},
			// #endif
			// #ifdef VUE3
			modelValue: {
				type: [Number, String],
				default: 1
			},
			// #endif
			//number、text（主要用与输入负号）
			type: {
				type: String,
				default: 'number'
			},
			//最小值
			min: {
				type: Number,
				default: 1
			},
			//最大值
			max: {
				type: Number,
				default: 99
			},
			//每次点击改变的间隔大小
			step: {
				type: Number,
				default: 1
			},
			//是否禁用操作
			disabled: {
				type: Boolean,
				default: false
			},
			//加减号宽度，单位rpx
			signWidth: {
				type: [Number, String],
				default: 24
			},
			//加减号颜色
			signColor: {
				type: String,
				default: '#181818'
			},
			//input高度，单位rpx
			height: {
				type: [Number, String],
				default: 40
			},
			//input宽度，单位rpx
			width: {
				type: [Number, String],
				default: 80
			},
			//input圆角，单位rpx
			radius: {
				type: [Number, String],
				default: 8
			},
			size: {
				type: Number,
				default: 26
			},
			//input 背景颜色
			backgroundColor: {
				type: String,
				default: '#EEEEEE'
			},
			//input 字体颜色
			color: {
				type: String,
				default: '#181818'
			},
			//输入框margin-left，margin-right值
			margin: {
				type: [Number, String],
				default: 16
			},
			//是否自定义加减号，为true则去除默认加减号，使用插槽自定义
			custom: {
				type: Boolean,
				default: false
			},
			//索引值，列表中使用
			index: {
				type: [Number, String],
				default: 0
			},
			//自定义参数
			params: {
				type: [Number, String],
				default: 0
			}
		},
		created() {
			// #ifndef VUE3
			this.inputValue = this.getValue(this.value);
			// #endif

			// #ifdef VUE3
			this.inputValue = this.getValue(this.modelValue);
			// #endif
		},
		computed: {
			getMinHeight() {
				return (Number(this.height) - 8) + 'rpx'
			}
		},
		data() {
			let isNvue = false;
			// #ifdef APP-NVUE
			isNvue = true;
			// #endif
			return {
				inputValue: 0,
				oldValue: 0,
				isNvue: isNvue
			};
		},
		watch: {
			// #ifndef VUE3
			value(val) {
				this.inputValue = this.getValue(val);
			},
			// #endif
			// #ifdef VUE3
			modelValue(val) {
				this.inputValue = this.getValue(val);
			},
			// #endif
			inputValue(newVal, oldVal) {
				if (!isNaN(Number(newVal)) && Number(newVal) !== Number(oldVal)) {
					const val = this.getValue(+newVal)
					this.oldValue = val
					this.$emit("change", {
						value: val,
						index: this.index,
						params: this.params
					});
					// TODO vue2 兼容
					this.$emit("input", val);
					// TODO vue3 兼容
					// #ifdef VUE3
					this.$emit("update:modelValue", +val);
					// #endif
				}
			}
		},
		methods: {
			getScale(val, step) {
				let scale = 1;
				let scaleVal = 1;
				//浮点型
				if (!Number.isInteger(step)) {
					scale = Math.pow(10, (step + '').split('.')[1].length);
				}
				if (!Number.isInteger(val)) {
					scaleVal = Math.pow(10, (val + '').split('.')[1].length);
				}
				return Math.max(scale, scaleVal);
			},
			getValue(val) {
				val = Number(val)
				if (val < this.min) {
					val = this.min
				} else if (val > this.max) {
					val = this.max
				}
				return val
			},
			calcNum: function(type) {
				if (this.disabled || (this.inputValue == this.min && type === 'reduce') || (this.inputValue == this
						.max && type === 'plus')) return;
				const scale = this.getScale(Number(this.inputValue), Number(this.step));
				let num = Number(this.inputValue) * scale;
				let step = this.step * scale;
				if (type === 'reduce') {
					num -= step;
				} else if (type === 'plus') {
					num += step;
				}
				let value = Number((num / scale).toFixed(String(scale).length - 1));
				if (value < this.min) {
					value = this.min;
				} else if (value > this.max) {
					value = this.max;
				}
				this.inputValue = String(value);
			},
			plus: function() {
				this.calcNum('plus');
			},
			minus: function() {
				this.calcNum('reduce');
			},
			blur: function(e) {
				let value = e.detail.value;
				if (value && !isNaN(Number(value))) {
					if (~value.indexOf('.') && Number.isInteger(this.step) && Number.isInteger(Number(value))) {
						value = value.split('.')[0];
					}
					value = this.getValue(value)
				} else {
					value = this.oldValue;
				}
				setTimeout(() => {
					e.detail.value = value
					this.$emit('blur', e)
					this.inputValue = value;
				}, this.type === 'text' ? 100 : 0)
			}
		}
	};
</script>

<style scoped>
	.fui-input__number {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.fui-number__minus {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.fui-minus__sign {
		height: 2px;
		border-radius: 2px;
	}

	.fui-number__plus {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.fui-plus__sign-col {
		position: absolute;
		top: 0;
		/* #ifdef APP-NVUE */
		transform: translateX(-1px);
		/* #endif */
		/* #ifndef APP-NVUE */
		transform: translateX(-50%);
		/* #endif */
		width: 2px;
		border-radius: 2px;
	}

	.fui-plus__sign-row {
		height: 2px;
		border-radius: 2px;
	}

	.fui-number__input {
		text-align: center;
		font-weight: 500;
		border-width: 0;
		/* #ifdef H5 */
		outline: none;
		/* #endif */
	}

	/* #ifdef H5 */
	::-webkit-inner-spin-button,
	::-webkit-outer-spin-button{
		-webkit-appearance: none;
		margin: 0;
	}
	/* #endif */

	.fui-number__disabled {
		opacity: 0.6;
	}
</style>