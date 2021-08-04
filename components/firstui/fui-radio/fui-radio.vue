<template>
	<view class="fui-checkbox__input" :class="{'fui-checkbox__disabled':disabled}"
		:style="{backgroundColor:getBackgroundColor(val,isCheckMark),borderColor:getBorderColor(val,isCheckMark),zoom:isNvue?1:scaleRatio,transform:`scale(${isNvue?scaleRatio:1})`,borderRadius:borderRadius}"
		@tap.stop="radioChange">
		<view class="fui-check__mark" :style="{borderBottomColor:checkMarkColor,borderRightColor:checkMarkColor}"
			v-if="val"></view>
		<radio class="fui-radio__hidden" :color="color" :disabled="disabled" :value="value" :checked="val"></radio>
	</view>
</template>

<script>
	export default {
		name: "fui-radio",
		options: {
			virtualHost: true
		},
		props: {
			value: {
				type: String,
				default: ''
			},
			checked: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			//radio选中背景颜色
			color: {
				type: String,
				default: '#465CFF'
			},
			//radio未选中时边框颜色
			borderColor: {
				type: String,
				default: '#ccc'
			},
			borderRadius: {
				type: String,
				// #ifdef APP-NVUE
				default: '40rpx'
				// #endif
				// #ifndef APP-NVUE
				default: '50%'
				// #endif
			},
			//是否只展示对号，无边框背景
			isCheckMark: {
				type: Boolean,
				default: false
			},
			//对号颜色
			checkMarkColor: {
				type: String,
				default: '#fff'
			},
			scaleRatio: {
				type: [Number, String],
				default: 1
			},
			//父级组件（fui-radio-group）ref值，头条小程序
			groupRef: {
				type: String,
				default: 'fuiGroup'
			},
			//父级组件（fui-label）ref值，头条小程序
			labelRef: {
				type: String,
				default: 'fuiLabel'
			}
		},
		created() {
			this.val = this.checked;
			// #ifndef MP-TOUTIAO
			this.group = this.getParent()
			if (this.group) {
				this.group.childrens.push(this);
			}
			this.label = this.getParent('fui-label')
			if (this.label) {
				this.label.childrens.push(this);
			}
			// #endif
		},
		// #ifdef MP-TOUTIAO
		mounted() {
			this.$nextTick(() => {
				setTimeout(() => {
					this.group = this.$parent.$refs[this.groupRef];
					if (this.group instanceof Array) {
						this.group = this.group[0]
					}
					this.group && this.group.childrens.push(this);
					//对于label此方法不太优雅，待官方修复bug立即优化
					this.label = this.$parent.$refs[this.labelRef];
					if (this.label instanceof Array) {
						this.label = this.label[0]
					}
					this.label && this.label.childrens.push(this);

				}, 50)
			})
		},
		// #endif
		watch: {
			checked(newVal) {
				this.val = newVal;
			},
			val(newVal) {
				if (newVal && this.group) {
					this.group.changeValue(this.value, this);
				}
			}
		},
		data() {
			let isNvue = false;
			// #ifdef APP-NVUE
			isNvue = true;
			// #endif
			return {
				val: false,
				isNvue: isNvue
			};
		},
		methods: {
			getBackgroundColor(val, isCheckMark) {
				let color = val ? this.color : '#fff'
				if (isCheckMark) {
					color = 'transparent'
				}
				return color;
			},
			getBorderColor(val, isCheckMark) {
				let color = val ? this.color : this.borderColor;
				if (isCheckMark) {
					color = 'transparent'
				}
				return color;
			},
			radioChange(e) {
				if (this.disabled || this.val) return;
				this.val = true;
				this.$emit('change', {
					checked: this.val,
					value: this.value
				})
			},
			getParent(name = 'fui-radio-group') {
				let parent = this.$parent;
				let parentName = parent.$options.name;
				while (parentName !== name) {
					parent = parent.$parent;
					if (!parent) return false;
					parentName = parent.$options.name;
				}
				return parent;
			},
			labelClick() {
				this.radioChange()
			}
		}
	}
</script>

<style scoped>
	.fui-checkbox__input {
		font-size: 0;
		color: rgba(0, 0, 0, 0);
		width: 40rpx;
		height: 40rpx;
		border-width: 1px;
		border-style: solid;
		/* #ifdef APP-NVUE */
		border-radius: 40rpx;
		/* #endif */
		/* #ifndef APP-NVUE */
		border-radius: 50%;
		display: inline-flex;
		box-sizing: border-box;
		vertical-align: top;
		flex-shrink: 0;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		position: relative;
	}

	.fui-check__mark {
		width: 20rpx;
		height: 40rpx;
		border-bottom-style: solid;
		border-bottom-width: 3px;
		border-bottom-color: #FFFFFF;
		border-right-style: solid;
		border-right-width: 3px;
		border-right-color: #FFFFFF;
		transform: rotate(45deg) scale(0.5);
		transform-origin: 54% 48%;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
	}

	.fui-radio__hidden {
		/* #ifndef APP-NVUE */
		display: inline-block;
		width: 100%;
		height: 100%;
		border: 0 none;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		/* #endif */
		/* #ifdef APP-NVUE */
		width: 100wx;
		height: 100wx;
		border-width: 0;
		/* #endif */
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		z-index: 2;
	}

	.fui-checkbox__disabled {
		opacity: 0.6;
	}
</style>
