<template>
	<view class="fui-checkbox__input"
		:class="{'fui-checkbox__disabled':disabled,'fui-checkbox__color':!getColor && val && !isCheckMark}"
		:style="{backgroundColor:getBackgroundColor(val,isCheckMark),borderColor:getBorderColor(val,isCheckMark),zoom:isNvue?1:scaleRatio,transform:`scale(${isNvue?scaleRatio:1})`,borderRadius:borderRadius}"
		@tap.stop="checkboxChange">
		<view class="fui-check__mark" :style="{borderBottomColor:checkMarkColor,borderRightColor:checkMarkColor}"
			v-if="val"></view>
		<checkbox class="fui-checkbox__hidden" style="opacity: 0;position: absolute;" :color="getColor"
			:disabled="disabled" :value="getValue" :checked="val">
		</checkbox>
	</view>
</template>

<script>
	export default {
		name: "fui-checkbox",
		emits: ['change'],
		// #ifdef MP-WEIXIN
		options: {
			virtualHost: true
		},
		// #endif
		props: {
			//注意：返回值仍为string类型
			value: {
				type: [String, Number],
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
			//checkbox选中背景颜色
			color: {
				type: String,
				default: ''
			},
			//checkbox未选中时边框颜色
			borderColor: {
				type: String,
				default: '#ccc'
			},
			// #ifdef APP-NVUE
			borderRadius: {
				type: String,
				default: '40px'
			},
			// #endif
			// #ifndef APP-NVUE
			borderRadius: {
				type: String,
				default: '50%'
			},
			// #endif
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
			}
		},
		// #ifndef VUE3
		beforeDestroy() {
			this.unInstall()
		},
		// #endif
		// #ifdef VUE3
		beforeUnmount() {
			this.unInstall()
		},
		// #endif
		created() {
			this.val = this.checked;
			this.group = this.getParent()
			if (this.group) {
				this.group.childrens.push(this);
				if (this.group.value && this.group.value.length > 0) {
					this.val = this.group.value.includes(this.value)
				}
				// #ifdef VUE3
				if (this.group.modelValue && this.group.modelValue.length > 0) {
					this.val = this.group.modelValue.includes(this.value)
				}
				// #endif
			}
			this.label = this.getParent('fui-label')
			if (this.label) {
				this.label.childrens.push(this);
			}
		},
		watch: {
			checked(newVal) {
				this.val = newVal;
			},
			val(newVal) {
				if (this.group) {
					this.group.changeValue(this.val, this);
				}
			}
		},
		computed: {
			getColor() {
				let color = this.color;
				// #ifdef APP-NVUE
				if (!color || color === true) {
					const app = uni && uni.$fui && uni.$fui.color;
					color = (app && app.primary) || '#465CFF';
				}
				// #endif
				return color;
			},
			getValue() {
				return String(this.value)
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
			unInstall() {
				if (this.group) {
					this.group.childrens.forEach((item, index) => {
						if (item === this) {
							this.group.childrens.splice(index, 1)
						}
					})
				}
			},
			getBackgroundColor(val, isCheckMark) {
				let color = val ? this.getColor : '#fff'
				if (isCheckMark) {
					color = 'transparent'
				}
				return color;
			},
			getBorderColor(val, isCheckMark) {
				let color = val ? this.getColor : this.borderColor;
				if (isCheckMark) {
					color = 'transparent'
				}
				return color;
			},
			checkboxChange(e) {
				if (this.disabled) return;
				this.val = !this.val;
				this.$emit('change', {
					checked: this.val,
					value: this.value
				})
			},
			getParent(name = 'fui-checkbox-group') {
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
				this.checkboxChange()
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
		display: inline-flex;
		box-sizing: border-box;
		border-radius: 50%;
		vertical-align: top;
		flex-shrink: 0;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		position: relative;
	}

	/* #ifndef APP-NVUE */
	.fui-checkbox__color {
		background: var(--fui-color-primary, #465CFF) !important;
		border-color: var(--fui-color-primary, #465CFF) !important;
	}

	/* #endif */

	.fui-check__mark {
		width: 20rpx;
		height: 40rpx;
		border-bottom-style: solid;
		border-bottom-width: 3px;
		border-bottom-color: #FFFFFF;
		border-right-style: solid;
		border-right-width: 3px;
		border-right-color: #FFFFFF;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		transform: rotate(45deg) scale(0.5) translateZ(0);
		/* #endif */
		/* #ifdef APP-NVUE */
		transform: rotate(45deg) scale(0.5);
		/* #endif */
		transform-origin: 54% 48%;
	}

	.fui-checkbox__hidden {
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		border: 0 none;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		pointer-events: none;
		/* #endif */
		/* #ifdef APP-NVUE */
		width: 100wx;
		height: 100wx;
		border-width: 0;
		/* #endif */
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
	}

	.fui-checkbox__disabled {
		opacity: 0.6;
	}
</style>