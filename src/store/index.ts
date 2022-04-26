import user from "./modules/user";
// const { DEV } = import.meta.env;
import { createStore,createLogger } from "vuex";
export interface State {
  [key: string]: any;
}
const store = createStore<State>({
  modules: {
    user
  },
  strict: true,
  plugins: [createLogger()]
});

export default store;
