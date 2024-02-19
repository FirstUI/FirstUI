<template>
	<view class="fui-white__space-wrap" :class="['fui-white__space-'+(getHeight?'':getSize)]" :style="getStyles"
		@tap="handleClick">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		emits: ['click'],
		name: "fui-white-space",
		props: {
			//small、default、large 默认优先使用全局配置
			size: {
				type: String,
				default: ''
			},
			height: {
				type: [Number, String],
				default: 0
			},
			background: {
				type: String,
				default: ''
			}
		},
		computed: {
			getSize() {
				const app = uni && uni.$fui && uni.$fui.fuiWhiteSpace;
				return this.size || (app && app.size) || 'default'
			},
			getHeight() {
				let style = ''
				const app = uni && uni.$fui && uni.$fui.fuiWhiteSpace;
				const h = Number(String(this.height || (app && app.height) || 0).replace('rpx', ''))
				if (h && h > 0) {
					style += `height:${h}rpx;`
				}
				return style
			},
			getStyles() {
				const app = uni && uni.$fui && uni.$fui.fuiWhiteSpace;
				let style = `background:${this.background || (app && app.background) || 'transparent'};`
				style += this.getHeight;
				return style;
			}
		},
		methods: {
			handleClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style scoped>
	.fui-white__space-wrap {
		/* #ifndef APP-NVUE */
		width: 100%;
		box-sizing: border-box;
		/* #endif */
	}

	.fui-white__space-small {
		height: 8rpx
	}

	.fui-white__space-default {
		height: 16rpx
	}

	.fui-white__space-large {
		height: 24rpx
	}
</style>