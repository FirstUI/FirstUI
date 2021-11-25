<template>
	<view class="fui-loadmore__wrap" :class="['fui-loadmore__'+direction]" :style="{height:height+'rpx'}">
		<view class="fui-loadmore__icon" ref="fui_loadmore"
			:class="{'fui-loadmore__border-left':!isNvue && !activeColor}"
			:style="{width:iconWidth+'rpx',height:iconWidth+'rpx','border-left-color':activeColor,'border-right-color':iconColor,'border-top-color':iconColor,'border-bottom-color':iconColor}"
			v-if="!src">
		</view>
		<image class="fui-loadmore__icon-ani" ref="fui_loadmore" :src="src"
			:style="{width:iconWidth+'rpx',height:iconWidth+'rpx'}" v-if="src"></image>
		<text :class="{'fui-loadmore__text':direction==='col'}"
			:style="{color:color,'font-size':size+'rpx','line-height':size+'rpx'}">{{text}}</text>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation');
	// #endif
	export default {
		name: "fui-loadmore",
		props: {
			//占据高度，单位rx
			height: {
				type: [Number, String],
				default: 100
			},
			//提示文字
			text: {
				type: String,
				default: "正在加载..."
			},
			//文字颜色
			color: {
				type: String,
				default: "#7F7F7F"
			},
			//文字大小，单位rpx
			size: {
				type: [Number, String],
				default: 24
			},
			//loading图标背景色
			iconColor: {
				type: String,
				default: "#B2B2B2"
			},
			//loading图标高亮部分颜色
			activeColor: {
				type: String,
				// #ifdef APP-NVUE
				default: "#465CFF"
				// #endif
				// #ifndef APP-NVUE
				default: ""
				// #endif
			},
			//loading 图标的宽度，单位rpx
			iconWidth: {
				type: [Number, String],
				// #ifdef APP-NVUE
				default: 32
				// #endif
				// #ifndef APP-NVUE
				default: 28
				// #endif
			},
			//自定义loading图标image路径，若自定义图标则iconColor、activeColor属性失效
			src: {
				type: String,
				default: ''
			},
			//loading图标和文字排列方向，可取值：col，row
			direction: {
				type: String,
				default: 'row'
			}
		},
		data() {
			let isNvue = false;
			// #ifdef APP-NVUE
			isNvue = true;
			// #endif
			return {
				isNvue: isNvue,
				// #ifdef APP-NVUE
				deg: 0,
				stop: false
				// #endif
			}
		},
		// #ifdef APP-NVUE
		mounted() {
			this._animation()
		},
		// #endif
		//nvue暂不支持vue3，所以不需要做兼容,此处以防后续兼容
		// #ifdef APP-NVUE
		// #ifndef VUE3
		beforeDestroy() {
			this.deg = 0;
			this.stop = true;
		},
		// #endif
		// #ifdef VUE3
		beforeUnmount() {
			this.deg = 0;
			this.stop = true;
		},
		// #endif
		// #endif
		methods: {
			// #ifdef APP-NVUE
			_animation() {
				if (!this.$refs['fui_loadmore'] || this.stop) return;
				animation.transition(
					this.$refs['fui_loadmore'].ref, {
						styles: {
							transform: `rotate(${this.deg}deg)`
						},
						duration: 700, //ms
						timingFunction: 'linear',
						iterationCount: 'infinite',
						needLayout: false,
						delay: 0 //ms
					}, () => {
						this.deg += 360;
						this._animation()
					}
				);
			}
			// #endif
		}
	}
</script>

<style scoped>
	.fui-loadmore__wrap {
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		/* #endif */
		align-items: center;
		justify-content: center;
	}

	.fui-loadmore__col {
		flex-direction: column;
	}

	.fui-loadmore__row {
		flex-direction: row;
	}

	.fui-loadmore__icon {
		margin: 0 6px;
		border-width: 2px;
		border-style: solid;
		/* #ifdef APP-NVUE */
		border-radius: 100px;
		/* #endif */

		/* #ifndef APP-NVUE */
		border-radius: 50%;
		animation: fui-rotate 0.7s linear infinite;
		/* #endif */
	}

	.fui-loadmore__icon-ani {
		margin: 0 6px;
		/* #ifndef APP-NVUE */
		display: block;
		animation: fui-rotate 0.7s linear infinite;
		/* #endif */
	}

	.fui-loadmore__text {
		padding-top: 16rpx;
	}

	/* #ifndef APP-NVUE */
	.fui-loadmore__border-left {
		border-left-color: var(--fui-color-primary, #465CFF) !important;
	}

	@-webkit-keyframes fui-rotate {
		0% {
			transform: rotate(0);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes fui-rotate {
		0% {
			transform: rotate(0);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	/* #endif */
</style>
