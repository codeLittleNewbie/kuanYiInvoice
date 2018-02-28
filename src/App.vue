<template>
  <div id="app">
    <router-view/>

    <mt-popup
      v-model="popupVisible">
      <div class="loading"
           :style="'background: url(\'./static/img/loading/loading.gif\') center center no-repeat;'"></div>
    </mt-popup>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  import Axios from 'axios'


  export default {
    name: 'app',
    data() {
      return {
        popupVisible: false
      }
    },
    mounted() {

      // 获取发票信息要带
      localStorage.setItem('openid',this.GetRequest().openid);
      localStorage.setItem('invoice_id',this.GetRequest().invoice_id);

      // 提交发票要带
      localStorage.setItem('appid',this.GetRequest().appid);
      localStorage.setItem('orderNo',this.GetRequest().orderNo);
      localStorage.setItem('sign',this.GetRequest().sign);


      /*localStorage.setItem('openid','ozU44s-U0n2BbrcfnBvGE-8eh5RY');
      localStorage.setItem('invoice_id',109);

      localStorage.setItem('appid','AI17411284');
      localStorage.setItem('orderNo','TEST6549207');
      localStorage.setItem('sign','4720366372464469091d7ec727b02943');*/

      Axios.interceptors.request.use(config => {
        if (config.url == '/pos/invoice/wxconfig'){}else {this.popupVisible = true;}
        return config
      }, error => {
        this.popupVisible = false;
        MessageBox('提示', '您的网络出现问题，请稍后再试');
        return Promise.reject(error)
      });


      Axios.interceptors.response.use(data => {// 响应成功关闭loading
        this.popupVisible = false;
        if (data.data.errcode){
          console.log(data.data);
          if (data.data.errcode != 0){
            MessageBox('提示', data.data.errmsg);
          }
        }
        return data
      }, error => {
        this.popupVisible = false;
        MessageBox('提示', '您的网络出现问题，请稍后再试');
        return Promise.reject(error)
      });
    }
  }
</script>

<style lang="less">
  @import "./style/reset.css";
  @import "./style/main.less";

  .loading {
    border-radius: 10px;
    background-size: 150% !important;
    width: 120px;
    height: 120px;
  }

  .mint-popup {
    border-radius: 10px;
  }
</style>
