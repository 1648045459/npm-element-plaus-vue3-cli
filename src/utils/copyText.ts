/*
 * @Author: your name
 * @Date: 2021-02-06 10:45:16
 * @LastEditTime: 2021-07-12 15:13:26
 * @LastEditors: HFL
 * @Description: 复制功能
 * @FilePath: \faxlulu-mobiled:\Project\bfs-gateway-ui\src\utils\copyText.js
 */

//调用翻译对象
// const { t } = useI18n({
//   inheritLocale: true
// });
// import { ElMessage } from 'element-plus';
import { Notify } from 'vant';
// 复制文本字符串
export function copyText(
  textString: string,
  successInfo: string,
  errorInfo: string
) {
  if (!successInfo) successInfo = '复制成功';
  if (!errorInfo) errorInfo = '复制失败';
  const textarea = document.createElement('input'); //创建input对象
  // const currentFocus = document.activeElement; //当前获得焦点的元素
  document.body.appendChild(textarea); //添加元素
  textarea.value = textString;
  textarea.focus();
  if (textarea.setSelectionRange)
    textarea.setSelectionRange(0, textarea.value.length);
  //获取光标起始位置到结束位置
  else textarea.select();
  let flag = false;
  try {
    flag = document.execCommand('copy'); //执行复制
  } catch (eo) {
    flag = false;
  }
  document.body.removeChild(textarea); //删除元素
  // if (currentFocus) {
  //   currentFocus.focus();
  // }

  if (flag) {
    Notify({ type: 'success', message: successInfo });
    // ElMessage({
    //   showClose: true,
    //   message: successInfo,
    //   type: 'success'
    // });
  } else {
    Notify({ type: 'danger', message: errorInfo });
    // ElMessage({
    //   showClose: true,
    //   message: errorInfo,
    //   type: 'error'
    // });
  }
}

/**
 * @name:
 * @test: test font
 * @msg: 复制带html样式的文本
 * @param {*} url：需要复制的URL地址
 * @param {*} successInfo：复制成功后的提示
 * @param {*} extractCode：需要复制的提取码
 * @return {*}
 */
// export function copyShareMsg(url, successInfo, extractCode = null) {
//   Vue.prototype.$nextTick(function() {
//     const selection1 = window.getSelection();
//     selection1.removeAllRanges(); //清之前其他的复制缓存

//     if (!successInfo) successInfo = i18n.t("lang.copy-success");
//     if (!url) {
//       Vue.prototype.$message({
//         showClose: true,
//         message: i18n.t("lang.copy-error"),
//         type: "success"
//       });
//     }

//     // 动态设置链接
//     const _a = document.getElementById("copyHtmlTxt");
//     if (extractCode) {
//       // 复制链接，有提取码布局  http://localhost:1024/sf/077baa81-7e31-4ba4-8167-65fdea67a88e#0k7241mb
//       _a.innerHTML =
//         "<div>" +
//         i18n.t("lang.link") +
//         "<a href='" +
//         url +
//         "#" +
//         extractCode +
//         "' target='_blank'>" +
//         url +
//         "#" +
//         extractCode +
//         "</a></div>" +
//         "<div>" +
//         i18n.t("lang.click-share-link") +
//         "</div>";
//     } else {
//       // 复制链接默认布局, 没有提取码 http://localhost:1024/sf/077baa81-7e31-4ba4-8167-65fdea67a88e
//       _a.innerHTML =
//         "<div>" +
//         i18n.t("lang.link") +
//         "<a href='" +
//         url +
//         "' target='_blank'>" +
//         url +
//         "</a></div>" +
//         "<div>" +
//         i18n.t("lang.click-share-link") +
//         "</div>";
//     }

//     //nextTick,当前dom渲染完毕的回调
//     const selection = window.getSelection();
//     const range = document.createRange();

//     range.selectNode(document.getElementById("copyHtmlTxt")); //传入dom
//     selection.addRange(range);
//     document.execCommand("copy"); //copy是复制

//     Vue.prototype.$message({
//       showClose: true,
//       message: successInfo,
//       type: "success"
//     });

//     selection.removeAllRanges(); // 清除缓存;

//     // 清空动态复制链接布局
//     const _a_1 = document.getElementById("copyHtmlTxt");
//     _a_1.innerHTML = "";
//   });
// }
