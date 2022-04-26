/*
 * @Descripttion: CryptoJS 字符串加密解密  AES_ECB加解密
 * @version:
 * @Author: HFL
 * @Date: 2021-05-12 18:52:27
 * @LastEditors: HFL
 * @LastEditTime: 2021-08-31 14:42:14
 */

var CryptoJS = require("crypto-js");

/**
 * AES-256-ECB对称加密
 * @param text {string} 要加密的明文
 * @param secretKey {string} 密钥，64位随机大小写与数字
 * @returns {string} 加密后的密文，Base64格式
 */
function encryptAesEcb(text:string, secretKey:string) {
  var keyHex = CryptoJS.enc.Base64.parse(secretKey);
  var messageHex = CryptoJS.enc.Utf8.parse(text);
  var encrypted = CryptoJS.AES.encrypt(messageHex, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encrypted));
}

/**
 * AES-256-ECB对称解密
 * @param textBase64 {string} 要解密的密文，Base64格式
 * @param secretKey {string} 密钥，64位随机大小写与数字
 * @returns {string} 解密后的明文
 */
function decryptAesEcb(textBase64:string, secretKey:string) {
  textBase64 = CryptoJS.enc.Base64.parse(textBase64).toString(
    CryptoJS.enc.Utf8
  );

  var keyHex = CryptoJS.enc.Base64.parse(secretKey);
  var decrypt = CryptoJS.AES.decrypt(textBase64, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Utf8.stringify(decrypt);
}
export { decryptAesEcb, encryptAesEcb };
