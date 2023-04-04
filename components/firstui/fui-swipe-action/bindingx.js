// #ifdef APP-NVUE
const BindingX = uni.requireNativePlugin('bindingx');
const dom = uni.requireNativePlugin('dom');
const animation = uni.requireNativePlugin('animation');

export default {
	data() {
		return {}
	},
	watch: {
		show(newVal) {
			if (this.autoClose) return
			if (this.stop) return
			this.stop = true
			if (newVal) {
				this.open(newVal)
			} else {
				this.close()
			}
		},
		buttons(newVal) {
			this.init()
		}
	},
	created() {
		this.group = this.getParent()
		if (this.group.children !== undefined) {
			this.group.children.push(this)
		}
	},
	mounted() {
		this.box = this.getEl(this.$refs['fui_swipea_wrap'])
		this.selector = this.getEl(this.$refs['fui_swipea_content']);
		this.rightButton = this.getEl(this.$refs['fui_swipea_buttons']);
		this.init()
	},
	methods: {
		init() {
			this.$nextTick(() => {
				this.x = 0
				this.button = {
					show: false
				}
				setTimeout(() => {
					this.getSelectorQuery()
				}, 200)
			})
		},
		handleClick(e, index, item) {
			e.stopPropagation();
			this.$emit('click', {
				item,
				index,
				param: this.param
			})
		},
		touchstart(e) {
			if (this.disabled) return
			// 每次只触发一次，避免多次监听造成闪烁
			if (this.stop) return
			this.stop = true
			if (this.autoClose) {
				this.group.closeAuto(this)
			}

			const rightWidth = this.button.right.width || 0
			let expression = this.range(this.x, -rightWidth, 0)
			let rightExpression = this.range(this.x + rightWidth, 0, rightWidth)

			this.eventpan = BindingX.bind({
				anchor: this.box,
				eventType: 'pan',
				props: [{
					element: this.selector,
					property: 'transform.translateX',
					expression
				}, {
					element: this.rightButton,
					property: 'transform.translateX',
					expression: rightExpression
				}]
			}, (e) => {
				if (e.state === 'end') {
					this.x = e.deltaX + this.x;
					this.isclick = true
					this.bindTiming(e.deltaX)
				}
			});
		},
		touchend(e) {
			if (this.isopen && !this.isclick) {
				this.open(false)
			}
		},
		bindTiming(x) {
			const left = this.x
			const rightWidth = this.button.right.width || 0
			const threshold = Number(this.threshold)
			if (!this.isopen) {
				if (left < -threshold) {
					this.open(true)
				} else {
					this.open(false)
				}
			} else {
				if ((x < threshold && x > 0) || (x < -threshold)) {
					this.open(true)
				} else {
					this.open(false)
				}
			}
		},
		range(num, mix, max) {
			return `min(max(x+${num}, ${mix}), ${max})`
		},
		open(type) {
			this.animation(type)
		},
		close() {
			this.animation(false)
		},
		animation(type) {
			const time = 300
			const rightWidth = this.button.right.width || 0
			if (this.eventpan && this.eventpan.token) {
				BindingX.unbind({
					token: this.eventpan.token,
					eventType: 'pan'
				})
			}

			if (type) {
				Promise.all([
					this.move(this.selector, -rightWidth),
					this.move(this.rightButton, 0)
				]).then(() => {
					this.setEmit(-rightWidth, type)
				})
			} else {
				Promise.all([
					this.move(this.selector, 0),
					this.move(this.rightButton, rightWidth)
				]).then(() => {
					this.setEmit(0, type)
				})
			}
		},
		setEmit(x, type) {
			const rightWidth = this.button.right.width
			this.isopen = this.isopen || false
			this.stop = false
			this.isclick = false
			if (this.isopen !== type && this.x !== x) {
				if (type && rightWidth > 0) {
					this.$emit('change', {
						isOpen: true,
						param: this.param
					})
				}
				if (!type) {
					this.$emit('change', {
						isOpen: false,
						param: this.param
					})
				}
			}
			this.x = x
			this.isopen = type
		},
		move(ref, value) {
			return new Promise((resolve, reject) => {
				animation.transition(ref, {
					styles: {
						transform: `translateX(${value})`,
					},
					duration: 150, //ms
					timingFunction: 'linear',
					needLayout: false,
					delay: 0 //ms
				}, function(res) {
					resolve(res)
				})
			})

		},
		getEl(el) {
			return el.ref
		},
		getSelectorQuery() {
			Promise.all([
				this.getDom(),
			]).then((data) => {
				// let show = false
				// if (!this.autoClose) {
				// 	show = this.show
				// }
				// if (show) {
				// 	this.open(show)
				// }
				this.open(this.show)
			})

		},
		getDom() {
			return new Promise((resolve, reject) => {
				dom.getComponentRect(this.$refs['fui_swipea_buttons'], (data) => {
					if (data) {
						this.button['right'] = data.size
						resolve(data)
					} else {
						reject()
					}
				})
			})
		}
	}
}

// #endif

// #ifndef APP-NVUE
export default {}
// #endif
