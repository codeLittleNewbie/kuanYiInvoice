/**
 * 检查当前value在数组中对应的索引值
 * @param item
 * @param arr
 * @returns {*}
 */
function checkArrId(item, arr) {
  var id = null;
  arr.forEach(function (value, index) {
    if (value == item) {
      id = index;
    }
  });
  return id;
}


/**
 * 数组 -> 数组
 * @param obj
 * @param name
 * @returns {Array}
 */
function arrToArr(obj, name) {
  var arr = [];
  obj.forEach(function (value, index) {
    arr.push(value[name]);
  });

  return arr;
}


/**
 * [{id:1,name:'xx'},{}] -> 寻找当name为xx时id是什么
 * @param value
 * @param arr
 * @param idName
 * @returns {*}
 */
function findId(value, arr, idName) {
  var id = null;
  arr.forEach(function (item, index) {
    for (var key in item) {
      if (item[key] == value) {

        id = item[idName];
      }
    }
  });

  return id;
}

/**
 * 参数 -> url
 * @param params
 */

function paramsToUrl(params, baseUrl) {
  for (var key in params) {
    baseUrl = baseUrl + key + '=' + params[key] + '&'
  }

  return baseUrl;
}


/**
 * 去除最后一个字符
 * @param str
 * @returns {string | *}
 */
function removeLastString(str) {
  str = str.substring(0, str.length - 1);
  return str;
}


/**
 * 给数组添加一个全部item
 * @param arr 需要添加全部的数组
 * @param name  全部所对应的key
 */
function addAllOption(arr, name) {
  var obj = {};
  obj[name] = '全部';
  obj.id = -1,
    arr.splice(0, 0, obj);
  return arr;
}


/**
 * 对象将
 * @param obj
 */
function objToTwoArr(obj, keyArr, valueArr) {
  // 追加数据
  for (var key in obj) {
    keyArr.push(key);
    valueArr.push(obj[key]);
  }
}


/**
 * 深拷贝
 * @type {{}}
 */
function deepCopy(obj) {
  var object = {};
  for (var key in obj) {
    object[key] = obj[key];
  }

  return object;
}


var MyPlugin = {};

MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.prototype.checkArrId = checkArrId;
  Vue.prototype.arrToArr = arrToArr;
  Vue.prototype.findId = findId;
  Vue.prototype.paramsToUrl = paramsToUrl;
  Vue.prototype.removeLastString = removeLastString;
  Vue.prototype.addAllOption = addAllOption;
  Vue.prototype.objToTwoArr = objToTwoArr;
  Vue.prototype.deepCopy = deepCopy;




};

export default MyPlugin;
