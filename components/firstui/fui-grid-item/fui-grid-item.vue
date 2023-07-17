<template>
	<view v-if="width" :style="'width:'+width+';'+(height?'height:'+height:'')" class="fui-grid__item">
		<view :class="{ 'fui-grid__item-border': showBorder, 'fui-highlight': highlight }"
			:style="{'border-right-color': borderColor ,'border-bottom-color': borderColor ,'border-top-color': borderColor,backgroundColor:backgroundColor }"
			class="fui-grid__item-box" @click="handleClick">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "fui-grid-item",
		emits: ['click'],
		inject: ['grid'],
		// #ifdef MP-WEIXIN
		options: {
			virtualHost: true
		},
		// #endif
		props: {
			//是否有点击效果
			highlight: {
				type: Boolean,
				default: true
			},
			backgroundColor: {
				type: String,
				default: 'transparent'
			},
			//索引
			index: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				columns: 0,
				showBorder: true,
				width: 0,
				height: 0,
				borderColor: '#eaeef1'
			};
		},
		created() {
			this.init()
		},
		// #ifndef VUE3
		beforeDestroy() {
			if (this.grid) {
				this.grid.children.forEach((item, index) => {
					if (item === this) {
						this.grid.children.splice(index, 1)
					}
				})
			}
		},
		// #endif
		// #ifdef VUE3
		beforeUnmount() {
			if (this.grid) {
				this.grid.children.forEach((item, index) => {
					if (item === this) {
						this.grid.children.splice(index, 1)
					}
				})
			}
		},
		// #endif
		methods: {
			init() {
				if (this.grid) {
					this.columns = this.grid.columns
					this.showBorder = this.grid.showBorder
					this.borderColor = this.grid.borderColor
					this.grid.children.push(this)
					this.width = this.grid.width
					this.height = this.grid.height
				}
			},
			handleClick() {
				const e = {
					detail: {
						index: this.index
					}
				}
				this.grid && this.grid.handleClick(e)
				this.$emit('click', e)
			}
		}
	}
</script>

<style scoped>
	.fui-grid__item {
		/* #ifndef APP-NVUE */
		height: 100%;
		display: flex;
		box-sizing: border-box;
		flex-shrink: 0;
		/* #endif */
		flex-direction: column;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.fui-grid__item-box {
		/* #ifndef APP-NVUE */
		display: flex;
		width: 100%;
		/* #endif */
		position: relative;
		flex: 1;
		flex-direction: column;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
	}

	.fui-grid__item-border {
		position: relative;
		/* #ifdef APP-NVUE */
		border-bottom-color: #EEEEEE;
		border-bottom-style: solid;
		border-bottom-width: 0.5px;
		border-right-color: #EEEEEE;
		border-right-style: solid;
		border-right-width: 0.5px;
		/* #endif */
		/* #ifndef APP-NVUE */
		z-index: 0;
		border-bottom: 0;
		border-right: 0;
		/* #endif */
	}



	/* #ifndef APP-NVUE */
	.fui-grid__item-border::before {
		content: " ";
		position: absolute;
		right: 0;
		top: 0;
		width: 1px;
		bottom: 0;
		border-right: 1px solid var(--fui-color-border, #EEEEEE);
		-webkit-transform-origin: 100% 0;
		transform-origin: 100% 0;
		-webkit-transform: scaleX(0.5);
		transform: scaleX(0.5);
	}

	.fui-grid__item-border::after {
		content: " ";
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		border-bottom: 1px solid var(--fui-color-border, #EEEEEE);
		-webkit-transform-origin: 0 100%;
		transform-origin: 0 100%;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	/* #endif */

	.fui-highlight:active {
		/* #ifdef APP-NVUE */
		background-color: rgba(0, 0, 0, 0.2) !important;
		/* #endif */

		/* #ifndef APP-NVUE */
		background-color: var(--fui-color-hover, rgba(0, 0, 0, 0.2)) !important;
		/* #endif */
	}
</style>