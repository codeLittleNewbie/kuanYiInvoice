function GetRequest() {
  var url = location.search; // 获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var strs = url.substr(1);
    strs = strs.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

const request = {
  install(Vue,options = {}){
    Vue.prototype.GetRequest = GetRequest;
  }
};

module.exports = request;
