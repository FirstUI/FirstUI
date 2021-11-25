<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">InputNumber</view>
			<view class="fui-page__desc">InputNumber 数字输入框，该组件多用于购物车加减商品等场景。</view>
		</view>
		<view class="fui-page__bd fui-page__spacing">
			<view class="fui-section__title">基本使用</view>
			<fui-input-number></fui-input-number>
			<view class="fui-section__title">改变加减号颜色</view>
			<fui-input-number signColor="#FFB703" value="1.1" modelValue="1.1"></fui-input-number>
			<view class="fui-section__title">改变数字框背景色</view>
			<fui-input-number backgroundColor="#F1F4FA"></fui-input-number>
			<view class="fui-section__title">自定义加减号</view>
			<fui-input-number custom backgroundColor="#FFF" :size="30" :width="60" margin="0">
				<fui-icon name="minussign" :size="48" color="#FFB703"></fui-icon>
				<template v-slot:plus>
					<fui-icon name="plussign-fill" :size="48" color="#FFB703"></fui-icon>
				</template>
			</fui-input-number>
			<view class="fui-section__title">使用v-model：{{val}}</view>
			<fui-input-number v-model="val"></fui-input-number>
			<view class="fui-section__title">设置最小值和最大值</view>
			<fui-input-number :min="2" :max="9"></fui-input-number>
			<view class="fui-section__title">设置步长（步长0.1)</view>
			<fui-input-number :step="0.1"></fui-input-number>
			<view class="fui-section__title">禁用状态</view>
			<fui-input-number disabled></fui-input-number>
			<view class="fui-section__title">事件获取数字框的值: {{inputVal}}</view>
			<fui-input-number @change="change"></fui-input-number>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				val: 1,
				inputVal: ''
			}
		},
		methods: {
			change(e) {
				this.inputVal = e.value
			}
		}
	}
</script>

<style>
	page {
		font-weight: normal;
		background-color: #fff;
	}
</style>
