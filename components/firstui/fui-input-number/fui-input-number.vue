<template>
	<view class="fui-input__number">
		<view class="fui-number__minus" :class="[disabled || min >= inputValue ? 'fui-number__disabled' : '']"
			@tap="minus" :style="{ minHeight:(height-8)+'rpx' }">
			<view class="fui-minus__sign" :style="{backgroundColor:signColor,width:signWidth+'rpx'}" v-if="!custom">
			</view>
			<slot></slot>
		</view>
		<input type="number" v-model="inputValue" :disabled="disabled" @blur="blur" class="fui-number__input"
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
		props: {
			value: {
				type: Number,
				default: 1
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
			this.inputValue = this.getValue(this.value);
		},
		data() {
			let isNvue = false;
			// #ifdef APP-NVUE
			isNvue = true;
			// #endif
			return {
				inputValue: 0,
				isNvue: isNvue
			};
		},
		watch: {
			value(val) {
				this.inputValue = this.getValue(val);
			},
			inputValue(newVal, oldVal) {
				if (+newVal !== +oldVal) {
					const val = this.getValue(+newVal)
					this.$emit("change", {
						value: val,
						index: this.index,
						params: this.params
					});
					this.$emit("input", val);
				}
			}
		},
		methods: {
			getScale() {
				let scale = 1;
				//浮点型
				if (!Number.isInteger(this.step)) {
					scale = Math.pow(10, (this.step + '').split('.')[1].length);
				}
				return scale;
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
				if (this.disabled) return;
				const scale = this.getScale();
				let num = this.inputValue * scale;
				let step = this.step * scale;
				if (type === 'reduce') {
					num -= step;
				} else if (type === 'plus') {
					num += step;
				}
				let value = num / scale;
				if (type === 'plus' && value < this.min) {
					value = this.min;
				} else if (type === 'reduce' && value > this.max) {
					value = this.max;
				}
				if (value < this.min || value > this.max) {
					return;
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
				this.$emit('blur', e)
				let value = e.detail.value;
				if (value) {
					if (~value.indexOf('.') && Number.isInteger(this.step)) {
						value = value.split('.')[0];
					}
					value = this.getValue(value)
				} else {
					value = this.min;
				}
				this.inputValue = value;
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
	}

	.fui-number__disabled {
		opacity: 0.6;
	}
</style>
