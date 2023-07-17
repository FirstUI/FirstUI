// #ifndef APP-PLUS|| MP-WEIXIN  ||  H5

const MIN_DISTANCE = 10;
export default {
	data() {
		const elClass = `fui_sa_${Math.ceil(Math.random() * 10e5).toString(36)}`
		return {
			left: 0,
			isShow: false,
			ani: false,
			moveLeft: '',
			elClass
		}
	},
	watch: {
		show(newVal) {
			// if (this.autoClose) return
			this.openState(newVal)
		},
		left() {
			this.moveLeft = `translateX(${this.left}px)`
		},
		isShow(newVal) {
			// if (this.autoClose) return
			this.openState(newVal)
		},
		buttons() {
			this.init()
		}
	},
	mounted() {
		this.$nextTick(()=>{
			this.group = this.getParent()
			if (this.group.children !== undefined) {
				this.group.children.push(this)
			}
			this.init()
		})
	},
	methods: {
		init() {
			clearTimeout(this.timer)
			this.timer = setTimeout(() => {
				this.getSelectorQuery()
			}, 100)
			this.left = 0
			this.x = 0
		},
		closeSwipe(e) {
			if (!this.autoClose) return
			this.group && this.group.closeAuto(this)
		},
		//解决 ios 13 点击区域错位的问题
		appTouchStart(e) {
			const {
				clientX
			} = e.changedTouches[0]
			this.clientX = clientX
			this.timestamp = new Date().getTime()
		},
		appTouchEnd(e, index, item) {
			const {
				clientX
			} = e.changedTouches[0]
			let diff = Math.abs(this.clientX - clientX)
			let time = (new Date().getTime()) - this.timestamp
			if (diff < 40 && time < 300) {
				this.$emit('click', {
					item,
					index,
					param: this.param
				})
			}
		},
		touchstart(e) {
			if (this.disabled) return
			this.ani = false
			this.x = this.left || 0
			this.stopTouchStart(e)
			this.autoClose && this.closeSwipe()
		},
		touchmove(e) {
			if (this.disabled) return
			// 是否可以滑动页面
			this.stopTouchMove(e);
			if (this.direction !== 'horizontal') {
				return;
			}
			this.move(this.x + this.deltaX)
			return false
		},
		touchend() {
			if (this.disabled) return
			this.moveDirection(this.left)
		},
		move(value) {
			value = value || 0
			const rightWidth = this.rightWidth
			this.left = Math.min(Math.max(value, -rightWidth), 0);
		},
		moveDirection(left) {
			const threshold = Number(this.threshold)
			const open = this.open || false
			const leftWidth = this.leftWidth
			const rightWidth = this.rightWidth
			if (this.deltaX === 0) {
				this.openState(false)
				return
			}
			if ((!open && rightWidth > 0 && -left > threshold) || (open && rightWidth > 0 && rightWidth + left <
					threshold)) {
				this.openState(true)
			} else {
				this.openState(false)
			}
		},
		openState(type) {
			const rightWidth = this.rightWidth
			let left = ''
			this.open = this.open ? this.open : false
			if (type) {
				left = -rightWidth
			} else {
				left = 0
			}
			if (this.open !== type) {
				this.$emit('change', {
					isOpen: type,
					param: this.param
				})
			}

			this.open = type
			// 添加动画类
			this.ani = true
			this.$nextTick(() => {
				this.move(left)
			})
		},
		close() {
			this.openState(false)
		},
		getDirection(x, y) {
			if (x > y && x > MIN_DISTANCE) {
				return 'horizontal';
			}
			if (y > x && y > MIN_DISTANCE) {
				return 'vertical';
			}
			return '';
		},
		resetTouchStatus() {
			this.direction = '';
			this.deltaX = 0;
			this.deltaY = 0;
			this.offsetX = 0;
			this.offsetY = 0;
		},
		stopTouchStart(event) {
			this.resetTouchStatus();
			const touch = event.touches[0];
			this.startX = touch.clientX;
			this.startY = touch.clientY;
		},
		stopTouchMove(event) {
			const touch = event.touches[0];
			this.deltaX = touch.clientX - this.startX;
			this.deltaY = touch.clientY - this.startY;
			this.offsetX = Math.abs(this.deltaX);
			this.offsetY = Math.abs(this.deltaY);
			this.direction = this.direction || this.getDirection(this.offsetX, this.offsetY);
		},

		getSelectorQuery() {
			uni.createSelectorQuery()
				// #ifndef MP-ALIPAY
				.in(this)
				// #endif
				.select('.' + this.elClass)
				.boundingClientRect(data => {
					if (data.length === 0) return
					this.rightWidth = data.width || 0
					this.isShow = this.show
				})
				.exec()
		}
	}
}

// #endif

// #ifdef APP-PLUS|| MP-WEIXIN  ||  H5
export default {}
// #endif
