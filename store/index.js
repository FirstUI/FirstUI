// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
			// #endif

			// #ifdef VUE3
			import {
				createStore
			} from 'vuex'
			const store = createStore({
				// #endif
				state: {
					//当前版本
					version: "1.9.0",
					//主题 light、dark
					theme: uni.getStorageSync('fui_theme') || 'light',
					status: 0
				},
				mutations: {
					
				},
				actions: {
					
				}
			})

			export default store
