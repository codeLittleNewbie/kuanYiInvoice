// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import store from './store'
import {
  Button,
  Header,
  Cell,
  TabContainer, TabContainerItem,
  Field,
  Popup,
  Spinner,Radio,
  Picker,Badge
} from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'font-awesome/css/font-awesome.css'


// mint-ui按需就不能使用use方式了->tip
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Field.name, Field);
Vue.component(Popup.name, Popup);
Vue.component(Spinner.name, Spinner);
Vue.component(Picker.name, Picker);
Vue.component(Radio.name, Radio);
Vue.component(Badge.name, Badge);



import request from './plugins/request'
import checkPhone from './plugins/checkPhone'
import functions from './plugins/function'
import wx from './plugins/weixin-js-sdk'

Vue.use(wx);
Vue.use(request);
Vue.use(checkPhone);
Vue.use(functions);


// 切换路由之后页面置于顶端
/*router.beforeEach(function() {
  window.scrollTo(0, 0)
});*/

/*if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}*/

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
