<template>
	<view class="fui-empty__wrap" :class="{'fui-empty__fixed':isFixed}" :style="{marginTop:marginTop+'rpx'}">
		<image :src="src" :style="{width:width+'rpx',height:height+'rpx'}" mode="widthFix" v-if="src"></image>
		<text class="fui-empty__title" :class="{'fui-empty__title-color':!color}"
			:style="{color:color,fontSize:size+'rpx'}" v-if="title">{{title}}</text>
		<text class="fui-empty__desc" :class="{'fui-empty__descr-color':!descrColor}"
			:style="{color:descrColor,fontSize:descrSize+'rpx'}" v-if="descr">{{descr}}</text>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "fui-empty",
		props: {
			src: {
				type: String,
				default: ''
			},
			width: {
				type: [Number, String],
				default: 576
			},
			height: {
				type: [Number, String],
				default: 318
			},
			title: {
				type: String,
				default: ''
			},
			// #ifdef APP-NVUE
			color: {
				type: String,
				default: '#333333'
			},
			// #endif
			// #ifndef APP-NVUE
			color: {
				type: String,
				default: ''
			},
			// #endif
			size: {
				type: [Number, String],
				default: 32
			},
			descr: {
				type: String,
				default: ''
			},
			// #ifdef APP-NVUE
			descrColor: {
				type: String,
				default: '#B2B2B2'
			},
			// #endif
			// #ifndef APP-NVUE
			descrColor: {
				type: String,
				default: ''
			},
			// #endif
			descrSize: {
				type: [Number, String],
				default: 24
			},
			isFixed: {
				type: Boolean,
				default: false
			},
			marginTop: {
				type: [Number, String],
				default: 0
			}
		}
	}
</script>

<style scoped>
	.fui-empty__wrap {
		flex: 1;
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.fui-empty__fixed {
		position: fixed;
		left: 0;
		/* #ifndef APP-NVUE */
		top: 50%;
		transform: translateY(-50%);
		/* #endif */

		/* #ifdef APP-NVUE */
		top: 0;
		right: 0;
		bottom: 0;
		/* #endif */
		z-index: 99;
	}

	.fui-empty__title {
		text-align: center;
		font-weight: 500;
		padding-top: 48rpx;
	}

	.fui-empty__desc {
		text-align: center;
		font-weight: normal;
		padding-top: 8rpx;
	}

	/* #ifndef APP-NVUE */
	.fui-empty__title-color {
		color: var(--fui-color-section, #333333) !important;
	}

	.fui-empty__descr-color {
		color: var(--fui-color-label, #B2B2B2) !important;
	}

	/* #endif */
</style>