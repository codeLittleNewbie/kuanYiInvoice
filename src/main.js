// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  Button,
  Cell,
  DatetimePicker,
  Header,
  Tabbar, TabItem
} from 'mint-ui'
import 'mint-ui/lib/style.css'

// mint-ui按需就不能使用use方式了->tip
Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Header.name, Header);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
