<template>
	<view :class="{'fui-form__field':hidden}">
		<slot></slot>
	</view>
</template>

<script>
	//此组件只为form表单提交传递数据使用，暂时用于微信小程序/百度小程序/QQ小程序
	export default {
		name: "fui-form-field",
		// #ifndef VUE3
		behaviors: ['uni://form-field'],
		// #endif
		props: {
			//是否为隐藏域
			hidden: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style scoped>
	.fui-form__field {
		display: none;
		opacity: 0;
	}
</style>
