<template>
  <div class="container fon-size_14" @click="close">
    <ky-header fixed class="border-bottom color-default">
      <div slot="right"
           v-if="type == 1"
           @click="tipMessage">
        <span class="icon-mine-about fon-size_22"></span>
      </div>

      <!--<div slot="left" @click="changeColor">
        <mt-button :style="'background: ' + theme" class="fon-size_12" size="small" type="danger" style="width: 100px;">
          changeColor
        </mt-button>
      </div>-->

      <div slot="titles">
        <img :src="titleSrc" alt="" style="width: 40px;height: 40px;">
      </div>
    </ky-header>

    <div class="home-content flex flex_d_c">
      <div class="home-title fon-size_18 mar-top_3_0 mar-bottom_3">填写发票信息</div>
      <div class="home-body-one width_85 flex flex_d_c"
           :style="'border-top: 3px solid' + theme"
           style="border-bottom: 1px solid gainsboro;"
      >
        <mt-cell title="发票金额" class="width_100 min_h_40">{{money}}</mt-cell>
        <mt-cell title="开票时间" class="width_100 min_h_40">{{time}}</mt-cell>
      </div>


      <div class="home-content-title flex_r flex_d_c width_85 mar-top_1 mar-bottom_1">
        <span class="icon-start" :style="'color: ' + theme ">&nbsp;号为必填</span>
      </div>

      <div class="home-content-body flex width_85 padding_5">
        <div class="flex_1 text-ac home-tab-item"
             @click="pageChange(true)"
             v-show="active != 'page-one'"
        >个人
        </div>
        <div class="flex_1 text-ac home-tab-item"
             :style="'border: 1px solid ' + theme + ' !important;color:' + theme"
             v-show="active == 'page-one'"
             @click="pageChange(true)">个人
        </div>
        <div class="flex_1 text-ac home-tab-item"
             @click="pageChange(false)"
             v-show="active != 'page-two'"
        >企业
        </div>
        <div class="flex_1 text-ac home-tab-item"
             :style="'border: 1px solid ' + theme + ' !important;color:' + theme"
             v-show="active == 'page-two'"
             @click="pageChange(false)">企业
        </div>
      </div>


      <!--个人上拉框-->
      <transition name="fade" v-if="is_wx == '1'">
        <div
          style="position: absolute;top: 144px;left: 0;z-index: 100;right: 0;background: white;border: 1px solid gainsboro;border-bottom: none;margin-left: 7.5%;width: 84.5%;"
          :class="{top295 : slots1[0].values[0] == '暂无抬头信息'}"
          v-show="showOne">
          <div class="width_100 height_100 flex" style="height: 48px;">
            <div class="flex_1 text-ac"
                 style="line-height: 48px;"
                 :style="'color: ' + theme"
                 @click="getWXTitle">调微信抬头<span class="fa fa-hand-o-right mar-left_2"></span></div>
          </div>
          <div class="width_100 height_100 flex"
               style="border-top: 1px solid gainsboro;height: 40px;"
               v-if="slots1[0].values[0].length != 0 && slots1[0].values[0] != '暂无抬头信息'"
          >
            <div class="flex_1 text-ac" @click="showOne = false">取消</div>
            <div class="flex_1 text-ac width_100 height_100 flex"
                 @click="makeSureBtn"
                 style="border-left: 1px solid gainsboro"
                 :style="'color: ' + theme "
            >确定
            </div>
          </div>
          <mt-picker :slots="slots1"
                     @change="onValuesChanges"
                     :visibleItemCount="3"
                     valueKey="name"
                     style="border-top: 1px solid gainsboro;"
                     v-if="slots1[0].values[0].length != 0 && slots1[0].values[0] != '暂无抬头信息'"
          >
          </mt-picker>

        </div>
      </transition>

      <!--企业上拉框-->
      <transition name="fade" v-if="is_wx == '1'">
        <div
          style="position: absolute;top: 144px;left: 0;z-index: 100;right: 0;background: white;border: 1px solid gainsboro;border-bottom: none;margin-left: 7.5%;width: 84.5%;"
          :class="{top295 : slots2[0].values[0] == '暂无抬头信息'}"
          v-show="showTwo">
          <div class="width_100 height_100 flex"
               style="height: 48px;">
            <div class="flex_1 text-ac"
                 style="line-height: 48px;"
                 :style="'color: ' + theme"
                 @click="getWXTitle">调微信抬头<span class="fa fa-hand-o-right mar-left_2"></span></div>
          </div>
          <div class="width_100 height_100 flex"
               style="border-top: 1px solid gainsboro;height: 40px;"
               v-if="slots2[0].values[0].length != 0 && slots2[0].values[0] != '暂无抬头信息'"
          >
            <div class="flex_1 text-ac" @click="showTwo = false">取消</div>
            <div class="flex_1 text-ac width_100 height_100 flex" @click="makeSureBtn"
                 style="border-left: 1px solid gainsboro"
                 :style="'color: ' + theme"
            >确定
            </div>
          </div>
          <mt-picker :slots="slots2"
                     @change="onValuesChanges"
                     :visibleItemCount="3"
                     valueKey="name"
                     style="border-top: 1px solid gainsboro;"
                     v-if="slots2[0].values[0].length != 0 && slots2[0].values[0] != '暂无抬头信息'"
          >
          </mt-picker>
        </div>
      </transition>

      <div class="flex width_85 home-contentBody">
        <mt-tab-container v-model="active" class="width_100">

          <!--个人-->
          <mt-tab-container-item id="page-one">

            <transition-group name="list">
              <div style="position: relative" :key="1">
                <mt-field placeholder="请输入发票抬头" v-model="invoiceOne.title" class="fieldTitle"
                          :class="{'icon-start' : requireStartOne1.title_require}"
                          :style="'color: ' + theme "
                          style="border-top: 1px solid gainsboro;"
                          @click.native="titleClick"
                          @keydown.native="titleKeydown"
                          v-show="requireStartOne1.title_require"></mt-field>
              </div>

              <mt-field placeholder="请输入手机号" v-model="invoiceOne.phone" :key="2" type="tel"
                        :class="{'icon-start' : requireStartOne1.phone_require}"
                        :style="'color: ' + theme "
                        v-show="requireStartOne2.phone_require"></mt-field>

              <mt-field placeholder="请输入邮箱" v-model="invoiceOne.email" :key="3" type="email"
                        :class="{'icon-start' : requireStartOne1.email_require}"
                        :style="'color: ' + theme "
                        v-show="requireStartOne2.email_require"></mt-field>

              <mt-field placeholder="请输入地址" :key="4" v-model="invoiceOne.address"
                        :class="{'icon-start' : requireStartOne1.address_require}"
                        :style="'color: ' + theme "
                        v-show="requireStartOne2.address_require"></mt-field>

              <mt-field placeholder="请输入电话" :key="5" v-model="invoiceOne.tel" type="number"
                        :class="{'icon-start' : requireStartOne1.tel_require}"
                        :style="'color: ' + theme "
                        v-show="requireStartOne2.tel_require"></mt-field>

              <mt-field placeholder="请输入开户行" :key="6" v-model="invoiceOne.bank"
                        :class="{'icon-start' : requireStartOne1.opening_bankl_require}"
                        :style="'color: ' + theme "
                        v-show="requireStartOne2.opening_bankl_require"></mt-field>

              <mt-field placeholder="请输入开户行账号" :key="7" v-model="invoiceOne.account" type="number"
                        :class="{'icon-start' : requireStartOne1.account_require}"
                        :style="'color: ' + theme "
                        v-show="requireStartOne2.account_require"></mt-field>
            </transition-group>

            <div class="flex home-down" @click="downUpChange(true)">
              <div class="width_50 text-ac flex fon-size_14 home-down-title"
                   :style="'border-left: 1px solid ' + theme + ';border-bottom: 1px solid ' + theme + ';border-right: 1px solid '+ theme +';color: ' + theme">{{btnMsgOne}}
                <div class="flex">
                  <span class="icon-down" :class="{'is-up' : !downUpStatusOne}"></span>
                </div>
              </div>
            </div>
          </mt-tab-container-item>

          <!--企业-->
          <mt-tab-container-item id="page-two">

            <transition-group name="list">
              <div style="position: relative" :key="1">
                <mt-field placeholder="请输入发票抬头" v-model="invoiceTwo.title" class="fieldTitle"
                          @click.native="titleClick"
                          :class="{'icon-start' : requireStartTwo1.title_require}"
                          :style="'color: ' + theme "
                          style="border-top: 1px solid gainsboro;"
                          @keydown.native="titleKeydown"
                          v-show="requireStartTwo2.title_require"></mt-field>
              </div>

              <mt-field placeholder="请输入手机号" :key="2" v-model="invoiceTwo.phone" type="tel"
                        :class="{'icon-start' : requireStartTwo1.phone_require}"
                        :style="'color: ' + theme "
                        v-show="requireStartTwo2.phone_require"></mt-field>

              <mt-field placeholder="请输入纳税人识别号" :key="3" v-model="invoiceTwo.number" type="text"
                        :class="{'icon-start' : requireStartTwo1.number_require}"
                        :style="'color: ' + theme "
                        v-show="requireStartTwo2.number_require"></mt-field>

              <mt-field placeholder="请输入邮箱" :key="4" v-model="invoiceTwo.email" type="email"
                        :class="{'icon-start' : requireStartTwo1.email_require}"
                        :style="'color: ' + theme "
                        v-show="requireStartTwo2.email_require"></mt-field>

              <mt-field placeholder="请输入地址" :key="5" v-model="invoiceTwo.address"
                        :class="{'icon-start' : requireStartTwo1.address_require}"
                        :style="'color: ' + theme "
                        v-show="requireStartTwo2.address_require"></mt-field>

              <mt-field placeholder="请输入电话" :key="6" v-model="invoiceTwo.tel" type="number"
                        :class="{'icon-start' : requireStartTwo1.tel_require}"
                        :style="'color: ' + theme "
                        v-show="requireStartTwo2.tel_require"></mt-field>

              <mt-field placeholder="请输入开户行" :key="7" v-model="invoiceTwo.bank"
                        :class="{'icon-start' : requireStartTwo1.opening_bankl_require}"
                        :style="'color: ' + theme "
                        v-show="requireStartTwo2.opening_bankl_require"></mt-field>

              <mt-field placeholder="请输入开户行账号" :key="8" v-model="invoiceTwo.account" type="text"
                        :class="{'icon-start' : requireStartTwo1.account_require}"
                        :style="'color: ' + theme "
                        v-show="requireStartTwo2.account_require"></mt-field>
            </transition-group>


            <div class="flex home-down" @click="downUpChange(false)">
              <div class="width_50 text-ac flex fon-size_14 home-down-title"
                   :style="'border-left: 1px solid ' + theme + ';border-bottom: 1px solid ' + theme + ';border-right: 1px solid '+ theme +';color: ' + theme">{{btnMsgTwo}}
                <div class="flex">
                  <span class="icon-down" :class="{'is-up' : !downUpStatusTwo}"></span>
                </div>
              </div>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>

      <ky-button class="width_85 mar-top_3_0 mar-bottom_2"
                 @click.native="makeSureSub"
                 :style="'background-color: ' + theme"
      >确认提交
      </ky-button>

      <!--弹窗-->
      <div>
        <mt-popup
          v-model="popupVisible1"
          popup-transition="popup-fade"
        >
          <mt-picker :slots="slots1"
                     @change="onValuesChange"
                     :showToolbar="true"
                     valueKey="name"
          >
            <div class="modeTitle"
                 @click="manualInput"
                 :style="'color: ' + theme"
            >点我手动输入抬头
            </div>
          </mt-picker>
        </mt-popup>

        <mt-popup
          v-model="popupVisible2"
          popup-transition="popup-fade"
        >
          <mt-picker :slots="slots2" @change="onValuesChange"
                     :showToolbar="true"
                     :valueKey="name"
          >
            <div class="modeTitle"
                 @click="manualInput"
                 :style="'color: ' + theme"
            >点我手动输入抬头
            </div>
          </mt-picker>
        </mt-popup>
      </div>
    </div>

    <!--提示信息弹窗-->
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

    <!--确认开票信息弹窗-->
    <mt-popup
      v-model="popupVisibleMakeSure"
      popup-transition="popup-fade" style="z-index: 2004;width: 90%!important;overflow: auto;">
      <div class="padding_20">
        <div class="flex mar-top_1 mar-bottom_3 fon-size_20 fon-bold">确认开票信息</div>
        <div class="flex" :class="invoiceDetail.title.length > 15 ? 'line_h_20' : 'line_h_40'">
          <div class="flex_1">发票抬头</div>
          <div class="color-place flex_3 text-ar twoElisp">{{invoiceDetail.title}}</div>
        </div>
        <div class="flex line_h_40" :class="invoiceDetail.email.length > 15 ? 'line_h_20' : 'line_h_40'">
          <div class="flex_1">邮箱</div>
          <div class="flex_3 text-ar color-place twoElisp">{{invoiceDetail.email}}</div>
        </div>
        <div class="flex flex_es line_h_40" :class="invoiceDetail.phone.length > 15 ? 'line_h_20' : 'line_h_40'">
          <div class="flex_1">手机</div>
          <div class="flex_3 text-ar color-place twoElisp">{{invoiceDetail.phone}}</div>
        </div>

        <div class="flex flex_es line_h_40">
          <div class="flex_1">开户行、账号</div>
          <div class="flex_2_5 text-ar color-place twoElisp">{{invoiceDetail.account}}</div>
        </div>

        <div class="flex flex_es line_h_40" v-show="active == 'page-two'">
          <div style="width: 85px;">纳税人识别号</div>
          <div class="text-ar color-place">{{invoiceDetail.number}}</div>
        </div>
        <!--<div class="flex flex_es" :class="invoiceDetail.address.length > 15 ? 'line_h_20' : 'line_h_40'">
          <div class="flex_1 line_h_40">地址</div>
          <div class="flex_3 text-ar color-place twoElisp">{{invoiceDetail.address}}</div>
        </div>-->
        <div class="flex flex_es line_h_40">
          <div class="flex_1">地址、电话</div>
          <div class="flex_3 text-ar color-place twoElisp">{{invoiceDetail.tel}}</div>
        </div>
        <!--<div class="flex flex_es line_h_40" :class="invoiceDetail.bank.length > 15 ? 'line_h_20' : 'line_h_40'">
          <div class="flex_1">开户行</div>
          <div class="flex_3 text-ar color-place twoElisp">{{invoiceDetail.bank}}</div>
        </div>-->

        <div class="flex flex_es mar-top_2">
          <mt-button class="flex_1 fon-size_16 color-default" @click="popupVisibleMakeSure = false">返回修改</mt-button>
          <mt-button
            class="flex_1 mar-left_2 color-white fon-size_16"
            :style="'background-color: ' + theme"
            @click="makeOutInvoice"
          >确认开票
          </mt-button>
        </div>
      </div>
    </mt-popup>

    <!--主题选择框-->
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      style="max-height: 200px;overflow: auto"
    >
      <mt-radio
        title="主题色列表"
        v-model="color"
        :options="['#FFB6C1', '#E6E6FA', '#4169E1', '#00BFFF', '#00FFFF']">
      </mt-radio>
    </mt-popup>

    <!--全局loading-->
    <mt-popup
      v-model="popupLoading"

    >
      <div class="loading"
           :style="'background: url(\'./static/img/loading/loading.gif\') center center no-repeat;'"></div>
    </mt-popup>
  </div>
</template>

<script>

  import kyHeader from '@/common/header/Header.vue'
  import kyButton from '@/common/button/Button.vue'
  import {MessageBox} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import {submitInvoiceMsg, getInvoiceData, getWXConfig} from '@/api/index.js'

  export default {
    components: {
      kyHeader,
      kyButton
    },
    name: "index",
    data() {
      return {
        name: 'name',
        is_wx: '',                                // 是否是微信
        type: '',                                 // 1 -> 电子发票 2 -> 纸质发票

        popupLoading: false,

        theme: this.$store.state.theme,           // 主题色
        titleSrc: this.$store.state.titleImgSrc,  // title图片路径
        infoMsg: this.$store.state.infoMsg,       // 提示信息
        infoType: this.$store.state.infoType,     // 提示信息类型

        color: '',
        popupVisible: false,

        flagOne: false,
        flagTwo: false,

        active: 'page-one',

        btnMsgOne: '展开纳税人信息',
        btnMsgTwo: '展开纳税人信息',

        money: this.GetRequest().money,
        time: this.GetRequest().time,

        title_listOne: [],
        title_listTwo: [],

        invoice: {},

        templateInvoiceOne: {},
        templateInvoiceTwo: {},

        invoiceOne: {
          title: '个人',             // 发票抬头
          email: '',               // 邮箱地址
          phone: '',               // 手机号
          address: '',             // 地址
          tel: '',                 // 电话
          bank: '',                // 开户行
          account: '',         // 开户行账号
        },
        invoiceTwo: {
          title: '',             // 发票抬头
          email: '',               // 邮箱地址
          phone: '',               // 手机号
          number: '',            // 纳税人识别号
          address: '',             // 地址
          tel: '',                 // 电话
          bank: '',                // 开户行
          account: '',         // 开户行账号
        },

        popupVisibleQ: false,           // 提示弹窗
        popupVisibleMakeSure: false,    // 确认开票弹窗

        downUpStatusOne: true,         // true -> 下拉 false -> 收起
        downUpStatusTwo: true,         // true -> 下拉 false -> 收起

        popupVisible1: false,          // 抬头弹窗 -> 个人
        popupVisible2: false,          // 抬头弹窗 -> 企业

        requireStartOne1: {
          account_require: 0,
          address_require: 0,
          auto_log: 0,
          email_require: 1,
          number_require: 0,
          opening_bankl_require: 0,
          phone_require: 0,
          tel_require: 0,
          title_require: 1
        },       // 是否需要星星 -> 个人
        requireStartOne2: {
          account_require: 0,
          address_require: 0,
          auto_log: 0,
          email_require: 1,
          number_require: 0,
          opening_bankl_require: 0,
          phone_require: 0,
          tel_require: 0,
          title_require: 1
        },       // 用于记录打开与关闭显示条数 -> 个人

        requireStartTwo1: {},          // 是否需要星星 -> 企业
        requireStartTwo2: {},          // 用于记录打开与关闭显示条数 -> 企业

        tempRequire: {},               // 临时对象 -> 因为对象是引用类型

        slots1: [                      // 个人
          {
            values: ['暂无抬头信息'],
            flex: 1,
            defaultIndex: 2,
          }
        ],                             // 个人抬头历史记录
        slots2: [                   // 企业
          {
            values: ['暂无抬头信息'],
            flex: 1,
            defaultIndex: 2,
          }
        ],                 // 企业抬头历史记录

        // 测试
        showOne: false,
        showTwo: false,
        isClickOne: false,
        isClickTwo: false,

        invoiceDetail: {
          title: '',
          address: '',
          email: '',
          phone: '',
          number: '',
          tel: '',
          bank: '',
          account: '',
        },                // 发票详情
      }
    },
    methods: {
      // 打开与收齐纳税人信息
      downUpChange(value) {
        if (value) {
          this.downUpStatusOne = !this.downUpStatusOne;
          if (!this.downUpStatusOne) {
            this.btnMsgOne = '收起纳税人信息';
            for (var item in this.requireStartOne2) {
              this.requireStartOne2[item] = 1;
            }
          } else {
            this.requireStartOne2 = this.deepCopy(this.requireStartOne1);
            this.btnMsgOne = '展开纳税人信息';
          }
        } else {
          this.downUpStatusTwo = !this.downUpStatusTwo;

          if (!this.downUpStatusTwo) {
            this.btnMsgTwo = '收起纳税人信息';
            for (var item in this.requireStartTwo2) {
              this.requireStartTwo2[item] = 1;
            }
          } else {
            var obj = {};
            for (var item in this.tempRequire) {
              obj[item] = this.tempRequire[item];
            }
            this.requireStartTwo2 = obj;
            this.btnMsgTwo = '展开纳税人信息'
          }
        }
      },
      pageChange(value) {
        if (value) {
          this.active = 'page-one'
        } else {
          this.active = 'page-two'
        }
      },
      /*rise() {
        if (this.active == 'page-one') {
          this.popupVisible1 = true;
          this.flagOne = true;
          // 如果选项有值,那么默认为第一个值
          if (this.slots1[0].values.length != 0) {
            var temp = this.invoice[this.findId(this.slots1[0].values[0].id, this.title_listOne, 'id')];
            var obj = {};
            for (var key in temp) {
              obj[key] = temp[key];
            }
            this.invoiceOne = obj;
          }
          // 失去焦点
          document.getElementsByClassName('fieldTitle')[0].children[1].children[1].children[0].blur();
        } else {
          this.popupVisible2 = true;
          this.flagTwo = true;
          // 如果选项有值,那么默认为第一个值
          if (this.slots2[0].values.length != 0) {
            var temp = this.invoice[this.findId(this.slots2[0].values[0].id, this.title_listTwo, 'id')];
            var obj = {};
            for (var key in temp) {
              obj[key] = temp[key];
            }
            this.invoiceTwo = obj;
          }
          // 失去焦点
          document.getElementsByClassName('fieldTitle')[1].children[1].children[1].children[0].blur();
        }
      },*/
      onValuesChange(picker, values) {
        if (this.active == 'page-one') {
          if (values[0]) {
            if (this.flagOne) {
              var temp = this.invoice[this.findId(values[0].id, this.title_listOne, 'id')];
              this.invoiceOne = this.deepCopy(temp);
            }
          }
        } else {
          if (values[0]) {
            if (this.flagTwo) {
              var temp = this.invoice[this.findId(values[0].id, this.title_listTwo, 'id')];
              this.invoiceTwo = this.deepCopy(temp);
            }
          }
        }
      },
      tipMessage() {
        if (this.infoType == 1) {
          this.popupVisibleQ = true;
        } else {
          if (this.infoMsg != '') {
            window.location.href = this.infoMsg
          }
        }
      },
      // 确认提交
      makeSureSub() {
        // 个人
        if (this.active == 'page-one') {

          if (!this.invoiceOne.title && this.requireStartOne1.title_list){
             Toast('抬头不能为空!')
          }else if (!this.invoiceOne.phone && this.requireStartOne1.phone_require){
             Toast('手机不能为空!')
          }else if (!this.invoiceOne.email && this.requireStartOne1.email_require){
             Toast('邮箱地址不能为空!');
          }else if (!this.invoiceOne.number && this.requireStartOne1.number_require){
             Toast('纳税人识别号不能为空!');
          }else if (!this.invoiceOne.address && this.requireStartOne1.address_require){
             Toast('电话不能为空!')
          }else if (!this.invoiceOne.account && this.requireStartOne1.opening_bankl_require){
             Toast('开户行不能为空!');
          }else if (!this.invoiceOne.bank && this.requireStartOne1.account_require){
             Toast('开户行账户不能为空!');
          }else {

          // 验证必填项是否为空
          /*if (!this.invoiceOne.title && this.requireStartOne1.title_list
            || !this.invoiceOne.phone && this.requireStartOne1.phone_require
            || !this.invoiceOne.email && this.requireStartOne1.email_require
            || !this.invoiceOne.number && this.requireStartOne1.number_require
            || !this.invoiceOne.address && this.requireStartOne1.address_require
            || !this.invoiceOne.tel && this.requireStartOne1.tel_require
            || !this.invoiceOne.account && this.requireStartOne1.opening_bankl_require
            || !this.invoiceOne.bank && this.requireStartOne1.account_require) {
            Toast('必填项不能为空');
          } else {*/
            if (this.invoiceOne.phone) {
              // 验证手机号是否存在
              if (this.checkPhone(this.invoiceOne.phone)) {
                this.invoiceDetail = this.invoiceOne;
                this.popupVisibleMakeSure = true;
              } else {
                Toast('请输入正确的手机号');
              }
            } else {
              this.invoiceDetail = this.invoiceOne;
              this.popupVisibleMakeSure = true;
            }
          }
        }
        // 企业
        else {

          if (!this.invoiceTwo.title && this.tempRequire.title_list){
            Toast('抬头不能为空!')
          }else if (!this.invoiceTwo.phone && this.tempRequire.phone_require){
            Toast('手机不能为空!')
          }else if (!this.invoiceTwo.email && this.tempRequire.email_require){
            Toast('邮箱地址不能为空!');
          }else if (!this.invoiceTwo.number && this.tempRequire.number_require){
            Toast('纳税人识别号不能为空!');
          }else if (!this.invoiceTwo.address && this.tempRequire.address_require){
            Toast('电话不能为空!')
          }else if (!this.invoiceTwo.account && this.tempRequire.opening_bankl_require){
            Toast('开户行不能为空!');
          }else if (!this.invoiceTwo.bank && this.tempRequire.account_require){
            Toast('开户行账户不能为空!');
          }else {

          // 验证必填项是否为空
          /*if (!this.invoiceTwo.title && this.tempRequire.title_list
            || !this.invoiceTwo.phone && this.tempRequire.phone_require
            || !this.invoiceTwo.email && this.tempRequire.email_require
            || !this.invoiceTwo.address && this.tempRequire.address_require
            || !this.invoiceTwo.tel && this.tempRequire.tel_require
            || !this.invoiceTwo.bank && this.tempRequire.opening_bankl_require
            || !this.invoiceTwo.account && this.tempRequire.account_require) {
            Toast('必填项不能为空');
          } else {*/

            if (this.invoiceTwo.phone) {
              if (this.checkPhone(this.invoiceTwo.phone)) {
                this.invoiceDetail = this.invoiceTwo;
                this.popupVisibleMakeSure = true;
              } else {
                Toast('请输入正确的手机号');
              }
            } else {
              this.invoiceDetail = this.invoiceTwo;
              this.popupVisibleMakeSure = true;
            }
          }
        }
      },
      // 点我手动输入抬头
      manualInput() {
        // 获取焦点
        if (this.active == 'page-one') {
          this.popupVisible1 = false;
          document.getElementsByClassName('fieldTitle')[0].children[1].children[1].children[0].focus();
        } else {
          this.popupVisible2 = false;
          document.getElementsByClassName('fieldTitle')[1].children[1].children[1].children[0].focus();
        }
      },
      // 更改主题色
      changeColor() {
        this.popupVisible = true;
      },
      submitApi() {
        // 报错发票成功信息 || 主题色

        localStorage.setItem('theme',this.theme);
        localStorage.setItem('titleSrc',this.titleSrc);

        var appid = localStorage.getItem('appid');
        var orderNo = localStorage.getItem('orderNo');
        var sign = localStorage.getItem('sign');
        var openid = localStorage.getItem('openid');
        var invoice_id = localStorage.getItem('invoice_id');

        if (this.active == 'page-one') {
          var params = {
            appid: appid,
            orderNo: orderNo,
            sign: sign,
            openid: openid,
            money: this.money,
            time: this.time,
            attribute: 2,
            invoice_id: invoice_id,
            type: this.type,
            title: this.invoiceOne.title,
            phone: this.invoiceOne.phone,
            email: this.invoiceOne.email,
            address: this.invoiceOne.address,
            tel: this.invoiceOne.tel,
            bank: this.invoiceOne.account,
            account: this.invoiceOne.bank
          };

          submitInvoiceMsg(params).then((res) => {
            if (res.errcode == 0) {
              if (this.type == 2) {
                MessageBox('提示', '开票成功!');
              } else {
                var detail = JSON.stringify(res.data);
                localStorage.setItem('detail',detail);

                this.$router.push({
                  name: 'success',
                  params: {
                    data: res.data
                  }
                })
              }
            } else {
              MessageBox('提示', res.errmsg);
            }
          });
        } else {
          var params = {
            appid: appid,
            orderNo: orderNo,
            sign: sign,
            openid: openid,
            money: this.money,
            time: this.time,
            attribute: 1,
            type: this.type,
            invoice_id: invoice_id,
            title: this.invoiceTwo.title,
            number: this.invoiceTwo.number,
            phone: this.invoiceTwo.phone,
            email: this.invoiceTwo.email,
            address: this.invoiceTwo.address,
            tel: this.invoiceTwo.tel,
            bank: this.invoiceTwo.bank,
            account: this.invoiceTwo.account
          };

          submitInvoiceMsg(params).then((res) => {
            if (res.errcode == 0) {
              if (this.type == 2) {
                MessageBox('提示', '开票成功!');
              } else {
                var detail = JSON.stringify(res.data);
                localStorage.setItem('detail',detail);

                this.$router.push({
                  name: 'success',
                  params: {
                    data: res.data
                  }
                })
              }
            } else {
              MessageBox('提示', res.errmsg);
            }
          });
        }
      },
      // 确认开票
      makeOutInvoice() {
        this.submitApi();
      },

      // 测试
      titleClick() {
        if (this.GetRequest().is_wx) {
          this.getWXTitle()
        }

        /*if (this.active == 'page-one') {
          this.showOne = !this.showOne;
          this.isClickOne = true;
        } else {
          this.showTwo = !this.showTwo;
          this.isClickTwo = true;
        }*/

        /*if (this.active == 'page-one') {
          this.showOne = !this.showOne;
          this.isClickOne = true;
        } else {
          this.showTwo = !this.showTwo;
          this.isClickTwo = true;
        }*/
      },
      onValuesChanges(picker, values) {
        var temp;
        if (this.active == 'page-one') {
          if (values[0]) {
            if (this.isClickOne) {
              temp = this.invoice[this.findId(values[0].id, this.title_listOne, 'id')];
              this.templateInvoiceOne = this.deepCopy(temp);
            }
          }
        } else {
          if (values[0]) {
            if (this.isClickTwo) {
              temp = this.invoice[this.findId(values[0].id, this.title_listTwo, 'id')];
              this.templateInvoiceTwo = this.deepCopy(temp);
            }
          }
        }
      },
      // 抬头文字输入,隐藏上拉框
      titleKeydown() {
        this.showTwo = false;
        this.showOne = false;
      },
      // 点击其他关闭上拉框
      close() {
        if (event.target.placeholder != '请输入发票抬头') {
          this.showOne = false;
          this.showTwo = false;
        }
      },
      makeSureBtn() {
        var temp;

        if (this.active == 'page-one') {
          if (this.slots1[0].values.length != 0) {
            temp = this.invoice[this.findId(this.slots1[0].values[0].id, this.title_listOne, 'id')];
            this.invoiceOne = this.deepCopy(temp);
          }
        } else {
          if (this.slots2[0].values.length != 0) {
            temp = this.invoice[this.findId(this.slots2[0].values[0].id, this.title_listTwo, 'id')];
            this.invoiceTwo = this.deepCopy(temp);
          }
        }

        /*if (this.active == 'page-one') {
          if (this.slots1[0].values.length == 1) {
            temp = this.invoice[this.findId(this.slots1[0].values[0].id, this.title_listOne, 'id')];
            this.invoiceOne = this.deepCopy(temp);
          } else {
            this.invoiceOne = this.templateInvoiceOne
          }
        } else {
          if (this.slots2[0].values.length == 1) {
            temp = this.invoice[this.findId(this.slots2[0].values[0].id, this.title_listTwo, 'id')];
            this.invoiceTwo = this.deepCopy(temp);
          } else {
            this.invoiceTwo = this.templateInvoiceTwo
          }
        }*/
      },
      // 调微信抬头
      getWXTitle() {
        var vm = this;

        var params = {
          url: document.URL
        };

        getWXConfig(params).then((res) => {
          console.log(res);
          // this.popupLoading = true;
          vm.wx.config({
            // debug: true,
            beta: true,
            appId: res.data.appId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: [
              'chooseInvoiceTitle'
            ],
          });

          vm.wx.ready(function () {
            vm.wx.invoke('chooseInvoiceTitle', {
              scene: "1"
            }, function (res) {

              // vm.popupLoading = false;
              if (res.err_msg == "chooseInvoiceTitle:ok") {

                var obj = JSON.parse(res.choose_invoice_title_info);

                // type 0 -> 企业 1 -> 个人
                if (obj.type == '0') {

                  vm.invoiceTwo.title = obj.title;
                  vm.invoiceTwo.number = obj.taxNumber;
                  vm.invoiceTwo.address = obj.companyAddress;
                  vm.invoiceTwo.tel = obj.telephone;
                  vm.invoiceTwo.bank = obj.bankName;
                  vm.invoiceTwo.account = obj.bankAccount;

                } else {
                  vm.invoiceOne.title = obj['title'];
                }
              }
            })
          });

          this.wx.error(function (res) {
            // MessageBox('提示', res);
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          });
        })
      },
    },
    mounted() {
      this.is_wx = this.GetRequest().is_wx;

      if (this.GetRequest().is_wx) {
        var params = {
          openid: localStorage.getItem('openid'),
          invoice_id: localStorage.getItem('invoice_id')
        };
        getInvoiceData(params).then((res) => {
          if (res.errcode == 0) {
            // 保存当前开发票类型
            this.type = res.data.type;

            if (res.data.type != 2) {
              // 保存titleSrc
              if (res.data.decorate.log_img != '') {
                this.titleSrc = res.data.decorate.log_img;
                this.$store.commit('titleSrcChange', res.data.decorate.log_img);
              }

              // 保存主题色
              if (res.data.decorate.theme_color != '') {

                this.theme = res.data.decorate.theme_color;
                this.$store.commit('themeChange', res.data.decorate.theme_color);
              }

              // info类型
              this.infoType = res.data.decorate.prompt_type;
              this.$store.commit('infoTypeChange', res.data.decorate.prompt_type);

              // 文字信息
              this.infoMsg = res.data.decorate.prompt_content;
              this.$store.commit('infoMsgChange', res.data.decorate.prompt_content);
            }

            this.requireStartTwo1 = this.deepCopy(res.data.require);
            this.requireStartTwo2 = this.deepCopy(res.data.require);
            this.tempRequire = this.deepCopy(res.data.require);

            this.invoice = res.data.invoice;

            var temp;
            if (res.data.title_list_one.length != 0) {
              this.slots1[0].values = res.data.title_list_one;
              // 保存个人抬头列表
              this.title_listOne = res.data.title_list_one;

              var length = res.data.title_list_one.length - 1;

              // 临时变量默认选中第一个选项
              temp = this.invoice[this.findId(res.data.title_list_one[length].id, this.title_listOne, 'id')];
              this.templateInvoiceOne = this.deepCopy(temp);
              this.invoiceOne = this.deepCopy(temp);
            }

            if (res.data.title_list_two.length != 0) {
              this.slots2[0].values = res.data.title_list_two;
              // 保存企业抬头列表
              this.title_listTwo = res.data.title_list_two;

              var length = res.data.title_list_two.length - 1;

              temp = this.invoice[this.findId(res.data.title_list_two[length].id, this.title_listTwo, 'id')];
              this.templateInvoiceTwo = this.deepCopy(temp);
              this.invoiceTwo = this.deepCopy(temp);
            }
          }
        })
      }
    },
    watch: {
      color(newValue) {
        console.log(newValue);
        this.$store.commit('themeChange', this.color);
        this.theme = this.$store.state.theme;
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../style/variable";

  .home-content {
    .home-title {
    }
    .home-body-one {
      border: 1px solid gainsboro;
      border-bottom: none;
    }

    .home-content-body {
      box-sizing: border-box;
      height: 48px;
      line-height: 48px;
      border: 1px solid gainsboro;
      border-bottom: none;
      .home-tab-item {
        color: gainsboro;
        margin-left: 3px;
        margin-right: 3px;
        line-height: 38px;
        height: 100%;
        border: 1px solid gainsboro;
      }
    }

    .home-contentBody {
      box-sizing: border-box;
      .home-down {
        line-height: 48px;
        .home-down-title {
          .is-up {
            transform: rotateX(180deg);
          }
        }
      }
    }
  }

  .modeTitle {
    font-weight: bold;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mint-popup-1:before {
    display: inline-block;
    width: 0;
    height: 0;
    border: solid transparent;
    border-width: 10px;
    border-bottom-color: #fff;
    content: "";
    position: absolute;
    top: -20px;
    right: 11px;
  }

  .top295 {
    top: 295px !important;
  }


  .twoElisp{
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
</style>
