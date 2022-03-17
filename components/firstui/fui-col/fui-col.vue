<template>
	<!-- #ifdef APP-NVUE -->
	<view :style="{
		paddingLeft:`${Number(gutter)}rpx`,
		paddingRight:`${Number(gutter)}rpx`,
		width:`${nvueWidth}rpx`,
		position:'relative',
		marginLeft:`${marginLeft}rpx`,
		left:`${right === 0 ? left : -right}rpx`
	}">
		<slot></slot>
	</view>
	<!-- #endif -->

	<!-- #ifndef APP-NVUE -->
	<view :class="classList" :style="{
		paddingLeft:`${Number(gutter)}rpx`,
		paddingRight:`${Number(gutter)}rpx`,
	}">
		<slot></slot>
	</view>
	<!-- #endif -->
</template>

<script>
	export default {
		name: "fui-col",
		// #ifdef MP-WEIXIN
		options: {
			virtualHost: true
		},
		// #endif
		props: {
			//栅格占据的列数
			span: {
				type: Number,
				default: 24
			},
			//栅格左侧的间隔格数
			offset: {
				type: Number,
				default: 0
			},
			//栅格向右移动格数
			pushLeft: {
				type: Number,
				default: -1
			},
			//栅格向左移动格数
			pullRight: {
				type: Number,
				default: -1
			},
			//max-width:767px 响应式栅格数或者栅格属性对象
			//Number时表示在此屏幕宽度下，栅格占据的列数。Object时可配置多个描述{span: 4, offset: 4}
			xs: {
				type: [Number, Object],
				default: -1
			},
			//max-width:768px 响应式栅格数或者栅格属性对象
			sm: {
				type: [Number, Object],
				default: -1
			},
			//max-width:992px 响应式栅格数或者栅格属性对象
			md: {
				type: [Number, Object],
				default: -1
			},
			//max-width:1200px 响应式栅格数或者栅格属性对象
			lg: {
				type: [Number, Object],
				default: -1
			},
			//max-width:1920px 响应式栅格数或者栅格属性对象
			xl: {
				type: [Number, Object],
				default: -1
			}
		},
		data() {
			return {
				classList: 'fui-col',
				gutter: 0,
				sizeClass: '',
				parentWidth: 0,
				nvueWidth: 0,
				marginLeft: 0,
				right: 0,
				left: 0
			};
		},
		created() {
			let parent = this.$parent;
			while (parent && parent.$options.componentName !== 'fuiRow') {
				parent = parent.$parent;
			}

			this.updateGutter(parent.gutter)
			parent.$watch('gutter', (gutter) => {
				this.updateGutter(gutter)
			})
			// #ifdef APP-NVUE
			this.updateNvueWidth(parent.width)
			parent.$watch('width', (width) => {
				this.updateNvueWidth(width)
			})
			// #endif
			// #ifndef APP-NVUE
			this.updateCol();
			// #endif
		},
		computed: {
			sizeChange() {
				let {
					span,
					offset,
					pullRight,
					pushLeft
				} = this;
				return `${span}-${offset}-${pullRight}-${pushLeft}`;
			}
		},
		watch: {
			sizeChange: {
				immediate: true,
				handler(newVal) {
					// #ifndef APP-NVUE
					this.updateCol();
					// #endif
					// #ifdef APP-NVUE
					this.updateNvueWidth(this.parentWidth);
					// #endif
				}
			}
		},
		methods: {
			updateGutter(parentGutter) {
				parentGutter = Number(parentGutter);
				if (!isNaN(parentGutter)) {
					this.gutter = parentGutter / 2
				}
			},
			// #ifdef APP-NVUE
			updateNvueWidth(width) {
				// 用于在nvue端，span，offset，pull，push的计算
				this.parentWidth = width;
				['span', 'offset', 'pull', 'push'].forEach(size => {
					const curSize = this[size];
					if ((curSize || curSize === 0) && curSize !== -1) {
						let RPX = 1 / 24 * curSize * width
						RPX = Number(RPX);
						switch (size) {
							case 'span':
								this.nvueWidth = RPX
								break;
							case 'offset':
								this.marginLeft = RPX
								break;
							case 'pull':
								this.right = RPX
								break;
							case 'push':
								this.left = RPX
								break;
						}
					}
				});
			},
			// #endif
			updateCol() {
				let classList = ['fui-col'];
				classList.push('fui-col-' + this.span);
				classList.push('fui-col-offset-' + this.offset);
				if (this.pushLeft !== -1) {
					this.pushLeft && classList.push('fui-col-push-' + this.pushLeft);
				}
				if (this.pullRight !== -1) {
					this.pullRight && classList.push('fui-col-pull-' + this.pullRight);
				}
				this.screenSizeSet('xs', classList);
				this.screenSizeSet('sm', classList);
				this.screenSizeSet('md', classList);
				this.screenSizeSet('lg', classList);
				this.screenSizeSet('xl', classList);
				// #ifndef MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
				this.classList = classList;
				// #endif

				//支付宝、百度、头条小程序不会自动拆解 bug
				// #ifdef MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
				this.classList = classList.join(' ');
				// #endif
			},
			screenSizeSet(screen, classList) {
				if (typeof this[screen] === 'number' && this[screen] !== -1) {
					classList.push('fui-col-' + screen + '-' + this[screen]);
				} else if (typeof this[screen] === 'object') {
					typeof this[screen].offset === 'number' && classList.push('fui-col-' + screen + '-offset-' + this[
						screen].offset);
					typeof this[screen].pushLeft === 'number' && classList.push('fui-col-' + screen + '-push-' + this[
						screen].pushLeft);
					typeof this[screen].pullRight === 'number' && classList.push('fui-col-' + screen + '-pull-' + this[
						screen].pullRight);
					typeof this[screen].span === 'number' && classList.push('fui-col-' + screen + '-' + this[screen].span);
				}
			}
		}
	};
</script>

<style scoped>
	/*栅格 24*/
	/* #ifndef APP-NVUE */
	.fui-col-24 {
		width: 100%;
		float: left;
		display: block
	}

	.fui-col-offset-24 {
		margin-left: 100%
	}

	.fui-col-pull-24 {
		position: relative;
		right: 100%
	}

	.fui-col-push-24 {
		position: relative;
		left: 100%
	}

	.fui-col-23 {
		width: 95.83333333%;
		float: left;
		display: block
	}

	.fui-col-offset-23 {
		margin-left: 95.83333333%
	}

	.fui-col-pull-23 {
		position: relative;
		right: 95.83333333%
	}

	.fui-col-push-23 {
		position: relative;
		left: 95.83333333%
	}

	.fui-col-22 {
		width: 91.66666667%;
		float: left;
		display: block
	}

	.fui-col-offset-22 {
		margin-left: 91.66666667%
	}

	.fui-col-pull-22 {
		position: relative;
		right: 91.66666667%
	}

	.fui-col-push-22 {
		position: relative;
		left: 91.66666667%
	}

	.fui-col-21 {
		width: 87.5%;
		float: left;
		display: block
	}

	.fui-col-offset-21 {
		margin-left: 87.5%
	}

	.fui-col-pull-21 {
		position: relative;
		right: 87.5%
	}

	.fui-col-push-21 {
		position: relative;
		left: 87.5%
	}

	.fui-col-20 {
		width: 83.33333333%;
		float: left;
		display: block
	}

	.fui-col-offset-20 {
		margin-left: 83.33333333%
	}

	.fui-col-pull-20 {
		position: relative;
		right: 83.33333333%
	}

	.fui-col-push-20 {
		position: relative;
		left: 83.33333333%
	}

	.fui-col-19 {
		width: 79.16666667%;
		float: left;
		display: block
	}

	.fui-col-offset-19 {
		margin-left: 79.16666667%
	}

	.fui-col-pull-19 {
		position: relative;
		right: 79.16666667%
	}

	.fui-col-push-19 {
		position: relative;
		left: 79.16666667%
	}

	.fui-col-18 {
		width: 75%;
		float: left;
		display: block
	}

	.fui-col-offset-18 {
		margin-left: 75%
	}

	.fui-col-pull-18 {
		position: relative;
		right: 75%
	}

	.fui-col-push-18 {
		position: relative;
		left: 75%
	}

	.fui-col-17 {
		width: 70.83333333%;
		float: left;
		display: block
	}

	.fui-col-offset-17 {
		margin-left: 70.83333333%
	}

	.fui-col-pull-17 {
		position: relative;
		right: 70.83333333%
	}

	.fui-col-push-17 {
		position: relative;
		left: 70.83333333%
	}

	.fui-col-16 {
		width: 66.66666667%;
		float: left;
		display: block
	}

	.fui-col-offset-16 {
		margin-left: 66.66666667%
	}

	.fui-col-pull-16 {
		position: relative;
		right: 66.66666667%
	}

	.fui-col-push-16 {
		position: relative;
		left: 66.66666667%
	}

	.fui-col-15 {
		width: 62.5%;
		float: left;
		display: block
	}

	.fui-col-offset-15 {
		margin-left: 62.5%
	}

	.fui-col-pull-15 {
		position: relative;
		right: 62.5%
	}

	.fui-col-push-15 {
		position: relative;
		left: 62.5%
	}

	.fui-col-14 {
		width: 58.33333333%;
		float: left;
		display: block
	}

	.fui-col-offset-14 {
		margin-left: 58.33333333%
	}

	.fui-col-pull-14 {
		position: relative;
		right: 58.33333333%
	}

	.fui-col-push-14 {
		position: relative;
		left: 58.33333333%
	}

	.fui-col-13 {
		width: 54.16666667%;
		float: left;
		display: block
	}

	.fui-col-offset-13 {
		margin-left: 54.16666667%
	}

	.fui-col-pull-13 {
		position: relative;
		right: 54.16666667%
	}

	.fui-col-push-13 {
		position: relative;
		left: 54.16666667%
	}

	.fui-col-12 {
		width: 50%;
		float: left;
		display: block
	}

	.fui-col-offset-12 {
		margin-left: 50%
	}

	.fui-col-pull-12 {
		position: relative;
		right: 50%
	}

	.fui-col-push-12 {
		position: relative;
		left: 50%
	}

	.fui-col-11 {
		width: 45.83333333%;
		float: left;
		display: block
	}

	.fui-col-offset-11 {
		margin-left: 45.83333333%
	}

	.fui-col-pull-11 {
		position: relative;
		right: 45.83333333%
	}

	.fui-col-push-11 {
		position: relative;
		left: 45.83333333%
	}

	.fui-col-10 {
		width: 41.66666667%;
		float: left;
		display: block
	}

	.fui-col-offset-10 {
		margin-left: 41.66666667%
	}

	.fui-col-pull-10 {
		position: relative;
		right: 41.66666667%
	}

	.fui-col-push-10 {
		position: relative;
		left: 41.66666667%
	}

	.fui-col-9 {
		width: 37.5%;
		float: left;
		display: block
	}

	.fui-col-offset-9 {
		margin-left: 37.5%
	}

	.fui-col-pull-9 {
		position: relative;
		right: 37.5%
	}

	.fui-col-push-9 {
		position: relative;
		left: 37.5%
	}

	.fui-col-8 {
		width: 33.33333333%;
		float: left;
		display: block
	}

	.fui-col-offset-8 {
		margin-left: 33.33333333%
	}

	.fui-col-pull-8 {
		position: relative;
		right: 33.33333333%
	}

	.fui-col-push-8 {
		position: relative;
		left: 33.33333333%
	}

	.fui-col-7 {
		width: 29.16666667%;
		float: left;
		display: block
	}

	.fui-col-offset-7 {
		margin-left: 29.16666667%
	}

	.fui-col-pull-7 {
		position: relative;
		right: 29.16666667%
	}

	.fui-col-push-7 {
		position: relative;
		left: 29.16666667%
	}

	.fui-col-6 {
		width: 25%;
		float: left;
		display: block
	}

	.fui-col-offset-6 {
		margin-left: 25%
	}

	.fui-col-pull-6 {
		position: relative;
		right: 25%
	}

	.fui-col-push-6 {
		position: relative;
		left: 25%
	}

	.fui-col-5 {
		width: 20.83333333%;
		float: left;
		display: block
	}

	.fui-col-offset-5 {
		margin-left: 20.83333333%
	}

	.fui-col-pull-5 {
		position: relative;
		right: 20.83333333%
	}

	.fui-col-push-5 {
		position: relative;
		left: 20.83333333%
	}

	.fui-col-4 {
		width: 16.66666667%;
		float: left;
		display: block
	}

	.fui-col-offset-4 {
		margin-left: 16.66666667%
	}

	.fui-col-pull-4 {
		position: relative;
		right: 16.66666667%
	}

	.fui-col-push-4 {
		position: relative;
		left: 16.66666667%
	}

	.fui-col-3 {
		width: 12.5%;
		float: left;
		display: block
	}

	.fui-col-offset-3 {
		margin-left: 12.5%
	}

	.fui-col-pull-3 {
		position: relative;
		right: 12.5%
	}

	.fui-col-push-3 {
		position: relative;
		left: 12.5%
	}

	.fui-col-2 {
		width: 8.33333333%;
		float: left;
		display: block
	}

	.fui-col-offset-2 {
		margin-left: 8.33333333%
	}

	.fui-col-pull-2 {
		position: relative;
		right: 8.33333333%
	}

	.fui-col-push-2 {
		position: relative;
		left: 8.33333333%
	}

	.fui-col-1 {
		width: 4.16666667%;
		float: left;
		display: block
	}

	.fui-col-offset-1 {
		margin-left: 4.16666667%
	}

	.fui-col-pull-1 {
		position: relative;
		right: 4.16666667%
	}

	.fui-col-push-1 {
		position: relative;
		left: 4.16666667%
	}

	.fui-col-0 {
		display: none
	}

	.fui-col-offset-0 {
		margin-left: 0%
	}

	.fui-col-pull-0 {
		position: relative;
		right: 0%
	}

	.fui-col-push-0 {
		position: relative;
		left: 0%
	}

	@media screen and (max-width:1920px) {
		.fui-col-xl-24 {
			width: 100%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-24 {
			margin-left: 100%
		}

		.fui-col-xl-pull-24 {
			position: relative;
			right: 100%
		}

		.fui-col-xl-push-24 {
			position: relative;
			left: 100%
		}

		.fui-col-xl-23 {
			width: 95.83333333%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-23 {
			margin-left: 95.83333333%
		}

		.fui-col-xl-pull-23 {
			position: relative;
			right: 95.83333333%
		}

		.fui-col-xl-push-23 {
			position: relative;
			left: 95.83333333%
		}

		.fui-col-xl-22 {
			width: 91.66666667%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-22 {
			margin-left: 91.66666667%
		}

		.fui-col-xl-pull-22 {
			position: relative;
			right: 91.66666667%
		}

		.fui-col-xl-push-22 {
			position: relative;
			left: 91.66666667%
		}

		.fui-col-xl-21 {
			width: 87.5%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-21 {
			margin-left: 87.5%
		}

		.fui-col-xl-pull-21 {
			position: relative;
			right: 87.5%
		}

		.fui-col-xl-push-21 {
			position: relative;
			left: 87.5%
		}

		.fui-col-xl-20 {
			width: 83.33333333%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-20 {
			margin-left: 83.33333333%
		}

		.fui-col-xl-pull-20 {
			position: relative;
			right: 83.33333333%
		}

		.fui-col-xl-push-20 {
			position: relative;
			left: 83.33333333%
		}

		.fui-col-xl-19 {
			width: 79.16666667%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-19 {
			margin-left: 79.16666667%
		}

		.fui-col-xl-pull-19 {
			position: relative;
			right: 79.16666667%
		}

		.fui-col-xl-push-19 {
			position: relative;
			left: 79.16666667%
		}

		.fui-col-xl-18 {
			width: 75%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-18 {
			margin-left: 75%
		}

		.fui-col-xl-pull-18 {
			position: relative;
			right: 75%
		}

		.fui-col-xl-push-18 {
			position: relative;
			left: 75%
		}

		.fui-col-xl-17 {
			width: 70.83333333%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-17 {
			margin-left: 70.83333333%
		}

		.fui-col-xl-pull-17 {
			position: relative;
			right: 70.83333333%
		}

		.fui-col-xl-push-17 {
			position: relative;
			left: 70.83333333%
		}

		.fui-col-xl-16 {
			width: 66.66666667%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-16 {
			margin-left: 66.66666667%
		}

		.fui-col-xl-pull-16 {
			position: relative;
			right: 66.66666667%
		}

		.fui-col-xl-push-16 {
			position: relative;
			left: 66.66666667%
		}

		.fui-col-xl-15 {
			width: 62.5%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-15 {
			margin-left: 62.5%
		}

		.fui-col-xl-pull-15 {
			position: relative;
			right: 62.5%
		}

		.fui-col-xl-push-15 {
			position: relative;
			left: 62.5%
		}

		.fui-col-xl-14 {
			width: 58.33333333%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-14 {
			margin-left: 58.33333333%
		}

		.fui-col-xl-pull-14 {
			position: relative;
			right: 58.33333333%
		}

		.fui-col-xl-push-14 {
			position: relative;
			left: 58.33333333%
		}

		.fui-col-xl-13 {
			width: 54.16666667%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-13 {
			margin-left: 54.16666667%
		}

		.fui-col-xl-pull-13 {
			position: relative;
			right: 54.16666667%
		}

		.fui-col-xl-push-13 {
			position: relative;
			left: 54.16666667%
		}

		.fui-col-xl-12 {
			width: 50%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-12 {
			margin-left: 50%
		}

		.fui-col-xl-pull-12 {
			position: relative;
			right: 50%
		}

		.fui-col-xl-push-12 {
			position: relative;
			left: 50%
		}

		.fui-col-xl-11 {
			width: 45.83333333%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-11 {
			margin-left: 45.83333333%
		}

		.fui-col-xl-pull-11 {
			position: relative;
			right: 45.83333333%
		}

		.fui-col-xl-push-11 {
			position: relative;
			left: 45.83333333%
		}

		.fui-col-xl-10 {
			width: 41.66666667%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-10 {
			margin-left: 41.66666667%
		}

		.fui-col-xl-pull-10 {
			position: relative;
			right: 41.66666667%
		}

		.fui-col-xl-push-10 {
			position: relative;
			left: 41.66666667%
		}

		.fui-col-xl-9 {
			width: 37.5%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-9 {
			margin-left: 37.5%
		}

		.fui-col-xl-pull-9 {
			position: relative;
			right: 37.5%
		}

		.fui-col-xl-push-9 {
			position: relative;
			left: 37.5%
		}

		.fui-col-xl-8 {
			width: 33.33333333%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-8 {
			margin-left: 33.33333333%
		}

		.fui-col-xl-pull-8 {
			position: relative;
			right: 33.33333333%
		}

		.fui-col-xl-push-8 {
			position: relative;
			left: 33.33333333%
		}

		.fui-col-xl-7 {
			width: 29.16666667%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-7 {
			margin-left: 29.16666667%
		}

		.fui-col-xl-pull-7 {
			position: relative;
			right: 29.16666667%
		}

		.fui-col-xl-push-7 {
			position: relative;
			left: 29.16666667%
		}

		.fui-col-xl-6 {
			width: 25%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-6 {
			margin-left: 25%
		}

		.fui-col-xl-pull-6 {
			position: relative;
			right: 25%
		}

		.fui-col-xl-push-6 {
			position: relative;
			left: 25%
		}

		.fui-col-xl-5 {
			width: 20.83333333%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-5 {
			margin-left: 20.83333333%
		}

		.fui-col-xl-pull-5 {
			position: relative;
			right: 20.83333333%
		}

		.fui-col-xl-push-5 {
			position: relative;
			left: 20.83333333%
		}

		.fui-col-xl-4 {
			width: 16.66666667%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-4 {
			margin-left: 16.66666667%
		}

		.fui-col-xl-pull-4 {
			position: relative;
			right: 16.66666667%
		}

		.fui-col-xl-push-4 {
			position: relative;
			left: 16.66666667%
		}

		.fui-col-xl-3 {
			width: 12.5%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-3 {
			margin-left: 12.5%
		}

		.fui-col-xl-pull-3 {
			position: relative;
			right: 12.5%
		}

		.fui-col-xl-push-3 {
			position: relative;
			left: 12.5%
		}

		.fui-col-xl-2 {
			width: 8.33333333%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-2 {
			margin-left: 8.33333333%
		}

		.fui-col-xl-pull-2 {
			position: relative;
			right: 8.33333333%
		}

		.fui-col-xl-push-2 {
			position: relative;
			left: 8.33333333%
		}

		.fui-col-xl-1 {
			width: 4.16666667%;
			float: left;
			display: block
		}

		.fui-col-xl-offset-1 {
			margin-left: 4.16666667%
		}

		.fui-col-xl-pull-1 {
			position: relative;
			right: 4.16666667%
		}

		.fui-col-xl-push-1 {
			position: relative;
			left: 4.16666667%
		}

		.fui-col-xl-0 {
			display: none
		}

		.fui-col-xl-offset-0 {
			margin-left: 0%
		}

		.fui-col-xl-pull-0 {
			position: relative;
			right: 0%
		}

		.fui-col-xl-push-0 {
			position: relative;
			left: 0%
		}
	}

	@media screen and (max-width:1200px) {
		.fui-col-lg-24 {
			width: 100%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-24 {
			margin-left: 100%
		}

		.fui-col-lg-pull-24 {
			position: relative;
			right: 100%
		}

		.fui-col-lg-push-24 {
			position: relative;
			left: 100%
		}

		.fui-col-lg-23 {
			width: 95.83333333%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-23 {
			margin-left: 95.83333333%
		}

		.fui-col-lg-pull-23 {
			position: relative;
			right: 95.83333333%
		}

		.fui-col-lg-push-23 {
			position: relative;
			left: 95.83333333%
		}

		.fui-col-lg-22 {
			width: 91.66666667%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-22 {
			margin-left: 91.66666667%
		}

		.fui-col-lg-pull-22 {
			position: relative;
			right: 91.66666667%
		}

		.fui-col-lg-push-22 {
			position: relative;
			left: 91.66666667%
		}

		.fui-col-lg-21 {
			width: 87.5%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-21 {
			margin-left: 87.5%
		}

		.fui-col-lg-pull-21 {
			position: relative;
			right: 87.5%
		}

		.fui-col-lg-push-21 {
			position: relative;
			left: 87.5%
		}

		.fui-col-lg-20 {
			width: 83.33333333%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-20 {
			margin-left: 83.33333333%
		}

		.fui-col-lg-pull-20 {
			position: relative;
			right: 83.33333333%
		}

		.fui-col-lg-push-20 {
			position: relative;
			left: 83.33333333%
		}

		.fui-col-lg-19 {
			width: 79.16666667%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-19 {
			margin-left: 79.16666667%
		}

		.fui-col-lg-pull-19 {
			position: relative;
			right: 79.16666667%
		}

		.fui-col-lg-push-19 {
			position: relative;
			left: 79.16666667%
		}

		.fui-col-lg-18 {
			width: 75%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-18 {
			margin-left: 75%
		}

		.fui-col-lg-pull-18 {
			position: relative;
			right: 75%
		}

		.fui-col-lg-push-18 {
			position: relative;
			left: 75%
		}

		.fui-col-lg-17 {
			width: 70.83333333%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-17 {
			margin-left: 70.83333333%
		}

		.fui-col-lg-pull-17 {
			position: relative;
			right: 70.83333333%
		}

		.fui-col-lg-push-17 {
			position: relative;
			left: 70.83333333%
		}

		.fui-col-lg-16 {
			width: 66.66666667%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-16 {
			margin-left: 66.66666667%
		}

		.fui-col-lg-pull-16 {
			position: relative;
			right: 66.66666667%
		}

		.fui-col-lg-push-16 {
			position: relative;
			left: 66.66666667%
		}

		.fui-col-lg-15 {
			width: 62.5%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-15 {
			margin-left: 62.5%
		}

		.fui-col-lg-pull-15 {
			position: relative;
			right: 62.5%
		}

		.fui-col-lg-push-15 {
			position: relative;
			left: 62.5%
		}

		.fui-col-lg-14 {
			width: 58.33333333%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-14 {
			margin-left: 58.33333333%
		}

		.fui-col-lg-pull-14 {
			position: relative;
			right: 58.33333333%
		}

		.fui-col-lg-push-14 {
			position: relative;
			left: 58.33333333%
		}

		.fui-col-lg-13 {
			width: 54.16666667%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-13 {
			margin-left: 54.16666667%
		}

		.fui-col-lg-pull-13 {
			position: relative;
			right: 54.16666667%
		}

		.fui-col-lg-push-13 {
			position: relative;
			left: 54.16666667%
		}

		.fui-col-lg-12 {
			width: 50%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-12 {
			margin-left: 50%
		}

		.fui-col-lg-pull-12 {
			position: relative;
			right: 50%
		}

		.fui-col-lg-push-12 {
			position: relative;
			left: 50%
		}

		.fui-col-lg-11 {
			width: 45.83333333%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-11 {
			margin-left: 45.83333333%
		}

		.fui-col-lg-pull-11 {
			position: relative;
			right: 45.83333333%
		}

		.fui-col-lg-push-11 {
			position: relative;
			left: 45.83333333%
		}

		.fui-col-lg-10 {
			width: 41.66666667%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-10 {
			margin-left: 41.66666667%
		}

		.fui-col-lg-pull-10 {
			position: relative;
			right: 41.66666667%
		}

		.fui-col-lg-push-10 {
			position: relative;
			left: 41.66666667%
		}

		.fui-col-lg-9 {
			width: 37.5%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-9 {
			margin-left: 37.5%
		}

		.fui-col-lg-pull-9 {
			position: relative;
			right: 37.5%
		}

		.fui-col-lg-push-9 {
			position: relative;
			left: 37.5%
		}

		.fui-col-lg-8 {
			width: 33.33333333%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-8 {
			margin-left: 33.33333333%
		}

		.fui-col-lg-pull-8 {
			position: relative;
			right: 33.33333333%
		}

		.fui-col-lg-push-8 {
			position: relative;
			left: 33.33333333%
		}

		.fui-col-lg-7 {
			width: 29.16666667%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-7 {
			margin-left: 29.16666667%
		}

		.fui-col-lg-pull-7 {
			position: relative;
			right: 29.16666667%
		}

		.fui-col-lg-push-7 {
			position: relative;
			left: 29.16666667%
		}

		.fui-col-lg-6 {
			width: 25%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-6 {
			margin-left: 25%
		}

		.fui-col-lg-pull-6 {
			position: relative;
			right: 25%
		}

		.fui-col-lg-push-6 {
			position: relative;
			left: 25%
		}

		.fui-col-lg-5 {
			width: 20.83333333%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-5 {
			margin-left: 20.83333333%
		}

		.fui-col-lg-pull-5 {
			position: relative;
			right: 20.83333333%
		}

		.fui-col-lg-push-5 {
			position: relative;
			left: 20.83333333%
		}

		.fui-col-lg-4 {
			width: 16.66666667%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-4 {
			margin-left: 16.66666667%
		}

		.fui-col-lg-pull-4 {
			position: relative;
			right: 16.66666667%
		}

		.fui-col-lg-push-4 {
			position: relative;
			left: 16.66666667%
		}

		.fui-col-lg-3 {
			width: 12.5%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-3 {
			margin-left: 12.5%
		}

		.fui-col-lg-pull-3 {
			position: relative;
			right: 12.5%
		}

		.fui-col-lg-push-3 {
			position: relative;
			left: 12.5%
		}

		.fui-col-lg-2 {
			width: 8.33333333%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-2 {
			margin-left: 8.33333333%
		}

		.fui-col-lg-pull-2 {
			position: relative;
			right: 8.33333333%
		}

		.fui-col-lg-push-2 {
			position: relative;
			left: 8.33333333%
		}

		.fui-col-lg-1 {
			width: 4.16666667%;
			float: left;
			display: block
		}

		.fui-col-lg-offset-1 {
			margin-left: 4.16666667%
		}

		.fui-col-lg-pull-1 {
			position: relative;
			right: 4.16666667%
		}

		.fui-col-lg-push-1 {
			position: relative;
			left: 4.16666667%
		}

		.fui-col-lg-0 {
			display: none
		}

		.fui-col-lg-offset-0 {
			margin-left: 0%
		}

		.fui-col-lg-pull-0 {
			position: relative;
			right: 0%
		}

		.fui-col-lg-push-0 {
			position: relative;
			left: 0%
		}
	}

	@media screen and (max-width:992px) {
		.fui-col-md-24 {
			width: 100%;
			float: left;
			display: block
		}

		.fui-col-md-offset-24 {
			margin-left: 100%
		}

		.fui-col-md-pull-24 {
			position: relative;
			right: 100%
		}

		.fui-col-md-push-24 {
			position: relative;
			left: 100%
		}

		.fui-col-md-23 {
			width: 95.83333333%;
			float: left;
			display: block
		}

		.fui-col-md-offset-23 {
			margin-left: 95.83333333%
		}

		.fui-col-md-pull-23 {
			position: relative;
			right: 95.83333333%
		}

		.fui-col-md-push-23 {
			position: relative;
			left: 95.83333333%
		}

		.fui-col-md-22 {
			width: 91.66666667%;
			float: left;
			display: block
		}

		.fui-col-md-offset-22 {
			margin-left: 91.66666667%
		}

		.fui-col-md-pull-22 {
			position: relative;
			right: 91.66666667%
		}

		.fui-col-md-push-22 {
			position: relative;
			left: 91.66666667%
		}

		.fui-col-md-21 {
			width: 87.5%;
			float: left;
			display: block
		}

		.fui-col-md-offset-21 {
			margin-left: 87.5%
		}

		.fui-col-md-pull-21 {
			position: relative;
			right: 87.5%
		}

		.fui-col-md-push-21 {
			position: relative;
			left: 87.5%
		}

		.fui-col-md-20 {
			width: 83.33333333%;
			float: left;
			display: block
		}

		.fui-col-md-offset-20 {
			margin-left: 83.33333333%
		}

		.fui-col-md-pull-20 {
			position: relative;
			right: 83.33333333%
		}

		.fui-col-md-push-20 {
			position: relative;
			left: 83.33333333%
		}

		.fui-col-md-19 {
			width: 79.16666667%;
			float: left;
			display: block
		}

		.fui-col-md-offset-19 {
			margin-left: 79.16666667%
		}

		.fui-col-md-pull-19 {
			position: relative;
			right: 79.16666667%
		}

		.fui-col-md-push-19 {
			position: relative;
			left: 79.16666667%
		}

		.fui-col-md-18 {
			width: 75%;
			float: left;
			display: block
		}

		.fui-col-md-offset-18 {
			margin-left: 75%
		}

		.fui-col-md-pull-18 {
			position: relative;
			right: 75%
		}

		.fui-col-md-push-18 {
			position: relative;
			left: 75%
		}

		.fui-col-md-17 {
			width: 70.83333333%;
			float: left;
			display: block
		}

		.fui-col-md-offset-17 {
			margin-left: 70.83333333%
		}

		.fui-col-md-pull-17 {
			position: relative;
			right: 70.83333333%
		}

		.fui-col-md-push-17 {
			position: relative;
			left: 70.83333333%
		}

		.fui-col-md-16 {
			width: 66.66666667%;
			float: left;
			display: block
		}

		.fui-col-md-offset-16 {
			margin-left: 66.66666667%
		}

		.fui-col-md-pull-16 {
			position: relative;
			right: 66.66666667%
		}

		.fui-col-md-push-16 {
			position: relative;
			left: 66.66666667%
		}

		.fui-col-md-15 {
			width: 62.5%;
			float: left;
			display: block
		}

		.fui-col-md-offset-15 {
			margin-left: 62.5%
		}

		.fui-col-md-pull-15 {
			position: relative;
			right: 62.5%
		}

		.fui-col-md-push-15 {
			position: relative;
			left: 62.5%
		}

		.fui-col-md-14 {
			width: 58.33333333%;
			float: left;
			display: block
		}

		.fui-col-md-offset-14 {
			margin-left: 58.33333333%
		}

		.fui-col-md-pull-14 {
			position: relative;
			right: 58.33333333%
		}

		.fui-col-md-push-14 {
			position: relative;
			left: 58.33333333%
		}

		.fui-col-md-13 {
			width: 54.16666667%;
			float: left;
			display: block
		}

		.fui-col-md-offset-13 {
			margin-left: 54.16666667%
		}

		.fui-col-md-pull-13 {
			position: relative;
			right: 54.16666667%
		}

		.fui-col-md-push-13 {
			position: relative;
			left: 54.16666667%
		}

		.fui-col-md-12 {
			width: 50%;
			float: left;
			display: block
		}

		.fui-col-md-offset-12 {
			margin-left: 50%
		}

		.fui-col-md-pull-12 {
			position: relative;
			right: 50%
		}

		.fui-col-md-push-12 {
			position: relative;
			left: 50%
		}

		.fui-col-md-11 {
			width: 45.83333333%;
			float: left;
			display: block
		}

		.fui-col-md-offset-11 {
			margin-left: 45.83333333%
		}

		.fui-col-md-pull-11 {
			position: relative;
			right: 45.83333333%
		}

		.fui-col-md-push-11 {
			position: relative;
			left: 45.83333333%
		}

		.fui-col-md-10 {
			width: 41.66666667%;
			float: left;
			display: block
		}

		.fui-col-md-offset-10 {
			margin-left: 41.66666667%
		}

		.fui-col-md-pull-10 {
			position: relative;
			right: 41.66666667%
		}

		.fui-col-md-push-10 {
			position: relative;
			left: 41.66666667%
		}

		.fui-col-md-9 {
			width: 37.5%;
			float: left;
			display: block
		}

		.fui-col-md-offset-9 {
			margin-left: 37.5%
		}

		.fui-col-md-pull-9 {
			position: relative;
			right: 37.5%
		}

		.fui-col-md-push-9 {
			position: relative;
			left: 37.5%
		}

		.fui-col-md-8 {
			width: 33.33333333%;
			float: left;
			display: block
		}

		.fui-col-md-offset-8 {
			margin-left: 33.33333333%
		}

		.fui-col-md-pull-8 {
			position: relative;
			right: 33.33333333%
		}

		.fui-col-md-push-8 {
			position: relative;
			left: 33.33333333%
		}

		.fui-col-md-7 {
			width: 29.16666667%;
			float: left;
			display: block
		}

		.fui-col-md-offset-7 {
			margin-left: 29.16666667%
		}

		.fui-col-md-pull-7 {
			position: relative;
			right: 29.16666667%
		}

		.fui-col-md-push-7 {
			position: relative;
			left: 29.16666667%
		}

		.fui-col-md-6 {
			width: 25%;
			float: left;
			display: block
		}

		.fui-col-md-offset-6 {
			margin-left: 25%
		}

		.fui-col-md-pull-6 {
			position: relative;
			right: 25%
		}

		.fui-col-md-push-6 {
			position: relative;
			left: 25%
		}

		.fui-col-md-5 {
			width: 20.83333333%;
			float: left;
			display: block
		}

		.fui-col-md-offset-5 {
			margin-left: 20.83333333%
		}

		.fui-col-md-pull-5 {
			position: relative;
			right: 20.83333333%
		}

		.fui-col-md-push-5 {
			position: relative;
			left: 20.83333333%
		}

		.fui-col-md-4 {
			width: 16.66666667%;
			float: left;
			display: block
		}

		.fui-col-md-offset-4 {
			margin-left: 16.66666667%
		}

		.fui-col-md-pull-4 {
			position: relative;
			right: 16.66666667%
		}

		.fui-col-md-push-4 {
			position: relative;
			left: 16.66666667%
		}

		.fui-col-md-3 {
			width: 12.5%;
			float: left;
			display: block
		}

		.fui-col-md-offset-3 {
			margin-left: 12.5%
		}

		.fui-col-md-pull-3 {
			position: relative;
			right: 12.5%
		}

		.fui-col-md-push-3 {
			position: relative;
			left: 12.5%
		}

		.fui-col-md-2 {
			width: 8.33333333%;
			float: left;
			display: block
		}

		.fui-col-md-offset-2 {
			margin-left: 8.33333333%
		}

		.fui-col-md-pull-2 {
			position: relative;
			right: 8.33333333%
		}

		.fui-col-md-push-2 {
			position: relative;
			left: 8.33333333%
		}

		.fui-col-md-1 {
			width: 4.16666667%;
			float: left;
			display: block
		}

		.fui-col-md-offset-1 {
			margin-left: 4.16666667%
		}

		.fui-col-md-pull-1 {
			position: relative;
			right: 4.16666667%
		}

		.fui-col-md-push-1 {
			position: relative;
			left: 4.16666667%
		}

		.fui-col-md-0 {
			display: none
		}

		.fui-col-md-offset-0 {
			margin-left: 0%
		}

		.fui-col-md-pull-0 {
			position: relative;
			right: 0%
		}

		.fui-col-md-push-0 {
			position: relative;
			left: 0%
		}
	}

	@media screen and (max-width:768px) {
		.fui-col-sm-24 {
			width: 100%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-24 {
			margin-left: 100%
		}

		.fui-col-sm-pull-24 {
			position: relative;
			right: 100%
		}

		.fui-col-sm-push-24 {
			position: relative;
			left: 100%
		}

		.fui-col-sm-23 {
			width: 95.83333333%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-23 {
			margin-left: 95.83333333%
		}

		.fui-col-sm-pull-23 {
			position: relative;
			right: 95.83333333%
		}

		.fui-col-sm-push-23 {
			position: relative;
			left: 95.83333333%
		}

		.fui-col-sm-22 {
			width: 91.66666667%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-22 {
			margin-left: 91.66666667%
		}

		.fui-col-sm-pull-22 {
			position: relative;
			right: 91.66666667%
		}

		.fui-col-sm-push-22 {
			position: relative;
			left: 91.66666667%
		}

		.fui-col-sm-21 {
			width: 87.5%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-21 {
			margin-left: 87.5%
		}

		.fui-col-sm-pull-21 {
			position: relative;
			right: 87.5%
		}

		.fui-col-sm-push-21 {
			position: relative;
			left: 87.5%
		}

		.fui-col-sm-20 {
			width: 83.33333333%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-20 {
			margin-left: 83.33333333%
		}

		.fui-col-sm-pull-20 {
			position: relative;
			right: 83.33333333%
		}

		.fui-col-sm-push-20 {
			position: relative;
			left: 83.33333333%
		}

		.fui-col-sm-19 {
			width: 79.16666667%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-19 {
			margin-left: 79.16666667%
		}

		.fui-col-sm-pull-19 {
			position: relative;
			right: 79.16666667%
		}

		.fui-col-sm-push-19 {
			position: relative;
			left: 79.16666667%
		}

		.fui-col-sm-18 {
			width: 75%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-18 {
			margin-left: 75%
		}

		.fui-col-sm-pull-18 {
			position: relative;
			right: 75%
		}

		.fui-col-sm-push-18 {
			position: relative;
			left: 75%
		}

		.fui-col-sm-17 {
			width: 70.83333333%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-17 {
			margin-left: 70.83333333%
		}

		.fui-col-sm-pull-17 {
			position: relative;
			right: 70.83333333%
		}

		.fui-col-sm-push-17 {
			position: relative;
			left: 70.83333333%
		}

		.fui-col-sm-16 {
			width: 66.66666667%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-16 {
			margin-left: 66.66666667%
		}

		.fui-col-sm-pull-16 {
			position: relative;
			right: 66.66666667%
		}

		.fui-col-sm-push-16 {
			position: relative;
			left: 66.66666667%
		}

		.fui-col-sm-15 {
			width: 62.5%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-15 {
			margin-left: 62.5%
		}

		.fui-col-sm-pull-15 {
			position: relative;
			right: 62.5%
		}

		.fui-col-sm-push-15 {
			position: relative;
			left: 62.5%
		}

		.fui-col-sm-14 {
			width: 58.33333333%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-14 {
			margin-left: 58.33333333%
		}

		.fui-col-sm-pull-14 {
			position: relative;
			right: 58.33333333%
		}

		.fui-col-sm-push-14 {
			position: relative;
			left: 58.33333333%
		}

		.fui-col-sm-13 {
			width: 54.16666667%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-13 {
			margin-left: 54.16666667%
		}

		.fui-col-sm-pull-13 {
			position: relative;
			right: 54.16666667%
		}

		.fui-col-sm-push-13 {
			position: relative;
			left: 54.16666667%
		}

		.fui-col-sm-12 {
			width: 50%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-12 {
			margin-left: 50%
		}

		.fui-col-sm-pull-12 {
			position: relative;
			right: 50%
		}

		.fui-col-sm-push-12 {
			position: relative;
			left: 50%
		}

		.fui-col-sm-11 {
			width: 45.83333333%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-11 {
			margin-left: 45.83333333%
		}

		.fui-col-sm-pull-11 {
			position: relative;
			right: 45.83333333%
		}

		.fui-col-sm-push-11 {
			position: relative;
			left: 45.83333333%
		}

		.fui-col-sm-10 {
			width: 41.66666667%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-10 {
			margin-left: 41.66666667%
		}

		.fui-col-sm-pull-10 {
			position: relative;
			right: 41.66666667%
		}

		.fui-col-sm-push-10 {
			position: relative;
			left: 41.66666667%
		}

		.fui-col-sm-9 {
			width: 37.5%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-9 {
			margin-left: 37.5%
		}

		.fui-col-sm-pull-9 {
			position: relative;
			right: 37.5%
		}

		.fui-col-sm-push-9 {
			position: relative;
			left: 37.5%
		}

		.fui-col-sm-8 {
			width: 33.33333333%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-8 {
			margin-left: 33.33333333%
		}

		.fui-col-sm-pull-8 {
			position: relative;
			right: 33.33333333%
		}

		.fui-col-sm-push-8 {
			position: relative;
			left: 33.33333333%
		}

		.fui-col-sm-7 {
			width: 29.16666667%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-7 {
			margin-left: 29.16666667%
		}

		.fui-col-sm-pull-7 {
			position: relative;
			right: 29.16666667%
		}

		.fui-col-sm-push-7 {
			position: relative;
			left: 29.16666667%
		}

		.fui-col-sm-6 {
			width: 25%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-6 {
			margin-left: 25%
		}

		.fui-col-sm-pull-6 {
			position: relative;
			right: 25%
		}

		.fui-col-sm-push-6 {
			position: relative;
			left: 25%
		}

		.fui-col-sm-5 {
			width: 20.83333333%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-5 {
			margin-left: 20.83333333%
		}

		.fui-col-sm-pull-5 {
			position: relative;
			right: 20.83333333%
		}

		.fui-col-sm-push-5 {
			position: relative;
			left: 20.83333333%
		}

		.fui-col-sm-4 {
			width: 16.66666667%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-4 {
			margin-left: 16.66666667%
		}

		.fui-col-sm-pull-4 {
			position: relative;
			right: 16.66666667%
		}

		.fui-col-sm-push-4 {
			position: relative;
			left: 16.66666667%
		}

		.fui-col-sm-3 {
			width: 12.5%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-3 {
			margin-left: 12.5%
		}

		.fui-col-sm-pull-3 {
			position: relative;
			right: 12.5%
		}

		.fui-col-sm-push-3 {
			position: relative;
			left: 12.5%
		}

		.fui-col-sm-2 {
			width: 8.33333333%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-2 {
			margin-left: 8.33333333%
		}

		.fui-col-sm-pull-2 {
			position: relative;
			right: 8.33333333%
		}

		.fui-col-sm-push-2 {
			position: relative;
			left: 8.33333333%
		}

		.fui-col-sm-1 {
			width: 4.16666667%;
			float: left;
			display: block
		}

		.fui-col-sm-offset-1 {
			margin-left: 4.16666667%
		}

		.fui-col-sm-pull-1 {
			position: relative;
			right: 4.16666667%
		}

		.fui-col-sm-push-1 {
			position: relative;
			left: 4.16666667%
		}

		.fui-col-sm-0 {
			display: none
		}

		.fui-col-sm-offset-0 {
			margin-left: 0%
		}

		.fui-col-sm-pull-0 {
			position: relative;
			right: 0%
		}

		.fui-col-sm-push-0 {
			position: relative;
			left: 0%
		}
	}

	@media screen and (max-width:767px) {
		.fui-col-xs-24 {
			width: 100%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-24 {
			margin-left: 100%
		}

		.fui-col-xs-pull-24 {
			position: relative;
			right: 100%
		}

		.fui-col-xs-push-24 {
			position: relative;
			left: 100%
		}

		.fui-col-xs-23 {
			width: 95.83333333%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-23 {
			margin-left: 95.83333333%
		}

		.fui-col-xs-pull-23 {
			position: relative;
			right: 95.83333333%
		}

		.fui-col-xs-push-23 {
			position: relative;
			left: 95.83333333%
		}

		.fui-col-xs-22 {
			width: 91.66666667%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-22 {
			margin-left: 91.66666667%
		}

		.fui-col-xs-pull-22 {
			position: relative;
			right: 91.66666667%
		}

		.fui-col-xs-push-22 {
			position: relative;
			left: 91.66666667%
		}

		.fui-col-xs-21 {
			width: 87.5%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-21 {
			margin-left: 87.5%
		}

		.fui-col-xs-pull-21 {
			position: relative;
			right: 87.5%
		}

		.fui-col-xs-push-21 {
			position: relative;
			left: 87.5%
		}

		.fui-col-xs-20 {
			width: 83.33333333%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-20 {
			margin-left: 83.33333333%
		}

		.fui-col-xs-pull-20 {
			position: relative;
			right: 83.33333333%
		}

		.fui-col-xs-push-20 {
			position: relative;
			left: 83.33333333%
		}

		.fui-col-xs-19 {
			width: 79.16666667%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-19 {
			margin-left: 79.16666667%
		}

		.fui-col-xs-pull-19 {
			position: relative;
			right: 79.16666667%
		}

		.fui-col-xs-push-19 {
			position: relative;
			left: 79.16666667%
		}

		.fui-col-xs-18 {
			width: 75%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-18 {
			margin-left: 75%
		}

		.fui-col-xs-pull-18 {
			position: relative;
			right: 75%
		}

		.fui-col-xs-push-18 {
			position: relative;
			left: 75%
		}

		.fui-col-xs-17 {
			width: 70.83333333%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-17 {
			margin-left: 70.83333333%
		}

		.fui-col-xs-pull-17 {
			position: relative;
			right: 70.83333333%
		}

		.fui-col-xs-push-17 {
			position: relative;
			left: 70.83333333%
		}

		.fui-col-xs-16 {
			width: 66.66666667%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-16 {
			margin-left: 66.66666667%
		}

		.fui-col-xs-pull-16 {
			position: relative;
			right: 66.66666667%
		}

		.fui-col-xs-push-16 {
			position: relative;
			left: 66.66666667%
		}

		.fui-col-xs-15 {
			width: 62.5%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-15 {
			margin-left: 62.5%
		}

		.fui-col-xs-pull-15 {
			position: relative;
			right: 62.5%
		}

		.fui-col-xs-push-15 {
			position: relative;
			left: 62.5%
		}

		.fui-col-xs-14 {
			width: 58.33333333%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-14 {
			margin-left: 58.33333333%
		}

		.fui-col-xs-pull-14 {
			position: relative;
			right: 58.33333333%
		}

		.fui-col-xs-push-14 {
			position: relative;
			left: 58.33333333%
		}

		.fui-col-xs-13 {
			width: 54.16666667%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-13 {
			margin-left: 54.16666667%
		}

		.fui-col-xs-pull-13 {
			position: relative;
			right: 54.16666667%
		}

		.fui-col-xs-push-13 {
			position: relative;
			left: 54.16666667%
		}

		.fui-col-xs-12 {
			width: 50%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-12 {
			margin-left: 50%
		}

		.fui-col-xs-pull-12 {
			position: relative;
			right: 50%
		}

		.fui-col-xs-push-12 {
			position: relative;
			left: 50%
		}

		.fui-col-xs-11 {
			width: 45.83333333%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-11 {
			margin-left: 45.83333333%
		}

		.fui-col-xs-pull-11 {
			position: relative;
			right: 45.83333333%
		}

		.fui-col-xs-push-11 {
			position: relative;
			left: 45.83333333%
		}

		.fui-col-xs-10 {
			width: 41.66666667%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-10 {
			margin-left: 41.66666667%
		}

		.fui-col-xs-pull-10 {
			position: relative;
			right: 41.66666667%
		}

		.fui-col-xs-push-10 {
			position: relative;
			left: 41.66666667%
		}

		.fui-col-xs-9 {
			width: 37.5%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-9 {
			margin-left: 37.5%
		}

		.fui-col-xs-pull-9 {
			position: relative;
			right: 37.5%
		}

		.fui-col-xs-push-9 {
			position: relative;
			left: 37.5%
		}

		.fui-col-xs-8 {
			width: 33.33333333%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-8 {
			margin-left: 33.33333333%
		}

		.fui-col-xs-pull-8 {
			position: relative;
			right: 33.33333333%
		}

		.fui-col-xs-push-8 {
			position: relative;
			left: 33.33333333%
		}

		.fui-col-xs-7 {
			width: 29.16666667%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-7 {
			margin-left: 29.16666667%
		}

		.fui-col-xs-pull-7 {
			position: relative;
			right: 29.16666667%
		}

		.fui-col-xs-push-7 {
			position: relative;
			left: 29.16666667%
		}

		.fui-col-xs-6 {
			width: 25%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-6 {
			margin-left: 25%
		}

		.fui-col-xs-pull-6 {
			position: relative;
			right: 25%
		}

		.fui-col-xs-push-6 {
			position: relative;
			left: 25%
		}

		.fui-col-xs-5 {
			width: 20.83333333%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-5 {
			margin-left: 20.83333333%
		}

		.fui-col-xs-pull-5 {
			position: relative;
			right: 20.83333333%
		}

		.fui-col-xs-push-5 {
			position: relative;
			left: 20.83333333%
		}

		.fui-col-xs-4 {
			width: 16.66666667%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-4 {
			margin-left: 16.66666667%
		}

		.fui-col-xs-pull-4 {
			position: relative;
			right: 16.66666667%
		}

		.fui-col-xs-push-4 {
			position: relative;
			left: 16.66666667%
		}

		.fui-col-xs-3 {
			width: 12.5%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-3 {
			margin-left: 12.5%
		}

		.fui-col-xs-pull-3 {
			position: relative;
			right: 12.5%
		}

		.fui-col-xs-push-3 {
			position: relative;
			left: 12.5%
		}

		.fui-col-xs-2 {
			width: 8.33333333%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-2 {
			margin-left: 8.33333333%
		}

		.fui-col-xs-pull-2 {
			position: relative;
			right: 8.33333333%
		}

		.fui-col-xs-push-2 {
			position: relative;
			left: 8.33333333%
		}

		.fui-col-xs-1 {
			width: 4.16666667%;
			float: left;
			display: block
		}

		.fui-col-xs-offset-1 {
			margin-left: 4.16666667%
		}

		.fui-col-xs-pull-1 {
			position: relative;
			right: 4.16666667%
		}

		.fui-col-xs-push-1 {
			position: relative;
			left: 4.16666667%
		}

		.fui-col-xs-0 {
			display: none
		}

		.fui-col-xs-offset-0 {
			margin-left: 0%
		}

		.fui-col-xs-pull-0 {
			position: relative;
			right: 0%
		}

		.fui-col-xs-push-0 {
			position: relative;
			left: 0%
		}
	}

	.fui-col {
		float: left;
		box-sizing: border-box
	}

	/* #endif */
</style>
