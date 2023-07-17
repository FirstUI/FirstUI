<template>
	<view class="fui-grid__wrap" :class="[isShow?'fui-grid__wrap-show':'fui-grid__wrap-hidden']">
		<view :id="elemId" ref="fui_grid" class="fui-grid"
			:class="{ 'fui-grid__border': showBorder,'fui-grid__between':between }"
			:style="{ 'border-left-color':borderColor,'border-top-color':borderColor}">
			<slot></slot>
			<!-- #ifndef APP-VUE || H5 || MP-WEIXIN -->
			<template v-if="seats.length > 0 && between">
				<view v-for="(item,index) in seats" :key="index"
					:style="'width:'+width+';'+(height?'height:'+height:'')"></view>
			</template>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom');
	// #endif
	export default {
		name: "fui-grid",
		emits: ['click'],
		props: {
			// 每行显示个数
			columns: {
				type: Number,
				default: 3
			},
			// 是否显示边框
			showBorder: {
				type: Boolean,
				default: true
			},
			// 边框颜色 仅nvue有效
			borderColor: {
				type: String,
				default: '#EEEEEE'
			},
			// 是否正方形显示,默认为 true
			square: {
				type: Boolean,
				default: true
			},
			// item 项是否两端对齐，仅在宽度无法拉满且影响美观时使用，谨慎使用 v2.0.0+
			between: {
				type: Boolean,
				default: false
			},
			//当数据无法铺满时，且设置了between 布局，末尾补足占位元素个数
			//最后一行数据个数+emptyElements 不可大于 columns 值
			emptyElements: {
				type: [Number, String],
				default: 0
			}
		},
		provide() {
			return {
				grid: this
			}
		},
		data() {
			const elemId = `fui_${Math.ceil(Math.random() * 10e5).toString(36)}`
			return {
				elemId: elemId,
				width: 0,
				height: 0,
				isShow: false,
				seats: []
			};
		},
		created() {
			this.children = []
			let sys = uni.getSystemInfoSync()
			this.width = (100 / this.columns) + '%'
			if (this.square) {
				this.height = parseInt((sys.windowWidth - 1) / this.columns * 10) / 10 + 'px'
			}
		},
		watch: {
			columns(val) {
				this.$nextTick(() => {
					this.init()
				})
			},
			showBorder(val) {
				this.childChange()
			},
			emptyElements(val) {
				this.createEmptyEl(val)
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.init()
				this.createEmptyEl(this.emptyElements)
			})
		},
		methods: {
			init() {
				setTimeout(() => {
					this.getWidth((width, height) => {
						this.children.forEach((item, index) => {
							item.width = width
							item.height = height
						})
						this.isShow = true
					})
				}, 50)
			},
			createEmptyEl(val) {
				// 百度小程序在页面循环数字有问题
				const nums = Number(val)
				let seats = []
				if (nums && nums > 0) {
					for (let i = 0; i < nums; i++) {
						seats.push(i)
					}
					this.seats = seats
				} else {
					this.seats = []
				}
			},
			childChange() {
				this.children.forEach((item, index) => {
					item.showBorder = this.showBorder
				})
			},
			handleClick(e) {
				this.$emit('click', e)
			},
			getWidth(fn) {
				let isNoSupported = false
				// #ifdef MP-BAIDU || MP-TOUTIAO || MP-QQ || MP-KUAISHOU || MP-JD || MP-360 || MP-LARK
				isNoSupported = true
				// #endif

				// #ifndef APP-NVUE
				this.width = (100 / this.columns) + '%'
				if (this.square || isNoSupported) {
					uni.createSelectorQuery()
						// #ifndef MP-ALIPAY
						.in(this)
						// #endif
						.select(`#${this.elemId}`)
						.boundingClientRect()
						.exec(ret => {
							//使用 parseInt 不使用 Number 避免 部分android机 换行（小数渲染有兼容性问题） ，但是可能会出现误差无法铺满
							let width = (ret[0].width - 1) / this.columns
							width = (parseInt(width * 10) / 10) + 'px'
							if (this.square)
								this.height = width;
							if (isNoSupported)
								this.width = width;
							fn(this.width, this.height)
						})
				} else {
					fn(this.width, this.height)
				}
				// #endif
				// #ifdef APP-NVUE
				dom.getComponentRect(this.$refs['fui_grid'], (ret) => {
					//使用 parseInt 不使用 Number 可避免 部分android机 换行，但是可能会出现误差无法铺满
					// 注：以真机测试为准，如果还有换行，则只能不保留小数
					let width = (ret.size.width - 1) / this.columns
					this.width = parseInt(width * 10) / 10 + 'px'
					if (this.square) {
						this.height = this.width;
					}
					fn(this.width, this.height)
				})
				// #endif
			}
		}

	}
</script>

<style scoped>
	.fui-grid__wrap {
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		box-sizing: border-box;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
		flex-direction: column;

		/* 以下css可能导致数据过多nvue端直接白屏不显示 */
		/* #ifndef APP-NVUE */
		transition-property: opacity;
		transition-duration: .2s;
		transition-timing-function: ease-in-out;
		/* #endif */
	}

	.fui-grid__wrap-hidden {
		opacity: 0;
	}

	.fui-grid__wrap-show {
		opacity: 1 !important;
	}

	.fui-grid {
		/* #ifndef APP-NVUE */
		display: flex;
		width: 100%;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
	}

	/* #ifndef APP-VUE || H5 || MP-WEIXIN */
	.fui-grid__between {
		justify-content: space-between;
	}

	/* #endif */

	.fui-grid__border {
		position: relative;
		/* #ifdef APP-NVUE */
		border-left-style: solid;
		border-left-width: 0.5px;
		border-top-style: solid;
		border-top-width: 0.5px;
		/* #endif */
		/* #ifndef APP-NVUE */
		z-index: 1;
		border-left: 0;
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	.fui-grid__border::before {
		content: ' ';
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 1px;
		border-top: 1px solid var(--fui-color-border, #EEEEEE);
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		z-index: 1;
	}

	.fui-grid__border::after {
		content: ' ';
		position: absolute;
		left: 0;
		top: 0;
		width: 1px;
		height: 100%;
		border-left: 1px solid var(--fui-color-border, #EEEEEE);
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleX(0.5);
		transform: scaleX(0.5);
	}

	/* #endif */
</style>