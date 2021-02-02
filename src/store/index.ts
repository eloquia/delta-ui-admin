import { createStore, StoreOptions } from "vuex";

import { State } from './state';
import { mainModule } from "./main";

const storeOptions: StoreOptions<State> ={
  modules: {
    main: mainModule,
  },
};

const store = createStore(storeOptions);

export default store;
