<template>
  <div class="">
    <!-- svg 图引入 -->
    <svg-icon iconClass="video" className="svg-style-video" />
    <van-divider />
    <!-- 翻译调用 -->
    {{ $t('components.stickyTips') }}
    <van-divider />
    <van-loading color="#0094ff" />
    <van-divider />
    <p>API test version: {{ version }}</p>
    <van-divider />
    <van-button type="warning" @click="onClick('/test')">
      路由跳转:/test
    </van-button>
    <van-button type="primary" @click="onClick('/routerJ')">
      路由跳转:/routerJ
    </van-button>
    <van-divider />
    <p>密码强度</p>
    <van-progress pivot-text="红色" color="#ee0a24" :percentage="percentage" />
    <van-divider />
    <img alt="Vue logo" src="../assets/logo.png" />
    <van-divider />
    <div v-html="note"></div>
    <van-divider />
    <qrcode-vue value="342423sdfsdfsdser" :size="200" level="H" />
    <van-divider />

    <p>
      <a
        target="_blank"
        href="https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.sign_typed_data"
      >
        https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.sign_typed_data
      </a>
      <a
        target="_blank"
        href="https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.sign_typed_data"
      >
        https://web3js.readthedocs.io/en/v1.7.3/web3-eth.html#sign
      </a>
    </p>

    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>   
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import zxcvbn from 'zxcvbn';
import { KJUR, KEYUTIL, hextob64 } from 'jsrsasign';
import bs58 from 'base58check';

// 组件引入
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Web3 from 'web3';
import { createWallet, decryptMasterKey } from 'wallet-utils-create';
// import rand from "csprng";
import { getVersion } from '@/api/index';
import { useI18n } from 'vue-i18n';
const store = useStore();
const version = ref('');
const percentage = ref(0);
const route = useRoute(),
  router = useRouter();
const { t } = useI18n();
const note = ref('');

const emits = defineEmits(['childToParent']);
const digit = ref(2);
const init = async () => {
  // 1.路由获取参数
  console.log('route = ', route);
  // 2.vuex参数获取
  console.log('store = ', store);
  // 3.vuex更新参数
  store.commit('user/mutateState', { accounts: 'xxxxxxxx' });

  // 4.接口调用
  // let { data, error } = await getVersion();
  // console.log('version = ', data.value, error.value);
  // version.value = data.value.version;
  // 5.conf.js文件的变量访问
  console.log('BASEURL = ', (window as any).BASEURL, (window as any).TIMEOUT);
  // 7.web3初始化绑定以太坊
  const rpc = 'https://test-sct.netwarps.com';
  let provider;
  if (rpc.indexOf('http') !== -1) {
    provider = new Web3.providers.HttpProvider(rpc);
  } else {
    provider = new Web3.providers.WebsocketProvider(rpc);
  }
  console.log('store 2= ', store);
  // console.log(provider);
  const web3 = new Web3(provider);

  // 8.获取钱包账户的余额
  console.log(
    await web3.eth.getBalance('0x8cb2c7Cc1a6E52Bc71651e1bC1e7354A02F4Eb07')
  );

  // 9.钱包签名交易
  var privateKey1 =
    '0x4d54f4b1331bc74e3aa163808bea4b4c13c4f525cab5ae5a51020d84cc5b06db';

  const params2 = {
    to: '0x8cb2c7Cc1a6E52Bc71651e1bC1e7354A02F4Eb07',
    gas: 21000,
  };
  console.log('privateKey1 = ', privateKey1);
  console.log(params2);
  web3.eth.accounts.signTransaction(params2, privateKey1).then((tx) => {
    var rawTx = tx.rawTransaction;
    console.log('rawTx = ', rawTx);
  });

  // 10. i18n翻译
  console.warn('i18n 翻译 = ', t('components.stickyTips'));

  // 11.emit
  emits('childToParent', 23);

  // 12.密码强度
  let result = zxcvbn('123.#4');
  console.log('密码强度 = ', result, (result.score + 1) * 20);
  percentage.value = (result.score + 1) * 20;
  // 13.base58check加密解密
  console.log('%%%%%%%%%%%%%%%%%%%');
  let msg = '23234fdf';
  console.log('原数据 = ', msg);
  const address = bs58.encode(msg);
  console.log('address = ', address);
  let base58check = bs58.decode(address, 'hex');
  console.log('base58check = ', base58check);

  // 15. metamask
  const chainId16 = await ethereum.request({ method: 'eth_chainId' });
  console.log('chainId16 = ', chainId16);
  // 1？.生成秘钥对
  // onECCSign2();
};
// const onECCSign2 = () => {
//   // 生成1024 RSA密钥对pri， pub
//   let key = KEYUTIL.generateKeypair('RSA', 1024);
//   let pri = KEYUTIL.getPEM(key.prvKeyObj, 'PKCS1PRV');
//   let pub = KEYUTIL.getPEM(key.pubKeyObj);

//   // AES_ECB加密
//   const wordText = pri;
//   // 主密钥加密RSA私钥
//   const jiamiPri = wordText; // encryptAesEcb(wordText, masterKey);
//   let rsa_key = {
//     rsa_pri_key: jiamiPri,
//     rsa_pub_key: pub,
//   };
//   console.log('rsa_key = ', rsa_key);
//   // RSA私钥解密token
//   const rsaPriKeyObj = KEYUTIL.getKey(rsa_key.rsa_pri_key);
//   let token = 'sdsdfsdf';
//   const encryptMsg = KJUR.crypto.Cipher.encrypt(token, rsa_key.rsa_pub_key);
//   console.log('encryptMsg = ', encryptMsg);
//   const decryptMsg = KJUR.crypto.Cipher.decrypt(encryptMsg, rsaPriKeyObj);
//   console.log('decryptMsg = ', decryptMsg);
// };
// 路由跳转
const onClick = (path: string) => {
  router.push({ path: path });
};

init();
</script>
<style scoped>
</style>
