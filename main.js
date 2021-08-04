import Vue from 'vue'
import App from './App'
import fui from './common/fui-app'
import store from './store'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$store = store
Vue.prototype.fui = fui
const app = new Vue({
	store,
	...App
})
app.$mount()
