<template>
  <div class="hello">
    <!--<mt-header fixed title="固定在顶部"></mt-header>-->

    <mt-header title="标题过长会隐藏后面的内容啊哈哈哈哈">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <mt-button type="default" @click="openMsg">default</mt-button>
    <mt-button type="primary" @click="openDate" size="small">打开日历</mt-button>
    <mt-button type="primary" size="small">{{selected}}</mt-button>


    <mt-tabbar v-model="selected">
      <mt-tab-item id="外卖">
        <img slot="icon" src="../assets/logo.png">
        外卖
      </mt-tab-item>
      <mt-tab-item id="订单">
        <img slot="icon" src="../assets/logo.png">
        订单
      </mt-tab-item>
      <mt-tab-item id="发现">
        <img slot="icon" src="../assets/logo.png">
        发现
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" src="../assets/logo.png">
        我的
      </mt-tab-item>
    </mt-tabbar>


    <!--日历-->
    <template>
      <mt-datetime-picker
        ref="picker"
        type="date"
        v-model="pickerValue">
      </mt-datetime-picker>
    </template>
  </div>
</template>

<script>

  import { MessageBox } from 'mint-ui';

  export default {
    data(){
      return {
        pickerValue: '2017-10-12',
        selected: ''
      }
    },
    methods: {
      openMsg(){
        MessageBox('提示','操作成功');
      },
      openDate(){
        this.$refs.picker.open();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
