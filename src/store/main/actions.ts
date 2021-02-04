import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'typesafe-vuex';
import { AxiosError } from 'axios';

import router from '../../router';

import core from '../../api/core';
import { getLocalToken, removeLocalToken, saveLocalToken } from '../../utils';
import { State } from '../state';
import { AppNotification, MainState } from './state';
import {
  commitAddNotification,
  commitRemoveNotification,
  commitSetLoggedIn,
  commitSetLogInError,
  commitSetToken,
  commitSetUserProfile,
} from './mutations';

type MainContext = ActionContext<MainState, State>;

export const actions = {
  async actionLogIn(context: MainContext, payload: { username: string; password: string }) {
    try {
      const response = await core.logInGetToken(payload.username, payload.password);
      const token = response.data.access_token;
      if (token) {
        saveLocalToken(token);
        commitSetToken(context, token);
        commitSetLoggedIn(context, true);
        commitSetLogInError(context, false);
        await dispatchGetUserProfile(context);
        await dispatchRouteLoggedIn(context);
        commitAddNotification(context, { content: 'Logged in', color: 'success' });
      } else {
        await dispatchLogOut(context);
      }
    } catch (err) {
      commitSetLogInError(context, true);
      await dispatchLogOut(context);
    }
  },
  async actionGetUserProfile(context: MainContext) {
    try {
      const response = await core.getMe(context.state.token);
      if (response.data) {
        commitSetUserProfile(context, response.data);
      }
    } catch (error) {
      await dispatchCheckApiError(context, error);
    }
  },
  async actionCheckLoggedIn(context: MainContext) {
    if (!context.state.isLoggedIn) {
      let token = context.state.token;
      if (!token) {
        const localToken = getLocalToken();
        if (localToken) {
          commitSetToken(context, localToken);
          token = localToken;
        } else {
        }
      }
      if (token) {
        try {
          const response = await core.getMe(token);
          commitSetLoggedIn(context, true);
          commitSetUserProfile(context, response.data);
        } catch (error) {
          await dispatchRemoveLogIn(context);
        }
      } else {
        await dispatchRemoveLogIn(context);
      }
    }
  },
  async actionLogOut(context: MainContext) {
    await dispatchRemoveLogIn(context);
    await dispatchRouteLogOut(context);
  },
  actionRouteLogOut(context: MainContext) {
    if (router.currentRoute.value.path !== '/login') {
      router.push('/');
    }
  },
  async actionRemoveLogIn(context: MainContext) {
    removeLocalToken();
    commitSetToken(context, '');
    commitSetLoggedIn(context, false);
  },
  async actionCheckApiError(context: MainContext, payload: AxiosError) {
    if (payload.response!.status === 401) {
      await dispatchLogOut(context);
    }
  },
  actionRouteLoggedIn(context: MainContext) {
    if (router.currentRoute.value.path === '/login' || router.currentRoute.value.path === '/') {
      router.push('/dashboard');
    }
  },
};

const { dispatch } = getStoreAccessors<MainState | any, State>('');

export const dispatchCheckApiError = dispatch(actions.actionCheckApiError);
export const dispatchGetUserProfile = dispatch(actions.actionGetUserProfile);
export const dispatchCheckLoggedIn = dispatch(actions.actionCheckLoggedIn);
export const dispatchRemoveLogIn = dispatch(actions.actionRemoveLogIn);
export const dispatchLogIn = dispatch(actions.actionLogIn);
export const dispatchLogOut = dispatch(actions.actionLogOut);
export const dispatchRouteLoggedIn = dispatch(actions.actionRouteLoggedIn);
export const dispatchRouteLogOut = dispatch(actions.actionRouteLogOut);
