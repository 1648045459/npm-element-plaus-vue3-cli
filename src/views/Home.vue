<template>
  <div style="">
    <div class="home">首页</div>
    <van-divider />
    <van-divider />
    <aboutI @childToParent="childToParent"></aboutI>
    childData:{{ childData }}
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import aboutI from './About.vue';
const childData = ref('');

const childToParent = (param) => {
  console.log('Home.vue params = ', param);
  childData.value = param;
};
</script>
<style scoped>
</style>
