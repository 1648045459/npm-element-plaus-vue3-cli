import { getVersion } from '@/api';
import { mutateState } from '@/utils';
import { useCookies } from '@vueuse/integrations';
// import { rejects } from 'assert';
// import { resolve } from 'path';
import { Module } from 'vuex';
import { watch } from 'vue';
const TOKEN_KEY = (window as any).TOKEN_KEY;

// const { TOKEN_KEY } = import.meta.env;
const token = useCookies().get(TOKEN_KEY as string);
import { AnyObject } from "@/utils/types";
interface StoreUser {
  token: string;
  accounts: string;
  user: AnyObject;
}

const store: Module<StoreUser, unknown> = {
  namespaced: true,
  state() {
    return {
      token: token,
      accounts: '',
      user: {}
    };
  },
  mutations: {
    mutateState(state, payload) {
      mutateState(state, payload);
    }
  },
  actions: {
    userLogout() {
      return new Promise((resolve) => {
        useCookies().remove(TOKEN_KEY as string);
        window.location.href = '/';
        resolve('退出成功');
      });
    },
    getVersion() {
      return new Promise((resolve, reject) => {
        const { data, error } = getVersion();
        watch(data, () => {
          resolve(data.value);
        });
        watch(error, () => {
          reject(error.value);
        });
      });
    }
  }
};

export default store;
