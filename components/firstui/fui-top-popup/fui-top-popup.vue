<template>
	<view class="fui-top__popup-wrap" :class="{'fui-top__popwrap-show':show}"
		:style="{ zIndex: zIndex,background:maskBackground }" @tap.stop="handleClose" @touchmove.stop.prevent="stop"
		v-if="isShow || !isNvue" ref="fui_tp_mk_ani">
		<view ref="fui_tp_ani" class="fui-top__popup" :class="{ 'fui-top__popup-show': show}"
			:style="{borderBottomLeftRadius:radius+'rpx',borderBottomRightRadius:radius+'rpx' ,background: background}"
			@tap.stop="stop($event,true)">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation');
	// #endif
	/*顶部状态栏部分可使用fui-status-bar组件占位*/
	export default {
		name: 'fui-top-popup',
		emits: ['close'],
		props: {
			show: {
				type: Boolean,
				default: false
			},
			//背景颜色
			background: {
				type: String,
				default: '#fff'
			},
			//圆角
			radius: {
				type: [Number, String],
				default: 24
			},
			zIndex: {
				type: [Number, String],
				default: 996
			},
			//点击遮罩 是否可关闭
			maskClosable: {
				type: Boolean,
				default: true
			},
			maskBackground: {
				type: String,
				default: 'rgba(0,0,0,.6)'
			}
		},
		data() {
			let isNvue = false;
			// #ifdef APP-NVUE
			isNvue = true;
			// #endif
			return {
				isNvue: isNvue,
				isShow: false
			}
		},
		// #ifdef APP-NVUE
		watch: {
			show: {
				handler(newVal) {
					if (newVal) {
						this.open();
					} else {
						this.close();
					}
				},
				immediate: true
			}
		},
		// #endif
		methods: {
			handleClose(e) {
				if (!this.maskClosable) return;
				this.$emit('close', {});
			},
			// #ifdef APP-NVUE
			open() {
				this.isShow = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this._animation(true);
					}, 50);
				})
			},
			close() {
				this._animation(false);
			},
			_animation(type) {
				if (!this.$refs['fui_tp_ani'] || !this.$refs['fui_tp_mk_ani']) return;
				animation.transition(
					this.$refs['fui_tp_mk_ani'].ref, {
						styles: {
							opacity: type ? 1 : 0
						},
						duration: 250,
						timingFunction: 'ease-in-out',
						needLayout: false,
						delay: 0 //ms
					},
					() => {
						if (!type) {
							this.isShow = false
						}
					}
				);
				//android 部分手机隐藏时动画有抖动感，可调整duration去动画
				animation.transition(
					this.$refs['fui_tp_ani'].ref, {
						styles: {
							transform: `translateY(${type ? '0' : '-100%'})`
						},
						duration: 250,
						timingFunction: 'ease-in-out',
						needLayout: false,
						delay: 0 //ms
					},
					() => {}
				);
			},
			// #endif
			stop(e, tap) {
				// #ifdef APP-NVUE
				tap && e.stopPropagation();
				// #endif
			}
		}
	};
</script>

<style scoped>
	.fui-top__popup-wrap {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 996;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: flex-start;
		justify-content: center;
		/* #ifndef APP-NVUE */
		transition: all ease-in-out .2s;
		visibility: hidden;
		overflow: hidden;
		/* #endif */
		opacity: 0;
	}

	/* #ifndef APP-NVUE */
	.fui-top__popwrap-show {
		opacity: 1;
		visibility: visible;
	}

	/* #endif */
	.fui-top__popup {
		/* #ifndef APP-NVUE */
		width: 100%;
		transform: translate3d(0, -100%, 0);
		transition: all 0.3s ease-in-out;
		min-height: 20rpx;
		overflow: hidden;
		/* #endif */
		flex: 1;
		/* #ifdef APP-NVUE */
		transform: translateY(-100%);
		flex-direction: row;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	.fui-top__popup-show {
		transform: translate3d(0, 0, 0);
	}

	/* #endif */
</style>
