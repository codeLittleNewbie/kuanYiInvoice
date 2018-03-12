import axios from 'axios'
import qs from 'qs'

// 配置域名
// let url = 'http://test0.kuan1.cn';       // 开发环境
let url = 'http://testnewx1.kuan1.cn';      // 测试环境
// let url = 'http://fu.kuan1.cn';          // 正式环境
// let url = 'http://yk.com';               // 本地环境

axios.defaults.baseURL = url;

// 延迟时间
let timeOut = {timeout: 1000 * 60};

// 提交发票信息
export const submitInvoiceMsg  = params => { return axios.post(`/pos/index.php?controller=invoice&action=saveInvoice`,qs.stringify(params),timeOut).then(res => res.data); };


// 获取发票信息
export const getInvoiceData  = params => { return axios.post(`/pos/index.php?controller=invoice&action=getInvoiceData`,qs.stringify(params),timeOut).then(res => res.data); };


// 获取微信签名包
export const getWXConfig  = params => { return axios.post(`/pos/invoice/wxconfig`,qs.stringify(params),timeOut).then(res => res.data); };
