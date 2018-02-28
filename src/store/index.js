import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

const state = {
  // theme: '#Fc4',
  theme: '#356791',             // 当前主题色
  titleImgSrc: './static/img/logo.png',              // title图片路径
  infoMsg: {                 // 提示信息对象
    title: '',
    content: '',
    data: '',
  },
  infoType: ''              // 提示信息类型
};

const mutations = {
  // 主题色变化
  themeChange(state,value){
    state.theme = value;
  },
  titleSrcChange(state,value){
    state.titleImgSrc = value;
  },
  infoMsgChange(state,value){
    state.infoMsg = value;
  },
  infoTypeChange(state,value){
    state.infoType = value;
  }
};

export default new vuex.Store({
  state,
  mutations
})
