/*
  组件属性全局配置文件。优先级：全局配置文件props < 直接设置组件props
  目前支持配置的组件：fui-button、fui-icon、fui-text、fui-input、fui-form-item、fui-list-cell
*/

// 主色（V1.9.8+），仅Nvue端以及无法使用css变量控制颜色的组件使用【保持与fui-theme中一致】
const color = {
	primary: '#465CFF',
	success: '#09BE4F',
	warning: '#FFB703',
	danger: '#FF2B2B',
	purple: '#6831FF',
	link: '#465CFF'
}

//全局方法（V1.9.8+）
const app = {
	toast: function(text, icon = 'none') {
		text && uni.showToast({
			title: text,
			icon: icon,
			duration: 2000
		})
	},
	modal: function(title, content, callback, showCancel, confirmColor, confirmText) {
		uni.showModal({
			title: title,
			content: content,
			showCancel: showCancel || false,
			// #ifndef MP-TOUTIAO
			cancelColor: "#7F7F7F",
			confirmColor: confirmColor || color.primary,
			// #endif
			confirmText: confirmText || "确定",
			success(res) {
				if (res.confirm) {
					callback && callback(true)
				} else {
					callback && callback(false)
				}
			},
			fail(err) {
				console.log(err)
			}
		})
	},
	href(url, isMain) {
		if (isMain) {
			uni.switchTab({
				url: url
			})
		} else {
			uni.navigateTo({
				url: url
			});
		}
	}
}

const fuiConfig = {
	//组件名称，小驼峰命名
	//如fui-button写成fuiButton
	fuiButton: {
		//组件属性值
		height: '96rpx',
		size: 32,
		radius: '16rpx'
	},
	fuiIcon: {
		size: 64,
		unit: 'rpx',
		//V1.9.8+
		color: ''
	},
	fuiText: {
		size: 32,
		unit: 'rpx',
		//仅Nvue有效，black 默认颜色，V1.9.8+
		color: ''
	},
	fuiInput: {
		labelSize: 32,
		size: 32
	},
	fuiFormItem: {
		labelSize: 32,
		labelWidth: 160,
		labelRight: 30,
		labelWeight: 400,
		labelAlign: 'left',
		asteriskPosition: 'left'
	},
	// V1.9.8+
	fuiListCell: {
		padding: ['32rpx', '32rpx'],
		arrowColor: '',
		//仅Nvue有效
		borderColor: '',
		bottomLeft: 32
	},
	// V1.9.9+
	fuiSection: {
		size: 32,
		color: '#181818',
		fontWeight: 600,
		descrSize: 28,
		descrColor: '#B2B2B2',
		descrTop: 12
	},
	color,
	...app
}

export default fuiConfig