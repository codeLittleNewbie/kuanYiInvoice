import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    /************************** 首页 ***********************/
    {
      path: '/',
      name: 'home',
      component: function (resolve) {
        require(['../components/home/Index.vue'], resolve)
      }
    },
    /************************** 成功 ***********************/
    {
      path: '/success',
      name: 'success',
      component: function (resolve) {
        require(['../components/success/index.vue'], resolve)
      }
    },
    /************************** 失败 ***********************/
    {
      path: '/failure',
      name: 'failure',
      component: function (resolve) {
        require(['../components/failure/index.vue'], resolve)
      }
    },
  ]
})
