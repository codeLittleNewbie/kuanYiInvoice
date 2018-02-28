var wx = require('weixin-js-sdk');

var MyPlugin = {};

MyPlugin.install = function (Vue, options) {
  Vue.prototype.wx = wx;
};

export default MyPlugin
