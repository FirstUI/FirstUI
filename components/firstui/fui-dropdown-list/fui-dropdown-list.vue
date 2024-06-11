<template>
	<view class="fui-dropdown__list-wrap" :class="{'fui-dropdown__list-show':isShow}"
		:style="{background:maskBackground,zIndex:zIndex}" v-if="isShow || !isNvue" ref="fui_ddl_ani" @tap="close(1)">
		<view class="fui-dropdown__list" :style="{borderRadius:radius+'rpx',background:background}">
			<scroll-view :show-scrollbar="false" class="fui-ddl__scroll" :scroll-y="true" :style="getStyles">
				<!-- #ifdef APP-NVUE -->
				<view>
				<!-- #endif -->
					<slot></slot>
					<view class="fui-dropdown__list-item"
						:style="{background:background,paddingTop:padding[0] || 0,paddingRight:padding[1] || 0,paddingBottom:padding[2] || padding[0] || 0,paddingLeft:padding[3] || padding[1] || 0,borderBottomColor:lineColor}"
						:class="{'fui-ddl__reverse':isReverse,'fui-ddl__item-line':splitLine && itemList.length-1!==index}"
						v-for="(model,index) in itemList" :key="index" @tap.stop.prevent="itemClick($event,index)">
						<view class="fui-ddl__checkbox"
							:class="{'fui-is__checkmark':isCheckMark,'fui-ddl__checkbox-color':(!checkboxColor || checkboxColor===true) && model[checkedKey] && !isCheckMark}"
							:style="{background:model[checkedKey] && !isCheckMark ?getChkColor:'transparent',borderColor:model[checkedKey] && !isCheckMark ?getChkColor:borderColor}"
							v-if="isCheckbox">
							<view class="fui-ddl__checkmark"
								:style="{borderBottomColor:checkmarkColor,borderRightColor:checkmarkColor}"
								v-if="model[checkedKey]"></view>
						</view>
						<view class="fui-ddl__flex">
							<view class="fui-ddl__icon-box"
								:class="{'fui-ddl__icon-ml':!isReverse && isCheckbox,'fui-ddl__icon-mr':isReverse}"
								:style="{width:iconWidth+'rpx',height:iconWidth+'rpx'}" v-if="model[srcKey]">
								<image :src="model[srcKey]" :style="{width:iconWidth+'rpx',height:iconWidth+'rpx'}">
								</image>
							</view>
							<text class="fui-ddl__item-text"
								:class="{'fui-ddl__text-pl':!isReverse && (isCheckbox || model[srcKey]),'fui-ddl__text-pr':isReverse && (isCheckbox || model[srcKey])}"
								:style="{fontSize:size+'rpx',color:selectedColor && model[checkedKey]?selectedColor:color}">{{model[textKey]}}</text>
						</view>
					</view>
				<!-- #ifdef APP-NVUE -->
				</view>
				<!-- #endif -->

			</scroll-view>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation');
	// #endif
	export default {
		name: "fui-dropdown-list",
		emits: ['click', 'close'],
		props: {
			options: {
				type: Array,
				default () {
					return []
				}
			},
			textKey: {
				type: String,
				default: 'text'
			},
			srcKey: {
				type: String,
				default: 'src'
			},
			checkedKey: {
				type: String,
				default: 'checked'
			},
			height: {
				type: [Number, String],
				default: 0
			},
			width: {
				type: [Number, String],
				default: 0
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
				type: Array,
				default () {
					return ['32rpx', '32rpx']
				}
			},
			isCheckbox: {
				type: Boolean,
				default: true
			},
			checkboxColor: {
				type: String,
				default: ''
			},
			borderColor: {
				type: String,
				default: '#ccc'
			},
			isCheckMark: {
				type: Boolean,
				default: false
			},
			checkmarkColor: {
				type: String,
				default: '#fff'
			},
			isReverse: {
				type: Boolean,
				default: false
			},
			splitLine: {
				type: Boolean,
				default: false
			},
			//仅Nvue端有效
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
			//点击遮罩 是否可关闭
			maskClosable: {
				type: Boolean,
				default: true
			},
			maskBackground: {
				type: String,
				default: 'rgba(0, 0, 0, 0.6)'
			},
			zIndex: {
				type: Number,
				default: 1001
			}
		},
		computed: {
			getStyles() {
				let styles = '';
				let height = Number(this.height || 0)
				let width = Number(this.width || 0)
				if (height > 0) {
					styles += `height:${height}rpx;`
				}
				if (width > 0) {
					styles += `width:${width}rpx;`
				}
				return styles
			},
			getChkColor() {
				let color = this.checkboxColor;
				// #ifdef APP-NVUE
				if (!color || color === true) {
					const app = uni && uni.$fui && uni.$fui.color;
					color = (app && app.primary) || '#465CFF';
				}
				// #endif
				return color;
			}
		},
		data() {
			let isNvue = false;
			// #ifdef APP-NVUE
			isNvue = true;
			// #endif
			return {
				isNvue: isNvue,
				itemList: [],
				isShow: false
			};
		},
		watch: {
			options(newVal) {
				this.initData(newVal)
			}
		},
		created() {
			this.initData(this.options)
		},
		methods: {
			// #ifdef APP-NVUE
			_animation(type) {
				if (!this.$refs['fui_ddl_ani']) return;
				animation.transition(
					this.$refs['fui_ddl_ani'].ref, {
						styles: {
							opacity: type ? 1 : 0
						},
						duration: 300, //ms
						timingFunction: 'ease-in-out',
						needLayout: false,
						delay: 0 //ms
					},
					() => {
						if (!type) {
							this.isShow = false;
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
								[this.textKey]: item,
								[this.checkedKey]: false
							}
						})
					} else {
						vals.map(item => {
							item[this.checkedKey] = item[this.checkedKey] || false
						})
					}
					this.itemList = vals;
				} else {
					this.itemList = []
				}
			},
			itemClick(e, index) {
				// #ifdef APP-NVUE
				e.stopPropagation();
				// #endif
				let item = this.itemList[index]
				let vals = [...this.itemList]
				vals.forEach((item, idx) => {
					if (index === idx) {
						item[this.checkedKey] = true
					} else {
						item[this.checkedKey] = false
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
				// #ifndef APP-NVUE
				this.isShow = false;
				// #endif

				// #ifdef APP-NVUE
				this._animation(false)
				// #endif

				if (type === 1 && this.maskClosable) {
					this.$emit('close', {})
				}
			},
			show() {
				this.isShow = true;
				// #ifdef APP-NVUE
				this.$nextTick(() => {
					setTimeout(() => {
						this._animation(true)
					}, 50);
				});
				// #endif
			}
		}
	}
</script>

<style scoped>
	.fui-dropdown__list-wrap {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		padding: 64rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		visibility: hidden;
		box-sizing: border-box;
		/* #endif */
		align-items: center;
		justify-content: center;
		/* #ifndef APP-NVUE */
		transition-property: opacity, visibility;
		transition-timing-function: ease-in-out;
		transition-duration: 0.3s;
		/* #endif */
		opacity: 0;
	}

	.fui-ddl__scroll {
		/* #ifndef APP-NVUE */
		width: auto;
		/* #endif */
		flex: 1;
	}

	.fui-dropdown__list {
		box-shadow: 0 0 10rpx rgba(2, 4, 38, 0.05);
		/* #ifndef APP-NVUE */
		overflow: hidden;
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	.fui-dropdown__list-show {
		visibility: visible;
		opacity: 1;
	}

	/* #endif */
	.fui-dropdown__list-item {
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex: 1;
		flex-direction: row;
		align-items: center;
		background-color: #FFFFFF;
		position: relative;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.fui-ddl__flex {
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex: 1;
		flex-direction: row;
		align-items: center;
	}

	.fui-ddl__item-line {
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
	.fui-ddl__item-line::after {
		content: '';
		position: absolute;
		border-bottom: 1px solid var(--fui-color-border, #EEEEEE);
		transform: scaleY(0.5) translateZ(0);
		transform-origin: 0 100%;
		bottom: 0;
		right: 0;
		left: 32rpx;
		pointer-events: none;
	}

	/* #endif */

	.fui-dropdown__list-item:active {
		/* #ifdef APP-NVUE */
		background-color: rgba(0, 0, 0, .2) !important;
		/* #endif */
		/* #ifndef APP-NVUE */
		background-color: var(--fui-bg-color-hover, rgba(0, 0, 0, .2)) !important;
		/* #endif */
	}

	.fui-ddl__reverse {
		justify-content: space-between;
		flex-direction: row-reverse;
	}

	.fui-ddl__checkbox {
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
	.fui-ddl__checkbox-color {
		background: var(--fui-color-primary, #465CFF) !important;
		border-color: var(--fui-color-primary, #465CFF) !important;
	}

	/* #endif */

	.fui-is__checkmark {
		border-width: 0 !important;
		background-color: transparent !important;
	}

	.fui-ddl__checkmark {
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

	.fui-ddl__item-text {
		/* #ifndef APP-NVUE */
		word-break: break-all;
		/* #endif */
		font-weight: normal;
	}

	.fui-ddl__text-pl {
		padding-left: 24rpx;
	}

	.fui-ddl__text-pr {
		padding-right: 24rpx;
	}

	.fui-ddl__icon-box {
		overflow: hidden;
		background-color: #F1F4FA;
		/* #ifndef APP-NVUE */
		flex-shrink: 0;
		/* #endif */
	}

	.fui-ddl__icon-ml {
		margin-left: 24rpx;
	}

	.fui-ddl__icon-mr {
		margin-right: 24rpx;
	}
</style>