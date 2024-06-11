<template>
	<view class="fui-collapse__item" :style="{marginTop:marginTop+'rpx',marginBottom:marginBottom+'rpx'}">
		<view @tap.stop="onClick(!isOpen)" class="fui-collapse-item__title" :class="{'fui-collapse__disabled':disabled}"
			:style="{background:background}">
			<view class="fui-collapse__title">
				<slot></slot>
			</view>
			<view v-if="arrow"
				:class="{'fui-collapse__arrow-close':!isOpen,'fui-collapse__arrow-active': isOpen, 'fui-collapse__item-ani': animation}"
				class="fui-collapse__arrow" :style="{marginRight:arrowRight+'rpx'}">
				<view class="fui-collapse__arrow-inner" :style="{borderColor:arrowColor}"></view>
			</view>
			<view v-if="isBorder" :style="{background:borderColor,left:borderLeft+'rpx'}" class="fui-collapse__border"
				:class="{'fui-collapse__border-color':!borderColor}"></view>
		</view>
		<view class="fui-collapse__content-wrap" :class="{'fui-collapse-__content-ani':animation}"
			:style="{height: (isOpen?height:0) +'px',background:contentBg}">
			<view :id="elId" ref="fui_collapse__el" class="fui-collapse__content"
				:class="{'fui-collapse__content-open':isHeight}">
				<slot name="content"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom')
	// #endif
	export default {
		name: 'fui-collapse-item',
		emits: ['change'],
		props: {
			//item项索引或者唯一标识
			index: {
				type: [Number, String],
				default: 0
			},
			// 是否禁用
			disabled: {
				type: Boolean,
				default: false
			},
			background: {
				type: String,
				default: '#fff'
			},
			//是否显示动画,如果动画卡顿严重建议不开启
			animation: {
				type: Boolean,
				default: true
			},
			// 是否展开
			open: {
				type: Boolean,
				default: false
			},
			isBorder: {
				type: Boolean,
				default: true
			},
			// #ifdef APP-NVUE
			borderColor: {
				type: String,
				default: '#EEEEEE'
			},
			// #endif
			// #ifndef APP-NVUE
			borderColor: {
				type: String,
				default: ''
			},
			// #endif
			borderLeft: {
				type: [Number, String],
				default: 0
			},
			arrow: {
				type: Boolean,
				default: true
			},
			arrowColor: {
				type: String,
				default: '#B2B2B2'
			},
			arrowRight: {
				type: [Number, String],
				default: 24
			},
			contentBg: {
				type: String,
				default: '#fff'
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
		data() {
			const elId = `fui_${Math.ceil(Math.random() * 10e5).toString(36)}`
			return {
				isOpen: false,
				isHeight: null,
				height: 0,
				elId
			}
		},
		watch: {
			open(val) {
				this.isOpen = val
			}
		},
		updated(e) {
			this.$nextTick(() => {
				setTimeout(() => {
					this.init()
				}, 50)
			})
		},
		created() {
			this.collapse = this.getCollapse()
			if (this.collapse && this.collapse.children.indexOf(this) === -1) {
				this.collapse.children.push(this)
			}
			this.oldHeight = 0
		},
		// #ifndef VUE3
		// TODO vue2
		beforeDestroy() {
			this.uninstall()
		},
		// #endif
		// #ifdef VUE3
		// TODO vue3
		beforeUnmount() {
			this.uninstall()
		},
		// #endif
		mounted() {
			this.$nextTick(() => {
				setTimeout(() => {
					this.init()
					this.isOpen = this.open;
				}, 50)
			})
		},
		methods: {
			init() {
				// #ifndef APP-NVUE
				this.getCollapseHeight()
				// #endif
				// #ifdef APP-NVUE
				this.getNvueHeight()
				// #endif
			},
			uninstall() {
				if (this.collapse) {
					this.collapse.children.forEach((item, index) => {
						if (item === this) {
							this.collapse.children.splice(index, 1)
						}
					})
				}
			},
			onClick(isOpen) {
				if (this.disabled) return
				this.isOpen = isOpen
				if (this.collapse) {
					this.collapse.collapseChange(this, isOpen, this.index)
				} else {
					this.$emit('change', {
						index: this.index,
						isOpen: isOpen
					})
				}
			},
			getCollapseHeight(index = 0) {
				uni.createSelectorQuery()
					// #ifndef MP-ALIPAY
					.in(this)
					// #endif
					.select(`#${this.elId}`)
					.fields({
						size: true
					}, data => {
						if (index >= 10) return
						if (!data) {
							index++
							this.getCollapseHeight(index)
							return
						}
						// #ifdef APP-NVUE
						this.height = data.height + 1
						// #endif
						// #ifndef APP-NVUE
						this.height = data.height
						// #endif
						this.isHeight = true
					})
					.exec()
			},
			getNvueHeight() {
				const result = dom.getComponentRect(this.$refs['fui_collapse__el'], option => {
					if (option && option.result && option.size) {
						// #ifdef APP-NVUE
						this.height = option.size.height + 1
						// #endif
						// #ifndef APP-NVUE
						this.height = option.size.height
						// #endif
						this.isHeight = true
					}
				})
			},
			getCollapse(name = 'fui-collapse') {
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
	.fui-collapse__item {
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
	}

	.fui-collapse-item__title {
		/* #ifndef APP-NVUE */
		display: flex;
		width: 100%;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		align-items: center;
		transition: border-bottom-color 0.3s;

		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
		position: relative;
	}

	.fui-collapse__border {
		position: absolute;
		bottom: 0;
		right: 0;
		/* #ifdef APP-NVUE */
		height: 0.5px;
		z-index: -1;
		/* #endif */
		/* #ifndef APP-NVUE */
		height: 1px;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		transform-origin: 0 100%;
		z-index: 1;
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	.fui-collapse__border-color {
		background: var(--fui-color-border, #EEEEEE) !important;
	}

	/* #endif */

	.fui-collapse__disabled {
		opacity: .5;
		/* #ifdef H5 */
		cursor: not-allowed;
		/* #endif */
	}

	.fui-collapse__title {
		flex: 1;
		overflow: hidden;
	}


	.fui-collapse__arrow-inner {
		height: 40rpx;
		width: 40rpx;
		border-width: 0 3px 3px 0;
		border-style: solid;
		transform: rotate(45deg) scale(.5);
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
		position: absolute;
		top: -6rpx;
		left: 0;
	}

	.fui-collapse__arrow {
		width: 40rpx;
		height: 40rpx;
		position: relative;
		/* #ifndef APP-NVUE */
		flex-shrink: 0;
		/* #endif */
	}

	.fui-collapse__arrow-close {
		transform: rotate(0deg);
	}

	.fui-collapse__arrow-active {
		transform: rotate(180deg);
	}

	.fui-collapse__item-ani {
		transition-property: transform;
		transition-duration: 0.3s;
		transition-timing-function: ease;
	}

	.fui-collapse__content-wrap {
		/* #ifndef APP-NVUE */
		will-change: height;
		box-sizing: border-box;
		/* #endif */
		overflow: hidden;
		position: relative;
		height: 0;
	}

	.fui-collapse-__content-ani {
		transition-property: height;
		transition-duration: 0.3s;
		/* #ifndef APP-NVUE */
		will-change: height;
		/* #endif */
	}

	.fui-collapse__content {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		position: absolute;
	}

	.fui-collapse__content-open {
		position: relative;
	}
</style>