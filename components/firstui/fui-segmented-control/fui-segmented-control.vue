<template>
	<view class="fui-segmented__control" :class="{'fui-segmented__disabled':disabled}"
		:style="{marginTop:marginTop+'rpx',marginBottom:marginBottom+'rpx'}">
		<view class="fui-segmented__item" v-for="(item,index) in vals" :key="index"
			:style="{borderTopLeftRadius:index===0?radius+'rpx':'0',borderBottomLeftRadius:index===0?radius+'rpx':'0',borderTopRightRadius:index===values.length - 1?radius+'rpx':'0',borderBottomRightRadius:index===values.length - 1?radius+'rpx':'0',borderColor:type==='button'?color:'transparent',background:currentIndex===index && type==='button'?color:'transparent',height:height+'rpx'}"
			:class="{'fui-segmented__first':index===0 && type==='button','fui-seg__item-bg':currentIndex===index && !color && type==='button','fui-seg__item-border':!color && type==='button','fui-segmented__item-border':type==='button'}"
			@click="handleClick(index)">
			<text
				:style="{fontSize:size+'rpx',color:currentIndex===index?activeColor:color,fontWeight:bold && currentIndex===index ?600:400}"
				:class="{'fui-segmented__disabled':item.disabled,'fui-seg__text-color':!color && currentIndex!==index}">{{item.name}}</text>
			<view class="fui-segmented__item-line" v-if="currentIndex===index && type==='text'"
				:style="{background:activeColor}"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "fui-segmented-control",
		emits: ['click'],
		props: {
			values: {
				type: Array,
				default () {
					return []
				}
			},
			current: {
				type: Number,
				default: 0
			},
			//button、text
			type: {
				type: String,
				default: 'button'
			},
			color: {
				type: String,
				// #ifdef APP-NVUE
				default: '#465CFF'
				// #endif

				// #ifndef APP-NVUE
				default: ''
				// #endif
			},
			activeColor: {
				type: String,
				default: '#fff'
			},
			bold: {
				type: Boolean,
				default: false
			},
			height: {
				type: [Number, String],
				default: 64
			},
			size: {
				type: [Number, String],
				default: 28
			},
			radius: {
				type: [Number, String],
				default: 8
			},
			disabled: {
				type: Boolean,
				default: false
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
			return {
				currentIndex: 0,
				vals: []
			};
		},
		watch: {
			current(val) {
				if (val !== this.currentIndex) {
					this.currentIndex = val
				}
			},
			values(vals) {
				this.initData(vals)
			}
		},
		created() {
			this.currentIndex = this.current
			this.initData(this.values)
		},
		methods: {
			initData(vals) {
				if (vals && vals.length > 0) {
					if (typeof vals[0] === 'object') {
						this.vals = vals;
					} else {
						//字符串
						this.vals = vals.map(item => {
							return {
								name: item
							}
						})
					}
				}
			},
			handleClick(index) {
				let vals = this.vals[index];
				if (this.currentIndex !== index && !this.disabled && !vals.disabled) {
					this.currentIndex = index
					this.$emit('click', {
						index: index,
						...vals
					})
				}
			}
		}
	}
</script>

<style scoped>
	.fui-segmented__control {
		flex: 1;
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		overflow: hidden;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.fui-segmented__item {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		box-sizing: border-box;
		transition: all 0.1s linear;
		/* #endif */
		flex: 1;
		justify-content: center;
		align-items: center;
		border-style: solid;
		border-top-width: 0;
		border-bottom-width: 0;
		border-right-width: 0;
		border-left-width: 0;
		position: relative;
	}

	.fui-segmented__item-border {
		/* #ifdef APP-NVUE */
		border-top-width: 0.5px;
		border-bottom-width: 0.5px;
		border-right-width: 0.5px;
		/* #endif */
		
		/* #ifndef APP-NVUE */
		border-top-width: 1px;
		border-bottom-width: 1px;
		border-right-width: 1px;
		/* #endif */
	}

	.fui-segmented__item-line {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 2px;
	}

	.fui-segmented__disabled {
		opacity: 0.5;
		/* #ifdef H5 */
		cursor: not-allowed !important;
		/* #endif */
	}

	.fui-segmented__first {
		border-left-style: solid;
		/* #ifndef APP-NVUE */
		border-left-width:1px;
		/* #endif */
		
		/* #ifdef APP-NVUE */
		border-left-width: 0.5px;
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	.fui-seg__item-bg {
		background: var(--fui-color-primary, #465CFF) !important;
	}

	.fui-seg__item-border {
		border-color: var(--fui-color-primary, #465CFF) !important;
	}

	.fui-seg__text-color {
		color: var(--fui-color-primary, #465CFF) !important;
	}

	/* #endif */
</style>
