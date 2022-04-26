/*
 * @Descripttion: CryptoJS 字符串加密解密
 * @version:
 * @Author: HFL
 * @Date: 2021-05-12 18:52:27
 * @LastEditors: HFL
 * @LastEditTime: 2021-06-01 12:21:25
 */

//引用AES源码js
const CryptoJS = require("crypto-js");

const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF"); //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse("ABCDEF1234123412"); //十六位十六进制数作为密钥偏移量

/**
 * @name:
 * @test: test font
 * @msg: 解密方法
 * @param {*} word：需要解密的字符串
 * @return {*}
 */
function Decrypt(word:string) {
  if (!word) {
    return null;
  }
  //先将Base64还原一下，因为加密的时候做了一些字符的替换
  const restoreBase64 = word.replace(/\-g/, "+").replace(/_/, "/");

  //返回的是解密后的对象
  let decrypt = CryptoJS.AES.decrypt(restoreBase64, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  //将解密对象转换成UTF8的字符串
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  //返回解密结果
  return decryptedStr.toString();
}

/**
 * @name:
 * @test: test font
 * @msg: 加密方法
 * @param {*} word:需要加密的字符串
 * @return {*}
 */
function Encrypt(word: string) {
  if (!word) {
    return null;
  }
  let srcs = CryptoJS.enc.Utf8.parse(word);
  //CipherOption,加密的一些选项：
  //mode:加密模式，可取值（CBC,CFB,CTR,CTRGladman,OFB,ECB),都在CryptoJS.mode对象下
  //padding:填充方式，可取值（Pkcs7,Ansix923,Iso10126,ZeroPadding,NoPadding),都在CryptoJS.pad对象下
  //iv:偏移量，mode===ECB时，不需要iv
  //返回的是一个加密对象
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  //将结果进行base64加密
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

export { Decrypt, Encrypt };
