<template>
	<view :class="{'fui-loading__mask':(isMask || isNvue) && isFixed}">
		<view class="fui-loading fui-loading__wrap" :class="{'fui-loading__fixed':isFixed && !isNvue}"
			:style="{ backgroundColor: backgroundColor,position:isFixed && !isNvue?'fixed':'static' }"
			v-if="type === 'col'">
			<image ref="fui_loading" class="fui-loading__ani" :src="srcCol"></image>
			<text class="fui-loading__text"
				:style="{color:colColor,fontSize:size+'rpx','line-height':size+'rpx'}">{{ text }}</text>
		</view>
		<view v-else class="fui-loading fui-loading__row" :class="{'fui-loading__fixed':isFixed && !isNvue}"
			:style="{position:isFixed && !isNvue?'fixed':'static'}">
			<!-- <loading-indicator :animating="true"></loading-indicator> -->
			<image ref="fui_loading" class="fui-loading-row__ani" :src="srcRow"></image>
			<text class="fui-loading__text"
				:style="{color:rowColor,fontSize:size+'rpx','line-height':size+'rpx'}">{{ text }}</text>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation');
	// #endif
	export default {
		name: "fui-loading",
		props: {
			//col、row
			type: {
				type: String,
				default: 'col'
			},
			//提示文字
			text: {
				type: String,
				default: '加载中'
			},
			//文本颜色，type=col时生效
			colColor: {
				type: String,
				default: '#FFFFFF'
			},
			//文本颜色，type=row时生效
			rowColor: {
				type: String,
				default: '#7F7F7F'
			},
			//字体大小，单位rpx
			size: {
				type: [Number, String],
				default: 26
			},
			//loading背景色，type=col时生效
			backgroundColor: {
				type: String,
				default: 'rgba(0, 0, 0, 0.6)'
			},
			//loading icon图片地址，type=col时生效
			srcCol: {
				type: String,
				default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAARVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////9SnXPCAAAAFnRSTlMA8ECgECCAYDDQ4MCwUL9wkN9vP49fRXb34AAAA1dJREFUaN7tmtmSozAMReXdxuyk+f9PnaW6o06CAdtSumqG8xqSi6QrGwfBxcXFD2OW5cP+pVsWDe9AL7YP6xO9mj1w0t3CmkK0H0yhd0qsBzBoazutZxDKACFSrefpJZmFUfad0vpVtonWOvkHZ62Kzas0QcLnJ0dFuxGOHNqny8QMVfjw6By5c+n4GHnwVOGq7tiDD3G74uq234Idzbmue7hVXZtmYfEncqRDicekKPSo+Z6o/EI7bB6Zfc+hXBl1R13V+0Jm6uL3inCiKGZX6g7ENwXKrrwfEB3uyubszYovXahBx3ve9LkvoG4lcc36pf7zagu16JCzeo4E8aLy+TJL1CXAfJWtP7zHKcsPp+NYh6NEY2posOeSbT4v64CMiLU7dvQIVGAsqzyuSKOBEHvCXwHvjZAGQ94PuAVaJIa8X2EDxMSDkGXh0lG9KCkMmCnkbdNq6oARt7t8Oa6A0dhhx1oREPpe9ukVxgEHBnOdyLQAHkI61wqtxcCQ9rXATDPgk9uef7kjFl+PiRJH4EKlijwmniyp15DEqtYBFz7VyQKXLR5ST9iJLibvZLuZiQh8qO1+kizPHq+hNXpT2AIjrlnX+GIii8J8eJPatyQwcwn/j8ISu5uZwj7+d4QBl8w3I3CT4EOnjjcCeJHJXUsDJ35LeHhDPw0yaesROIkmaesAjJgVtmjZizygd99b5CnunCQVsNGlFsbAnOs+tfkNTMdFzOjuqb0HJlR6J4h4uKHH7CSz47SX2tsIGr6Dm9mNyPGFrHZrqBuuKvuD1dhxGbs/6tOGuJcxoObMM5/QQIoWx8G0HA99IwZ89EZzAEI6PKMc+kt4ykRjix4ne6IrczhjGmzmoAn/dOlyXpgrumPoeLrr6JRd1hOkJVN2mW9mFZGywwbJU+51pa/QWJnKk6/o3xbX/Xxl0ZUPvxXp4nREqyuG31zZnFD5nJHp8ZsVc0I9NkTOFFsw9UN7t5x8W1E9oQSdyJ2p1fP04srKSUUlz0zLiqQlKwbwppvfVZ0DjvkR/bWO2urDbIp2t2n9knWk/+ojorfzsty9v8y2n/DTZgBKZLueInZAjR7CkWoYDLBgXCvSs/uoyoJ3Y3zWjOPg4T14KQf7m0FKqeHi4uJH+QUYYoTOYC/s2wAAAABJRU5ErkJggg=='
			},
			//loading icon图片地址，type=row时生效
			srcRow: {
				type: String,
				default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAMAAAAPdrEwAAAAM1BMVEUAAACPj4+IiIiIiIiIiIiIiIiKioqHh4eHh4eHh4eHh4eIiIiIiIiJiYmIiIiJiYmIiIi8awvKAAAAEHRSTlMAEEDw4NAwwKAgYICQULBwL0wVnQAAAmpJREFUWMPtmOmO4yAQhLlvMO//tDuyjfAaCEcj7UqTT5o/iafSVLcLY/TldyHID8fPH94oir2TLD6QyugdxVoeazAnYPUaFtsws+yNVjR+htolcWz/luHyhL7F55XNQ0Narx+L8TY8bSGTXsiYUB5V8A+zHJ4rud+p3GI+PiwqCXv0Ec+T42awf3L8+iMtzwwp36UEPHR1SIYPKueS+xxJe1CZiYkooNmTvjLHUzHDR7TVgnI2UXR9k/OhQHslieKCcb87reRnB5fCzMeTVp5cUbeY8O6arEYknYs60CJXK21zOvot7DSK4lrR51eA7dQ1y1bFF9MT2Chb358DsLHeLJeKhpZdDgkDFp1jQtRGXiEYOtZU1PLdUt7OFT84gnJUHNE5XOCO2PLnCALDzl21HD2Yam4ZRU9kER8Qs/V7IQ7BIWVqp10TTCFN0gdgwvumJmkcwWDFgigsQtv4Sv8baZ2lt5Pn+n+Wfm+CMsUsHFIJQ7VH+l2hSXsaHFUbEb1l2GRt5zFb/FC1nSfskGam+lSP4cqmks10jyOc1fditiGMXD1G4DekTH5sf14gkTeD1QOdbrRLXodGAKb1hC7gh5nmvzvgI0NoHyswA1niP7WKQE4dmtYHDH4MwzxS3T2MmCWje5OL2aK26j9EC7qkrVIk97XtrM+RYzSoHSZmUCTlLoLNvTs+aFLug+XEu2Mt59boRl9+4vk7gbD79fXnii2dsS6Xc4lb3fx5lX1bfKfPD1HJInetS64lJQnxhkrryV2+INbxeCHXN1PtaGxClUYgvGJ1XY82IA7Fn7IyFO7DIDcYfflN/AFNdjdeDj7M+wAAAABJRU5ErkJggg=='
			},
			isFixed: {
				type: Boolean,
				default: true
			},
			//是否需要透明遮罩，非nvue有效，nvue默认带遮罩，isFixed为true时生效
			isMask: {
				type: Boolean,
				default: false
			}
		},
		data() {
			let isNvue = false;
			// #ifdef APP-NVUE
			isNvue = true;
			// #endif
			return {
				isNvue: isNvue,
				// #ifdef APP-NVUE
				deg: 0,
				stop: false
				// #endif
			}
		},
		// #ifdef APP-NVUE
		mounted() {
			this._animation()
		},
		// #endif
		//nvue暂不支持vue3，所以不需要做兼容,此处以防后续兼容
		// #ifdef APP-NVUE
		// #ifndef VUE3
		beforeDestroy() {
			this.deg = 0;
			this.stop = true;
		},
		// #endif
		// #ifdef VUE3
		beforeUnmount() {
			this.deg = 0;
			this.stop = true;
		},
		// #endif
		// #endif
		methods: {
			// #ifdef APP-NVUE
			_animation() {
				if (!this.$refs['fui_loading'] || this.stop) return;
				animation.transition(
					this.$refs['fui_loading'].ref, {
						styles: {
							transform: `rotate(${this.deg}deg)`
						},
						duration: 800, //ms
						timingFunction: 'linear',
						iterationCount: 'infinite',
						needLayout: false,
						delay: 0 //ms
					}, () => {
						this.deg += 360;
						this._animation()
					}
				);
			}
			// #endif
		}
	}
</script>

<style scoped>
	.fui-loading {
		/* #ifndef APP-NVUE */
		display: flex;
		margin: 0 auto;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.fui-loading__fixed {
		/* #ifndef APP-NVUE */
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		/* #endif */
		z-index: 1008;
	}

	.fui-loading__wrap {
		width: 208rpx;
		height: 208rpx;
		flex-direction: column;
		border-radius: 12rpx;
	}

	.fui-loading__ani {
		width: 64rpx;
		height: 64rpx;
		margin: 0 6px;
		/* #ifndef APP-NVUE */
		animation: rotate 0.85s linear infinite;
		/* #endif */
		margin-bottom: 30rpx;
	}

	.fui-loading__row {
		flex: 1;
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		height: 36rpx;
	}

	.fui-loading-row__ani {
		width: 36rpx;
		height: 36rpx;
		/* #ifdef APP-NVUE */
		border-radius: 36rpx;
		/* #endif */
		/* #ifndef APP-NVUE */
		display: block;
		border-radius: 50%;
		animation: rotate 0.85s linear infinite;
		/* #endif */
		margin-right: 20rpx;
	}

	.fui-loading__text {
		text-align: center;
	}

	/* #ifndef APP-NVUE */
	@-webkit-keyframes rotate {
		from {
			transform: rotatez(0deg);
		}

		to {
			transform: rotatez(360deg);
		}
	}

	@keyframes rotate {
		from {
			transform: rotatez(0deg);
		}

		to {
			transform: rotatez(360deg);
		}
	}

	/* #endif */
	.fui-loading__mask {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0);
		z-index: 1002;

		/* #ifdef APP-NVUE */
		align-items: center;
		justify-content: center;
		/* #endif */
	}
</style>
