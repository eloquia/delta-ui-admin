import { getStoreAccessors } from 'typesafe-vuex';

import { IUserProfile } from '../../interfaces/core';
import { MainState, AppNotification } from './state';
import { State } from '../state';


export const mutations = {
	setToken(state: MainState, payload: string): void {
		state.token = payload;
	},
	setLoggedIn(state: MainState, payload: boolean): void {
		state.isLoggedIn = payload;
	},
	setLogInError(state: MainState, payload: boolean): void {
		state.logInError = payload;
	},
	setUserProfile(state: MainState, payload: IUserProfile): void {
		state.userProfile = payload;
	},
	setDashboardMiniDrawer(state: MainState, payload: boolean): void {
		state.dashboardMiniDrawer = payload;
	},
	setDashboardShowDrawer(state: MainState, payload: boolean): void {
		state.dashboardShowDrawer = payload;
	},
	addNotification(state: MainState, payload: AppNotification): void {
		state.notifications.push(payload);
	},
	removeNotification(state: MainState, payload: AppNotification): void {
		state.notifications = state.notifications.filter((notification) => notification !== payload);
	},
};

const {commit} = getStoreAccessors<MainState, State>('');

export const commitSetDashboardMiniDrawer = commit(mutations.setDashboardMiniDrawer);
export const commitSetDashboardShowDrawer = commit(mutations.setDashboardShowDrawer);
export const commitSetLoggedIn = commit(mutations.setLoggedIn);
export const commitSetLogInError = commit(mutations.setLogInError);
export const commitSetToken = commit(mutations.setToken);
export const commitSetUserProfile = commit(mutations.setUserProfile);
export const commitAddNotification = commit(mutations.addNotification);
export const commitRemoveNotification = commit(mutations.removeNotification);
