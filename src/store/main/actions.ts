import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'typesafe-vuex';
import { AxiosError } from 'axios';

import router from '../../router';

import { api } from '../../api';
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
      const response = await api.logInGetToken(payload.username, payload.password);
      const token = response.data.access_token;
      console.log('token', token);
      if (token) {
        console.log('has token');
        saveLocalToken(token);
        commitSetToken(context, token);
        commitSetLoggedIn(context, true);
        commitSetLogInError(context, false);
        await dispatchGetUserProfile(context);
        await dispatchRouteLoggedIn(context);
        commitAddNotification(context, { content: 'Logged in', color: 'success' });
      } else {
        console.log('no token');
        await dispatchLogOut(context);
      }
    } catch (err) {
      console.log('error', err);
      commitSetLogInError(context, true);
      await dispatchLogOut(context);
    }
  },
  async actionGetUserProfile(context: MainContext) {
    console.log('getting user profile');
    try {
      const response = await api.getMe(context.state.token);
      console.log('user profile response', response);
      if (response.data) {
        commitSetUserProfile(context, response.data);
      }
    } catch (error) {
      await dispatchCheckApiError(context, error);
    }
  },
  async actionCheckLoggedIn(context: MainContext) {
    console.log('context', context);
    if (!context.state.isLoggedIn) {
      let token = context.state.token;
      console.log('token', token);
      if (!token) {
        console.log('no token exists')
        const localToken = getLocalToken();
        console.log('localToken', localToken);
        if (localToken) {
          console.log('localToken exists', localToken);
          commitSetToken(context, localToken);
          token = localToken;
        } else {
          console.log('localToken DNE');
        }
      }
      if (token) {
        console.log('token exists')
        try {
          const response = await api.getMe(token);
          commitSetLoggedIn(context, true);
          commitSetUserProfile(context, response.data);
        } catch (error) {
          await dispatchRemoveLogIn(context);
        }
      } else {
        console.log('token does not exist');
        await dispatchRemoveLogIn(context);
      }
    }
  },
  async actionLogOut(context: MainContext) {
    await dispatchRemoveLogIn(context);
    await dispatchRouteLogOut(context);
  },
  actionRouteLogOut(context: MainContext) {
    console.log('actionRouteLogOut');
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
    console.log('actionCheckApiError', payload);
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
