<template>
	<view class="fui-avatar__wrap" :class="[width?'':'fui-avatar__size-'+size,radius===-1?'fui-avatar__'+shape:'',block?'fui-avatar__block':'fui-avatar__inline']"
		:style="wrapStyles" @tap="handleClick">
		<image class="fui-avatar__img" :style="styles"
			:class="[radius===-1?'fui-avatar__'+shape:'',width?'':'fui-avatar__size-'+size]" :src="showImg" :mode="mode"
			v-if="src" :webp="webp" :lazy-load="lazyLoad" @error="handleError"></image>
		<text class="fui-avatar__text" :class="[width?'':'fui-avatar__text-'+size]" v-if="!src && text"
			:style="textStyles">{{text}}</text>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "fui-avatar",
		emits: ['click', 'error'],
		props: {
			src: {
				type: String,
				default: ''
			},
			errorSrc: {
				type: String,
				default: ''
			},
			mode: {
				type: String,
				default: 'widthFix'
			},
			//微信小程序、百度小程序、字节跳动小程序
			//图片懒加载。只针对page与scroll-view下的image有效
			lazyLoad: {
				type: Boolean,
				default: true
			},
			//默认不解析 webP 格式，只支持网络资源 微信小程序2.9.0
			webp: {
				type: Boolean,
				default: false
			},
			background: {
				type: String,
				default: '#D1D1D1'
			},
			//small（64）、middle（96）、large（128）
			size: {
				type: String,
				default: 'middle'
			},
			//图片宽度，设置大于0的数值生效，默认使用size
			width: {
				type: [Number, String],
				default: 0
			},
			//默认等宽，设置图大于0的数值且设置了图片宽度生效
			height: {
				type: [Number, String],
				default: 0
			},
			//指定头像的形状，可选值为 circle、square
			shape: {
				type: String,
				default: 'circle'
			},
			//图片圆角值，默认使用shape，当设置大于等于0的数值，shape失效
			radius: {
				type: [Number, String],
				default: -1
			},
			//没有src时可以使用文本代替
			text: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: '#fff'
			},
			//默认使用size下字体大小
			fontSize: {
				type: [Number, String],
				default: 0
			},
			fontWeight: {
				type: [Number, String],
				default: 600
			},
			marginRight: {
				type: [Number, String],
				default: 0
			},
			marginBottom: {
				type: [Number, String],
				default: 0
			},
			block: {
				type: Boolean,
				default: false
			},
			//在列表中的索引值
			index: {
				type: Number,
				default: 0
			},
			//其他参数
			params: {
				type: [Number, String],
				default: 0
			}
		},
		computed: {
			wrapStyles() {
				return `background:${this.background};margin-right:${this.marginRight}rpx;margin-bottom:${this.marginBottom}rpx;${this.styles}`
			},
			styles() {
				let styles = '';
				if (this.width) {
					styles = `width:${this.width}rpx;height:${this.height || this.width}rpx;`
				}
				if (this.radius !== -1) {
					styles += `border-radius:${this.radius}rpx;`
				}
				return styles;
			},
			textStyles() {
				let styles = `color:${this.color};font-weight:${this.fontWeight};`;
				if (this.fontSize) {
					styles += `font-size:${this.fontSize}rpx;`
				}
				return styles;
			}
		},
		watch: {
			src(val) {
				this.src && (this.showImg = this.src);
			}
		},
		data() {
			return {
				showImg: ''
			}
		},
		created() {
			this.src && (this.showImg = this.src);
		},
		methods: {
			handleError(e) {
				if (this.src) {
					this.errorSrc && (this.showImg = this.errorSrc);
					this.$emit('error', {
						index: this.index,
						params: this.params
					})
				}
			},
			handleClick() {
				this.$emit('click', {
					index: this.index,
					params: this.params
				})
			}
		}
	}
</script>

<style scoped>
	.fui-avatar__wrap {
		position: relative;
		/* #ifndef APP-NVUE */
		overflow: hidden;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	/* #ifndef APP-NVUE */
	.fui-avatar__block {
		display: flex;
	}

	.fui-avatar__inline {
		display: inline-flex;
		vertical-align: middle;
	}

	/* #endif */

	.fui-avatar__img {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: block;
		object-fit: cover;
		/* #endif */
	}

	.fui-avatar__text {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: block;
		white-space: nowrap;
		box-sizing: border-box;
		/* #endif */
		/* #ifdef APP-NVUE */
		lines: 1;
		/* #endif */
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: center;
	}

	.fui-avatar__size-small {
		width: 64rpx !important;
		height: 64rpx !important;

	}

	.fui-avatar__text-small {
		font-size: 32rpx !important;
	}

	.fui-avatar__size-middle {
		width: 96rpx !important;
		height: 96rpx !important;
	}

	.fui-avatar__text-middle {
		font-size: 44rpx !important;
	}

	.fui-avatar__size-large {
		width: 128rpx !important;
		height: 128rpx !important;
	}

	.fui-avatar__text-large {
		font-size: 56rpx !important;
	}

	.fui-avatar__circle {
		/* #ifdef APP-NVUE */
		border-radius: 500px !important;
		/* #endif */

		/* #ifndef APP-NVUE */
		border-radius: 50% !important;
		/* #endif */
	}

	.fui-avatar__square {
		border-radius: 8rpx !important;
	}
</style>