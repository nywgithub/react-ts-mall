import axios from "axios";

import { CommonError, UnLoginError } from "@/common/biz/ErrorCode";

//设置跨域安全校验
let needCredentials = true;
if (__IS_MOCK) {
  needCredentials = false;
}
axios.defaults.withCredentials = needCredentials;

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    //Message.error({message: '请求超时!'});
    return Promise.resolve(err);
  }
);
axios.interceptors.response.use((data) => {
  if (data.data.code === 0) {
    return data.data;
  } else {
    if (data.data.code === UnLoginError && window.location.pathname !== '/supplier/point/mall.html') {
      //Message.error({message: '您已经退出登录!'});
      artDialog &&
        artDialog.alert(
          `您已经退出登录，请<a href="https://login.made-in-china.com/sign-in/?jumpNext=1&baseNextPage=${encodeURIComponent(
            window.location.href
          )
          }" >登录</a>后进行操作。`,
          "错误",
          { type: "error" }
        );
      return Promise.reject(data.data);
    }
    if (CommonError.indexOf(data.data.code || "") >= 0) {
      //Message.error({message: '通用错误!'});
      artDialog &&
        artDialog.alert(data.data.err || "通用错误", "错误", {
          cancel: false,
          type: "error",
        });
      return Promise.reject(data.data);
    }
    switch (data.data.code) {
      case 1007:
        artDialog &&
          artDialog.alert(data.data.err || "您已经兑换过，不能重复兑换", "错误", {
            cancel: false,
            type: "error",
          });
        break;
      case 1008:
        artDialog &&
          artDialog.alert(data.data.err || "积分不足", "错误", {
            cancel: false,
            type: "error",
          });
        break;
      case 1009:
        artDialog &&
          artDialog.alert(data.data.err || "礼品已兑完", "错误", {
            cancel: false,
            type: "error",
          });
        break;
      case 1997:
        future.Dialog.GetWarnDialog({
          padding: '30px 30px 10px 30px',
          quickClose: true,
          isShowCloseBtn: false,
          content: '<div>公司信息审核通过后才可以兑换,<a href="javascript:void(0);" class="J-changeC">立即修改</a></div>',
          okValue: '关闭',
          onshow: () => {
            $(".J-changeC").on('click', function (e) {
              e.preventDefault();
              window.open('/company.do?xcase=viewCompanyGeneralInfo')
            })
          },
          ok: function () {

            return true
          }
        });

        break;
      case 1998:
        artDialog &&
          artDialog.alert(data.data.err || "无权限", "错误", {
            cancel: false,
            type: "error",
          });
        break;
      default:

        break;
    }
    return data.data;
  }
});

let host = "";

//判断host
// if (
//   document.querySelector(".J-dbkHost") &&
//   document.querySelector(".J-dbkHost").value
// ) {
//   host = document.querySelector(".J-dbkHost").value;
// }

if (__IS_MOCK) {
  host = "http://mock.ued.vemic.com/p/60bdfb20faabc10c57ee9e6a";
}

export { axios, host };
