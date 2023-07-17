<template>
	<view @tap="maskClose" :style="{background:maskBackground}" class="fui-dialog__wrap"
		:class="{'fui-wrap__show':show}" @touchmove.stop.prevent="stop" v-if="visible || !isNvue" ref="fui_dialog_ani">
		<view class="fui-dialog__inner" :style="{background:background,borderRadius:radius+'rpx'}" @tap.stop="stop">
			<text class="fui-dialog__title" :style="{color:color}" v-if="title">{{title}}</text>
			<view class="fui-dialog__body" :class="{'fui-dialog__mtop':!title}">
				<text class="fui-dialog__descr" :style="{color:contentColor}" v-if="content">{{content}}</text>
				<slot></slot>
			</view>
			<view class="fui-dialog__footer">
				<text v-for="(item,index) in buttons" :key="index" :style="{color:item.color || '#333333'}"
					class="fui-dialog__btn" :class="{'fui-dialog__btn-first':index===0}"
					@tap="handleClick(index)">{{item.text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation');
	// #endif
	const primaryColor = (uni && uni.$fui && uni.$fui.color && uni.$fui.color.primary) || '#465CFF';
	export default {
		name: 'fui-dialog',
		emits: ['click', 'close'],
		props: {
			show: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '温馨提示'
			},
			color: {
				type: String,
				default: '#333'
			},
			content: {
				type: String,
				default: ''
			},
			contentColor: {
				type: String,
				default: '#7F7F7F'
			},
			buttons: {
				type: Array,
				default () {
					return [{
						text: '取消'
					}, {
						text: '确定',
						color: primaryColor
					}]
				}
			},
			background: {
				type: String,
				default: '#fff'
			},
			radius: {
				type: [Number, String],
				default: 24
			},
			maskBackground: {
				type: String,
				default: 'rgba(0,0,0,.6)'
			},
			maskClosable: {
				type: Boolean,
				default: true
			}
		},
		data() {
			let isNvue = false;
			// #ifdef APP-NVUE
			isNvue = true;
			// #endif
			return {
				visible: false,
				isNvue: isNvue
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
			handleClick(index) {
				this.$emit('click', {
					index,
					...this.buttons[index]
				});
			},
			maskClose() {
				if (!this.maskClosable) return;
				this.$emit('close', {});
			},
			// #ifdef APP-NVUE
			open() {
				this.visible = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this._animation(true);
					}, 50);
				});
			},
			close(type) {
				this._animation(false);
			},
			_animation(type) {
				let styles = {
					opacity: type ? 1 : 0
				};
				if (!this.$refs['fui_dialog_ani']) return;
				animation.transition(
					this.$refs['fui_dialog_ani'].ref, {
						styles,
						duration: 200, //ms
						timingFunction: 'ease-in',
						needLayout: false,
						delay: 0 //ms
					},
					() => {
						if (!type) {
							this.visible = false;
						}
					}
				);
			},
			// #endif
			stop() {}
		}
	}
</script>

<style scoped>
	.fui-dialog__wrap {
		position: fixed;
		z-index: 996;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		/* #ifndef APP-NVUE */
		transition-property: all;
		transition-timing-function: ease-in;
		transition-duration: 0.2s;
		display: flex;
		transform: scale3d(1, 1, 0);
		visibility: hidden;
		/* #endif */
		align-items: center;
		justify-content: center;
		opacity: 0;
	}

	.fui-dialog__inner {
		width: 680rpx;
		text-align: center;
		overflow: hidden;
		/* #ifndef APP-NVUE */
		display: flex;
		max-height: 90%;
		/* #endif */
		flex-direction: column;
	}

	.fui-dialog__title {
		padding: 64rpx 48rpx 0;
		font-weight: 700;
		font-size: 34rpx;
		text-align: center;
	}

	.fui-dialog__body {
		padding: 32rpx 48rpx;
		margin-bottom: 32rpx;
		/* #ifndef APP-NVUE */
		word-break: break-all;
		-webkit-hyphens: auto;
		hyphens: auto;
		/* #endif */

	}

	.fui-dialog__descr {
		font-size: 30rpx;
		font-weight: normal;
		text-align: center;
	}

	.fui-dialog__mtop {
		margin-top: 32rpx;
	}

	.fui-dialog__footer {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		position: relative;
		line-height: 112rpx;
		height: 112rpx;

		/* #ifdef APP-NVUE */
		border-top-width: 0.5px;
		border-top-style: solid;
		border-top-color: #EEEEEE;
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	.fui-dialog__footer:after {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		height: 1px;
		border-top: 1px solid var(--fui-color-border, #EEEEEE);
		transform-origin: 0 0;
		transform: scaleY(.5)
	}

	/* #endif */

	.fui-dialog__btn {
		/* #ifndef APP-NVUE */
		display: block;
		text-decoration: none;
		/* #endif */
		flex: 1;
		height: 112rpx;
		line-height: 112rpx;
		font-weight: 700;
		position: relative;
		font-size: 34rpx;

		/* #ifdef APP-NVUE */
		border-left-width: 0.5px;
		border-left-style: solid;
		border-left-color: #EEEEEE;
		/* #endif */
		text-align: center;
	}

	.fui-dialog__btn:active {
		/* #ifndef APP-NVUE */
		background-color: var(--fui-bg-color-hover, rgba(0, 0, 0, 0.2));
		/* #endif */

		/* #ifdef APP-NVUE */
		background-color: rgba(0, 0, 0, 0.2);
		/* #endif */
	}

	/* #ifdef APP-NVUE */
	.fui-dialog__btn-first {
		border-left-width: 0;
	}

	/* #endif */


	/* #ifndef APP-NVUE */
	.fui-dialog__btn::after {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		width: 1px;
		bottom: 0;
		border-left: 1px solid var(--fui-color-border, #EEEEEE);
		transform-origin: 0 0;
		transform: scaleX(.5)
	}

	.fui-dialog__btn-first::after {
		width: 0;
		border-left: 0 !important;
	}

	/* #endif */
	/* #ifndef APP-NVUE */
	.fui-wrap__show {
		opacity: 1;
		transform: scale3d(1, 1, 1);
		visibility: visible;
	}

	/* #endif */
</style>