import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';
import { MainState } from './state';

export const getters = {
  isLoggedIn: (state: MainState) => state.isLoggedIn,
  loginError: (state: MainState) => state.logInError,
  token: (state: MainState) => state.token,
}

const {read} = getStoreAccessors<MainState, State>('');

export const readIsLoggedIn = read(getters.isLoggedIn);
export const readLoginError = read(getters.loginError);
export const readToken = read(getters.token);
