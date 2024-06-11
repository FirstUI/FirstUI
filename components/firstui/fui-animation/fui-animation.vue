<template>
	<view class="fui-popup__animation" :class="[ani.in]" :style="transformStyles" @tap="change" v-if="isShow"
		ref="fui_ani">
		<slot></slot>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation');
	// #endif

	export default {
		name: 'fui-animation',
		emits: ['click', 'change'],
		props: {
			//是否显示
			show: {
				type: Boolean,
				default: false
			},
			/*
			 过渡动画类型
			  ['fade,'slide-top','slide-right','slide-bottom','slide-left','zoom-in','zoom-out']
			*/
			animationType: {
				type: Array,
				default () {
					return [];
				}
			},
			duration: {
				type: Number,
				default: 300
			},
			//styles 组件样式，同 css 样式
			styles: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				isShow: false,
				transform: '',
				ani: {
					in: '',
					active: ''
				}
			};
		},
		watch: {
			show: {
				handler(newVal) {
					if (newVal) {
						this.open();
					} else {
						this.isShow && this.close();
					}
				},
				immediate: true
			}
		},
		computed: {
			stylesObject() {
				//默认值
				const defStyles = {
					position: 'fixed',
					bottom: 0,
					top: 0,
					left: 0,
					right: 0,
					// #ifndef APP-NVUE
					display: 'flex',
					// #endif
					'justify-content': 'center',
					'align-items': 'center'
				};
				const mergeStyles = Object.assign({}, defStyles, this.styles);
				const styles = {
					...mergeStyles,
					'transition-duration': this.duration / 1000 + 's'
				};
				let transfrom = '';
				for (let i in styles) {
					let line = this.toLine(i);
					transfrom += line + ':' + styles[i] + ';';
				}
				return transfrom;
			},
			transformStyles() {
				return `transform:${this.transform};${this.stylesObject}`
			}
		},
		methods: {
			change() {
				this.$emit('click', {
					detail: this.isShow
				});
			},
			open() {
				clearTimeout(this.timer);
				this.isShow = true;
				this.transform = '';
				this.ani.in = '';
				for (let i in this.getTranfrom(false)) {
					if (i === 'opacity') {
						this.ani.in = 'fui-popup__fade-out';
					} else {
						this.transform += `${this.getTranfrom(false)[i]} `;
					}
				}
				this.$nextTick(() => {
					setTimeout(() => {
						this._animation(true);
					}, 50);
				});
			},
			close(type) {
				clearTimeout(this.timer);
				this._animation(false);
			},
			_animation(type) {
				let styles = this.getTranfrom(type);
				// #ifdef APP-NVUE
				if (!this.$refs['fui_ani']) return;
				animation.transition(
					this.$refs['fui_ani'].ref, {
						styles,
						duration: this.duration, //ms
						timingFunction: 'ease',
						needLayout: false,
						delay: 0 //ms
					},
					() => {
						if (!type) {
							this.isShow = false;
						}
						this.$emit('change', {
							detail: this.isShow
						});
					}
				);
				// #endif
				// #ifndef APP-NVUE
				this.transform = '';
				for (let i in styles) {
					if (i === 'opacity') {
						this.ani.in = `fui-popup__fade-${type ? 'in' : 'out'}`;
					} else {
						this.transform += `${styles[i]} `;
					}
				}
				this.timer = setTimeout(() => {
					if (!type) {
						this.isShow = false;
					}
					this.$emit('change', {
						detail: this.isShow
					});
				}, this.duration);
				// #endif
			},
			getTranfrom(type) {
				let styles = {
					transform: ''
				};
				this.animationType.forEach(mode => {
					switch (mode) {
						case 'fade':
							styles.opacity = type ? 1 : 0;
							break;
						case 'slide-top':
							styles.transform += `translateY(${type ? '0' : '-100%'}) `;
							break;
						case 'slide-right':
							styles.transform += `translateX(${type ? '0' : '100%'}) `;
							break;
						case 'slide-bottom':
							styles.transform += `translateY(${type ? '0' : '100%'}) `;
							break;
						case 'slide-left':
							styles.transform += `translateX(${type ? '0' : '-100%'}) `;
							break;
						case 'zoom-in':
							styles.transform += `scale(${type ? 1 : 0.8}) `;
							break;
						case 'zoom-out':
							styles.transform += `scale(${type ? 1 : 1.2}) `;
							break;
					}
				});
				return styles;
			},
			toLine(name) {
				return name.replace(/([A-Z])/g, '-$1').toLowerCase();
			}
		}
	};
</script>

<style scoped>
	.fui-popup__animation {
		transition-timing-function: ease;
		transition-duration: 0.3s;
		transition-property: transform, opacity;
		position: relative;
		z-index: 99;
	}

	.fui-popup__fade-out {
		opacity: 0;
	}

	.fui-popup__fade-in {
		opacity: 1;
	}
</style>