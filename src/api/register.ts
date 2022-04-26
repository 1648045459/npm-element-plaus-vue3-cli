import useAxiosApi from "@/utils/useAxiosApi";
const urlApi = (window as any).BASEURL;

/**
 * @Descripttion: 注册手机号获取验证码
 * @param {*}
 * @return {*}
 */
export function getVerCode(data: any) {
  return useAxiosApi(`${urlApi}/v1/user/sms`, {
    method: "POST",
    data
  });
}


/**
 * @Descripttion: 检查验证码是否正确
 * @param {*}
 * @return {*}
 */
export function checkVerCode(data: any) {
  return useAxiosApi(`${urlApi}/v1/user/sms/verification`, {
    method: "POST",
    data
  });
}
/**
 * @Descripttion: 发送注册信息
 * @param {*}
 * @return {*}
 */
export function sendRegisterData(data: any) {
  return useAxiosApi(`${urlApi}/v1/register`, {
    method: "POST",
    data
  });
}