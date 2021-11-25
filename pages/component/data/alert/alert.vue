<template>
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title">Alert</view>
			<view class="fui-page__desc">Alert 警告框。</view>
		</view>
		<view class="fui-page__bd fui-page__spacing">
			<view class="fui-section__title">基础使用</view>
			<fui-alert title="An info alert"></fui-alert>
			<fui-alert type="success" isLeft title="An success alert" :marginTop="24"></fui-alert>
			<fui-alert type="warn" isLeft title="An warn alert" :marginTop="24"></fui-alert>
			<fui-alert type="clear" isLeft title="An error alert" :marginTop="24"></fui-alert>
			<fui-alert isLeft title="An info alert" desc="Content of alert. Content of alert." :marginTop="24">
			</fui-alert>
			<fui-alert type="clear" isLeft title="An error alert" desc="Content of alert. Content of alert."
				:marginTop="24">
			</fui-alert>
			<fui-alert type="warn" isLeft title="An warn alert" desc="Content of alert. Content of alert."
				:marginTop="24">
			</fui-alert>
			<fui-alert type="success" title="An warn alert" desc="Content of alert. Content of alert." :marginTop="24">
			</fui-alert>
			<fui-alert type="info" title="An info alert" :marginTop="24"></fui-alert>
			<fui-alert type="clear" title="An success alert" :marginTop="24"></fui-alert>
			<fui-alert type="warn" title="An warn alert" :marginTop="24"></fui-alert>
			<view class="fui-section__title" v-if="show || shown">可关闭</view>
			<fui-alert closable title="An info alert" v-if="show" @close="close"></fui-alert>
			<fui-alert type="success" closable title="An info alert"
				desc="Content of alert. Content of alert.Content of alert." v-if="shown" @close="close2"
				:marginTop="24"></fui-alert>
			<view class="fui-section__title">自定义图标</view>
			<fui-alert type="info" isLeft spacing title="An info alert" size="28rpx">
				<fui-icon name="info" :size="48" color="#fff"></fui-icon>
			</fui-alert>
			<fui-alert type="success" isLeft spacing title="An info alert" size="28rpx" :marginTop="24">
				<fui-icon name="checkbox" :size="48" color="#fff"></fui-icon>
			</fui-alert>
			<fui-alert type="warn" isLeft spacing title="An info alert" size="28rpx" :marginTop="24">
				<fui-icon name="warning" :size="48" color="#fff"></fui-icon>
			</fui-alert>
			<fui-alert type="clear" isLeft spacing title="An info alert" size="28rpx" :marginTop="24">
				<fui-icon name="clear" :size="48" color="#fff"></fui-icon>
			</fui-alert>
			<view class="fui-section__title">自定义颜色</view>
			<fui-alert type="clear" iconColor="#FF2B2B" background="#fff" color="#181818" title="An info alert">
			</fui-alert>
			<fui-alert type="success" iconColor="#09BE4F" background="#fff" color="#181818" title="An info alert"
				:marginTop="24"></fui-alert>
			<fui-alert type="warn" iconColor="#FFB703" background="#fff" color="#181818" title="An info alert"
				:marginTop="24"></fui-alert>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				shown: true
			}
		},
		methods: {
			close() {
				this.show = false;
			},
			close2() {
				this.shown = false;
			}
		}
	}
</script>

<style>
	page {
		font-weight: normal;
	}
</style>
