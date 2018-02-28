<template>
  <div class="container">
    <ky-header fixed class="border-bottom color-default">
      <div slot="right" @click="tipMessage">
        <span class="icon-mine-about fon-size_22"></span>
      </div>

      <div slot="left" @click="changeColor">
        <mt-button :style="'background: ' + theme" size="small" class="fon-size_12">主题色切换</mt-button>
      </div>

      <div slot="titles">
        <img :src="titleSrc" alt="" style="width: 40px;height: 40px;">
      </div>
    </ky-header>
    <div class="flex fon-size_20 fon-bold" style="padding-top: 25px;margin-bottom: 10px;" :style="'color: ' + theme">
      开票失败!
    </div>
    <div class="flex fon-size_16 fon-bold" style="padding-top: 25px;margin-bottom: 10px;">
      数据未上报成功!
    </div>
    <div class="flex">
      <ky-button class="width_50 mar-top_2 "
                 :style="'background-color: ' + theme"
                 @click.native="tryAgain"
      >再试一次</ky-button>
    </div>

    <!--弹窗-->
    <div>
      <!--右上角提示信息弹窗-->
      <mt-popup
        v-model="popupVisibleQ"
        popup-transition="popup-fade" style="z-index: 2004;width: 90%!important;overflow: auto;">
        <div class="padding_20" style="overflow: scroll">
          <div class="flex mar-top_1 mar-bottom_3 fon-size_20 fon-bold">关于变更电子发条抬头</div>
          <div>
            <div class="fon-size_17 mar-bottom_0_5">尊敬的客户:</div>
            <div class="fon-size_17 line_h_24 text_index_2">
              爱迪生发阿范德萨发达四大法撒旦法四大法撒旦法啊发送到发送发手动阀发身份暗示啊阿斯蒂芬安抚阿什顿发爱迪生发阿范德萨发达四大法撒旦法四大法撒旦法啊发送到发送发手动阀发身份暗示啊阿斯蒂芬安抚阿什顿发爱迪生发阿范德萨发达四大法撒旦法四大法撒旦法啊发送到发送发手动阀发身份暗示啊阿斯蒂芬安抚阿什顿发
            </div>
          </div>
          <div class="flex flex_e mar-top_2">2018年1月8日</div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
  import kyHeader from '@/common/header/Header.vue'
  import kyButton from '@/common/button/Button.vue'
  import {Toast} from 'mint-ui';

  export default {
    name: "index",
    components: {
      kyHeader,kyButton
    },
    data(){
      return {
        popupVisibleQ: false,                    // 提示信息弹窗

        theme: this.$store.state.theme,          // 主题色
        titleSrc: this.$store.state.titleImgSrc,
      }
    },
    methods: {
      // 主题切换
      changeColor(){},
      // 右上角提示信息弹窗
      tipMessage() {
        this.popupVisibleQ = true;
      },
      tryAgain(){}
    }
  }
</script>

<style scoped>

</style>
