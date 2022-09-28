<template>
	<view class="fui-switch__input" :style="{zoom:isNvue?1:scaleRatio,transform:`scale(${isNvue?scaleRatio:1})`}">
		<!-- #ifdef APP-NVUE -->
		<switch v-if="type==='switch'" @change="change" :name="name" :checked="val" :disabled="disabled"
			:color="color || '#465CFF'">
		</switch>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<view class="fui-switch__input-def" :style="{background:val?color:'#dfdfdf',borderColor:val?color:borderColor}"
			:class="{'fui-switch__input--checked':val,'fui-checkbox__disabled':disabled,'fui-switch__color':val && !color}"
			v-if="type==='switch'">
			<switch class="fui-switch__hidden" @change="change" :name="name" :checked="val" :disabled="disabled"
				:color="color">
			</switch>
		</view>
		<!-- #endif -->
		<view class="fui-checkbox__self" :class="{'fui-checkbox__disabled':disabled,'fui-switch__color':!color && val}"
			:style="{background:val?color:'#fff',border:val?`1px solid ${color}`:`1px solid ${borderColor}`}" v-else>
			<view class="fui-check__mark" :style="{borderBottomColor:checkMarkColor,borderRightColor:checkMarkColor}"
				v-if="val"></view>
			<switch class="fui-switch__hidden" style="opacity: 0;position: absolute;" @change="change" :name="name" :type="isNvue?'switch':'checkbox'"
				:checked="val" :disabled="disabled"></switch>
		</view>
	</view>
</template>

<script>
	export default {
		name: "fui-switch",
		emits: ['change'],
		// #ifndef VUE3
		// #ifdef MP-WEIXIN
		behaviors: ['wx://form-field-group'],
		// #endif
		// #ifdef MP-BAIDU || MP-QQ
		behaviors: ['uni://form-field'],
		// #endif
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
				// #ifdef APP-NVUE
				default: '#465CFF'
				// #endif
				// #ifndef APP-NVUE
				default: ''
				// #endif
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
			this.label = this.getParent();
			if (this.label) {
				this.label.childrens.push(this)
			}
		},
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

	/* #ifndef APP-NVUE */
	.fui-switch__input-def {
		position: relative;
		width: 52px;
		height: 32px;
		border: 1px solid #CCCCCC;
		outline: 0;
		border-radius: 16px;
		box-sizing: border-box;
		transition: background-color .1s, border .1s;
	}

	.fui-switch__input-def::before {
		content: " ";
		position: absolute;
		top: 0;
		left: 0;
		width: 50px;
		height: 30px;
		border-radius: 15px;
		background-color: #fdfdfd;
		transition: transform .3s
	}

	.fui-switch__input-def::after {
		content: " ";
		position: absolute;
		top: 0;
		left: 0;
		width: 30px;
		height: 30px;
		border-radius: 15px;
		background-color: #fff;
		box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
		transition: transform .3s
	}

	.fui-switch__input--checked::before {
		transform: scale(0)
	}

	.fui-switch__input--checked::after {
		transform: translateX(20px)
	}

	.fui-switch__color {
		background: var(--fui-color-primary, #465CFF) !important;
		border-color: var(--fui-color-primary, #465CFF) !important;
	}

	/* #endif */

	/* #ifdef H5 || APP-VUE */
	::v-deep .uni-switch-input {
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
		right: 0;
		bottom: 0;
		border-width: 0;
		/* #endif */
	}

	.fui-checkbox__disabled {
		opacity: 0.6;
	}
</style>
