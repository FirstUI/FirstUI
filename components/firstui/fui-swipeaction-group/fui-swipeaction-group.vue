<template>
	<view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "fui-swipeaction-group",
		data() {
			return {};
		},
		created() {
			this.children = [];
		},
		methods: {
			reset() {
				// wxs 会自己计算组件大小，所以无需执行下面代码
				// #ifndef APP-VUE || H5 || MP-WEIXIN
				this.children.forEach(child => {
					child.init()
				})
				// #endif
			},
			close() {
				this.children.forEach(child => {
					// #ifdef APP-VUE || H5 || MP-WEIXIN
					child.isShow = false;
					// #endif

					// #ifndef APP-VUE || H5 || MP-WEIXIN
					child.close()
					// #endif
				})
			},
			closeAuto(child) {
				// #ifndef APP-VUE || H5 || MP-WEIXIN
				if (this.openItem && this.openItem !== child) {
					this.openItem.close()
				}
				this.openItem = child
				// #endif

				// #ifdef APP-VUE || H5 || MP-WEIXIN
				this.children.forEach(item => {
					if (item !== child) {
						item.isShow = false;
					}
				})
				// #endif
			}
		}
	}
</script>

<style scoped></style>
