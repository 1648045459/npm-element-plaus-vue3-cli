import useAxiosApi from "@/utils/useAxiosApi";
const urlApi = (window as any).BASEURL;

/**
 * @description: 用户登录
 * @param {type}
 * @return: Promise
 */
export function login(data: any) {
  return useAxiosApi(`${urlApi}/v1/login`, {
    method: "POST",
    data
  });
}
/**
 * @description: 退出登陆
 * @param {type}
 * @return: Promise
 */
export function logout() {
  return useAxiosApi(`${urlApi}/v1/logout`, {
    method: "POST",
  });
}
/**
 * @description: 改密码
 * @param {type}
 * @return: Promise
 */
export function changepassword(data: any) {
  return useAxiosApi(`${urlApi}/v1/user/password`, {
    method: 'PUT',
    data
  });
}
/**
 * @description: 获取用户信息
 * @param {type}
 * @return: Promise
 */

export function getUsrInfo(data:any) {
  return useAxiosApi(`${urlApi}/v1/user/information`, { method: 'GET',params:data });
}
/**
 * @description: 找回密码
 * @param {type}
 * @return: Promise
 */
export function retrievePassword(data: any) {
  return useAxiosApi(`${urlApi}/v1/user/password/retrieve`, {
    method: "POST",
    data
  });
}
/**
 * @Descripttion: 获取随机数
 * @param {*} data
 * @return {*}
 */
export function getSaltByPhoneNum(data:any) {
  return useAxiosApi(`${urlApi}/v1/user/phoneNumber/${data.phoneNumber}/saltrandom`, { method: 'GET'});
}
/**
 * @Descripttion: 设置用户信息
 * @param {*} data
 * @return {*}
 */
export function setUserInfo(data: any) {
  return useAxiosApi(`${urlApi}/v1/user/information`, {
    method: 'PUT',
    data
  });
}
/**
 * @Descripttion: 校验authkey
 * @param {*} data
 * @return {*}
 */
export function checkAuthKey(data: any) {
  return useAxiosApi(`${urlApi}/v1/user/authkey/check`, {
    method: "POST",
    data
  });
}
/**
 * @Descripttion: 获取回调地址
 * @param {*} data
 * @return {*}
 */

export function callbackUrlByAppid(data:any) {
  return useAxiosApi(`${urlApi}/v1/callback/${data.callbackCode}`, { method: 'GET' });
}