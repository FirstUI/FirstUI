<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Pagination</view>
			<view class="fui-page__desc">Pagination 分页器，当数据量过多时，使用分页分解数据。</view>
		</view>
		<view class="fui-page__bd fui-page__spacing">
			<view class="fui-section__title">基础使用</view>
			<fui-pagination :total="100" @change="change"></fui-pagination>
			<view class="fui-section__title">样式调整</view>
			<fui-pagination :total="100" color="#FFB703" background="transparent" currentColor="#FFB703"></fui-pagination>
			<view class="fui-section__title">自定义按钮内容</view>
			<fui-pagination :total="100" custom background="transparent">
				<template v-slot:prev>
					<fui-icon name="arrowleft"></fui-icon>
				</template>
				<template v-slot:next>
					<fui-icon name="arrowright"></fui-icon>
				</template>
			</fui-pagination>
			<view class="fui-section__title">不显示页码</view>
			<view class="fui-page__wrap">
				<fui-pagination :total="100" :isPage="false" borderColor="#09BE4F" color="#09BE4F" background="transparent"></fui-pagination>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			change(e) {
				console.log(e)
			}

		}
	}
</script>

<style>
	page {
		font-weight: normal;
	}
	.fui-page__wrap{
		padding: 0 120rpx;
		box-sizing: border-box;
	}
</style>
