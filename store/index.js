import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		//当前版本
		version: "1.2.0",
		//主题 light、dark
		theme: uni.getStorageSync('fui_theme') || 'light'
	},
	mutations: {
		setTheme(state, theme) {
			state.theme = theme || 'light'
		}
	},
	actions: {

	}
})

export default store
