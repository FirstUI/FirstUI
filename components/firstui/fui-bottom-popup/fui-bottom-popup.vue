<template>
	<view class="fui-bottom__popup-wrap" :class="{'fui-bottom__popwrap-show':show}"
		:style="{ zIndex: zIndex,background:maskBackground }" @tap.stop="handleClose" @touchmove.stop.prevent="stop"
		v-if="isShow || !isNvue" ref="fui_bp_mk_ani">
		<view ref="fui_bp_ani" class="fui-bottom__popup"
			:class="{ 'fui-bottom__popup-show': show,'fui-bp__safe-weex':iphoneX}"
			:style="{borderTopLeftRadius:radius+'rpx',borderTopRightRadius:radius+'rpx' ,background: background}"
			@tap.stop="stop($event,true)">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation');
	// #endif
	/*如果底部有自定义导航栏，可适当设置内容padding-bottom值*/
	export default {
		name: 'fui-bottom-popup',
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
				default: 1001
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
			let isAndroid = false;
			let isNvue = false;
			// #ifdef APP-NVUE
			isNvue = true;
			const res = uni.getSystemInfoSync();
			isAndroid = res.platform.toLocaleLowerCase() == "android"
			// #endif
			return {
				iphoneX: false,
				isNvue: isNvue,
				isShow: false,
				isAndroid: isAndroid
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
		created() {
			// #ifdef APP-NVUE || MP-TOUTIAO
			this.iphoneX = this.isPhoneX();
			// #endif
		},
		methods: {
			handleClose(e) {
				if (!this.maskClosable) return;
				this.$emit('close', {});
			},
			// #ifdef APP-NVUE || MP-TOUTIAO
			isPhoneX() {
				//34px
				const res = uni.getSystemInfoSync();
				let iphonex = false;
				let models = ['iphonex', 'iphonexr', 'iphonexsmax', 'iphone11', 'iphone11pro', 'iphone11promax',
					'iphone12', 'iphone12mini', 'iphone12pro', 'iphone12promax', 'iphone13', 'iphone13mini',
					'iphone13pro', 'iphone13promax', 'iphone14', 'iphone14mini',
					'iphone14pro', 'iphone14promax'
				]
				const model = res.model.replace(/\s/g, "").toLowerCase()
				if (models.includes(model)) {
					iphonex = true;
				}
				return iphonex;
			},
			// #endif
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
				if (!this.$refs['fui_bp_ani'] || !this.$refs['fui_bp_mk_ani']) return;
				animation.transition(
					this.$refs['fui_bp_mk_ani'].ref, {
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
				//android 部分手机隐藏时动画有抖动感，调整duration去动画
				animation.transition(
					this.$refs['fui_bp_ani'].ref, {
						styles: {
							transform: `translateY(${type ? '0' : '100%'})`
						},
						duration: !type && this.isAndroid ? 20 : 250,
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
	.fui-bottom__popup-wrap {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 1001;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: flex-end;
		justify-content: center;
		/* #ifndef APP-NVUE */
		transition: all ease-in-out .3s;
		visibility: hidden;
		/* #endif */
		opacity: 0;
		overflow: hidden;
	}

	/* #ifndef APP-NVUE */
	.fui-bottom__popwrap-show {
		opacity: 1;
		visibility: visible;
	}

	/* #endif */
	.fui-bottom__popup {
		/* #ifndef APP-NVUE */
		width: 100%;
		transform: translate3d(0, 100%, 0);
		transition: all 0.3s ease-in-out;
		min-height: 20rpx;
		/* #endif */
		
		/* #ifndef APP-NVUE || MP-TOUTIAO */
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		/* #endif */
		flex: 1;
		/* #ifdef APP-NVUE */
		transform: translateY(100%);
		flex-direction: row;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		/* #endif */
		overflow: hidden;
	}

	/* #ifndef APP-NVUE */
	.fui-bottom__popup-show {
		transform: translate3d(0, 0, 0);
	}

	/* #endif */

	/* #ifdef APP-NVUE || MP-TOUTIAO */
	.fui-bp__safe-weex {
		padding-bottom: 34px;
	}

	/* #endif */
</style>
