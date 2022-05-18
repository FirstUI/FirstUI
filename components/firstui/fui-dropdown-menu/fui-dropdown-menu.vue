<template>
	<view class="fui-dropdown__menu" ref="fui_dm_wrap" @tap="resetCalc">
		<slot></slot>
		<view class="fui-ddm__mask" :style="{background:maskBackground}" v-if="isShow && isMask" @tap="close(1)">
		</view>
		<view class="fui-dropdown__menu-list"
			:class="{'fui-ddm__down':direction!=='up','fui-ddm__up':direction==='up','fui-ddm__down-show':isShow && direction!=='up','fui-ddm__up-show':isShow && direction==='up'}"
			:style="getStyles" v-if="isNvueShow || !isNvue" ref="fui_ddm_list">
			<scroll-view :show-scrollbar="false" class="fui-ddm__scroll" scroll-y
				:style="{height:isNvue?maxHeight+'rpx':'auto', maxHeight:maxHeight+'rpx',minWidth:minWidth+'rpx'}">
				<view>
					<view class="fui-dropdown__menu-item"
						:style="{background:background,padding:padding,borderBottomColor:splitLine && isNvue?lineColor:'transparent'}"
						:class="{'fui-ddm__reverse':isReverse,'fui-ddm__item-line':splitLine && itemList.length-1!==index}"
						v-for="(model,index) in itemList" :key="index" @tap.stop="itemClick(index)">
						<view class="fui-ddm__checkbox"
							:class="{'fui-is__checkmark':isCheckMark,'fui-ddm__checkbox-color':(!checkboxColor || checkboxColor=='true') && model.checked && !isCheckMark}"
							:style="{background:model.checked && !isCheckMark ?checkboxColor:'transparent',borderColor:model.checked && !isCheckMark ?checkboxColor:borderColor}"
							v-if="isCheckbox">
							<view class="fui-ddm__checkmark"
								:style="{borderBottomColor:checkmarkColor,borderRightColor:checkmarkColor}"
								v-if="model.checked"></view>
						</view>
						<view class="fui-ddm__flex">
							<view class="fui-ddm__icon-box"
								:class="{'fui-ddm__icon-ml':!isReverse && isCheckbox,'fui-ddm__icon-mr':isReverse}"
								:style="{width:iconWidth+'rpx',height:iconWidth+'rpx'}" v-if="model.src">
								<image :src="model.src" :style="{width:iconWidth+'rpx',height:iconWidth+'rpx'}"></image>
							</view>
							<text class="fui-ddm__item-text"
								:class="{'fui-ddm__text-pl':!isReverse && (isCheckbox || model.src),'fui-ddm__text-pr':isReverse && (isCheckbox || model.src)}"
								:style="{fontSize:size+'rpx',color:selectedColor && model.checked?selectedColor:color}">{{model.text}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom')
	const animation = uni.requireNativePlugin('animation');
	// #endif
	export default {
		name: "fui-dropdown-menu",
		emits: ['click', 'close'],
		props: {
			options: {
				type: Array,
				default () {
					return []
				}
			},
			maxHeight: {
				type: [Number, String],
				default: 400
			},
			minWidth: {
				type: [Number, String],
				default: 0
			},
			left: {
				type: [Number, String],
				default: 0
			},
			//right大于等于0时生效，left失效
			right: {
				type: [Number, String],
				default: -1
			},
			background: {
				type: String,
				default: '#fff'
			},
			radius: {
				type: [Number, String],
				default: 0
			},
			padding: {
				type: String,
				default: '32rpx'
			},
			isCheckbox: {
				type: Boolean,
				default: true
			},
			//选择框选中后颜色
			checkboxColor: {
				type: String,
				// #ifdef APP-NVUE
				default: '#465CFF'
				// #endif
				// #ifndef APP-NVUE
				default: ''
				// #endif
			},
			//选择框未选中时边框颜色
			borderColor: {
				type: String,
				default: '#ccc'
			},
			//是否只展示对号，无边框背景
			isCheckMark: {
				type: Boolean,
				default: false
			},
			//对号颜色
			checkmarkColor: {
				type: String,
				default: '#fff'
			},
			//选择框与内容是否颠倒排列
			isReverse: {
				type: Boolean,
				default: false
			},
			//是否需要分割线条
			splitLine: {
				type: Boolean,
				default: false
			},
			lineColor: {
				type: String,
				default: '#eee'
			},
			iconWidth: {
				type: [Number, String],
				default: 48
			},
			size: {
				type: [Number, String],
				default: 32
			},
			color: {
				type: String,
				default: '#181818'
			},
			selectedColor: {
				type: String,
				default: ''
			},
			isMask: {
				type: Boolean,
				default: true
			},
			maskBackground: {
				type: String,
				default: 'transparent'
			},
			//down/up
			direction: {
				type: String,
				default: 'down'
			}
		},
		watch: {
			// #ifdef APP-NVUE
			isShow(val) {
				if (val) {
					this.isNvueShow = true;
					this.$nextTick(() => {
						setTimeout(() => {
							this._animationFn(true);
						}, 50);
					});
				} else {
					this._animationFn(false);
				}
			},
			// #endif
			options(newVal) {
				this.initData(newVal)
			}
		},
		data() {
			let isNvue = false;
			// #ifdef APP-NVUE
			isNvue = true;
			// #endif
			return {
				isNvue,
				isNvueShow: false,
				// #ifdef APP-NVUE
				n_left: 0,
				n_top: 20,
				// #endif
				itemList: [],
				isShow: false
			};
		},
		computed: {
			getStyles() {
				let styles = `border-radius:${this.radius}rpx;background:${this.background};`
				let right = Number(this.right || 0)
				if (right >= 0) {
					styles += 'right:0;'
				} else {
					// #ifndef APP-NVUE
					styles += 'left:0;'
					// #endif
				}
				// #ifdef APP-NVUE
				styles += `left:${this.n_left}px;top:${this.n_top}px;height:${this.maxHeight}rpx;`
				if (this.direction === 'up') {
					styles += `transform: translate(0, -${this.maxHeight}rpx);`
				}
				// #endif
				return styles
			}
		},
		created() {
			this.initData(this.options)
		},
		// #ifdef APP-NVUE
		mounted() {
			this.$nextTick(() => {
				setTimeout(() => {
					this.resetCalc()
				}, 100)
			})
		},
		// #endif
		methods: {
			resetCalc(callback, height) {
				// #ifdef APP-NVUE
				if (!this.$refs['fui_dm_wrap']) return;
				dom.getComponentRect(this.$refs['fui_dm_wrap'], option => {
					if (option && option.result && option.size) {
						let cbk = callback && typeof callback === 'function'
						let height = option.size.height
						if (cbk && height) {
							height = height
						}
						let top = option.size.top
						this.n_left = option.size.left;
						this.n_top = this.direction === 'down' ? height + top : top
						if (cbk) {
							callback(true)
						}
					}
				})
				// #endif
			},
			// #ifdef APP-NVUE
			_animationFn(type) {
				if (!this.$refs['fui_ddm_list']) return;
				let styles = {
					opacity: type ? 1 : 0
				}
				if (this.direction === 'up') {
					styles.transform = `translate(0, -100%)`
				}
				animation.transition(
					this.$refs['fui_ddm_list'].ref, {
						styles,
						duration: 300, //ms
						timingFunction: 'ease',
						needLayout: false,
						delay: 0 //ms
					},
					() => {
						if (!type) {
							this.isNvueShow = false;
						}
					}
				);
			},
			// #endif
			initData(vals) {
				if (vals && vals.length > 0) {
					if (typeof vals[0] !== 'object') {
						vals = vals.map(item => {
							return {
								text: item,
								checked: false
							}
						})
					} else {
						vals.map(item => {
							item.checked = item.checked || false
						})
					}
					this.itemList = vals;
				}
			},
			itemClick(index) {
				let item = this.itemList[index]
				let vals = [...this.itemList]
				vals.forEach((item, idx) => {
					if (index === idx) {
						item.checked = true
					} else {
						item.checked = false
					}
				})
				this.itemList = vals;
				this.$emit('click', {
					index: index,
					...item
				})
				this.close(2)
			},
			close(type) {
				this.isShow = false;
				if (type === 1) {
					this.$emit('close', {})
				}
			},
			show() {
				this.isShow = true;
			}
		}
	}
</script>

<style scoped>
	.fui-dropdown__menu {
		flex: 1;
		position: relative;
	}

	.fui-ddm__scroll {
		/* #ifndef APP-NVUE */
		width: auto;
		/* #endif */
		flex: 1;
	}

	.fui-dropdown__menu-list {
		/* #ifndef APP-NVUE */
		position: absolute;
		overflow: hidden;
		z-index: 992;
		visibility: hidden;
		transition: all 0.3s ease-in-out;
		/* #endif */
		box-shadow: 0 0 10rpx rgba(2, 4, 38, 0.05);
		opacity: 0;
		/* #ifdef APP-NVUE */
		position: fixed;
		flex-direction: row;
		transition: opacity 0.3s ease-in-out;
		/* #endif */
	}

	.fui-ddm__down {
		transform-origin: 0 0;
		/* #ifndef APP-NVUE */
		bottom: 0;
		transform: translate3d(0, 100%, 0) scaleY(0);
		/* #endif */
	}

	.fui-ddm__down-show {
		/* #ifndef APP-NVUE */
		transform: translate3d(0, 100%, 0) scaleY(1);
		visibility: visible;
		opacity: 1;
		/* #endif */
	}

	.fui-ddm__up {
		transform-origin: 0 100%;
		/* #ifndef APP-NVUE */
		top: 0;
		transform: translate3d(0, -100%, 0) scaleY(0);
		/* #endif */

		/* #ifdef APP-NVUE */
		transform: translate(0, -100%);
		/* #endif */
	}

	.fui-ddm__up-show {
		/* #ifndef APP-NVUE */
		transform: translate3d(0, -100%, 0) scaleY(1);
		visibility: visible;
		opacity: 1;
		/* #endif */
	}

	.fui-ddm__mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 990;
	}

	.fui-dropdown__menu-item {
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		box-sizing: border-box;
		transform: scale(1) translateZ(0);
		/* #endif */
		flex-direction: row;
		align-items: center;
		background-color: #FFFFFF;
		position: relative;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.fui-ddm__flex {
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex: 1;
		flex-direction: row;
		align-items: center;
	}

	.fui-ddm__item-line {
		position: relative;
		/* #ifdef APP-NVUE */
		border-bottom-width: 0.5px;
		border-bottom-style: solid;
		border-bottom-color: #EEEEEE;
		/* #endif */

		/* #ifndef APP-NVUE */
		border-bottom-width: 0;
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	.fui-ddm__item-line::after {
		content: '';
		position: absolute;
		border-bottom: 1px solid var(--fui-color-border, #EEEEEE);
		/* #ifdef H5 */
		transform: scaleY(0.5);
		/* #endif */

		/* #ifndef H5 */
		transform: scaleY(0.5) translateZ(0);
		/* #endif */
		transform-origin: 0 100%;
		bottom: 0;
		right: 0;
		left: 32rpx;
		pointer-events: none;
	}

	/* #endif */

	.fui-dropdown__menu-item:active {
		/* #ifdef APP-NVUE */
		background-color: rgba(0, 0, 0, .2) !important;
		/* #endif */
		/* #ifndef APP-NVUE */
		background-color: var(--fui-bg-color-hover, rgba(0, 0, 0, .2)) !important;
		/* #endif */
	}

	.fui-ddm__reverse {
		justify-content: space-between;
		flex-direction: row-reverse;
	}

	.fui-ddm__checkbox {
		font-size: 0;
		color: rgba(0, 0, 0, 0);
		width: 40rpx;
		height: 40rpx;
		border-width: 1px;
		border-style: solid;
		/* #ifdef APP-NVUE */
		border-radius: 40rpx;
		/* #endif */
		/* #ifndef APP-NVUE */
		display: inline-flex;
		box-sizing: border-box;
		border-radius: 50%;
		vertical-align: top;
		flex-shrink: 0;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		position: relative;
	}

	/* #ifndef APP-NVUE */
	.fui-ddm__checkbox-color {
		background: var(--fui-color-primary, #465CFF) !important;
		border-color: var(--fui-color-primary, #465CFF) !important;
	}

	/* #endif */

	.fui-is__checkmark {
		border-width: 0 !important;
		background: transparent !important;
	}

	.fui-ddm__checkmark {
		width: 20rpx;
		height: 40rpx;
		border-bottom-style: solid;
		border-bottom-width: 3px;
		border-bottom-color: #FFFFFF;
		border-right-style: solid;
		border-right-width: 3px;
		border-right-color: #FFFFFF;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		transform: rotate(45deg) scale(0.5) translateZ(0);
		/* #endif */
		/* #ifdef APP-NVUE */
		transform: rotate(45deg) scale(0.5);
		/* #endif */
		transform-origin: 54% 48%;
	}

	.fui-ddm__item-text {
		/* #ifndef APP-NVUE */
		word-break: break-all;
		/* #endif */
		font-weight: normal;
	}

	.fui-ddm__text-pl {
		padding-left: 24rpx;
	}

	.fui-ddm__text-pr {
		padding-right: 24rpx;
	}

	.fui-ddm__icon-box {
		overflow: hidden;
		background-color: #F1F4FA;
		/* #ifndef APP-NVUE */
		flex-shrink: 0;
		/* #endif */
	}

	.fui-ddm__icon-ml {
		margin-left: 24rpx;
	}

	.fui-ddm__icon-mr {
		margin-right: 24rpx;
	}
</style>
