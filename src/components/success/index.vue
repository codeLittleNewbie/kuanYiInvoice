<template>
  <div class="container">
    <ky-header fixed class="border-bottom color-default">
      <div slot="right" @click="tipMessage">
        <span class="icon-mine-about fon-size_22"></span>
      </div>

      <div slot="titles">
        <img :src="titleSrc" alt="" style="width: 40px;height: 40px;">
      </div>
    </ky-header>
    <div class="flex fon-size_20" style="padding-top: 25px;margin-bottom: 10px;" :style="'color: ' + theme">
      开票成功！
    </div>
    <div class="flex">
      <div class="stamp mar-top_2" :style="'border-top:2px solid' + theme">
        <div class="fon-size_14">
          <div class="flex" style="line-height: 44px;border-bottom: 1px dashed gainsboro">
            <div class="flex_1">发票抬头</div>
            <div class="flex_3 text-ar color-place twoElisp" style="line-height: 18px">{{detail.title}}</div>
          </div>
          <div class="flex mar-top_3_0">
            <div class="flex_1">名称</div>
            <div class="flex_3 text-ar color-place twoElisp">{{detail.title}}</div>
          </div>
          <div class="flex mar-top_3_0">
            <div class="flex_1">税号</div>
            <div class="flex_3 text-ar color-place twoElisp">{{detail.duty_paragraph}}</div>
          </div>
          <div class="flex" style="line-height: 60px;margin-top: 10px;margin-bottom: 10px">
            <div class="flex_1">地址</div>
            <div class="flex_3 text-ar color-place twoElisp" style="line-height: 18px">{{detail.address}}</div>
          </div>
          <div class="flex">
            <div class="flex_1">电话</div>
            <div class="flex_3 text-ar color-place twoElisp">{{detail.phone}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex fon-size_16" style="padding-top: 15px;">电子发票会自动发送到您设置的邮箱</div>
    <div class="flex fon-size_16" style="padding-top: 10px;">请在2小时查收</div>
    <div class="flex">
      <div class="stamps mar-top_2 mar-bottom_4">
        <div class="fon-size_14">
          <div class="flex mar-top_2_0">
            <div class="flex_1">金额</div>
            <div class="flex_3 text-ar color-place">&yen;{{detail.total_amount}}</div>
          </div>
          <div class="flex mar-top_3_0">
            <div class="flex_1">税额</div>
            <div class="flex_3 text-ar color-place">&yen;{{detail.rate_money}}</div>
          </div>
          <div class="flex mar-top_1" style="line-height: 44px;border-bottom: 1px dashed gainsboro">
            <div class="flex_1">价税合计</div>
            <div class="flex_3 text-ar color-place">&yen;{{detail.total}}</div>
          </div>
          <div class="flex mar-top_3_0">
            <div class="flex_1">发票代码</div>
            <div class="flex_3 text-ar color-place" :style="'color: ' + theme">{{detail.invoice_code}}</div>
          </div>
          <div class="flex mar-top_3_0">
            <div class="flex_1">发票号码</div>
            <div class="flex_3 text-ar color-place" :style="'color: ' + theme">{{detail.invoice_num}}</div>
          </div>
        </div>
      </div>
    </div>


    <div class="flex">
      <div class="flex footerBtn mar-top_2_0">
        <mt-button
          class="flex_1 color-default fon-size_14"
          @click="downLoadPDF">下载PDF
        </mt-button>
        <mt-button
          v-if="detail.url != ''"
          type="danger"
          class="flex_1 fon-size_14 color-white margin_l_10"
          @click="addWXPackage">添加微信卡包
        </mt-button>
      </div>


    </div>

    <div style="height: 20px;width: 100%;"></div>
    <!--弹窗-->
    <div>

      <!--邮箱弹窗-->
      <mt-popup
        v-model="emailPopupVisible" style="width: 300px;"
        :closeOnClickModal="false"
        popup-transition="popup-fade">
        <transition name="msgbox-bounce">
          <div class="mint-msgbox">
            <div class="mint-msgbox-header">
              <div class="mint-msgbox-title">我的邮箱</div>
            </div>
            <div class="mint-msgbox-content">

              <div class="mint-msgbox-input mar-top_1">
                <input v-model="email" placeholder="请输入我的常用邮箱" ref="input" type="password">
              </div>
            </div>
            <div class="mint-msgbox-btns">
              <button class="cancelButtonClasses mint-msgbox-btn border-right mint-msgbox-confirm"
                      @click="emailPopupVisible = false"
                      style="color: black"
              >取消
              </button>
              <button class="confirmButtonClasses mint-msgbox-btn"
                      style="border-right: 1px solid gainsboro;"
                      :style="'color: ' + theme"
                      @click="handleAction()">
                确定发送
              </button>
            </div>
          </div>
        </transition>
      </mt-popup>

      <!--右上角提示信息弹窗-->
      <mt-popup
        v-if="infoType == 1"
        v-model="popupVisibleQ"
        popup-transition="popup-fade" style="z-index: 2004;width: 90%!important;overflow: auto;">
        <div class="padding_20" style="overflow: scroll">
          <div class="flex mar-top_1 mar-bottom_3 fon-size_20 fon-bold">{{infoMsg.title}}</div>
          <div>
            <div class="fon-size_17 mar-bottom_0_5">尊敬的客户:</div>
            <div class="fon-size_17 line_h_24 text_index_2">
              {{infoMsg.content}}
            </div>
          </div>
          <div class="flex flex_e mar-top_2">{{infoMsg.date}}</div>
        </div>
      </mt-popup>

      <!--结果弹窗-->
      <mt-popup
        v-model="popupVisibleR"
        popup-transition="popup-fade" style="z-index: 2004;width: 90%!important;overflow: auto;">
        <div class="padding_20" style="overflow: scroll">
          <div class="flex mar-top_1 mar-bottom_2 fon-size_20 fon-bold">
            您的电子发票已发送到
          </div>
          <div class="flex mar-top_1 fon-size_18 fon-bold" :style="'color: ' + theme">cy0007@kuan1.cn</div>
          <div class="flex">
            <ky-button class="width_85 mar-top_2 "
                       :style="'background-color: ' + theme"
                       @click.native="tryAgain"
            >重新发送
            </ky-button>
          </div>
        </div>
      </mt-popup>

    </div>
  </div>
</template>

<script>
  import kyHeader from '@/common/header/Header.vue'
  import kyButton from '@/common/button/Button.vue'
  import {Toast} from 'mint-ui';

  var myMixin = {
    mounted() {
      window.scrollTo(0, 0)
    }
  };

  export default {
    components: {
      kyHeader, kyButton
    },
    name: "index",
    data() {
      return {
        theme: localStorage.getItem('theme'),           // 主题色
        titleSrc: localStorage.getItem('titleSrc'),  // title图片路径
        infoMsg: this.$store.state.infoMsg,       // 提示信息
        infoType: this.$store.state.infoType,     // 提示信息类型

        /* detail: {
           title: '广州云藏信息技术有限公司大师傅',                  // 发票抬头
           duty_paragraph: '98471239847812398472934',         // 税号
           address: '广州市理智去沙面大街354号',                // 地址
           phone: '0894-2347873',                  // 手机号
           tel: '',                    // 电话
           total_amount: '47.00',           // 金额
           rate_money: '3.423',             // 税额
           total: '45.00',                  // 价税合计
           invoice_code: '2342134234',           // 发票代码
           invoice_num: '42342314234',            // 发票号码
           pdf_url: '',                // 发票下载地址
           url: '',                    // 微信卡包跳转地址
         },*/

        detail: {
          title: '',                  // 发票抬头
          duty_paragraph: '',         // 税号
          address: '',                // 地址
          phone: '',                  // 手机号
          tel: '',                    // 电话
          total_amount: '',           // 金额
          rate_money: '',             // 税额
          total: '',                  // 价税合计
          invoice_code: '',           // 发票代码
          invoice_num: '',            // 发票号码
          pdf_url: '',                // 发票下载地址
          url: '',                    // 微信卡包跳转地址
        },

        emailPopupVisible: false,                // 邮箱弹窗
        popupVisibleQ: false,                    // 提示信息弹窗
        popupVisibleR: false,                    // 结果弹窗

        email: '',
      }
    },
    mixins: [myMixin],
    methods: {
      // 右上角提示信息弹窗
      tipMessage() {
        if (this.infoType == 1) {
          this.popupVisibleQ = true;
        } else {
          window.location.href = this.infoMsg
        }
      },
      // 确认发送邮箱
      handleAction() {
        if (this.email == '') {
          Toast({
            message: '请输入邮箱',
            position: 'bottom',
          });
        } else {
          // 关闭弹窗
          this.emailPopupVisible = false;
          Toast({
            message: '发送邮箱中...',
            position: 'bottom',
          });
          this.popupVisibleR = true;
        }
      },
      // 下载PDF
      downLoadPDF() {
        window.location.href = this.detail.pdf_url;
      },
      // 重新发送邮件
      tryAgain() {
        Toast({
          message: '重新发送邮件中...',
          position: 'bottom',
        });
      },
      // 添加到微信卡包
      addWXPackage() {
        if (this.detail.url != '') {
          window.location.href = this.detail.url;
        }
      }
    },
    mounted() {
      if (this.$route.params.data != null) {
        console.log(this.$route.params.data);
        console.log(this.$route.params.data.title);
        this.detail = this.$route.params.data;
      } else {
        console.log(JSON.parse(localStorage.getItem('detail')));
        this.detail = JSON.parse(localStorage.getItem('detail'));
      }
    }
  }
</script>

<style scoped>
  .stamp {
    width: 80%;
    display: inline-block;
    padding: 10px;
    background: white;
    position: relative;
    /*background: radial-gradient(transparent 0px, transparent 4px, white 4px, white);*/
    background-size: 20px 20px;
    background-position: -10px -10px;
    border: 1px solid gainsboro;
  }

  .stamps {
    width: 80%;
    display: inline-block;
    padding: 10px;
    background: white;
    position: relative;
    /*background: radial-gradient(transparent 0px, transparent 4px, white 4px, white);*/
    background-size: 20px 20px;
    background-position: -10px -10px;
    border: 1px solid gainsboro;
  }

  .stamp:after {
    content: '';
    position: absolute;
    left: 5px;
    top: 5px;
    right: 5px;
    bottom: 5px;
    /*box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.5);*/
    z-index: -1;
  }


  .stamps:after {
    content: '';
    position: absolute;
    left: 5px;
    top: 5px;
    right: 5px;
    bottom: 5px;
    /*box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.5);*/
    z-index: -1;
  }

  .twoElisp {
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .footerBtn{
    width: 80%;
  }


</style>
