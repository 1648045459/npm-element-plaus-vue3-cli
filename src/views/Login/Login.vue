
<template>
  <div class="contain">
    <!-- 1.注册输入手机号获取验证码 -->
    <!-- <el-form
      ref="formData"
      :model="formData"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
      label-position="top"
    >
      <div style="text-align: center">
        <el-image
          style="width: 100px; height: 100px"
          :src="walletPng"
          :fit="'contain'"
        />
      </div>
      <div
        style="
          text-align: center;
          padding-bottom: 10px;
          font-size: 28px;
          font-weight: 700;
        "
      >
        {{ $t('lang.welcomeTo') }} ChainWallet
      </div>
      <el-form-item prop="address">
        <el-select v-model="formData.address" style="width: 100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('lang.phoneNumber')" prop="phoneNumner">
        <el-input
          v-model.trim="formData.phoneNumner"
          :placeholder="$t('lang.pleaseEnterPhoneNumber')"
        />
      </el-form-item>
      <el-form-item :label="$t('lang.password')" prop="pass">
        <el-input
          v-model.trim="formData.pass"
          :placeholder="$t('lang.pleaseEnterPassword')"
          show-password
          class="password-input"
        />
      </el-form-item>
      <div style="text-align: right">
        <el-link type="primary" @click.native.stop="onRetrievePassword">
          {{ $t('lang.retrievePpassword') }}
        </el-link>
      </div>
      <el-form-item
        v-show="isShowVerCodeInput"
        :label="$t('lang.verificationCode')"
        prop="verCode"
      >
        <el-input
          v-model.trim="formData.verCode"
          :placeholder="$t('lang.pleaseEnterVerificationCode')"
          :maxlength="6"
        >
          <el-button
            slot="append"
            :disabled="isLoadingVerCode"
            @click="onGetVerCode('formData')"
          >
            <i v-if="!isLoadingVerCode" class="el-icon-refresh" />
            <span v-if="isLoadingVerCode">{{ timeData.count + 's' }}</span>
          </el-button>
        </el-input>
      </el-form-item>

      <el-form-item v-show="isShowVerCodeInput">
        <el-button
          style="width: 100%"
          type="primary"
          :loading="isLoadingVerCodeUpload"
          @click="checkFormCode('formData')"
        >
          {{ $t('lang.continue') }}
        </el-button>
        <div style="text-align: center">
          <el-link type="primary" @click.native.stop="onLogin">
            {{ $t('lang.backLogin') }}
          </el-link>
        </div>
        <div class="vercode-info">{{ showVerCodeMsg }}</div>
      </el-form-item>

      <el-form-item v-show="!isShowVerCodeInput">
        <el-button
          style="width: 100%"
          type="primary"
          :loading="isLoadingPhone"
          @click="checkFormPhone('formData')"
        >
          {{ $t('lang.login') }}
        </el-button>
        <div style="text-align: center">
          {{ $t('lang.donNotHaveAccount') }}
          <el-link type="primary" @click.native.stop="onRegister">
            {{ $t('lang.create') }}
          </el-link>
        </div>
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script lang="ts" setup>
// import walletPng from '@/assets/images/chain-wallet.png';
// import { generateMnemonic, mnemonicToSeed } from '@/views/Register/bip39';
// import { hdkey } from 'ethereumjs-wallet';
// var util = require('ethereumjs-util');
// import { KJUR, KEYUTIL } from 'jsrsasign';
// import { setCookie } from '@/utils/auth';
// import * as asmCrypto from 'asmcrypto.js';
// import { Encrypt } from '@/utils/cryptoJs';
// import basicData from '@/assets/json/BasicData.json';
// import { getVerCode, checkVerCode } from '@/api/register';
// import { getSaltByPhoneNum } from '@/api/user.ts';
// import { Sha256SaltRandom, onPBKDF2_HMAC_SHA512 } from '@/utils/index';
// import { decryptAesEcb } from '@/utils/cryptoJsAesEcb';
// import { reactive } from '@vue/reactivity';

const formData = reactive({ address: 1 });
// export default {
//   name: 'RegisterPhone',
//   data() {
//     var checkPhone = (rule, value, callback) => {
//       if (!value) {
//         return callback(new Error(this.$t('lang.phoneNumberEmptyRefill')));
//       }
//       var re = /^1\d{10}$/;
//       if (!re.test(value)) {
//         return callback(new Error(this.$t('lang.formatIncorrectRefill')));
//       }
//       setTimeout(() => {
//         if (value.length != 11) {
//           callback(new Error(this.$t('lang.formatIncorrectRefill')));
//         } else {
//           callback();
//         }
//       }, 1000);
//     };
//     var validatePass = (rule, value, callback) => {
//       if (!value) {
//         callback(new Error(this.$t('lang.passwordEmptyRefill')));
//       } else {
//         const isNum = /[0-9]+/.test(value);
//         const isAZ = /[A-Z]+/.test(value);
//         const isaz = /[a-z]+/.test(value);

//         var pattern = new RegExp('[\u4E00-\u9FA5]+');
//         var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
//         const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】]/im;

//         if (
//           regCn.test(value) ||
//           pattern.test(value) ||
//           !(isNum && isAZ && isaz && value.length > 8 && value.length <= 24)
//         ) {
//           // 必须包含大小写字母数字，长度大于8小于等于24
//           callback(new Error(this.$t('lang.formatIncorrectRefillPass')));
//           return;
//         }

//         if (this.formData.checkPass !== '') {
//           this.$refs.formData.validateField('checkPass');
//         }
//         callback();
//       }
//     };
//     var checkVerCodeRule = (rule, value, callback) => {
//       if (this.isShowVerCodeInput) {
//         if (!value) {
//           return callback(
//             new Error(this.$t('lang.verificationCodeEmptyRefill'))
//           );
//         }
//         var re = /^\d{6}$/;
//         if (!re.test(value)) {
//           return callback(new Error(this.$t('lang.formatIncorrectRefill')));
//         }
//         if (value.length != 6) {
//           callback(new Error(this.$t('lang.formatIncorrectRefill')));
//         } else {
//           callback();
//         }
//       }
//       callback();
//     };
//     return {
//       timeData: {
//         timer: null,
//         count: basicData.phoneVerificationCode.value,
//       },
//       isShowVerCodeInput: false,
//       isLoadingVerCode: false,
//       isLoadingVerCodeUpload: false,
//       isLoadingPhone: false,
//       showVerCodeMsg: '',
//       formData: { address: 1 },
//       options: basicData.mobileAreaCode.value,
//       rules: {
//         verCode: [{ validator: checkVerCodeRule, trigger: 'change' }],
//         phoneNumner: [{ validator: checkPhone, trigger: 'change' }],
//         pass: [{ validator: validatePass, trigger: 'blur' }],
//       },
//     };
//   },
//   mounted() {
//     const _this = this;

//     if (window.opener) {
//       if (
//         !sessionStorage.getItem('appidSaltRandom') &&
//         this.$route.query &&
//         this.$route.query.appidSaltRandom
//       ) {
//         sessionStorage.setItem(
//           'appidSaltRandom',
//           this.$route.query.appidSaltRandom
//         );
//       }
//     }
//     const phoneNumner = this.$route.params.phoneNumner;
//     _this.$set(_this.formData, 'phoneNumner', phoneNumner);
//   },
//   destroyed() {
//     if (this.timeData.timer) {
//       this.timeData.count = basicData.phoneVerificationCode.value;
//       clearInterval(this.timeData.timer);
//     }
//   },
//   methods: {
//     onRetrievePassword() {
//       this.$router.replace({ name: 'RetrievePhone' });
//     },
//     onRegister() {
//       this.$router.push({ name: 'RegisterPhone' });
//     },

//     onGetVerCode(formName) {
//       if (this.timeData.timer) {
//         this.timeData.count = basicData.phoneVerificationCode.value;
//         clearInterval(this.timeData.timer);
//       }
//       const _this = this;
//       this.isLoadingVerCode = true;
//       this.showVerCodeMsg = '';
//       _this.timeData.timer = setInterval(function () {
//         _this.timeData.count--;
//         if (_this.timeData.count === 0) {
//           clearInterval(_this.timeData.timer);
//           _this.isLoadingVerCode = false;
//         }
//       }, 1000);
//       getVerCode({ phoneNumber: _this.formData.phoneNumner })
//         .then((res) => {
//           _this.showVerCodeMsg = this.$t('lang.verificationCodeSentAgain');
//         })
//         .catch((err) => {
//           this.showVerCodeMsg = '';
//         });
//     },
//     onLogin() {
//       const phoneNumner = this.formData.phoneNumner;
//       setTimeout(() => {
//         this.formData = { address: 1, phoneNumner: phoneNumner };
//       }, 2000);
//       this.isShowVerCodeInput = false;
//     },
//     checkFormPhone(formName) {
//       if (this.timeData.timer) {
//         this.timeData.count = basicData.phoneVerificationCode.value;
//         clearInterval(this.timeData.timer);
//       }
//       const _this = this;
//       this.$refs[formName].validate((valid) => {
//         if (valid) {
//           this.isShowVerCodeInput = false;
//           this.isLoadingPhone = true;
//           this.showVerCodeMsg = '';
//           this.isLoadingVerCode = true;
//           _this.timeData.timer = setInterval(function () {
//             _this.timeData.count--;
//             if (_this.timeData.count === 0) {
//               clearInterval(_this.timeData.timer);
//               _this.isLoadingVerCode = false;
//             }
//           }, 1000);
//           // 获取验证码
//           getVerCode({ phoneNumber: _this.formData.phoneNumner })
//             .then((res) => {
//               this.isLoadingPhone = false;
//               this.showVerCodeMsg = this.$t('lang.verificationCodeHasBeenSent');
//               this.isShowVerCodeInput = true;
//             })
//             .catch((err) => {
//               if (err.response && err.response.status === 429) {
//                 this.isLoadingPhone = false;
//                 this.showVerCodeMsg = this.$t(
//                   'lang.verificationCodeHasBeenSent'
//                 );
//                 this.isShowVerCodeInput = true;
//               } else {
//                 this.showVerCodeMsg = '';
//                 this.isLoadingPhone = false;
//               }
//             });
//         } else {
//           return false;
//         }
//       });
//     },

//     checkFormCode(formName) {
//       const _this = this;
//       this.isLoadingVerCodeUpload = false;
//       this.$refs[formName].validate((valid) => {
//         if (valid) {
//           this.isLoadingVerCodeUpload = true;
//           // 校验验证码
//           checkVerCode({
//             phoneNumber: _this.formData.phoneNumner,
//             verification_code: _this.formData.verCode,
//           })
//             .then((res) => {
//               console.log('##3 ', res, res.code, res.data);
//               if (res.code === 0) {
//                 // 从服务器请求随机数
//                 this.getSaltByPhoneNum();
//               } else {
//                 this.isLoadingVerCodeUpload = false;
//               }
//             })
//             .catch((error) => {
//               console.warn(error);
//               this.isLoadingVerCodeUpload = false;
//             });
//         } else {
//           return false;
//         }
//       });
//     },
//     getSaltByPhoneNum() {
//       getSaltByPhoneNum({ phoneNumber: this.formData.phoneNumner })
//         .then((res) => {
//           if (res && res.status === 400) {
//             this.isLoadingVerCodeUpload = false;
//           } else if (res.code === 0) {
//             const salt = res.data.saltRandom;
//             // SHA256加密
//             const resultSha256 = Sha256SaltRandom(salt);
//             // PBKDF2_HMAC_SHA512 加密，生成派生加密密钥，派生认证密钥

//             const { startKey, endKey } = onPBKDF2_HMAC_SHA512(
//               resultSha256,
//               this.formData.pass
//             );
//             // 登录验证登录信息正确性，登录成功返回token
//             this.loginServer(startKey, endKey);
//           } else {
//             this.isLoadingVerCodeUpload = false;
//           }
//         })
//         .catch((err) => {
//           this.isLoadingVerCodeUpload = false;
//           console.error(err);
//         });
//     },
//     loginServer(startKey, endKey) {
//       const _this = this;
//       const params = {
//         phoneNumber: this.formData.phoneNumner,
//         authKey: endKey,
//       };
//       this.$store
//         .dispatch('user/login', params)
//         .then(async (res) => {
//           if (res && res.status === 400) {
//             _this.isLoadingVerCodeUpload = false;
//             _this.$message.error(
//               this.$t('lang.phoneNumberPasswordWrongRefill')
//             );
//           } else if (res.code === 0) {
//             let { master_key, rsa_pri_key, token } = res.data;
//             // 解密主密钥
//             master_key = asmCrypto.hex_to_bytes(master_key);
//             const resultMasterKey = asmCrypto.AES_ECB.decrypt(
//               master_key,
//               startKey
//             );

//             const masterKeyHex = asmCrypto.bytes_to_hex(resultMasterKey);

//             let privatekey = null;
//             try {
//               // 通过原主密钥解密RSA私钥
//               privatekey = decryptAesEcb(rsa_pri_key, masterKeyHex);
//               if (!privatekey) {
//                 throw 'rsa_pri_key解密失败, 解密结果为空';
//               }
//             } catch (error) {
//               console.log('rsa_pri_key解密失败 = ', error);
//               return;
//             }
//             // RSA私钥解密token
//             const rsaPriKeyObj = KEYUTIL.getKey(privatekey);
//             const decryptMsg = KJUR.crypto.Cipher.decrypt(token, rsaPriKeyObj);
//             setCookie('token', decryptMsg);
//             await _this.$store.dispatch('user/getUsrInfo');
//             _this.setMnemonics(resultMasterKey);
//           } else {
//             _this.isLoadingVerCodeUpload = false;
//             _this.$message.error(
//               this.$t('lang.phoneNumberPasswordWrongRefill')
//             );
//           }
//         })
//         .catch((err) => {
//           _this.isLoadingVerCodeUpload = false;
//           _this.$message.error(this.$t('lang.phoneNumberPasswordWrongRefill'));
//         });
//     },
//     async setMnemonics(resultMasterKey) {
//       // 生成助记词
//       const mnemonic = generateMnemonic(resultMasterKey);
//       const seed = await mnemonicToSeed(mnemonic);
//       const hdWallet = hdkey.fromMasterSeed(seed);
//       const addressTotal = 1; // 默认生成一个钱包
//       const addressArray = [];
//       for (let i = 0; i < addressTotal; i++) {
//         const item = {};
//         item.keyName = "m/44'/60'/0'/0/" + i;
//         item.key = hdWallet.derivePath("m/44'/60'/0'/0/" + i);
//         item.publicKey = '0x' + item.key._hdkey._publicKey.toString('hex');
//         item.account = item.key._hdkey.index;
//         item.privateKey = '0x' + item.key._hdkey._privateKey.toString('hex');
//         item._privateKey = item.key._hdkey._privateKey;
//         const address = util.pubToAddress(item.key._hdkey._publicKey, true);
//         item.address = util.toChecksumAddress('0x' + address.toString('hex'));
//         item.account_name = item.address;
//         addressArray.push(item);
//       }

//       // 主密钥
//       const msgE = `registerDa4rf${resultMasterKey}34c`;
//       const resultData = Encrypt(Encrypt(msgE));
//       localStorage.setItem('mk', resultData);

//       // 助记词
//       const msgmn = `registerDa4rf${mnemonic}34c`;
//       const resultmn = Encrypt(Encrypt(msgmn));
//       localStorage.setItem('mm', resultmn);

//       const chainId = await this.$web3.eth.getChainId();
//       localStorage.setItem('ci', chainId);

//       // 钱包相关参数
//       const addressArrayStr = JSON.stringify(addressArray);
//       const address = `registerDa4rf${addressArrayStr}34c`;
//       const resultaddress = Encrypt(Encrypt(address));
//       localStorage.setItem('ad', resultaddress);
//       this.isLoadingVerCodeUpload = false;

//       // 设置监控系统账户参数,检测系统性能
//       setCookie('AIPortal_Res_Account', addressArray[0].address);

//       if (sessionStorage.getItem('transactionParams')) {
//         this.$router.push({
//           name: 'Transaction',
//         });
//       } else {
//         this.$router.push({
//           name: 'Main',
//         });
//       }
//     },
//   },
// };
</script>
<style scoped>
.vercode-info {
  color: #67c23a;
  text-align: center;
}
.password-input :deep(.el-input--suffix .el-input__inner) {
  padding-right: 0px;
}
.password-input :deep(.el-input__suffix) {
  display: none;
}
</style>
