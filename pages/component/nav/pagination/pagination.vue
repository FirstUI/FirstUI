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
			<fui-pagination :total="100" color="#FFB703" background="transparent"
				currentColor="#FFB703"></fui-pagination>
			<view class="fui-section__title">自定义按钮内容</view>
			<fui-pagination :total="100" custom background="transparent">
				<template v-slot:prev>
					<fui-icon name="arrowleft"></fui-icon>
				</template>
				<template v-slot:next>
					<fui-icon name="arrowright"></fui-icon>
				</template>
			</fui-pagination>
			<view class="fui-section__title">页码展开</view>
			<fui-pagination :total="1000" :pageType="2"></fui-pagination>
			<view class="fui-section__title">页码展开/调整样式</view>
			<view class="fui-pageno__wrap">
				<fui-pagination :total="1000" custom :pageType="2" :width="62" background="#FFB703"
					pageBgColor="rgba(255, 183, 3, .1)" activeBgColor="#FFB703">
					<template v-slot:prev>
						<fui-icon :size="40" name="arrowleft" color="#fff"></fui-icon>
					</template>
					<template v-slot:next>
						<fui-icon :size="40" name="arrowright" color="#fff"></fui-icon>
					</template>
				</fui-pagination>
			</view>
			<view class="fui-section__title">页码展开/按钮宽度设为60</view>
			<fui-pagination :total="1000" custom :pageType="2" :width="60" background="#09BE4F"
				pageBgColor="rgba(9, 190, 79, .05)" activeBgColor="#09BE4F">
				<template v-slot:prev>
					<fui-icon :size="40" name="arrowleft" color="#fff"></fui-icon>
				</template>
				<template v-slot:next>
					<fui-icon :size="40" name="arrowright" color="#fff"></fui-icon>
				</template>
			</fui-pagination>
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

	.fui-wrap {
		padding-bottom: 96rpx;
	}

	.fui-pageno__wrap {
		width: 100%;
		padding: 0 64rpx;
		box-sizing: border-box;
	}
</style>