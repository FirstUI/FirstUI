<template>
	<view class="fui-row__box" :class="[flex?'fui-row__flex':'', justifyClass,alignClass]" :style="{marginTop:marginTop,marginBottom:marginBottom,marginLeft:`-${marginValue}rpx`,
		marginRight:`-${marginValue}rpx`}">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "fui-row",
		componentName: 'fuiRow',
		props: {
			//是否为flex布局
			isFlex: {
				type: Boolean,
				default: false
			},
			//flex 布局下的水平排列方式 start/end/center/space-around/space-between
			justify: {
				type: String,
				default: 'start'
			},
			//flex 布局下的垂直排列方式	top/middle/bottom
			align: {
				type: String,
				default: 'top'
			},
			marginTop: {
				type: String,
				default: '0'
			},
			marginBottom: {
				type: String,
				default: '0'
			},
			//栅格间隔
			gutter: {
				type: Number,
				default: 0
			},
			// nvue如果使用span等属性，需要配置宽度
			width: {
				type: [String, Number],
				default: 750
			}
		},
		data() {
			return {
				flex: false
			}
		},
		watch: {
			isFlex(val) {
				// #ifndef APP-NVUE
				this.flex = val;
				// #endif
			}
		},
		created() {
			// #ifndef APP-NVUE
			this.flex = this.isFlex;
			// #endif
			// #ifdef APP-NVUE
			this.flex = true;
			// #endif
		},
		computed: {
			marginValue() {
				// #ifndef APP-NVUE
				if (this.gutter) {
					return Number(this.gutter) / 2;
				}
				// #endif
				return 0;
			},
			justifyClass() {
				return this.justify !== 'start' ? `fui-row__${this.justify}` : ''
			},
			alignClass() {
				return this.align !== 'top' ? `fui-row__${this.align}` : ''
			}
		}
	}
</script>

<style scoped>
	/* #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ */
	:host {
		position: relative;
		box-sizing: border-box;
		display: block;
	}

	/* #endif */

	.fui-row__box {
		flex: 1;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		/* #endif */
		position: relative;
		/* #ifdef MP-TOUTIAO || MP-QQ || MP-BAIDU */
		display: block;
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	.fui-row__box::before {
		display: table;
		content: " ";
	}

	.fui-row__box::after {
		display: table;
		content: " ";
	}

	.fui-row__box::after {
		clear: both;
	}

	/* #endif */
	.fui-row__flex {
		/* #ifndef APP-NVUE*/
		display: flex !important;
		/* #endif */
		flex-direction: row;
	}

	.fui-row__middle {
		align-items: center;
	}

	.fui-row__bottom {
		align-items: flex-end;
	}

	/* #ifndef APP-NVUE */
	.fui-row__before {
		display: table
	}

	/* #endif */

	.fui-row__end {
		justify-content: flex-end;
	}

	.fui-row__center {
		justify-content: center;
	}

	.fui-row__space-around {
		justify-content: space-around;
	}

	.fui-row__space-between {
		justify-content: space-between;
	}
</style>