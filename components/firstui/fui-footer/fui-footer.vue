<template>
	<view class="fui-footer" :class="[isFixed?'fui-footer__fixed-bottom':'']" :style='{background:background}'>
		<view class="fui-footer__link" v-if="navigate.length>0">
			<navigator v-for="(item,index) in navigate" :key="index" class="fui-link__item" hover-class="fui-link-hover"
				hover-stop-propagation :open-type="item.openType || 'navigate'" :url="item.url" :delta="item.delta">
				<text class="fui-link__text"
					:class="{'fui-link__color':!item.color,'fui-link__text-border':index===navigate.length-1}"
					:style="{color:item.color || linkColor,fontSize:(item.size || 28)+'rpx',borderColor:borderColor,lineHeight:(item.size || 28)+'rpx'}">{{item.text}}</text>
			</navigator>
		</view>
		<view class="fui-footer__text" :class="{'fui-as__safe-weex':iphoneX && safeArea}">
			<text :style="{color:color,fontSize:size+'rpx'}">{{text}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "fui-footer",
		props: {
			//url，openType，delta ，text，color，size
			//链接设置  object数据格式对应上面注释的属性值
			navigate: {
				type: Array,
				default: function() {
					return []
				}
			},
			//底部文本
			text: {
				type: String,
				default: ''
			},
			//文本字体颜色
			color: {
				type: String,
				default: "#B2B2B2"
			},
			//文本字体大小
			size: {
				type: [Number, String],
				default: 24
			},
			//footer背景颜色
			background: {
				type: String,
				default: "transparent"
			},
			//分隔线颜色，仅nvue生效
			borderColor: {
				type: String,
				default: '#B2B2B2'
			},
			//是否固定在底部
			isFixed: {
				type: Boolean,
				default: false
			},
			//是否适配底部安全区
			safeArea: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			linkColor() {
				const app = uni && uni.$fui && uni.$fui.color;
				return (app && app.link) || '#465CFF';
			}
		},
		data() {
			return {
				iphoneX: false
			}
		},
		created() {
			// #ifdef APP-NVUE || MP-TOUTIAO
			this.iphoneX = this.isPhoneX();
			// #endif
		},
		methods: {
			// #ifdef APP-NVUE || MP-TOUTIAO
			isPhoneX() {
				if (!this.safeArea) return false;
				//34px
				const res = uni.getSystemInfoSync();
				let iphonex = false;
				let models = ['iphonex', 'iphonexr', 'iphonexsmax', 'iphone11', 'iphone11pro', 'iphone11promax',
					'iphone12', 'iphone12mini', 'iphone12pro', 'iphone12promax', 'iphone13', 'iphone13mini',
					'iphone13pro', 'iphone13promax', 'iphone14', 'iphone14mini',
					'iphone14pro', 'iphone14promax', 'iphone15'
				]
				const model = res.model.replace(/\s/g, "").toLowerCase()
				const newModel = model.split('<')[0]
				if (models.includes(model) || models.includes(newModel) || (res.safeAreaInsets && res.safeAreaInsets
						.bottom > 0)) {
					iphonex = true;
				}
				return iphonex;
			}
			// #endif
		}
	}
</script>

<style scoped>
	.fui-footer {
		flex: 1;
		/* #ifndef APP-NVUE */
		width: 100%;
		box-sizing: border-box;
		word-break: break-all;
		/* #endif */
		overflow: hidden;
		padding-top: 32rpx;
		padding-bottom: 32rpx;
		padding-left: 32rpx;
		padding-right: 32rpx;
	}

	.fui-footer__fixed-bottom {
		position: fixed;
		z-index: 99;
		bottom: 0;
		left: 0;
		right: 0;
		/* #ifndef APP-NVUE */
		left: constant(safe-area-inset-left);
		left: env(safe-area-inset-left);
		right: constant(safe-area-inset-right);
		right: env(safe-area-inset-right)
			/* #endif */
	}

	.fui-footer__link {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
	}

	/* #ifndef APP-NVUE */
	.fui-link__color {
		color: var(--fui-color-link, #465CFF) !important;
	}

	/* #endif */

	.fui-link__item {
		position: relative;
		line-height: 1;
	}


	.fui-link__text {
		padding: 0 18rpx;
		/* #ifdef APP-NVUE */
		border-right-width: 0.5px;
		border-right-style: solid;
		/* #endif */
		font-weight: 400;
	}

	.fui-link__text-border {
		border-right-width: 0;
	}


	/* #ifndef APP-NVUE */
	.fui-link__item::before {
		content: " ";
		position: absolute;
		right: 0;
		top: 4rpx;
		width: 1px;
		bottom: 4rpx;
		border-right: 1px solid var(--fui-color-label, #B2B2B2);
		-webkit-transform-origin: 100% 0;
		transform-origin: 100% 0;
		-webkit-transform: scaleX(0.5);
		transform: scaleX(0.5);
	}

	.fui-link__item:last-child::before {
		border-right: 0 !important
	}

	/* #endif */

	.fui-link-hover {
		opacity: 0.5
	}

	.fui-footer__text {
		flex: 1;
		/* #ifdef APP-NVUE */
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		/* #endif */
		line-height: 1;
		text-align: center;
		padding-top: 8rpx;
		/* #ifndef APP-NVUE || MP-TOUTIAO */
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		/* #endif */
		font-weight: 400;
	}

	/* #ifdef APP-NVUE || MP-TOUTIAO */
	.fui-as__safe-weex {
		padding-bottom: 34px;
	}

	/* #endif */
</style>