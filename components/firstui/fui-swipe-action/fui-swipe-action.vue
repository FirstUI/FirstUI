<template>
	<!-- #ifdef APP-VUE || MP-WEIXIN || H5 -->
	<view class="fui-swipe__action-wrap">
		<view class="fui-swipe__action-inner" :show="isShow" :change:show="handler.showChange" :threshold="thresholdVal"
			:change:threshold="handler.thresholdChange" :disabled="isDisabled" :change:disabled="handler.disabledChange"
			@touchstart="handler.touchstart" @touchmove="handler.touchmove" @touchend="handler.touchend"
			@mousedown="handler.mousedown" @mousemove="handler.mousemove" @mouseup="handler.mouseup"
			@mouseleave="handler.mouseleave">
			<view class="fui-swipe__action-left">
				<slot></slot>
			</view>
			<view class="fui-swipe__action-right">
				<slot name="buttons">
					<view class="fui-swipe__action-btn" :style="{background:item.background}"
						v-for="(item,index) in buttons" :key="index" @touchstart="appTouchStart"
						@touchend="appTouchEnd($event,index,item)" @tap.stop="handleClick(index,item)">
						<text class="fui-swipe__action-text"
							:style="{fontSize:(item.size || size)+'rpx',color:item.color || color}">{{item.text}}</text>
					</view>
				</slot>
			</view>
		</view>
	</view>
	<!-- #endif -->

	<!-- #ifdef APP-NVUE -->
	<view class="fui-swipe__action-wrap" ref="fui_swipea_wrap" @horizontalpan="touchstart" @touchend="touchend">
		<view class="fui-swipe__action-right" ref="fui_swipea_buttons">
			<slot name="buttons">
				<view class="fui-swipe__action-btn" :style="{background:item.background}"
					v-for="(item,index) in buttons" :key="index" @tap.stop="handleClick($event,index,item)">
					<text class="fui-swipe__action-text"
						:style="{fontSize:(item.size || size)+'rpx',color:item.color || color}">{{item.text}}</text>
				</view>
			</slot>
		</view>
		<view class="fui-swipe__action-left" ref="fui_swipea_content">
			<slot></slot>
		</view>
	</view>
	<!-- #endif -->

	<!-- #ifndef APP-PLUS|| MP-WEIXIN  ||  H5 -->
	<view class="fui-swipe__action-wrap">
		<view class="fui-swipe__action-inner" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"
			:style="{transform:moveLeft}" :class="{'fui-swipe__action-ani':ani}">
			<view class="fui-swipe__action-left">
				<slot></slot>
			</view>
			<view class="fui-swipe__action-right" :class="[elClass]">
				<slot name="buttons">
					<view class="fui-swipe__action-btn" :style="{background:item.background}"
						v-for="(item,index) in buttons" :key="index" @touchstart="appTouchStart"
						@touchend="appTouchEnd($event,index,item)">
						<text class="fui-swipe__action-text"
							:style="{fontSize:(item.size || size)+'rpx',color:item.color || color}">{{item.text}}</text>
					</view>
				</slot>
			</view>
		</view>
	</view>
	<!-- #endif -->

</template>
<!-- #ifdef APP-VUE || MP-WEIXIN || H5 -->
<script src="./index.wxs" module="handler" lang="wxs"></script>
<!-- #endif -->

<script>
	import mpwxs from './mpwxs.js'
	import mpjs from './mpjs.js'
	import bindingx from './bindingx.js'
	const dangerColor = (uni && uni.$fui && uni.$fui.color && uni.$fui.color.danger) || '#FF2B2B'
	export default {
		name: "fui-swipe-action",
		mixins: [mpwxs, mpjs, bindingx],
		emits: ['click', 'change'],
		props: {
			buttons: {
				type: Array,
				default () {
					return [{
						text: '删除',
						background: dangerColor
					}]
				}
			},
			size: {
				type: [Number, String],
				default: 32
			},
			color: {
				type: String,
				default: '#fff'
			},
			show: {
				type: Boolean,
				default: false
			},
			threshold: {
				type: [Number, String],
				default: 30
			},
			disabled: {
				type: Boolean,
				default: false
			},
			autoClose: {
				type: Boolean,
				default: true
			},
			param: {
				type: [Number, String],
				default: 0
			}
		},
		// #ifndef VUE3
		beforeDestroy() {
			if (this.__beforeUnmount) return
			this.unInstall()
		},
		// #endif
		// #ifdef VUE3
		beforeUnmount() {
			this.__beforeUnmount = true;
			this.unInstall()
		},
		// #endif
		methods: {
			unInstall() {
				if (this.group) {
					this.group.children.forEach((item, index) => {
						if (item === this) {
							this.group.children.splice(index, 1)
						}
					})
				}
			},
			//获取父元素实例
			getParent(name = 'fui-swipeaction-group') {
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
	.fui-swipe__action-wrap {
		position: relative;
		/* #ifndef APP-NVUE */
		overflow: hidden;
		/* #endif */
	}

	.fui-swipe__action-inner {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-shrink: 0;
		/* #endif */
		position: relative;
	}

	.fui-swipe__action-left {
		/* #ifndef APP-NVUE */
		width: 100%;
		position: relative;
		z-index: 10;
		/* #endif */
		flex: 1;
	}

	.fui-swipe__action-right {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
		transform: translateX(100%);
	}

	.fui-swipe__action-btn {
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 0 48rpx;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.fui-swipe__action-text {
		/* #ifndef APP-NVUE */
		flex-shrink: 0;
		/* #endif */
	}

	.fui-swipe__action-ani {
		transition-property: transform;
		transition-duration: 0.3s;
		transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
	}
</style>