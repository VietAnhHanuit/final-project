import {ReduxHelper} from '../../helpers';

export const prefix = 'AUTHENTICATION';

export const setAuthenticationData =
  ReduxHelper.generateLocalAction(prefix, 'SET_AUTHENTICATION_DATA');

export const logout = ReduxHelper.generateActions(prefix, 'LOGOUT');

