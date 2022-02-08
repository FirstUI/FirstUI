<!--
  * ActionSheet 上拉菜单
  * https://github.com/FirstUI/FirstUI | Released under Apache License 2.0
  *
  * 官网地址：https://firstui.cn/
  * 文档地址：https://doc.firstui.cn/docs/operate/actionsheet.html
  -->
<template>
	<view @touchmove.stop.prevent="stop" v-if="isShow || !isNvue">
		<view class="fui-actionsheet__mask" :class="{'fui-actionsheet__mask-show':show}" ref="fui_asm_ani"
			@tap="handleClickMask" :style="getStyle"></view>
		<view class="fui-actionsheet__wrap"
			:class="{'fui-actionsheet__show':show,'fui-actionsheet__radius':radius,'fui-as__bg-light':theme==='light','fui-as__bg-dark':theme==='dark'}"
			ref="fui_as_ani" :style="{zIndex:zIndex}">
			<text class="fui-actionsheet__tips"
				:class="{'fui-actionsheet__radius':radius,'fui-as__btn-light':theme==='light','fui-as__btn-dark':theme==='dark'}"
				:style="{fontSize:size+'rpx',color:color}" v-if="tips">{{tips}}</text>
			<view :class="{'fui-actionsheet__operate-box':isCancel}">
				<text class="fui-actionsheet__btn"
					:style="{color:theme==='dark'?(item.darkColor || '#D1D1D1'):(item.color || '#181818'),fontSize:itemSize+'rpx'}"
					:class="{'fui-actionsheet__btn-last':!isCancel && index==vals.length-1,'fui-as__safe-weex':!isCancel && index==vals.length-1 && iphoneX,'fui-actionsheet__radius':radius && !tips && index===0,'fui-as__divider-light':(index!==0 || tips) && theme==='light','fui-as__divider-dark':(index!==0 || tips) && theme==='dark' ,'fui-as__btn-light':theme==='light','fui-as__btn-dark':theme==='dark'}"
					v-for="(item,index) in vals" :key="index" @tap="handleClickItem(index)">{{item.text}}</text>
			</view>
			<text :style="{color:theme==='dark'?'#D1D1D1':'#181818',fontSize:itemSize+'rpx'}"
				class="fui-actionsheet__btn fui-actionsheet__cancel"
				:class="{'fui-as__safe-weex':iphoneX,'fui-as__btn-light':theme==='light','fui-as__btn-dark':theme==='dark'}"
				v-if="isCancel" @tap="handleClickCancel">取消</text>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation');
	// #endif
	export default {
		name: "fui-actionsheet",
		emits: ['click', 'cancel'],
		props: {
			//是否显示操作菜单
			show: {
				type: Boolean,
				default: false
			},
			//菜单按钮数组，可自定义文本颜色
			itemList: {
				type: Array,
				default () {
					return []
				}
			},
			//菜单按钮字体大小 rpx
			itemSize: {
				type: [Number, String],
				default: 32
			},
			//提示信息
			tips: {
				type: String,
				default: ""
			},
			//提示信息文本颜色
			color: {
				type: String,
				default: "#7F7F7F"
			},
			//提示文字大小 rpx
			size: {
				type: [Number, String],
				default: 26
			},
			//是否需要圆角
			radius: {
				type: Boolean,
				default: true
			},
			//是否需要取消按钮
			isCancel: {
				type: Boolean,
				default: true
			},
			//light/dark
			theme: {
				type: String,
				default: 'light'
			},
			//点击遮罩 是否可关闭
			maskClosable: {
				type: Boolean,
				default: false
			},
			zIndex: {
				type: [Number, String],
				default: 1001
			}
		},
		data() {
			let isNvue = false;
			// #ifdef APP-NVUE
			isNvue = true;
			// #endif
			return {
				iphoneX: false,
				vals: [],
				isNvue: isNvue,
				isShow: false
			}
		},
		computed: {
			getStyle() {
				return `z-index:${Number(this.zIndex)-10};`
			}
		},
		watch: {
			// #ifdef APP-NVUE
			show: {
				handler(newVal) {
					if (newVal) {
						this.open();
					} else {
						this.close();
					}
				},
				immediate: true
			},
			// #endif
			itemList(newVal) {
				this.initData(newVal)
			}
		},
		created() {
			// #ifdef APP-NVUE || MP-TOUTIAO
			this.iphoneX = this.isPhoneX();
			// #endif
			this.initData(this.itemList)
		},
		methods: {
			initData(vals) {
				if (vals && vals.length > 0) {
					if (typeof vals[0] !== 'object') {
						vals = vals.map(item => {
							return {
								text: item
							}
						})
					}
					this.vals = vals;
				}
			},
			handleClickMask() {
				if (!this.maskClosable) return;
				this.handleClickCancel();
			},
			handleClickItem(index) {
				if (!this.show) return;
				this.$emit('click', {
					index: index,
					...this.vals[index]
				});
			},
			handleClickCancel() {
				this.$emit('cancel');
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
				if (!this.$refs['fui_asm_ani'] || !this.$refs['fui_as_ani']) return;
				let styles = {
					transform: `translateY(${type ? '0' : '100%'})`,
					opacity: type ? 1 : 0
				}
				animation.transition(
					this.$refs['fui_asm_ani'].ref, {
						styles: {
							opacity: type ? 1 : 0
						},
						duration: 250,
						timingFunction: 'ease-in-out',
						needLayout: false,
						delay: 0 //ms
					},
					() => {}
				);
				animation.transition(
					this.$refs['fui_as_ani'].ref, {
						styles,
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
			},
			// #endif
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
				if (models.includes(model) || (res.safeAreaInsets && res.safeAreaInsets.bottom)) {
					iphonex = true;
				}
				return iphonex;
			},
			// #endif
			stop() {}
		}
	}
</script>

<style scoped>
	.fui-actionsheet__wrap {
		/* #ifndef APP-NVUE */
		width: 100%;
		visibility: hidden;
		min-height: 100rpx;
		/* #endif */
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		/* #ifndef APP-NVUE */
		transform: translate3d(0, 100%, 0);
		transition: all 0.25s ease-in-out;
		/* #endif */
		/* #ifdef APP-NVUE */
		transition-property: transform;
		transform: translateY(100%);
		/* #endif */
		transform-origin: center center;
	}

	.fui-as__bg-light {
		background-color: #F8F8F8;
	}

	.fui-as__bg-dark {
		background-color: #111111;
	}

	.fui-actionsheet__radius {
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		overflow: hidden;
	}

	/* #ifndef APP-NVUE */
	.fui-actionsheet__show {
		transform: translate3d(0, 0, 0);
		visibility: visible;
	}

	/* #endif */

	.fui-actionsheet__tips {
		/* #ifndef APP-NVUE */
		width: 100%;
		box-sizing: border-box;
		/* #endif */
		flex: 1;
		padding: 40rpx 60rpx;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: normal;
	}

	.fui-as__btn-light {
		background-color: #FFFFFF;
	}

	.fui-as__btn-dark {
		background-color: #222222;
	}

	.fui-actionsheet__operate-box {
		padding-bottom: 12rpx;
	}

	.fui-actionsheet__btn {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		flex: 1;
		height: 100rpx;
		/* #ifdef APP-NVUE */
		line-height: 100rpx;
		/* #endif */
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		align-items: center;
		justify-content: center;
		text-align: center;
		/* font-size: 32rpx; */
		font-weight: normal;
		position: relative;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.fui-actionsheet__btn:active {
		/* #ifdef APP-NVUE */
		background-color: rgba(0, 0, 0, 0.2);
		/* #endif */

		/* #ifndef APP-NVUE */
		background-color: var(--fui-bg-color-hover, rgba(0, 0, 0, 0.2)) !important;
		/* #endif */
	}

	.fui-actionsheet__btn-last {
		/* #ifndef APP-NVUE || MP-TOUTIAO */
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		/* #endif */
	}

	/* #ifdef APP-NVUE */
	.fui-as__divider-light {
		border-top-width: 0.5px;
		border-top-style: solid;
		border-top-color: #EEEEEE;
	}

	.fui-as__divider-dark {
		border-top-width: 0.5px;
		border-top-style: solid;
		border-top-color: #333;
	}

	/* #endif */

	/* #ifndef APP-NVUE */

	.fui-as__divider-light::before {
		content: " ";
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top: 1px solid var(--fui-color-border, #EEEEEE);
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		transform-origin: 0 0;
		z-index: 2;
		pointer-events: none;
	}

	.fui-as__divider-dark::before {
		content: " ";
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top: 1px solid #333;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		transform-origin: 0 0;
		z-index: 2;
		pointer-events: none;
	}

	/* #endif */

	.fui-actionsheet__cancel {
		/* #ifndef APP-NVUE */
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		/* #endif */
	}

	/* #ifdef APP-NVUE || MP-TOUTIAO */
	.fui-as__safe-weex {
		padding-bottom: 34px;
	}

	/* #endif */

	.fui-actionsheet__mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		/* #ifndef APP-NVUE */
		background-color: var(--fui-bg-color-mask, rgba(0, 0, 0, 0.6));
		/* #endif */

		/* #ifdef APP-NVUE */
		background-color: rgba(0, 0, 0, 0.6);
		/* #endif */

		/* #ifndef APP-NVUE */
		transition: opacity 0.3s ease-in-out;
		opacity: 0;
		visibility: hidden;
		/* #endif */
	}

	.fui-actionsheet__mask-show {
		/* #ifndef APP-NVUE */
		visibility: visible;
		opacity: 1;
		/* #endif */
	}
</style>
