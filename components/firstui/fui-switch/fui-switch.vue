<template>
	<view class="fui-switch__input" :style="{zoom:isNvue?1:scaleRatio,transform:`scale(${isNvue?scaleRatio:1})`}">
		<switch v-if="type==='switch'" @change="change" :name="name" :checked="val" :disabled="disabled" :color="color">
		</switch>
		<view class="fui-checkbox__self" :class="{'fui-checkbox__disabled':disabled}"
			:style="{backgroundColor:val?color:'#fff',border:val?`1px solid ${color}`:`1px solid ${borderColor}`}"
			v-else>
			<view class="fui-check__mark" :style="{borderBottomColor:checkMarkColor,borderRightColor:checkMarkColor}"
				v-if="val"></view>
			<switch class="fui-switch__hidden" @change="change" :name="name" :type="isNvue?'switch':'checkbox'"
				:checked="val" :disabled="disabled"></switch>
		</view>
	</view>
</template>

<script>
	export default {
		name: "fui-switch",
		// #ifdef MP-WEIXIN
		behaviors: ['wx://form-field-group'],
		// #endif
		// #ifdef MP-BAIDU || MP-QQ
		behaviors: ['uni://form-field'],
		// #endif
		props: {
			//开关选择器名称
			name: {
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
			//样式，有效值：switch, checkbox
			type: {
				type: String,
				default: 'switch'
			},
			//switch选中颜色
			color: {
				type: String,
				default: '#465CFF'
			},
			//边框颜色，type=checkbox时生效
			borderColor: {
				type: String,
				default: '#ccc'
			},
			//对号颜色，type=checkbox时生效
			checkMarkColor: {
				type: String,
				default: '#fff'
			},
			scaleRatio: {
				type: [Number, String],
				default: 1
			},
			//父级组件（fui-label）ref值，头条小程序
			labelRef: {
				type: String,
				default: 'fuiLabel'
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
		watch: {
			checked(val) {
				this.val = val;
			}
		},
		created() {
			this.val = this.checked;
			// #ifndef MP-TOUTIAO
			this.label = this.getParent();
			if (this.label) {
				this.label.childrens.push(this)
			}
			// #endif
		},
		// #ifdef MP-TOUTIAO
		mounted() {
			this.$nextTick(() => {
				setTimeout(() => {
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
		methods: {
			change(e, label) {
				if (this.label && !label) return;
				this.val = e.detail.value;
				this.$emit('change', e)
			},
			labelClick() {
				if (this.disabled) return;
				let e = {
					detail: {
						value: !this.val
					}
				}
				this.change(e, true)
			},
			getParent(name = 'fui-label') {
				let parent = this.$parent;
				let parentName = parent.$options.name;
				while (parentName !== name) {
					parent = parent.$parent;
					if (!parent) return false;
					parentName = parent.$options.name;
				}
				return parent;
			}
		}
	}
</script>

<style scoped>
	/* #ifndef APP-NVUE */
	.fui-switch__input {
		display: inline-block;
	}

	/* #endif */

	.fui-checkbox__self {
		font-size: 0;
		width: 40rpx;
		height: 40rpx;
		/* #ifdef APP-NVUE */
		border-radius: 40rpx;
		/* #endif */
		/* #ifndef APP-NVUE */
		border-radius: 50%;
		display: inline-flex;
		box-sizing: border-box;
		vertical-align: top;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		position: relative;
	}

	/* #ifdef H5 || APP-VUE */
	>>>.uni-switch-input {
		margin-right: 0 !important;
	}

	/* #endif */

	/* #ifdef APP-NVUE */
	.uni-switch-input {
		margin-right: 0 !important;
	}

	/* #endif */

	/* #ifdef MP-WEIXIN */
	.wx-switch-input {
		margin-right: 0 !important;
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
		transform: rotate(45deg) scale(0.5);
		transform-origin: 54% 48%;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
	}

	.fui-switch__hidden {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		z-index: 2;
		/* #ifndef APP-NVUE */
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
	}

	.fui-checkbox__disabled {
		opacity: 0.6;
	}
</style>
