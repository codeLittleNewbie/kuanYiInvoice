function checkPhone(phone){
  if(!(/^1[34578]\d{9}$/.test(phone))){
    return false;
  }else {
    return true;
  }
}

var MyPlugin = {};

MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.prototype.checkPhone = checkPhone;

};

export default MyPlugin;
