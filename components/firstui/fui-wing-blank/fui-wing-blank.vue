<template>
	<view class="fui-wing__blank-wrap"
		:class="[radius?'fui-wing__blank-hidden':'',getPadding?'':`fui-wing__blank-${getSize}`]" :style="getStyles"
		@tap="handleClick">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "fui-wing-blank",
		emits: ['click'],
		props: {
			//small、default、large
			size: {
				type: String,
				default: ''
			},
			gap: {
				type: [Number, String],
				default: 0
			},
			background: {
				type: String,
				default: ''
			},
			radius: {
				type: [Number, String],
				default: 0
			},
			marginTop: {
				type: [Number, String],
				default: 0
			},
			marginBottom: {
				type: [Number, String],
				default: 0
			}
		},
		computed: {
			getSize() {
				const app = uni && uni.$fui && uni.$fui.fuiWingBlank;
				return this.size || (app && app.size) || 'default'
			},
			getPadding() {
				let styles = '';
				const app = uni && uni.$fui && uni.$fui.fuiWingBlank;
				const padding = Number(this.gap || (app && app.gap) || 0)
				if (padding && padding > 0) {
					styles += `padding:0 ${padding}rpx;`
				}
				return styles
			},
			getStyles() {
				const app = uni && uni.$fui && uni.$fui.fuiWingBlank;
				let styles =
					`background:${this.background || (app && app.background) || 'transparent'};border-radius:${this.radius}rpx;margin-top:${this.marginTop}rpx;margin-bottom:${this.marginBottom}rpx;`;
				styles += this.getPadding;
				return styles
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
	.fui-wing__blank-wrap {
		/* #ifndef APP-NVUE */
		width: 100%;
		box-sizing: border-box;
		/* #endif */
	}

	.fui-wing__blank-hidden {
		overflow: hidden;
	}

	.fui-wing__blank-small {
		padding: 0 16rpx;
	}

	.fui-wing__blank-default {
		padding: 0 24rpx;
	}

	.fui-wing__blank-large {
		padding: 0 32rpx;
	}
</style>