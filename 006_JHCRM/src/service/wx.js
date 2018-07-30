import {
  ajax,
  JHCRM
} from './ajax';

const wx = window.wx;
const location = window.location;
const urlHash = {};                 //  用来判断本url是否已经发起过请求

export function WX_Promise(options) {
  const {
    url = location.href.split('#')[0],
    jsApiList,
    errorFn
  } = options || {};
  if (urlHash[url]) {
    return config({
      readied: true
    })
      .catch((error) => {
        console.error(error);
        errorFn && errorFn(error);
      });
  }
  
  return ajax({
    method: 'get',
    url: JHCRM.getURL('WX_Signature', { url })
  })
    .then((res) => {
      const { appId, timestamp, nonceStr, signature } = res.data.data || {};
      return config({
        appId,
        timestamp,
        nonceStr,
        signature
      });
    })
    .catch((error) => {
      console.error(error);
      errorFn && errorFn(error);
    });
  
  function config({ readied, appId, timestamp, nonceStr, signature }) {
    if (readied) {
      return new Promise((resolve) => {
        resolve(wx);
      });
    }
    wx.config({
      beta: true,             // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
      debug: false,            // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId,                  // 必填，企业微信的corpID
      timestamp,              // 必填，生成签名的时间戳
      nonceStr,               // 必填，生成签名的随机串
      signature,              // 必填，签名，见附录1
      jsApiList               // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    return new Promise((resolve, reject) => {
      wx.ready(() => {
        urlHash[url] = {
          appId,
          timestamp,
          nonceStr,
          signature
        };
        resolve(wx);
      });
      wx.error((res) => {
        reject(res);
      });
    });
  }
}

WX_Promise.remove = (url = location.href.split('#')[0]) => {
  delete urlHash[url];
};

export default wx;
