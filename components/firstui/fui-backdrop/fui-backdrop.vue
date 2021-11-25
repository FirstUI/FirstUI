<template>
	<!-- #ifdef APP-NVUE -->
	<view v-if="show" class="fui-backdrop__wrap"
		:style="{background:background,position:absolute?'absolute':'fixed',zIndex:zIndex}" @tap="handleClick">
		<slot></slot>
	</view>
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
	<view class="fui-backdrop__wrap" :class="{'fui-backdrop__bg':!background,'fui-backdrop__show':show}"
		:style="{background:background,position:absolute?'absolute':'fixed',zIndex:zIndex}" @tap="handleClick">
		<slot></slot>
	</view>
	<!-- #endif -->
</template>

<script>
	export default {
		name: "fui-backdrop",
		emits: ['click'],
		props: {
			show: {
				type: Boolean,
				default: false
			},
			background: {
				type: String,
				// #ifdef APP-NVUE
				default: 'rgba(0, 0, 0, 0.6)',
				// #endif

				// #ifndef APP-NVUE
				default: ''
				// #endif
			},
			//是否绝对定位，默认固定定位fixed
			absolute: {
				type: Boolean,
				default: false
			},
			zIndex: {
				type: Number,
				default: 999
			},
			closable: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			handleClick() {
				if (this.closable && this.show) {
					this.$emit('click')
				}
			}
		}
	}
</script>

<style scoped>
	.fui-backdrop__wrap {
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		/* #ifndef APP-NVUE */
		display: flex;
		opacity: 0;
		visibility: hidden;
		transition: all 0.3s;
		/* #endif */
		align-items: center;
		justify-content: center;
	}

	/* #ifndef APP-NVUE */
	.fui-backdrop__bg {
		background: var(--fui-bg-color-mask, rgba(0, 0, 0, 0.6)) !important;
	}

	.fui-backdrop__show {
		visibility: visible !important;
		opacity: 1 !important;
	}

	/* #endif */
</style>
