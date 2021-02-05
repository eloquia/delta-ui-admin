import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';
import { MainState } from './state';

export const getters = {
	isLoggedIn: (state: MainState): boolean | null => state.isLoggedIn,
	loginError: (state: MainState): boolean => state.logInError,
	token: (state: MainState): string => state.token,
};

const {read} = getStoreAccessors<MainState, State>('');

export const readIsLoggedIn = read(getters.isLoggedIn);
export const readLoginError = read(getters.loginError);
export const readToken = read(getters.token);
