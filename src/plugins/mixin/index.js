var wx = require('weixin-js-sdk');
import vue from 'vue'
import {getWXConfig} from '@/api/index.js'
import {MessageBox} from 'mint-ui';


var myMixin = {
  created: function () {
    getWXConfig().then((res) => {
      console.log(res);
      wx.config({
        debug: true,
        appId: res.data.appId,
        timestamp: res.data.timestamp,
        nonceStr:res.data.nonceStr,
        signature: res.data.signature,
        jsApiList: [
          'invoke'
        ],
        beta: true
      });


     /*wx.ready(function () {
        console.log('配置成功');

        wx.invoke('chooseInvoiceTitle', {
          scene: "1"
        },function (res) {
          console.log(res);
        })
      });*/

      wx.error(function(res){
        MessageBox('提示', res);
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    })
  },
};

export default myMixin
